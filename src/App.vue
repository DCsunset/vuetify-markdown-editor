<template>
  <v-app>
    <Editor
      mode="preview"
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
