import _ from 'lodash';
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
	inline: false,
	copyIcon: false
};

export function mergeOptions(customOptions: Options) {
	const options = _.clone(defaultOptions);
	return _.merge(options, customOptions);
}

export function mergeConfig(customConfig: Config) {
	const config = _.clone(defaultConfig);
	return _.merge(config, customConfig);
}