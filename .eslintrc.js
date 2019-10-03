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

    // allow debugger during development
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  }
}

