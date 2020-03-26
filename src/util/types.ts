export type Config = {
	katex: {
		delimiters: {
			left: string;
			right: string;
			options: {
				displayMode: boolean
			}
		}[]
	};
	hooks?: {
		code?: (code: string, language: string) => void;
	};
};

export type Options = {
	katex?: boolean;
	mermaid?: boolean;
	inline?: boolean;
	copyIcon?: boolean;
};

export type Cache = {
	mermaid?: {
		[key: string]: string
	}
};
