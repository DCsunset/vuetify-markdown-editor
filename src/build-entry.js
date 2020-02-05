import MarkdownEditor from './components/MarkdownEditor.vue';
import render from './util/render.js';

// Named export
export {
	MarkdownEditor as Editor,
	render as Renderer
};

// Default export
export default {
	Editor: MarkdownEditor,
	Renderer: render
};
