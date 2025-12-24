import { MockMethod } from 'vite-plugin-mock';

const handleRoutesData = () => {
  const subapp1Entry = 'http://localhost:5174';
  const subapp2Entry = 'http://localhost:5175';

  return [
    {
      name: '首页',
      path: '/home',
      component: 'Home',
    },
    {
      name: '子应用1',
      path: '/subapp1',
      component: 'Microapp',
      locale: 'menu.subapp1',
      routeAttr: `{"name": "subapp1", "entry": "${subapp1Entry}", "activeRule": "/subapp1", "rootId": "sub-app"}`,
      children: [
        {
          name: '子应用1详情',
          path: '/subapp1/detail',
          component: 'Microapp',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '子应用2',
      path: '/',
      component: 'Outlet',
      children: [
        {
          name: '子应用2首页',
          path: '/subapp2/home',
          component: 'Microapp',
          routeAttr: `{"name": "subapp2", "entry": "${subapp2Entry}", "activeRule": "/subapp2", "rootId": "sub-app"}`,
        },
        {
          name: '子应用2详情页',
          path: '/subapp2/detail',
          component: 'Microapp',
          routeAttr: `{"name": "subapp2", "entry": "${subapp2Entry}", "activeRule": "/subapp2", "rootId": "sub-app", "noLayout": true}`,
        },
      ],
    },
  ];
};

export default [
  {
    url: '/api/getRoutes',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      const routes = handleRoutesData();
      return { code: 0, data: routes, msg: 'success' };
    },
  },
] as MockMethod[];
