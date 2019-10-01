'use strict'

const matter = require('gray-matter')
const stringifyObject = require('stringify-object')
const mdx = require('@mdx-js/mdx')
const babel = require('@babel/core')

function parseFrontMatter(src) {
    const { content, data } = matter(src)

    return `export const frontMatter = ${stringifyObject(
        data,
    )};
    
${content}`
}

function createTransformer(src) {
    const withFrontMatter = parseFrontMatter(src)
    const jsx = mdx.sync(withFrontMatter)
    const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`

    return babel.transform(toTransform, {
        presets: [require.resolve('babel-preset-react-app')],
        babelrc: false,
        configFile: false,
        filename: 'null',
    }).code
}

module.exports = {
    process: createTransformer,
}
