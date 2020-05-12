export type Config = {
	texmath?: any;
	highlightjs?: any;
	codeCopy?: any;
};

export type Options = {
	texmath?: boolean;
	codeCopy?: boolean;
}

export type Cache = {
	mermaid?: {
		[key: string]: string
	}
};
