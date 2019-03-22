import MarkdownEditor from './components/MarkdownEditor.vue';
import marked from './util/marked.js';

// Named export
export {
	MarkdownEditor as Editor,
	marked as Renderer
};

// Default export
export default {
	Editor: MarkdownEditor,
	Renderer: marked
};
