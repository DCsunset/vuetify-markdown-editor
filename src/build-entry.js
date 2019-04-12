import MarkdownEditor from './components/MarkdownEditor.vue';
import Toolbar from './components/Toolbar.vue';
import marked from './util/marked.js';

// Named export
export {
	MarkdownEditor as Editor,
	Toolbar as Toolbar,
	marked as Renderer
};

// Default export
export default {
	Editor: MarkdownEditor,
	Toolbar,
	Renderer: marked
};
