module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // eslint 官方
    'plugin:@typescript-eslint/recommended', // ts 官方
    'plugin:vue/vue3-recommended', // vue 官方
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['@typescript-eslint', 'vue'],
  globals: {
    // 定义一些全局变量，这些变量在代码中使用但 eslint 环境未定义
  },
  rules: {
    // 自定义项目中得规则
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': false,
        'allowTemplateLiterals': true,
      },
    ],
    'semi': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-useless-catch': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: false,
        allowTemplateLiterals: true,
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'always',
          'normal': 'never',
          'component': 'always',
        },
        'svg': 'always',
        'math': 'always',
      },
    ],
    'vue/comment-directive': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
