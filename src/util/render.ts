import md5 from 'crypto-js/md5';
import 'highlight.js/styles/tomorrow-night.css';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Config, Cache } from './types';

function createRenderer(config: Config = {}) {
	const renderer = new MarkdownIt()
		.use(require('markdown-it-texmath'), {
			engine: katex,
			...config.texmath
		})
		.use(require('markdown-it-mermaid-plugin'))
		.use(require('markdown-it-highlightjs'), {
			...config.highlightjs
		})
		.use(require('markdown-it-code-copy'), {
			...config.codeCopy
		});
	return renderer;
}

export default createRenderer;
