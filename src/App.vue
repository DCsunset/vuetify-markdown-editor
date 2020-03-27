<template>
	<v-app>
		<Editor
			mode="viewer"
			ref="editor"
			hint="Test"
			:outline="false"
			:render-config="renderConfig"
			:render-options="renderOptions"
			v-model="text"
		/>
	</v-app>
</template>

<script>
import { Editor } from "./build-entry.js";

export default {
	name: "app",
	components: {
		Editor
	},
	data() {
		return {
			text: "```cpp\nint a=1;\n```",
			renderConfig: {
				mermaid: {
					theme: "dark"
				}
			},
			renderOptions: {
				copyIcon: true
			}
		};
	},
	mounted() {
		// Access properties or methods using $refs
		// this.$refs.editor.focus();
		// this.$refs.editor.upload();

		// Dark theme
		this.$vuetify.theme.dark = true;
	}
};
</script>
