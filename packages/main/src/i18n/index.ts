import 'dayjs/locale/en';
import 'dayjs/locale/zh';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'zh-CN': {
    main: {
      hello: '你好，世界',
      'menu.home': '首页',
      'menu.subapp1': '子应用1',
      'menu.subapp1.detail': '子应用1详情',
      'menu.subapp2': '子应用2',
      'menu.subapp2.detail': '子应用2详情',
      'menu.subapp2.fullscreen': '子应用2全屏',
    },
  },
  'en-US': {
    main: {
      hello: 'Hello, World',
      'menu.home': 'Home',
      'menu.subapp1': 'Subapp1',
      'menu.subapp1.detail': 'Subapp1 detail',
      'menu.subapp2': 'Subapp2',
      'menu.subapp2.detail': 'Subapp2 detail',
      'menu.subapp2.fullscreen': 'Subapp2 fullscreen',
    },
  },
};

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  ns: ['main'],
  resources,
  lng: 'zh-CN',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  debug: true,
});

export default i18n;
