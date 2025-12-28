<template>
  <div class="card">
    <h2>Change Password</h2>

    <p class="muted">
      这里先做页面骨架。下一步（做 C 时）再接 Node-RED API：/api/user/change-password。
    </p>

    <el-form label-width="140px" style="max-width:520px;">
      <el-form-item label="Current Password">
        <el-input type="password" />
      </el-form-item>

      <el-form-item label="New Password">
        <el-input type="password" />
      </el-form-item>

      <el-form-item label="Confirm New Password">
        <el-input type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.card{
  background:#fff;
  border:1px solid #e6e6e6;
  border-radius:12px;
  padding:16px;
}
.muted{color:#6c757d; margin:8px 0 16px}
</style>
