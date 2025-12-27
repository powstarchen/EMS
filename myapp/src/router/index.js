// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes, asyncRouteCandidates } from './route-defs';
import { useAuthStore } from '../stores/auth';
import { isViewer, hasPerm } from '../utils/permission';
import { buildMenuForUser } from './permission-router';

const router = createRouter({
  history: createWebHistory(),
  // ✅ 关键：把 asyncRouteCandidates 一开始就注册进去，避免 addRoute 引发的各种“需要刷新”
  routes: [...staticRoutes, ...asyncRouteCandidates]
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  // 未登录：只允许 /login
  if (!store.token && to.path !== '/login') {
    return next('/login');
  }

  // 已登录访问 /login：根据 viewer / 非 viewer 重定向
  if (store.token && to.path === '/login') {
    const target = isViewer(store.user)
      ? '/tv/dashboard?fullscreen=1'
      : '/app/dashboard';
    return next(target);
  }

  // 每次进入受保护区域：刷新菜单（稳定）
  if (store.token && store.user) {
    store.setMenu(buildMenuForUser(store.user));
  }

  // viewerOnly 限制
  if (to.matched.some(r => r.meta?.viewerOnly)) {
    if (!isViewer(store.user)) return next('/app/dashboard');
  }

  // requiresAuth + perm 校验
  const requiredPerms = to.matched.map(r => r.meta?.perm).filter(Boolean);
  for (const p of requiredPerms) {
    if (!hasPerm(store.user, p)) {
      // 你也可以 next('/403')，这里先回 dashboard
      return next('/app/dashboard');
    }
  }

  next();
});

export default router;


/*
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index1.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
*/