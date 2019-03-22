import MarkdownEditor from './components/MarkdownEditor.vue';
import marked from './util/marked.js';

export default {
	Editor: MarkdownEditor,
	Renderer: marked
};
