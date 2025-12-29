// src/router/permission-router.js

import { asyncRouteCandidates } from './route-defs';
import { hasPerm, isViewer } from '../utils/permission';

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 预留：如果以后你想“按权限裁剪路由”，可以用它。
 * 当前版本 Router 没用到它，但保留不删，避免以后要再写一遍。
 */
export function filterRoutesByUser(user) {
  const routes = clone(asyncRouteCandidates);
  const viewer = isViewer(user);

  return routes
    .filter(r => {
      if (r.meta?.viewerOnly) return viewer;
      return !viewer;
    })
    .map(r => {
      if (!r.children) return r;
      r.children = r.children.filter(ch => {
        const perm = ch.meta?.perm;
        return perm ? hasPerm(user, perm) : true;
      });
      return r;
    })
    .filter(r => !r.children || r.children.length > 0);
}

/**
 * 真正给 Sidebar 用的函数：
 *   输入：user（含 permissions）
 *   输出：[{ type:'header' }, { type:'item' }, { type:'tree', children:[...] }, ...]
 */
export function buildMenuForUser(user) {
  // viewer：只走 /tv 全屏，不显示 Sidebar
  if (isViewer(user)) return [];

  const perms = (user && user.permissions) || [];

  const has = p => {
    if (!p) return true;
    return perms.includes('ems.admin') || perms.includes(p);
  };

  const menus = [];

  // ========== MAIN NAVIGATION ==========
  menus.push({ type: 'header', title: 'MAIN NAVIGATION' });

  // Dashboard
  if (has('dashboard.view') || has('ems.read')) {
    menus.push({
      type: 'item',
      name: 'app.dashboard',
      path: '/app/dashboard',
      title: 'Dashboard',
      icon: 'DataLine'
    });
  }

  // EMS 树
  if (has('ems.read') || has('ems.write')) {
    const emsTree = {
      type: 'tree',
      title: 'EMS',
      icon: 'Monitor',
      children: []
    };

    emsTree.children.push({
      type: 'item',
      name: 'ems.realtime',
      path: '/app/ems/realtime',
      title: 'Real-time Data'
    });

    emsTree.children.push({
      type: 'item',
      name: 'ems.history',
      path: '/app/ems/history',
      title: 'History Data'
    });

    emsTree.children.push({
      type: 'item',
      name: 'ems.config',
      path: '/app/ems/config',
      title: 'EMS Config'
    });

    menus.push(emsTree);
  }

  // ========== REPORTS ==========
  if (has('report.export')) {
    menus.push({ type: 'header', title: 'REPORTS' });

    const reportsTree = {
      type: 'tree',
      title: 'Reports',
      icon: 'Histogram',
      children: []
    };

    reportsTree.children.push({
      type: 'item',
      name: 'reports.energy',
      path: '/app/reports/energy',
      title: 'Energy Reports'
    });

    reportsTree.children.push({
      type: 'item',
      name: 'reports.daily',
      path: '/app/reports/daily',
      title: 'Daily / Monthly'
    });

    menus.push(reportsTree);
  }

  // ========== MANAGEMENT ==========
  if (has('user.manage')) {
    menus.push({ type: 'header', title: 'MANAGEMENT' });

    menus.push({
      type: 'item',
      name: 'app.users',
      path: '/app/users',
      title: 'User Management',
      icon: 'Tools'
    });
  }

  // ========== SYSTEM ==========
  if (has('system.config')) {
    menus.push({ type: 'header', title: 'SYSTEM' });

    menus.push({
      type: 'item',
      name: 'app.settings',
      path: '/app/settings',
      title: 'System Config',
      icon: 'Grid'
    });
  }

  return menus;
}
