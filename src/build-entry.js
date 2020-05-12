import MarkdownEditor from './components/MarkdownEditor.vue';
import createRenderer from './util/render';

// Named export
export {
	MarkdownEditor as Editor,
	createRenderer
};

// Default export
export default {
	Editor: MarkdownEditor,
	createRenderer
};
