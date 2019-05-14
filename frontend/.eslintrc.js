module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/mustache-interpolation-spacing': 'off',
    'vue/html-self-closing':'off',
    'vue/max-attributes-per-line':'off'
  }
}