// src/router/dynamicRoutes.js
// 这是“权限→路由→菜单”的唯一来源

const Layout = () => import('../layouts/AdminLayout.vue');

export const dynamicRoutes = [
  {
    path: '/app',
    name: 'app',
    component: Layout,
    redirect: '/app/dashboard',
    meta: { title: 'EMS', icon: 'HomeFilled' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/home/index.vue'),
        meta: { title: 'Dashboard', icon: 'DataLine', perms: ['dashboard.view'] }
      },
      {
        path: 'ems',
        name: 'ems',
        component: () => import('../views/ems/index.vue'),
        meta: { title: 'EMS Data', icon: 'Monitor', perms: ['ems.read'] }
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../views/reports/index.vue'),
        meta: { title: 'Reports', icon: 'Document', perms: ['report.export'] }
      },
      {
        path: 'system',
        name: 'system',
        component: () => import('../views/system/index.vue'),
        meta: { title: 'System Config', icon: 'Tools', perms: ['system.config'] }
      },
      {
        path: 'admin/users',
        name: 'adminUsers',
        component: () => import('../views/admin/users.vue'),
        meta: { title: 'User Management', icon: 'User', perms: ['user.manage'] }
      }
    ]
  }
];

// 权限判断：ems.admin => 全通
export function hasAnyPermission(userPerms = [], requiredPerms = []) {
  if (!requiredPerms || requiredPerms.length === 0) return true;
  if (userPerms.includes('ems.admin')) return true;
  return requiredPerms.some(p => userPerms.includes(p));
}

export function filterRoutesByPerms(routes, userPerms) {
  const clone = JSON.parse(JSON.stringify(routes));

  const walk = (arr) => {
    return arr
      .map(r => {
        const required = r?.meta?.perms || [];
        const allowed = hasAnyPermission(userPerms, required);
        if (!allowed) return null;

        if (r.children && r.children.length) {
          r.children = walk(r.children).filter(Boolean);
          // 父节点如果 children 被过滤没了，也可以隐藏
          if (r.children.length === 0) return null;
        }
        return r;
      })
      .filter(Boolean);
  };

  return walk(clone);
}
