<template>
  <div id="app">
    <Editor outlineColor="rgba(0, 0, 0, 0.54)" :outline="true" :preview="true" v-model="text" />
  </div>
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
  }
};
</script>

