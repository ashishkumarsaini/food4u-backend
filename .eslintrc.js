module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {
        'no-console': 'off',
        indent: ['error', 4],
        'eol-last': 1,
        'linebreak-style': 0,
    },
};
