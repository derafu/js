module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
    },
    rules: {
        // Code quality rules.
        'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'error',
        'no-alert': 'off',

        // Best practices.
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'all'],
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error',

        // Style rules - disabled in favor of Prettier.
        'indent': 'off',
        'quotes': 'off',
        'semi': 'off',
        'comma-dangle': 'off',
        'no-trailing-spaces': 'off',
        'eol-last': 'off',

        // ES6+ rules.
        'prefer-const': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-template': 'error',

        // Documentation rules.
        'valid-jsdoc': 'warn',
        'require-jsdoc': 'off',
    },
    globals: {
        // Global variables used in the library.
        'Utils': 'readonly',
        'UI': 'readonly',
        'Validation': 'readonly',
        'Tabs': 'readonly',
        'FormValidation': 'readonly',
        'FormFields': 'readonly',
        'FormTables': 'readonly',
        '__': 'readonly',
        'Form': 'readonly',
        // External libraries loaded in browser.
        '$': 'readonly',
        'jQuery': 'readonly',
        'bootbox': 'readonly',
        'bootstrap': 'readonly',
        'Notyf': 'readonly',
        'ValidationL10nCl': 'readonly',
    },
};
