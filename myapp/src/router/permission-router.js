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

/**
 * 生成 AdminLTE 风格菜单（header + tree + item）
 */
export function buildMenuForUser(user) {
  const addedRoutes = filterRoutesByUser(user);
  const app = addedRoutes.find(r => r.name === 'app');
  if (!app || !app.children) return [];

  const headersOrder = ['MAIN NAVIGATION', 'MANAGEMENT', 'REPORTS', 'SYSTEM'];
  const groups = {};

  // 将 app.children 转换成菜单节点
  for (const ch of app.children) {
    const group = ch.meta?.group || 'MAIN NAVIGATION';
    if (!groups[group]) groups[group] = [];

    const base = {
      title: ch.meta?.title || ch.name,
      icon: ch.meta?.icon || '',
      name: ch.name
    };

    // tree：有 children 的目录节点
    if (Array.isArray(ch.children) && ch.children.length) {
      groups[group].push({
        type: 'tree',
        ...base,
        path: `/app/${ch.path}`,
        children: ch.children.map(k => ({
          type: 'item',
          title: k.meta?.title || k.name,
          icon: k.meta?.icon || '',
          name: k.name,
          path: `/app/${ch.path}/${k.path}`
        }))
      });
    } else {
      // item
      groups[group].push({
        type: 'item',
        ...base,
        path: `/app/${ch.path}`
      });
    }
  }

  // 输出：header + items
  const out = [];
  for (const g of headersOrder) {
    if (!groups[g] || groups[g].length === 0) continue;
    out.push({ type: 'header', title: g });
    out.push(...groups[g]);
  }

  // 未定义组：追加在最后
  Object.keys(groups).forEach(g => {
    if (headersOrder.includes(g)) return;
    out.push({ type: 'header', title: g });
    out.push(...groups[g]);
  });

  return out;
}
