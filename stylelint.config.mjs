/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'selector-class-pattern': '^[a-z][a-z0-9-]*$',
    'property-no-vendor-prefix': null,
  },
}

export default config
