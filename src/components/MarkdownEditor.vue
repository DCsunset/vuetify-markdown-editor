<template>
	<v-container class="md" fluid>
		<v-row>
			<!-- Editor -->
			<v-col
				cols="12"
				v-if="mode !== 'viewer'"
				:md="mode === 'preview' ? 6 : 12"
				class="pa-3"
			>
				<v-card :outlined="outline" ref="md-editor">
					<!-- Toolbar's style "transform: translateY(0)" will influence the z-index, so use "z-index: 1" on toolbar-->
					<v-toolbar
						:style="{ position: 'relative', 'z-index': 1 }"
						height="48px"
						flat
					>
						<v-hover v-if="emoji">
							<!-- Must use click.stop to prevent v-click-outside event -->
							<v-icon
								class="mr-2"
								slot-scope="{ hover }"
								:color="hover || emojiPicker ? color : undefined"
								title="Emoji"
								@click.stop="emojiPicker = !emojiPicker"
							>
								mdi-emoticon-outline
							</v-icon>
						</v-hover>

						<v-hover v-if="image">
							<!-- Must use click.stop to prevent v-click-outside event -->
							<v-icon
								ref="md-image"
								slot-scope="{ hover }"
								class="mr-2"
								:color="hover ? color : undefined"
								title="Image"
								@click.stop=""
							>
								mdi-image-outline
							</v-icon>
						</v-hover>

						<picker
							v-show="emojiPicker"
							v-click-outside="() => (this.emojiPicker = false)"
							:data="emojiIndex"
							title="Pick an emoji..."
							emoji="smiley"
							:native="nativeEmoji"
							:set="emojiSet"
							:style="{ position: 'absolute', top: '40px' }"
							@select="selectEmoji"
						/>
					</v-toolbar>

					<v-divider />
					<template v-if="image">
						<image-status :files="files" @remove="removeFile" />
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
			</v-col>

			<!-- Preview -->
			<v-col
				class="pa-3"
				v-if="mode !== 'editor'"
				v-show="compiled"
				cols="12"
				:md="mode === 'preview' ? 6 : 12"
			>
				<div>
					<div
						class="subheading text--primary markdown-text"
						v-html="compiled"
					/>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
/* Remove border-radius */
.v-textarea >>> .v-input__control > .v-input__slot {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>

<script>
import {
	VContainer,
	VRow,
	VCol,
	VCard,
	VToolbar,
	VDivider,
	VIcon,
	VTextarea,
	VHover
} from 'vuetify/lib';
import Flow from "@flowjs/flow.js/dist/flow.min.js";
import emojiData from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";
import vClickOutside from "v-click-outside";
import mermaid from "mermaid";
import md5 from "crypto-js/md5";
import createRenderer from "../util/render";
import ImageStatus from "./FileStatus.vue";
import Vue from 'vue';
import _ from 'lodash';
import { defaultConfig } from '@/util/config';

// CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
import "../style.css";

// Not watched variables
let mermaidTimeout = null;
// Cache to accelerate rendering
const cache = {
	mermaid: {}
};

let renderer;

export default {
	components: {
		VContainer,
		VRow,
		VCol,
		VCard,
		VToolbar,
		VDivider,
		VIcon,
		VTextarea,
		VHover,
		Picker,
		ImageStatus
	},
	directives: {
		clickOutside: vClickOutside.directive
	},
	props: {
		value: {
			type: String,
			default: ""
		},
		renderConfig: {
			type: Object,
			default: undefined
		},
		mode: {
			type: String,
			default: "preview"
		},
		outline: {
			type: Boolean,
			default: false
		},
		// Outline and icon default color
		color: {
			type: String,
			default: "blue"
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
		// Emoji set
		emojiSet: {
			type: String,
			default: "apple"
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
		},
		baseUrl: {
			type: String,
			default: '/'
		}
	},

	data() {
		return {
			// flow.js
			flow: undefined,
			dataUris: {},
			emojiPicker: false,
			emojiIndex: new EmojiIndex(emojiData)
		};
	},

	computed: {
		compiled() {
			let compiled = renderer.render(
				this.value
				/*
				cache
				*/
			);

			// Preview uploaded images
			if (this.files) {
				for (const file of this.files)
					if (this.dataUris[file.name])
						compiled = compiled.replace(
							`src="${file.name}"`,
							`src="${this.dataUris[file.name]}"`
						);
			}
			
			// Replace image names with baseUrl
			compiled = compiled.replace(
				/src="([^/]+)"/g,
				(match, p1) => `src="${this.baseUrl}${p1}"`
			);

			return compiled;
		},
		hideDetails() {
			return !Boolean(this.hint);
		},
		files() {
			return this.flow && this.flow.files;
		}
	},

	watch: {
		renderConfig: {
			immediate: true,
			handler() {
				const config = _.merge(_.clone(defaultConfig), this.renderConfig);
				renderer = createRenderer(config);
				if (config.mermaid) {
					mermaid.initialize(config.mermaid);
				}
			}
		},
		compiled: {
			immediate: true,
			async handler() {
				// Wait until rendered
				await this.$nextTick();
				this.renderMermaid();
			}
		}
	},

	mounted() {
		if (this.mode !== 'viewer' && this.image) {
			this.flow = new Flow({
				target: this.fileTarget
			});
			this.flow.assignBrowse(this.$refs["md-image"].$el);
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
	},

	methods: {
		async renderMermaid() {
			if (mermaidTimeout) clearTimeout(mermaidTimeout);

			// Try cache first
			let els = document.getElementsByClassName("mermaid");
			const uncached = [];
			for (let i = 0; i < els.length; ++i) {
				const hash = md5(els[i].textContent.trim()).toString();
				if (cache.mermaid[hash]) {
					els[i].innerHTML = cache.mermaid[hash];
					// To prevent from rendering it again
					els[i].className = 'mermaid-cached';

					// This el has been **removed** from els
					--i;
					continue;
				}
				// Record the index for caching later
				uncached.push(hash);
			}

			if (uncached.length) 
				mermaidTimeout = setTimeout(() => {
					try {
						mermaid.init();
						// Update cache
						els = document.getElementsByClassName("mermaid");
						for (let i = 0; i < els.length; ++i) {
							if (uncached[i])
								cache.mermaid[uncached[i]] = els[i].innerHTML;
						}
					} catch (err) {}
					mermaidTimeout = null;
				}, 300);
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

		selectEmoji(emoji) {
			// Close
			this.emojiPicker = false;
			this.insertEmoji(emoji);
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
