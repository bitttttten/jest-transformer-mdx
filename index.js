"use strict"

const path = require("path")
const matter = require("gray-matter")
const stringifyObject = require("stringify-object")
const mdx = require("@mdx-js/mdx")
const babelJest = require("babel-jest").default

function resolveMdxOptions(src) {
	if (typeof src === "string") {
		return require(path.resolve(process.cwd(), src))
	}
	return src
}

function parseFrontMatter(src, options = {}) {
	const { content, data } = matter(src)
	const frontMatterName = options.frontMatterName || "frontMatter"

	return `export const ${frontMatterName} = ${stringifyObject(data)};

${content}`
}

async function createTransformer(src, filepath, config) {
	const withFrontMatter = parseFrontMatter(src, config.transformerConfig)
	const mdxOptions = resolveMdxOptions(config.transformerConfig?.mdxOptions)
	const jsx = await mdx(withFrontMatter, { ...mdxOptions, filepath })
	const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`

	return babelJest.process(toTransform, filepath, config).code
}

module.exports = {
	processAsync: createTransformer,
}
