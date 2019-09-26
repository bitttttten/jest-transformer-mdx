const { config, process: createTransformer } = require("./index")

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