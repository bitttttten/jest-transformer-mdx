const path = require('path');

module.exports = {
    verbose: true,
    testPathIgnorePatterns: ['/node_modules/', '/public/', '/scripts/'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.(md|mdx)$': path.resolve(__dirname, 'index.js'),
    },
}
