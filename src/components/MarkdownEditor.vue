<template>
	<v-container class="md" fluid>
		<v-layout row wrap>
			<!-- Editor -->
			<v-flex xs12 :md6="preview" class="pa-3">
				<v-layout column>
					<v-card v-if="!outline" ref="md-editor">
						<!-- Toolbar's style "transform: translateY(0)" will influence the z-index, so use "z-index: 1" on toolbar-->
						<v-toolbar
							:style="{ position: 'relative', 'z-index': 1 }"
							height="48px"
							flat
						>
							<toolbar
								ref="toolbar"
								:nativeEmoji="nativeEmoji"
								:emoji="emoji"
								:image="image"
								:color="color"
								@emoji="insertEmoji"
							/>
						</v-toolbar>

						<v-divider />
						<template v-if="image">
							<image-status v-if="image" :files="files" @remove="removeFile" />
							<v-divider />
						</template>

						<v-textarea
							solo
							flat
							:hide-details="hideDetails"
							:hint="hint"
							auto-grow
							ref="textarea"
							:value="value"
							@keydown.tab.prevent="insertText('\t')"
							@input="val => $emit('input', val)"
						/>
					</v-card>

					<div v-else>
						<div
							class="pa-2 outline"
							ref="md-editor"
							:style="{
								position: 'relative',
								borderColor: color,
								'z-index': 1
							}"
						>
							<toolbar
								ref="toolbar"
								:nativeEmoji="nativeEmoji"
								:color="color"
								@emoji="insertEmoji"
							/>
						</div>

						<image-status
							v-if="image"
							class="outline"
							:style="{ borderColor: color, borderTop: 'none' }"
							:files="files"
							@remove="removeFile"
						/>

						<div
							class="outline"
							:style="{ borderColor: color, borderTop: 'none' }"
						>
							<v-textarea
								solo
								flat
								:hide-details="hideDetails"
								:hint="hint"
								auto-grow
								ref="textarea"
								:value="value"
								@keydown.tab.prevent="insertText('\t')"
								@input="val => $emit('input', val)"
							/>
						</div>
					</div>
				</v-layout>
			</v-flex>

			<!-- Preview -->
			<v-flex
				class="md-preview pa-3"
				v-if="preview"
				v-show="compiled"
				xs12
				:md6="preview"
			>
				<v-card v-if="!outline">
					<v-card-text
						v-if="mode === 'Rendered'"
						class="subheading text--primary markdown-text"
						v-html="compiled"
					/>
					<v-card-text
						v-else-if="mode === 'Source'"
						class="subheading text--primary markdown-text"
					>
						{{ compiled }}
					</v-card-text>
				</v-card>

				<div v-else :style="{ borderColor: color }" class="pa-3 outline">
					<div
						v-if="mode === 'Rendered'"
						class="subheading md"
						v-html="compiled"
					/>
					<div v-else-if="mode === 'Source'" class="subheading">
						{{ compiled }}
					</div>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<style scoped>
/* Remove border-radius */
.v-textarea >>> .v-input__control > .v-input__slot {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.outline {
	border: 1.5px solid;
}
</style>

<script>
import Flow from "@flowjs/flow.js/dist/flow.min.js";
import mermaid from "mermaid";
import Vue from "vue";
import { mergeConfig, mergeOptions } from "../util/config";
import render from "../util/render.js";
import Toolbar from "./Toolbar.vue";
import ImageStatus from "./FileStatus.vue";
import "../style.css";

// Not watched variable
let mermaidTimeout = null;

export default {
	components: {
		Toolbar,
		ImageStatus
	},
	props: {
		value: {
			type: String,
			default: ""
		},
		renderOptions: {
			type: Object,
			default: undefined
		},
		renderConfig: {
			type: Object,
			default: undefined
		},
		mode: {
			type: String,
			default: "Rendered"
		},
		outline: {
			type: Boolean,
			default: false
		},
		// Outline and icon default color
		color: {
			type: String,
			default: undefined
		},
		preview: {
			type: Boolean,
			default: true
		},
		nativeEmoji: {
			type: Boolean,
			default: false
		},
		// Enable emoji
		emoji: {
			type: Boolean,
			default: true
		},
		// Enable image upload
		image: {
			type: Boolean,
			default: true
		},
		hint: {
			type: String,
			default: ""
		},
		// target url of uploading files
		fileTarget: {
			type: String,
			default: "/"
		},
		fileFilter: {
			type: Function,
			// Allow only image files
			default: file => file.type.startsWith("image")
		}
	},

	data() {
		return {
			// flow.js
			flow: undefined,
			dataUris: {}
		};
	},

	computed: {
		compiled() {
			let compiled = render(this.value, this.renderOptions, this.renderConfig);

			// Preview uploaded images
			if (this.files) {
				for (const file of this.files)
					if (this.dataUris[file.name])
						compiled = compiled.replace(
							`src="${file.name}"`,
							`src="${this.dataUris[file.name]}"`
						);
			}

			console.log("render");

			return compiled;
		},
		config() {
			return mergeConfig(this.renderConfig);
		},
		options() {
			return mergeOptions(this.renderOptions);
		},
		hideDetails() {
			return !Boolean(this.hint);
		},
		files() {
			return this.flow && this.flow.files;
		}
	},

	watch: {
		compiled() {
			if (this.options.mermaid) {
				console.log("yes");
				this.renderMermaid();
			}
		}
	},

	mounted() {
		if (this.image) {
			this.flow = new Flow({
				target: this.fileTarget
			});
			this.flow.assignBrowse(this.$refs.toolbar.$refs["md-image"].$el);
			this.flow.assignDrop(this.$refs["md-editor"].$el);

			this.flow.on("fileAdded", file => {
				this.$emit("fileAdded", file.file);
				// Use filter to allow specific files
				const accepted = this.fileFilter(file.file);
				if (accepted) {
					// Use empty string to take the place
					this.$set(this.dataUris, file.name, "");
					// Generate datauri
					const reader = new FileReader();
					reader.addEventListener(
						"load",
						() => {
							// Prevent that image has been deleted
							if (this.dataUris.hasOwnProperty(file.name))
								this.$set(this.dataUris, file.name, reader.result);
						},
						false
					);
					reader.readAsDataURL(file.file);
				}
				return accepted;
			});

			this.flow.on("fileRemoved", file => {
				// Remove dataUri
				this.$delete(this.dataUris, file.name);
			});

			this.flow.on("error", message => {
				throw new Error(message);
			});
		}

		if (this.config.mermaid) {
			mermaid.initialize(this.config.mermaid);
		}
	},

	methods: {
		// Async rendering
		renderMermaid() {
			if (this.options.mermaid) {
				if (mermaidTimeout) clearTimeout(mermaidTimeout);
				mermaidTimeout = setTimeout(() => {
					new Promise((resolve, reject) => {
						try {
							mermaid.init();
						} catch (err) {
							console.log(err);
						}
						resolve();
					});
					mermaidTimeout = null;
				}, 300);
			}
		},

		// Provide a function to focus on the textarea
		focus() {
			this.$refs.textarea.focus();
		},

		// start or resume uploading all images
		upload() {
			this.flow.upload();
		},

		// pause uploading
		pause() {
			this.flow.pause();
		},

		// resume uploading
		resume() {
			this.flow.resume();
		},

		removeFile(file) {
			this.flow.removeFile(file);
		},

		insertEmoji(emoji) {
			this.insertText(emoji.native);
		},

		insertText(text) {
			// Get the element of textarea
			const textarea = this.$refs.textarea.$refs["input"];

			const startPos = textarea.selectionStart;
			const endPos = textarea.selectionEnd;

			// Insert to the selection area
			this.$emit(
				"input",
				textarea.value.substring(0, startPos) +
					text +
					textarea.value.substring(endPos)
			);

			// Focus
			textarea.focus();

			// Update cursor after the data updated
			this.$nextTick(() => {
				textarea.selectionEnd = startPos + text.length;
			});
		}
	}
};
</script>
