// src/router/permission-router.js
import { asyncRouteCandidates } from './route-defs';
import { hasPerm, isViewer } from '../utils/permission';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function filterNodeByPerm(node, user) {
  const perm = node?.meta?.perm;
  if (perm && !hasPerm(user, perm)) return null;

  if (Array.isArray(node.children) && node.children.length) {
    const kids = node.children
      .map(ch => filterNodeByPerm(ch, user))
      .filter(Boolean);
    node.children = kids;
  }

  // 如果是“目录节点”且孩子被过滤为空，则移除
  if (Array.isArray(node.children) && node.children.length === 0 && !node.component) {
    return null;
  }

  return node;
}

export function filterRoutesByUser(user) {
  const userIsViewer = isViewer(user);
  const routes = deepClone(asyncRouteCandidates);

  const top = routes
    .filter(r => {
      if (r.meta?.viewerOnly) return userIsViewer;
      return !userIsViewer;
    })
    .map(r => filterNodeByPerm(r, user))
    .filter(Boolean);

  return top;
}

// 由路由生成 AdminLTE 风格菜单（分组 + 树）
export function buildMenuForUser(user) {
  const userIsViewer = isViewer(user);

  // 先拿到“该用户可见”的路由（你已有 filterRoutesByUser）
  const addedRoutes = filterRoutesByUser(user);

  // viewer 只走 /tv，不需要 sidebar 菜单
  if (userIsViewer) return [];

  const app = addedRoutes.find(r => r.name === 'app');
  if (!app || !Array.isArray(app.children)) return [];

  // ✅ 关键：忽略 hidden 的 children（比如 profile/password）
  const visibleChildren = app.children.filter(ch => !ch.meta?.hidden);

  // 1) 把 children 转成“节点”
  const nodes = visibleChildren.map(ch => ({
    type: 'item',
    name: ch.name,
    path: `/app/${ch.path}`,
    title: ch.meta?.title || ch.name,
    icon: ch.meta?.icon || '',
    group: ch.meta?.group || 'MAIN NAVIGATION',
    children: Array.isArray(ch.children)
      ? ch.children
          .filter(g => !g.meta?.hidden) // 子菜单也支持 hidden
          .map(g => ({
            type: 'item',
            name: g.name,
            path: `/app/${ch.path}/${g.path}`,
            title: g.meta?.title || g.name,
            icon: g.meta?.icon || '',
            group: g.meta?.group || (ch.meta?.group || 'MAIN NAVIGATION')
          }))
      : []
  }));

  // 2) 按 group 分组
  const groups = {};
  for (const n of nodes) {
    if (!groups[n.group]) groups[n.group] = [];
    groups[n.group].push(n);
  }

  // 3) 输出分组结构：[{ type:'header', title }, ...items/tree]
  const order = ['MAIN NAVIGATION', 'MANAGEMENT', 'REPORTS', 'SYSTEM'];
  const out = [];

  order.forEach(gname => {
    if (!groups[gname] || groups[gname].length === 0) return;
    out.push({ type: 'header', title: gname });
    out.push(
      ...groups[gname].map(x => ({
        ...x,
        type: x.children.length ? 'tree' : 'item'
      }))
    );
  });

  // 其他未知组最后追加
  Object.keys(groups).forEach(gname => {
    if (order.includes(gname)) return;
    out.push({ type: 'header', title: gname });
    out.push(
      ...groups[gname].map(x => ({
        ...x,
        type: x.children.length ? 'tree' : 'item'
      }))
    );
  });

  return out;
}

