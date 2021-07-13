module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 'off',
    'no-undef': 'off',
    camelcase: ['error', { properties: 'never' }],
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      // rule too drastic to add for now
      // {
      //   selector: ['variable', 'parameter', 'typeProperty'],
      //   types: ['boolean'],
      //   format: ['PascalCase'],
      //   prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'enabled', 'disabled', 'show', 'hide', 'disable', 'enable'],
      // },
      {
        selector: ['enum', 'interface', 'enumMember'],
        format: ['PascalCase'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '.prettierrc.js', '.eslintrc.js'] },
    ],
  },
  overrides: [
    {
      files: ['*.interface.ts', '*.enum.ts', '*.mapper.ts', '**/proxy/*.ts'],
      rules: {
        camelcase: 'off',
      },
    },
    {
      files: ['*.test.{ts,tsx}'],
      rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
