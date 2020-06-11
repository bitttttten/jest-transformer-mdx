# jest-transformer-mdx

[![Github release version](https://img.shields.io/github/tag/bitttttten/jest-transformer-mdx.svg)](https://github.com/bitttttten/jest-transformer-mdx/releases)
[![Commits since release](https://img.shields.io/github/commits-since/bitttttten/jest-transformer-mdx/v2.1.0.svg)](https://github.com/bitttttten/jest-transformer-mdx/compare/v2.1.0...master)
[![npm release version](https://img.shields.io/npm/v/jest-transformer-mdx.svg)](https://www.npmjs.com/package/jest-transformer-mdx)

## Introduction

Jest transformer for [MDX](https://mdxjs.com/) with [frontMatter](https://github.com/c8r/x0/blob/master/lib/mdx-fm-loader.js) support.

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

### Configuration

You can configure this transformer by using a different syntax in your jest config, an array of the path to the transformer followed by an options object.

#### Example

```js
// jest.config.js
module.exports = {
  transform: {
    "^.+\\.(md|mdx)$": ['jest-transformer-mdx', { frontMatterName: "meta" }]
  },
};
```

#### frontMatterName

Use this option to rename the exported frontMatter object. This module exports the frontMatter object named as "frontMatter", so [in your component and tests](https://github.com/bitttttten/jest-transformer-mdx/blob/d23701d641f826fface8511e70734073ca2ad29b/test.js#L2) you could only access the frontMatter object through `require('./hello-world.mdx').frontMatter`. If this does not suite your workflow, then use this option to rename it.

#### Interface 

```ts
interface Options {
  // rename the object that the frontmatter object will get exported as
  frontMatterName?: string
}
```

### create-react-app & configless

You can also use this module in `create-react-app`-like apps where the config is not exposed. Just edit your transform property to import from `jest-transformer-mdx/cra`. This method does not support any of the configuration options mentioned above yet.


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
