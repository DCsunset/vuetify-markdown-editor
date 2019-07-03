# vuetify-markdown-editor

[![npm](https://img.shields.io/npm/v/vuetify-markdown-editor.svg)](https://www.npmjs.com/package/vuetify-markdown-editor)
[![npm](https://img.shields.io/npm/dw/vuetify-markdown-editor.svg)](https://www.npmjs.com/package/vuetify-markdown-editor)
[![GitHub](https://img.shields.io/github/license/DCsunset/vuetify-markdown-editor.svg?color=blue)](https://github.com/DCsunset/vuetify-markdown-editor/blob/master/LICENSE)

A Vue.js Component for editing and previewing markdown using Vuetify.js and command line rendering utility.

## Install 

```
npm install vuetify-markdown-editor
```

Since this component is based on Vuetify,
it is also required to import css from Vuetfiy and Material Design Icons.
Simply add the following lines to `index.html`:

```html
<link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
```

Or you can use npm to install Vuetify or Material Design Icons and import the corresponding css from local files.


## Command line utility

This package also provides a command line utility to render markdown files.

Install globally:

```
npm install -g vuetify-markdown-editor
```

Usage:

```
render-cli infile.md [outfile.html]
```

To use the rendered html,
remember to add css files for Katex and highlight.js:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css" integrity="sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css">
```

## Features

* Solo and inline mode
* Editor-only and Editor-Preview mode
* Code highlighting
* Emoji picking
* Math formula (using `$` and `$$`)
* (TODO) Image uploading

## Usage

This package can be used in Node.js module:

```html
<template>
  <Editor ref="editor" :outline="true" :preview="true" v-model="text" />
</template>
```

```js
<script>
import { Editor } from 'vuetify-markdown-editor';

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
```

## Props

| Prop        | Default      | Description                                                     |
|-------------|--------------|-----------------------------------------------------------------|
| value       | `''`         | String that binds to the textarea                               |
| mode        | `'Rendered'` | When set to 'Source', the preview will display html source code |
| outline     | `false`      | The border will be outlined instead of card style               |
| color       | `undefined`  | The outline and icon's color                                    |
| preview     | `true`       | Add the responsive preview                                      |
| nativeEmoji | `false`      | Use native emoji instead of pictures                            |
| hint        | `''`         | Add description at the bottom                                   |


## Test

Clone this repository,
and then run:

```
npm install
npm run serve
```

Then open <http://localhost:8080> in browser to test.


## Screenshot

Solo mode: `<Editor v-model="text" />`
![Screenshot](Screenshot.png)

Outline mode: `<Editor outline v-model="text" />`
![Screenshot-Outline](Screenshot-Outline.png)

Emoji:
![Screenshot-Emoji](Screenshot-Emoji.png)


## Dependencies

* [KaTex](https://github.com/KaTeX/KaTeX)
* [marked](https://github.com/markedjs/marked)
* [highlight.js](https://github.com/highlightjs/highlight.js)
* [Vuetify](https://github.com/vuetifyjs/vuetify)
* [emoji-mart-vue](https://github.com/serebrov/emoji-mart-vue)
* [v-click-outside](https://github.com/ndelvalle/v-click-outside)

## License

MIT License

