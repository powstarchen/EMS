// src/router/route-defs.js

// 不用 @ 别名：全部相对路径
const Login = () => import('../views/login/index1.vue');
const Dashboard = () => import('../views/dashboard/index.vue');

const Users = () => import('../views/users/Index.vue');
const Settings = () => import('../views/system/index.vue');
const Reports = () => import('../views/reports/index.vue');
const Home = () => import('../views/home/index.vue');
const NotFound = () => import('../views/404.vue');

const AppLayout = () => import('../views/layout/AppLayout.vue');
const FullscreenLayout = () => import('../views/layout/FullscreenLayout.vue');

// ✅ 永远存在的基础路由
export const staticRoutes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },

  // 404 一定要放最后
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
];

// ✅ 业务路由候选（全部注册进 router，但访问要过权限守卫）
export const asyncRouteCandidates = [
  {
    path: '/app',
    name: 'app',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', icon: 'DataLine', perm: 'dashboard.view', group: 'MAIN NAVIGATION' }
      },
      {
        path: 'ems',
        name: 'app.ems',
        component: Home,
        meta: { title: 'EMS Data', icon: 'Monitor', perm: 'ems.read', group: 'MAIN NAVIGATION' }
      },
      {
        path: 'reports',
        name: 'app.reports',
        component: Reports,
        meta: { title: 'Reports', icon: 'Histogram', perm: 'report.export', group: 'REPORTS' }
      },
      {
        path: 'users',
        name: 'app.users',
        component: Users,
        meta: { title: 'User Mgmt', icon: 'Tools', perm: 'user.manage', group: 'MANAGEMENT' }
      },
      {
        path: 'settings',
        name: 'app.settings',
        component: Settings,
        meta: { title: 'System Config', icon: 'Grid', perm: 'system.config', group: 'SYSTEM' }
      }
    ]
  },

  {
    path: '/tv',
    name: 'tv',
    component: FullscreenLayout,
    meta: { requiresAuth: true, viewerOnly: true },
    children: [
      {
        path: 'dashboard',
        name: 'tv.dashboard',
        component: Dashboard,
        meta: { title: 'TV Dashboard', perm: 'dashboard.view' }
      }
    ]
  }
];
