# Test

This is a test markdown.

## Code

Code block:

```js
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
    // Dark theme
    //this.$vuetify.theme.dark = true;
  }
};
```

Inline code: `int b = 3`

## Math

Formula block:

\\[ \sum_{n=0}^\infty \frac{1}{n!}x^n = e^x  \\]

Inline formula: \\( y = e^x \\)

## Image

![Test](test.png)
