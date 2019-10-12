// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  extends: [
    "vue",
    "plugin:vue/recommended",
    "airbnb"
  ],
  // required to lint *.vue files
  plugins: [
    "import",
    "vue"
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,

    // allow async-await
    "generator-star-spacing": "off",

    "no-mixed-spaces-and-tabs": [0],
    "no-tabs": 0,
    "skipBlankLines": 0,
    "ignoreComments": 0,
    "no-trailing-spaces": [2, { "skipBlankLines": true }],

    // For sw.js
    "quotes": [0, "double"],
    "quote-props": 0,
    "comma-dangle": 0,
    "no-undef": 0,
    "no-restricted-globals": 0,
    "no-underscore-dangle": 0,
    "arrow-body-style": 0,
    "operator-linebreak": 0,
    "no-console": 0,
    "consistent-return": 0,
    "import/prefer-default-export": 0,

    // allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  }
}

