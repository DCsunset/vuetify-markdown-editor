import MarkdownEditor from './components/MarkdownEditor.vue';
import Toolbar from './components/Toolbar.vue';
import render from './util/render.js';

// Named export
export {
	MarkdownEditor as Editor,
	Toolbar as Toolbar,
	render as Renderer
};

// Default export
export default {
	Editor: MarkdownEditor,
	Toolbar,
	Renderer: render
};
