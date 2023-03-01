// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4],
        'no-use-before-define': ['error', {
            functions: false,
        }],
        'object-curly-spacing': ["error", "always"],
        'no-console': [1, { allow: ["warn", "error"] }],
        'react/jsx-indent': [2, 4],
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        'react/jsx-curly-newline': [2, { multiline: 'consistent', singleline: 'forbid' }],
        'react/prop-types': [0],
    },
}
