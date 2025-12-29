// src/router/route-defs.js

// 视图组件（按你现在的结构，全部用相对路径）
const Login = () => import('../views/login/index.vue');
const Dashboard = () => import('../views/dashboard/index.vue');
const Home = () => import('../views/home/index.vue');         
const Reports = () => import('../views/reports/index.vue');
const Users = () => import('../views/users/index.vue');
const Settings = () => import('../views/system/index.vue');
const NotFound = () => import('../views/404.vue');

// ✅ 新增：EMS 子页面
const emsRealtime = () => import('../views/ems/realTime.vue');
const emsHistory = () => import('../views/ems/history.vue');
const emsConfig = () => import('../views/ems/config.vue');

// ✅ 新增：Reports 子页面
const reportEnergy = () => import('../views/reports/energyReport.vue');
const reportDaily = () => import('../views/reports/dailyReport.vue');

// Layout
const AppLayout = () => import('../views/layout/AppLayout.vue');
const FullscreenLayout = () => import('../views/layout/FullscreenLayout.vue');

const changePassword = () => import('../views/profile/changePassword.vue');
const userProfile = () => import('../views/profile/profile.vue');

// ===== 静态基础路由（Router 只用这一份）=====
export const staticRoutes = [
  { path: '/', redirect: '/login' },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  // App 区域（带 Sidebar + Header）
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
        meta: {
          title: 'Dashboard',
          icon: 'DataLine',
          perm: 'dashboard.view',
          group: 'MAIN NAVIGATION'
        }
      },

      // ===== EMS 主入口 =====
      {
        path: 'ems',
        name: 'app.ems',
        component: Home,
        meta: {
          title: 'EMS Data',
          icon: 'Monitor',
          perm: 'ems.read',
          group: 'MAIN NAVIGATION'
        }
      },
      // EMS 子路由（目前都复用 Home，占位，将来可以换成专门页面）
      {
        path: 'ems/realtime',
        name: 'app.ems.realtime',
        component: emsRealtime,
        meta: {
          title: 'Real-time Data',
          perm: 'ems.read',
          group: 'MAIN NAVIGATION'
        }
      },
      {
        path: 'ems/history',
        name: 'app.ems.history',
        component: emsHistory,
        meta: {
          title: 'History Data',
          perm: 'ems.read',
          group: 'MAIN NAVIGATION'
        }
      },
      {
        path: 'ems/config',
        name: 'app.ems.config',
        component: emsConfig,
        meta: {
          title: 'EMS Config',
          perm: 'ems.read',
          group: 'MAIN NAVIGATION'
        }
      },

      // ===== Reports 主入口 =====
      {
        path: 'reports',
        name: 'app.reports',
        component: Reports,
        meta: {
          title: 'Reports',
          icon: 'Histogram',
          perm: 'report.export',
          group: 'REPORTS'
        }
      },
      // Reports 子路由（占位）
      {
        path: 'reports/energy',
        name: 'app.reports.energy',
        component: reportEnergy,
        meta: {
          title: 'Energy Reports',
          perm: 'report.export',
          group: 'REPORTS'
        }
      },
      {
        path: 'reports/daily',
        name: 'app.reports.daily',
        component: reportDaily,
        meta: {
          title: 'Daily / Monthly',
          perm: 'report.export',
          group: 'REPORTS'
        }
      },

      // ===== User Management =====
      {
        path: 'users',
        name: 'app.users',
        component: Users,
        meta: {
          title: 'User Mgmt',
          icon: 'Tools',
          perm: 'user.manage',
          group: 'MANAGEMENT'
        }
      },

      // ===== System Config =====
      {
        path: 'settings',
        name: 'app.settings',
        component: Settings,
        meta: {
          title: 'System Config',
          icon: 'Grid',
          perm: 'system.config',
          group: 'SYSTEM'
        }
      },

      // ===== Change Password & Profile（从 Header 下拉进入，不在 Sidebar 显示）=====
      {
        path: 'account/password',
        name: 'app.account.password',
        component: changePassword, 
        meta: {
          title: 'Change Password',
          hidden: true
        }
      },
      {
        path: 'account/profile',
        name: 'app.account.profile',
        component: userProfile, 
        meta: {
          title: 'User Profile',
          hidden: true
        }
      }
    ]
  },

  // TV 全屏模式（viewer 专用）
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
        meta: {
          title: 'TV Dashboard',
          perm: 'dashboard.view'
        }
      }
    ]
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound
  }
];

// ===== 可选：保留 asyncRouteCandidates 给 filterRoutesByUser 用（未来可能用得到）=====
export const asyncRouteCandidates = staticRoutes.filter(r =>
  ['/app', '/tv'].includes(r.path)
);
