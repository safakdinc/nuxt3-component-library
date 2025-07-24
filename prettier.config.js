export default {
  semi: true,
  printWidth: 100,
  tabWidth: 2,
  singleAttributePerLine: false, // Important for breaking attributes
  trailingComma: "all",
  arrowParens: "always",
  vueIndentScriptAndStyle: false,
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-attributes",
    "prettier-plugin-classnames",
  ],
  endingPosition: "absolute",
};
