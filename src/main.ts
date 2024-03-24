import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
// 导入路由实例
import router from './router';
// 导入i18n实例
import i18n from '@/utils/i18n/i18n.ts';

const app = createApp(App);
// 使用路由实例
app.use(router);
// 使用i18n实例
app.use(i18n);
app.mount('#app');
