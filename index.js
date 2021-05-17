'use strict'

const path = require("path")
const matter = require('gray-matter')
const stringifyObject = require('stringify-object')
const mdx = require('@mdx-js/mdx')
const { process: babelJestProcess } = require('babel-jest')

function parseFrontMatter(src, options = {}) {
    const { content, data } = matter(src)
    const frontMatterName = options.frontMatterName || "frontMatter"

    return `export const ${frontMatterName} = ${stringifyObject(
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

    let mdxOptions = {}
    if(options.mdxOptions) {
        mdxOptions = require(path.resolve(process.cwd(), options.mdxOptions))
    }
    const withFrontMatter = parseFrontMatter(src, options)
    const jsx = mdx.sync(withFrontMatter, {...mdxOptions, filepath: filename})
    const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`
    return babelJestProcess(toTransform, filename, config, transformOptions).code
}

module.exports = {
    process: createTransformer,
}
