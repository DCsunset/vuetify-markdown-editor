<template>
  <Editor ref="editor" nativeEmoji outline :preview="true" v-model="text" />
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
