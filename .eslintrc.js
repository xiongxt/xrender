module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: ['standard'],
    rules: {
        semi: ['error', 'always', { omitLastInOneLineBlock: true }],
        indent: ['error', 4],
        'no-debugger': 2
    }
};
