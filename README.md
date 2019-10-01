# jest-transformer-mdx

[![Github release version](https://img.shields.io/github/tag/bitttttten/jest-transformer-mdx.svg)](https://github.com/bitttttten/jest-transformer-mdx/releases)
[![Commits since release](https://img.shields.io/github/commits-since/bitttttten/jest-transformer-mdx/v2.1.0.svg)](https://github.com/bitttttten/jest-transformer-mdx/compare/v2.1.0...master)
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

And that should be it! `jest-transformer-mdx` will pick up your babel config and use your jest config.

### Example

Look inside [this library's test](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.js) and the related [markdown file](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.md) to see live a example.

### create-react-app & configless

You can also use this module in `create-react-app`-like apps where the config is not exposed. Just edit your transform property to import from `jest-transformer-mdx/cra`


```js
// jest.config.js
module.exports = {
  transform: {
    "^.+\\.(md|mdx)$": 'jest-transformer-mdx/cra',
  },
};
```

## Credits

Made possible by

<a href="https://soulpicks.com" target="_blank"><img src="https://avatars0.githubusercontent.com/u/37078572?s=200&v=4" width="64" height="64"></a>
