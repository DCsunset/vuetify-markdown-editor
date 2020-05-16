<template>
  <v-app>
    <Editor
      mode="preview"
      ref="editor"
      hint="Hint"
      :outline="false"
      :render-config="renderConfig"
      v-model="text"
    />
  </v-app>
</template>

<script>
import { Editor } from "./build-entry.js";
import { VApp } from 'vuetify/lib';

export default {
  name: "app",
  components: {
    Editor,
    VApp
  },
  data() {
    return {
      text: "",
      renderConfig: {
        // Mermaid config
        mermaid: {
          theme: "dark"
        }
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
