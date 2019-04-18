<template>
  <v-app>
    <Editor ref="editor" :outline="true" :preview="true" v-model="text" />
  </v-app>
</template>

<script>
import { Editor } from './build-entry.js';

export default {
  name: 'app',
  components: {
    Editor
  },
  data() {
    return {
      text: ''
    };
  },
  mounted() {
    this.$refs.editor.focus();
  }
};
</script>
