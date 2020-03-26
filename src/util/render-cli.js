#!/usr/bin/env node

const marked = require('marked');
const hljs = require('highlight.js');
const lodash = require('lodash');

/* Markdown renderer */
let options = {};

// Create your custom renderer.
const markedRenderer = new marked.Renderer();

markedRenderer.paragraph = text => {
	if (options.inline) {
		return text + '\n';
	}
	else
		return '<p>' + text + '</p>\n';
};

markedRenderer.code = (code, language) => {
	// For meraid
	if (options.mermaid && language === 'mermaid') {
		return `<div class="mermaid">${code}</div>`;
	}

	// Check whether the given language is valid for highlight.js.
	const validLang = !!(language && hljs.getLanguage(language));
	// Highlight only if the language is valid.
	const highlighted = validLang ? hljs.highlight(language, code).value : code;
	// Render the highlighted code with `hljs` class.
	return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

// Set the renderer to marked.
marked.setOptions({
	renderer: markedRenderer
});


/* Katex renderer */
const katex = require('katex');

// Escape special characters
function regexEscape(text) {
	return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function renderMath(text, options) {
	// [\s\S] match all characters including \n
	for (const delimiter of options.delimiters) {
		// s flag allows '.' to match newline
		const left = regexEscape(delimiter.left);
		const right = regexEscape(delimiter.right);

		const re = new RegExp(`${left}(.*?)${right}`, 'gs');
		text = text.replace(re, (match, p1) => {
			return katex.renderToString(p1, delimiter.options);
		});
	}
	return text;
}

const defaultOptions = {
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

const render = (text, customOptions = {}) => {
	// Default value
	options = _.merge(defaultOptions, customOptions);

	text = text || '';
	return renderMath(marked(text), options.katex);
};


// Parse command and render

const fs = require('fs');
const argv = require('yargs')
	.usage('Usage: $0 <input.md> [options]')
	.help('h')
	.demandCommand(1)
	.boolean('inline')
	.describe('inline', 'Render inline markdown')
	.string('out')
	.describe('out', 'Output html file')
	.alias('i', 'inline')
	.alias('o', 'out')
	.alias('h', 'help')
	.alias('v', 'version')
	.argv;

const data = fs.readFileSync(argv._[0], encoding = 'utf-8');
const renderedData = render(data, {
	inline: argv.inline
});

if (!argv.out) {
	console.log(renderedData);
}
else {
	fs.writeFileSync(argv.out, renderedData, encoding = 'utf8');
}
