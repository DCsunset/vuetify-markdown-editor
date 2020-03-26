import { Options, Config } from './types';

const defaultConfig: Config = {
	katex: {
		delimiters: [
			{
				left: '$$',
				right: '$$',
				options: {
					displayMode: true // block
				}
			},
			{
				left: '\\[',
				right: '\\]',
				options: {
					displayMode: true // block
				}
			},
			{
				left: '$',
				right: '$',
				options: {
					displayMode: false // inline
				}
			},
			{
				left: '\\(',
				right: '\\)',
				options: {
					displayMode: false // inline
				}
			}
		]
	}
};

const defaultOptions: Options = {
	katex: true,
	mermaid: true,
	inline: false
};

export function mergeOptions(customOptions: Options) {
	const options = Object.assign({}, defaultOptions);
	return Object.assign(options, customOptions);
}

export function mergeConfig(customConfig: Config) {
	const config = Object.assign({}, defaultConfig);
	return Object.assign(config, customConfig);
}