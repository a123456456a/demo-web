import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers:[
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
