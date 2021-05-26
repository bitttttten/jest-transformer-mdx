"use strict"

const matter = require("gray-matter")
const stringifyObject = require("stringify-object")
const mdx = require("@mdx-js/mdx")
const { process } = require("babel-jest").default

function parseFrontMatter(src, options = {}) {
	const { content, data } = matter(src)
	const frontMatterName = options.frontMatterName || "frontMatter"

	return `export const ${frontMatterName} = ${stringifyObject(data)};

${content}`
}

function createTransformer(src, filename, config) {
	const withFrontMatter = parseFrontMatter(src, config.transformerConfig)
	const jsx = mdx.sync(withFrontMatter)
	const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`

	return process(toTransform, filename, config).code
}

module.exports = {
	process: createTransformer,
}
