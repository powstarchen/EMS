<template>
  <div class="page">
    <div class="page-header">
      <h2>日 / 月报表</h2>
      <p class="desc">为管理层导出的周期性报表（日报、月报等）。</p>
    </div>

    <div class="card">
      <p class="tip">
        将来可以提供：选择日期范围 → 查询 → 在表格中展示，并支持导出为 Excel / CSV。
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.page-header .desc {
  margin-top: 4px;
  color: #6c757d;
  font-size: 13px;
}
.card {
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
}
.tip {
  font-size: 13px;
  color: #6c757d;
}
</style>
