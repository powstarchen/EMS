// src/router/permission-router.js
import { asyncRouteCandidates } from './route-defs';
import { hasPerm, isViewer } from '../utils/permission';

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 过滤路由：根据 meta.perm / viewerOnly（用于菜单）
export function filterRoutesByUser(user) {
  const userIsViewer = isViewer(user);
  const routes = clone(asyncRouteCandidates);

  return routes
    .filter(r => {
      if (r.meta?.viewerOnly) return userIsViewer;
      return !userIsViewer; // viewer 不给 /app 菜单
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

// ✅ 你的 router/index.js 正在 import 的名字：buildMenuForUser
export function buildMenuForUser(user) {
  const addedRoutes = filterRoutesByUser(user);

  // viewer：不显示侧边栏菜单（或你也可以只显示一个“Dashboard”）
  const app = addedRoutes.find(r => r.name === 'app');
  if (!app || !app.children) return [];

  const nodes = app.children.map(ch => ({
    name: ch.name,
    path: `/app/${ch.path}`,
    title: ch.meta?.title || ch.name,
    icon: ch.meta?.icon || '',
    group: ch.meta?.group || 'MAIN NAVIGATION'
  }));

  // 分组输出：[{type:'header',title:'MAIN NAVIGATION'},{type:'item',...}]
  const groups = {};
  for (const n of nodes) {
    if (!groups[n.group]) groups[n.group] = [];
    groups[n.group].push(n);
  }

  const order = ['MAIN NAVIGATION', 'MANAGEMENT', 'REPORTS', 'SYSTEM'];
  const out = [];

  order.forEach(g => {
    if (!groups[g]?.length) return;
    out.push({ type: 'header', title: g });
    out.push(...groups[g].map(x => ({ type: 'item', ...x })));
  });

  // 其他组放最后
  Object.keys(groups).forEach(g => {
    if (order.includes(g)) return;
    out.push({ type: 'header', title: g });
    out.push(...groups[g].map(x => ({ type: 'item', ...x })));
  });

  return out;
}
