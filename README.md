# jest-transformer-md

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Github release version](https://img.shields.io/github/tag/bitttttten/oatmilk.svg)](https://github.com/bitttttten/oatmilk/releases)
[![Commits since release](https://img.shields.io/github/commits-since/bitttttten/oatmilk/v2.7.1.svg)](https://github.com/bitttttten/oatmilk/compare/v2.7.1...master)
[![npm release version](https://img.shields.io/npm/v/oatmilk.svg)](https://www.npmjs.com/package/oatmilk)

## Introduction

A simple jest transformer for MDX with frontMatter support.

## Instructions

### Install

`yarn add jest-transformer-md`

### Add to your jest config

Each route is an object with the required shape:

```js
module.exports = {
  /* .. */

  // A map from regular expressions to paths to transformers
  transform: {
    /* .. */
    "^.+\\.(md|mdx)$": 'jest-transformer-mdx',
  },

  /* .. */
};
```

And that should be it!

### Example

Look inside [this library's test](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.js) and the related [markdown file](https://github.com/bitttttten/jest-transformer-mdx/blob/master/test.md) to see live a example.

## Credits

Made possible by

<a href="https://soulpicks.com" target="_blank"><img src="https://avatars0.githubusercontent.com/u/37078572?s=200&v=4" width="64" height="64"></a>