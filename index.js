"use strict"

const path = require("path")
const matter = require("gray-matter")
const stringifyObject = require("stringify-object")
const mdx = require("@mdx-js/mdx")
const babelJest = require("babel-jest")

async function processAsync(src, filepath, config) {
	const options = resolveOptions(config)
	const mdxOptions = resolveMdxOptions(options?.mdxOptions)

	const withFrontMatter = parseFrontMatter(src, options?.frontMatterName)

	const jsx = await mdx(withFrontMatter, { ...mdxOptions, filepath })

	const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`

	// supports babel-jest@27 (which exports with .default) and older versions
	// see: https://github.com/bitttttten/jest-transformer-mdx/issues/22
	const babelProcess = babelJest.default?.process ?? babelJest.process
	return babelProcess(toTransform, filepath, config).code
}

// we support either a path to a file, or the options itself
// see: https://github.com/bitttttten/jest-transformer-mdx/pull/20
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

// this helper resolves both jest 27, and versions of jest below 27
// as the way that transformer config is picked up has changed
// see: https://github.com/bitttttten/jest-transformer-mdx/issues/22
function resolveOptions(config) {
	if (config?.transformerConfig) {
		return config.transformerConfig
	}

	if (config?.transform && Array.isArray(config.transform)) {
		for (let i = 0; i < config.transform.length; i++) {
			if (new RegExp(config.transform[i][0]).test(filename)) {
				return config.transform[i][2]
			}
		}
	}

	return {}
}

module.exports = {
	process: processAsync,
}
