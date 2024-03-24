import { createI18n } from 'vue-i18n';
import ZhCN from '@/utils/i18n/zh-CN.json';

const lang = 'zh-CN';
const i18n = createI18n({
  locale: lang,
  messages: {
    ['zh-CN']: ZhCN,
  },
});

export default i18n;
