<template>
  <div id="app">
    <MarkdownEditor v-model="text" />
  </div>
</template>

<script>
import MarkdownEditor from 'vuetify-markdown-editor'

export default {
  name: 'app',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      text: ''
    };
  }
}
</script>

