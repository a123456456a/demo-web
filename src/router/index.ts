import { createRouter, createWebHistory } from 'vue-router';

// 创建路由数组
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue')
  }
];

// 创建一个新的路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页，直接放行
  if (to.path === '/login' || to.path === '/home') {
    next();
    return;
  }
  // 如果用户访问的不是登录页，判断用户是否登录
  const token = localStorage.getItem('token');
  if (token) {
    next();
  } else {
    next('/login');
  }
});

// 导出路由实例
export default router;
