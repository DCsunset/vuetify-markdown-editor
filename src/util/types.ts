export type Config = {
	katex: {
		delimiters: {
			left: string;
			right: string;
			options: {
				displayMode: boolean
			}
		}[]
	},
	code?: {
		hook?: (code: string, language: string) => void;
	}
};

export type Options = {
	katex?: boolean;
	mermaid?: boolean;
	inline?: boolean;
};

export type Cache = {
	mermaid?: {
		[key: string]: string
	}
};
