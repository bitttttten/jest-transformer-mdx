# jest-transformer-mdx

[![Github release version](https://img.shields.io/github/tag/bitttttten/jest-transformer-mdx.svg)](https://github.com/bitttttten/jest-transformer-mdx/releases)
[![Commits since release](https://img.shields.io/github/commits-since/bitttttten/jest-transformer-mdx/v1.0.2.svg)](https://github.com/bitttttten/jest-transformer-mdx/compare/v1.0.2...master)
[![npm release version](https://img.shields.io/npm/v/jest-transformer-mdx.svg)](https://www.npmjs.com/package/jest-transformer-mdx)

## Introduction

A simple jest transformer for [MDX](https://mdxjs.com/) with [frontMatter](https://github.com/c8r/x0/blob/master/lib/mdx-fm-loader.js) support.

## Instructions

### Install

`yarn add jest-transformer-mdx`

### Add to your jest config

```js
// jest.config.js
module.exports = {
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(md|mdx)$": 'jest-transformer-mdx',
  },
};
```

And that should be it!

### Example

Look inside [this library's test](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.suite-a.js) and the related [markdown file](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.md) to see live a example.

## Options

In order to override the template or the config, [as raised in this issue](https://github.com/bitttttten/jest-transformer-mdx/issues/1), you should configure the `transform` option in your jest file to point to a local file. In this file you will import a function to setup the module, and then re-export the jest transformer which is exported as `process`.

Prefer real examples? [Look no more](#example-1).

```js
// jest.config.js
module.exports = {
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(md|mdx)$": path.resolve(__dirname, "jest-transformer-mdx.js")
  },
};
```

```js
// jest-transformer-mdx.js
const { config, process: createTransformer } = require("jest-transformer-mdx")

config({
  babelOptions: {
    presets: [require("@babel/preset-env")],
    plugins: [
      [
        "@babel/plugin-transform-react-jsx",
        {
          pragma: "h",
          throwIfNamespace: false
        }
      ]
    ],
    babelrc: false,
    configFile: false,
    filename: "null"
  },
  transformer: jsx => `import { h as mdx } from 'preact';${jsx}`
});

module.exports = {
	process: createTransformer,
}
```

### API

#### mdxOptions

This will be the options object passed into babel.

#### babelOptions

This will be the options object passed into babel.

#### transform

This is a callback that is passed the output as a string from parsing the raw md by mdx-js. This will run before the code gets passed into babel. By default, this is where we inject the import for the mdx pragma.

### Example

[This jest config](./jest.config.suite-b.js), and [this jest-transformer-mdx](./jest-transformer-mdx.suite-b.js) illustrate how to setup the transform for preact.

## Credits

Made possible by

<a href="https://soulpicks.com" target="_blank"><img src="https://avatars0.githubusercontent.com/u/37078572?s=200&v=4" width="64" height="64"></a>
