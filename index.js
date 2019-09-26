'use strict'

const matter = require('gray-matter')
const stringifyObject = require('stringify-object')
const mdx = require('@mdx-js/mdx')
const babel = require('@babel/core')

let babelOptions
let transformer
let mdxOptions

function config(props) {
	console.log('setting config')
	babelOptions = props.babelOptions
	mdxOptions = props.babelOptions
	transformer = props.transformer
}

function parseFrontMatter(src) {
  const { content, data } = matter(src);

  const code = `export const frontMatter = ${stringifyObject(data)}
  
${content}`;

  return code;
}

function createTransformer(src) {
    const withFrontMatter = parseFrontMatter(src)
	const jsx = mdx.sync(withFrontMatter, mdxOptions || {})

	const codeOptions = babelOptions || {
		presets: [require.resolve('babel-preset-react-app')],
		babelrc: false,
		configFile: false,
		filename: 'null',
	}
	const preBabelTransformer = transformer || (jsx => `import {mdx} from '@mdx-js/react';${jsx}`)

	const babelRes = babel.transform(preBabelTransformer(jsx), codeOptions).code

	return babelRes
}

module.exports = {
	process: createTransformer,
	config: config,
}
