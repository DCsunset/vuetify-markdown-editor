const defaultConfig = {
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

const defaultOptions = {
	katex: true,
	mermaid: true
};

export function mergeOptions(customOptions) {
	const options = Object.assign({}, defaultOptions);
	return Object.assign(options, customOptions);
}

export function mergeConfig(customConfig) {
	const config = Object.assign({}, defaultConfig);
	return Object.assign(config, customConfig);
}