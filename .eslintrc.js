module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'standard'
    ],
    rules: {
        'semi': ['error', 'always'],
        "indent": ["error", 4]
    }
};
