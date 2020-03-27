<template>
	<v-app>
		<Editor
			mode="Rendered"
			ref="editor"
			hint="Test"
			:outline="false"
			:preview="true"
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
			text: "",
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
		this.$refs.editor.focus();
		// this.$refs.editor.upload();

		// Dark theme
		this.$vuetify.theme.dark = true;
	}
};
</script>
