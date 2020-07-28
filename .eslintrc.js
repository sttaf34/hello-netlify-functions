module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
  rules: {
    "no-console": "off",
    "prettier/prettier": ["error", { semi: false }],

    // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    "import/extensions": [
      "error",
      "ignorePackages",
      { ts: "never", tsx: "never" },
    ],

    // export default は基本使わないとする
    // https://engineering.linecorp.com/ja/blog/you-dont-need-default-export/
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
  },
}
