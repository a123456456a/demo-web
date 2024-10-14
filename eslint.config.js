import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettierConfig,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
