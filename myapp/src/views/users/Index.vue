<template>
  <div class="page">
    <h2>User Management</h2>
    <p class="hint">这里将来放：用户列表/新增/重置密码/角色分配（权限：user.manage）</p>

    <div class="panel">
      <h3>Planned Functions</h3>
      <ul>
        <li>新增用户（bcrypt hash）</li>
        <li>修改密码 / 重置密码</li>
        <li>分配 role</li>
        <li>分配 permissions（role_permissions）</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page { background:#fff; border:1px solid #dee2e6; border-radius:10px; padding:14px; }
.hint { color:#6c757d; font-size:13px; }
.panel { margin-top:12px; background:#f4f6f9; padding:12px; border-radius:10px; }
</style>
