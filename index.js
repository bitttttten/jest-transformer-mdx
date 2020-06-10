'use strict'

const matter = require('gray-matter')
const stringifyObject = require('stringify-object')
const mdx = require('@mdx-js/mdx')
const { process } = require('babel-jest')

function parseFrontMatter(src, options) {
    const { content, data } = matter(src)
    const { frontMatterName } = options

    return `export const ${frontMatterName ? frontMatterName : "frontMatter"} = ${stringifyObject(
        data,
    )};

${content}`
}

function createTransformer(src, filename, config, transformOptions) {
    let options = {}

    for (let i = 0; i < config.transform.length; i++) {
        if (new RegExp(config.transform[i][0]).test(filename)) {
            options = config.transform[i][2]
        }
    }

    const withFrontMatter = parseFrontMatter(src, options)
    const jsx = mdx.sync(withFrontMatter)
    const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`
    return process(toTransform, filename, config, transformOptions).code
}

module.exports = {
    process: createTransformer,
}
