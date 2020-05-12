import Vue from 'vue'
import MarkdownIt from 'markdown-it';

export declare function createRenderer(
	text: string,
	customOptions?: {
		katex?: boolean,
		mermaid?: boolean,
		inline?: boolean
	},
	customConfig?: {
		katex?: any,
		mermaid?: any
	},
	renderCache?: any
): MarkdownIt

export declare class Editor extends Vue { }
