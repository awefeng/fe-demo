module.exports = {
  // 设定当前目录为eslint根目录
  root: true,
  // 设定eslint的env
  env: {
    es2021: true,
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-inner-declarations': 'warn',
    'block-scoped-var': 'error',
    'default-case': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'comma-dangle': ['error', 'never'],
    'max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        comments: 80
      }
    ],
    semi: ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      // 给代码加上必要的空行风格
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'block', 'block-like'],
        next: '*'
      },
      {
        blankLine: 'always',
        prev: ['import'],
        next: ['const', 'let', 'var', 'block', 'block-like', 'expression']
      },
      { blankLine: 'never', prev: ['import'], next: ['import'] },
      { blankLine: 'never', prev: ['const'], next: ['const'] }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
