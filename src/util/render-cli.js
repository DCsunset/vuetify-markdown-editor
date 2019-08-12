#!/usr/bin/env node

const marked = require('marked');
const hljs = require('highlight.js');

/* Markdown renderer */

// Create your custom renderer.
const markedRenderer = new marked.Renderer();
markedRenderer.code = (code, language) => {
	// Check whether the given language is valid for highlight.js.
	const validLang = !!(language && hljs.getLanguage(language));
	// Highlight only if the language is valid.
	const highlighted = validLang ? hljs.highlight(language, code).value : code;
	// Render the highlighted code with `hljs` class.
	return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

// Set the renderer to marked.
marked.setOptions({
	renderer: markedRenderer,
	sanitize: true
});


/* Katex renderer */
const katex = require('katex');

// Escape special characters
function regexEscape(text)
{
	return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function renderMath(text, options)
{
	// [\s\S] match all characters including \n
	for(const delimiter of options.delimiters)
	{
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
				left: '\\[',
				right: '\\]',
				options: {
					displayMode: true // Inline or block
				}
			},
			{
				left: '\\(',
				right: '\\)',
				options: {
					displayMode: false // Inline or block
				}
			}
		]
	}
};

const render = (text, options = {}) => {
	// Default value
	Object.assign(options, defaultOptions);

	text = text || '';
	return renderMath(marked(text), options.katex);
};


// Parse command and render

const fs = require('fs');
const args = process.argv.slice(2);

const help = `
Usage: render-cli infile.md [outfile.html]

    -h, --help    Print this help message
`;

if(args.length == 0)
{
	console.log(help);
	process.exit(1);
}
if(args.includes('-h') || args.includes('--help'))
{
	console.log(help);
	process.exit(0);
}

const data = fs.readFileSync(args[0], encoding='utf-8');
const renderedData = render(data);

if(args.length < 2)
{
	console.log(renderedData);
}
else
{
	fs.writeFileSync(args[1], renderedData, encoding='utf8');
}
