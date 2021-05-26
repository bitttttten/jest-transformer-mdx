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

function parseFrontMatter(src, frontMatterName = "frontMatterName") {
	const { content, data } = matter(src)

	return `export const ${frontMatterName} = ${stringifyObject(data)};

${content}`
}

function resolveOptions(config) {
	if (config.transformerConfig?.mdxOptions) {
		return config.transformerConfig.mdxOptions
	}

	let options = {}

	for (let i = 0; i < config.transform.length; i++) {
		if (new RegExp(config.transform[i][0]).test(filename)) {
			options = config.transform[i][2]
		}
	}

	return options
}

async function createTransformer(src, filepath, config) {
	const options = resolveOptions(config)
	const mdxOptions = resolveMdxOptions(options?.mdxOptions)

	const withFrontMatter = parseFrontMatter(src, options?.frontMatterName)

	const jsx = await mdx(withFrontMatter, { ...mdxOptions, filepath })

	const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`

	return babelJest.process(toTransform, filepath, config).code
}

module.exports = {
	processAsync: createTransformer,
}
