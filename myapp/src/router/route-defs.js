// src/router/route-defs.js

const Login = () => import('../views/login/index1.vue');
const NotFound = () => import('../views/404.vue');

const Dashboard = () => import('../views/dashboard/index.vue');

// Layout
const AppLayout = () => import('../views/layout/AppLayout.vue');
const FullscreenLayout = () => import('../views/layout/FullscreenLayout.vue');

// EMS pages
const EMSRealtime = () => import('../views/ems/realtime.vue');
const EMSHistory = () => import('../views/ems/history.vue');
const EMSDevices = () => import('../views/ems/devices.vue');

// Reports pages
const ReportEnergy = () => import('../views/reports/energy.vue');
const ReportExport = () => import('../views/reports/export.vue');

// Management pages
const Users = () => import('../views/users/index.vue');
const Roles = () => import('../views/users/roles.vue');
const Permissions = () => import('../views/users/permissions.vue');
const ChangePassword = () => import('../views/profile/ChangePassword.vue');

// System pages
const SysConfig = () => import('../views/system/config.vue');
const SysAudit = () => import('../views/system/audit.vue');

export const staticRoutes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

export const asyncRouteCandidates = [
  {
    path: '/app',
    name: 'app',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      // ===== MAIN NAVIGATION (single) =====
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', icon: 'DataLine', perm: 'dashboard.view', group: 'MAIN NAVIGATION' }
      },

      // ===== EMS (tree) =====
      {
        path: 'ems',
        name: 'app.ems',
        meta: { title: 'EMS', icon: 'Monitor', perm: 'ems.read', group: 'MAIN NAVIGATION' },
        children: [
          {
            path: 'realtime',
            name: 'app.ems.realtime',
            component: EMSRealtime,
            meta: { title: 'Realtime', icon: 'DataLine', perm: 'ems.read', group: 'MAIN NAVIGATION' }
          },
          {
            path: 'history',
            name: 'app.ems.history',
            component: EMSHistory,
            meta: { title: 'History', icon: 'Histogram', perm: 'ems.read', group: 'MAIN NAVIGATION' }
          },
          {
            path: 'devices',
            name: 'app.ems.devices',
            component: EMSDevices,
            meta: { title: 'Devices', icon: 'Tools', perm: 'ems.read', group: 'MAIN NAVIGATION' }
          },
          {
          path: 'profile/password',
          name: 'app.profile.password',
          component: ChangePassword,
          meta: { title: 'Change Password', hidden: true }
        }
        ]
      },

      // ===== REPORTS (tree) =====
      {
        path: 'reports',
        name: 'app.reports',
        meta: { title: 'Reports', icon: 'Histogram', perm: 'report.export', group: 'REPORTS' },
        children: [
          {
            path: 'energy',
            name: 'app.reports.energy',
            component: ReportEnergy,
            meta: { title: 'Energy Summary', icon: 'Histogram', perm: 'report.export', group: 'REPORTS' }
          },
          {
            path: 'export',
            name: 'app.reports.export',
            component: ReportExport,
            meta: { title: 'Export', icon: 'Tools', perm: 'report.export', group: 'REPORTS' }
          }
        ]
      },

      // ===== MANAGEMENT (tree) =====
      {
        path: 'management',
        name: 'app.management',
        meta: { title: 'Management', icon: 'Tools', perm: 'user.manage', group: 'MANAGEMENT' },
        children: [
          {
            path: 'users',
            name: 'app.management.users',
            component: Users,
            meta: { title: 'Users', icon: 'Tools', perm: 'user.manage', group: 'MANAGEMENT' }
          },
          {
            path: 'roles',
            name: 'app.management.roles',
            component: Roles,
            meta: { title: 'Roles', icon: 'Grid', perm: 'user.manage', group: 'MANAGEMENT' }
          },
          {
            path: 'permissions',
            name: 'app.management.permissions',
            component: Permissions,
            meta: { title: 'Permissions', icon: 'Grid', perm: 'user.manage', group: 'MANAGEMENT' }
          }
        ]
      },

      // ===== SYSTEM (tree) =====
      {
        path: 'system',
        name: 'app.system',
        meta: { title: 'System', icon: 'Grid', perm: 'system.config', group: 'SYSTEM' },
        children: [
          {
            path: 'config',
            name: 'app.system.config',
            component: SysConfig,
            meta: { title: 'Config', icon: 'Grid', perm: 'system.config', group: 'SYSTEM' }
          },
          {
            path: 'audit',
            name: 'app.system.audit',
            component: SysAudit,
            meta: { title: 'Audit Log', icon: 'Histogram', perm: 'system.config', group: 'SYSTEM' }
          }
        ]
      }
    ]
  },

  // viewer / TV
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
