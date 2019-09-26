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
module.exports = {
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(md|mdx)$": 'jest-transformer-mdx',
  },
};
```

And that should be it!

### Example

Look inside [this library's test](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.js) and the related [markdown file](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.md) to see live a example.

## Options

In order to override the template or the config, [as raised in this issue](https://github.com/bitttttten/jest-transformer-mdx/issues/1), you should configure this module in one of your setupFiles from jest.

### Example

[This test suite setupFile](./setupFile.suite-b.js) illustrates how to setup the transform for preact.

### API

#### mdxOptions

This will be the options object passed into babel.

#### babelOptions

This will be the options object passed into babel.

#### transform

This is a callback that is passed the output from parsing the md file by mdx-js. This callback runs before the code gets passed into babel. By default, this is where we inject the import for the mdx pragma.

## Credits

Made possible by

<a href="https://soulpicks.com" target="_blank"><img src="https://avatars0.githubusercontent.com/u/37078572?s=200&v=4" width="64" height="64"></a>
