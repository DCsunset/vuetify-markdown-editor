import Vue from 'vue'

export declare function Renderer(
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
): string

export declare class Editor extends Vue { }
