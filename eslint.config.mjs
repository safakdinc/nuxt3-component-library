import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,vue}'],
    rules: {
      ...typescript.configs['recommended'].rules,
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
      // Additional rules can be added here
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        browser: true,
        node: true
      }
    }
  }
];
