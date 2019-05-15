module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/mustache-interpolation-spacing': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    "vue/attribute-hyphenation": "off",
    "vue/order-in-components": "off",
    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-unused-vars': 'off',
    'vue/v-on-style': 'off'
  }
}