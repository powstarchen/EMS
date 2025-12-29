<template>
  <div class="page">
    <div class="page-header">
      <h2>EMS 配置</h2>
      <p class="desc">设备、回路、采集点等配置入口。</p>
    </div>

    <div class="card">
      <h3 class="card-title">配置列表（占位）</h3>
      <p class="tip">
        这里将来可以做分页表格，例如：电表 / RIO / BTU / 水表清单，支持编辑、启用/停用等。
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
.card-title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
}
.tip {
  font-size: 13px;
  color: #6c757d;
}
</style>
