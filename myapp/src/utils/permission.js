// src/utils/permission.js
export function hasPerm(user, code) {
  const perms = user?.permissions || [];
  // ems.admin = 超级权限
  return perms.includes('ems.admin') || perms.includes(code);
}

export function isViewer(user) {
  if (!user) return false;
  // ✅ 最稳：按 role
  if (user.role === 'viewer') return true;
  // ✅ 你的映射策略：用户名 tv 开头也算 viewer
  if (typeof user.username === 'string' && user.username.startsWith('tv')) return true;
  return false;
}
