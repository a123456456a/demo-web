import js from '@eslint/js';
import globals from 'globals';
// ts解析器
import ts from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['node_modules', 'dist', 'public', '.vscode', '.git'],
  },
  /** js推荐配置 */
  js.configs.recommended,
  /** ts推荐配置 */
  ...ts.configs.recommended,
  /** vue推荐配置 */
  ...eslintPluginVue.configs['flat/recommended'],

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
    arrowParens: 'always',
  }),

  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {
      'no-console': 'error',
    },
  },
  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,

        /** 追加一些其他自定义全局规则 */
      },
    },
  },
  /**
   * Vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: ts.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue文件中使用JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加一些vue规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
    },
  },
  /**
   * typescript 规则
   */
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // 在这里追加一些typescript规则
    },
  },
  /**
   * Prettier 推荐配置
   * 会合并根目录下的prettier.config.js配置
   */
  eslintPluginPrettierRecommended,
];
