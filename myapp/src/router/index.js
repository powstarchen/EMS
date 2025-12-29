// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes } from './route-defs';
import { useAuthStore } from '../stores/auth';
import { isViewer, hasPerm } from '../utils/permission';
import { buildMenuForUser } from './permission-router';

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  // === 1. 未登录：强制去 /login（除了本身就是 /login）===
  if (!store.token && to.path !== '/login') {
    return next('/login');
  }

  // === 2. 已登录访问 /login：按角色跳转 ===
  if (store.token && to.path === '/login') {
    const target = isViewer(store.user)
      ? '/tv/dashboard?fullscreen=1'
      : '/app/dashboard';
    return next(target);
  }

  // === 3. 已登录：每次进入受保护区域时刷新菜单 ===
  if (store.token && store.user) {
    store.setMenu(buildMenuForUser(store.user));
  }

  // === 4. viewerOnly 限制：只有 viewer 才能进 /tv ===
  if (to.matched.some(r => r.meta?.viewerOnly)) {
    if (!isViewer(store.user)) {
      return next('/app/dashboard');
    }
  }

  // === 5. 权限检查：所有 matched record 的 meta.perm 必须满足 ===
  const requiredPerms = to.matched
    .map(r => r.meta?.perm)
    .filter(Boolean);

  for (const p of requiredPerms) {
    if (!hasPerm(store.user, p)) {
      // 你也可以跳到 /403，这里先简单回到 dashboard
      return next('/app/dashboard');
    }
  }

  next();
});

export default router;
