module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', '@vue/typescript/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    // Formatting rules based on Prettier settings
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 140,
        jsxSingleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        trailingComma: 'none',
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }
    ],

    // ESLint rules to match your VS Code settings
    'no-unused-vars': 'error',
    'react/prop-types': 'off',

    // Auto-fix on save equivalent
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
};
