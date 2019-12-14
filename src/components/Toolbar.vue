<template>
	<div>
		<picker
			v-show="emojiPicker"
			v-click-outside="() => (this.emojiPicker = false)"
			:data="emojiIndex"
			title="Pick an emoji..."
			emoji="smiley"
			:native="nativeEmoji"
			:style="{ position: 'absolute' }"
			@select="select"
		/>

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
	</div>
</template>

<script>
import emojiData from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";
import vClickOutside from "v-click-outside";
// CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";

export default {
	props: {
		// Icon color
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
		// Enable image upload
		image: {
			type: Boolean,
			default: true
		}
	},

	components: {
		Picker
	},

	directives: {
		clickOutside: vClickOutside.directive
	},

	data() {
		return {
			emojiPicker: false,
			emojiIndex: new EmojiIndex(emojiData)
		};
	},

	methods: {
		select(emoji) {
			this.$emit("emoji", emoji);
			// Close
			this.emojiPicker = false;
		}
	}
};
</script>
