# vuetify-markdown-editor

## Install 

```
npm install vuetify-markdown-editor
```

## Usage

This package can only be used in Module:

```html
<template>
  <Editor v-model="text" />
</template>
```

```js
<script>
import { Editor, Renderer, Toolbar } from 'vuetify-markdown-editor';

// CSS for Editor
import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css';

/* Editor is a Vue component
 * Renderer is the internal rendering function
 * Toolbar is a Vue component used for some WYSIWYG functions
 */

export default {
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
```

## Screenshot

![Screenshot](Screenshot.png)

## Dependencies

* [marked](https://github.com/markedjs/marked)
* [highlight.js](https://github.com/highlightjs/highlight.js)
* [vuetify](https://github.com/vuetifyjs/vuetify)

## License

MIT License

