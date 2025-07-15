// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021:  true,
    node:    true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',        // React-specific rules
    'plugin:jsx-a11y/recommended',     // Accessibility rules
    'prettier',                        // Disables ESLint rules that conflict with Prettier
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion:  12,
    sourceType:   'module',
  },
  settings: {
    react: { version: 'detect' },      // Automatically picks up your React version
  },
  rules: {
    // Example overrides:
    'react/prop-types':       'off',  // if you don’t want to enforce PropTypes
    'jsx-a11y/anchor-is-valid':'warn',
    // …add/adjust any rule levels here…
  },
};
