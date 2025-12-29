<template>
  <div class="page">
    <!-- 标题区 -->
    <div class="page-header">
      <h2>EMS 实时数据</h2>
      <p class="desc">这里展示主要配电回路 / 设备的实时功率、电压、电流等关键指标。</p>
    </div>

    <!-- 指标卡片 -->
    <div class="card-row">
      <div class="card kpi">
        <div class="kpi-label">当前总有功功率</div>
        <div class="kpi-value">-- kW</div>
        <div class="kpi-sub">数据来源：Node-RED 实时采集</div>
      </div>
      <div class="card kpi">
        <div class="kpi-label">今日累计电量</div>
        <div class="kpi-value">-- kWh</div>
        <div class="kpi-sub">与昨日同比：--%</div>
      </div>
      <div class="card kpi">
        <div class="kpi-label">当前功率因数</div>
        <div class="kpi-value">--</div>
        <div class="kpi-sub">目标 ≥ 0.95</div>
      </div>
    </div>

    <!-- 图表 + 列表区 -->
    <div class="content-row">
      <div class="card chart-card">
        <h3 class="card-title">关键回路实时负载（占位图）</h3>
        <div class="chart-placeholder">
          这里将来放折线图（例如 A 相 / B 相 / C 相功率）
        </div>
      </div>

      <div class="card table-card">
        <h3 class="card-title">主要回路列表（占位表格）</h3>
        <div class="table-placeholder">
          将来从 Node-RED / MySQL 获取 DPM_real_data 当前值，按回路列表展示。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 目前先不接 API，稳住路由和布局
// 后面我们会在这里引入 emsApi.getRealTime(...) 等
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

/* KPI 卡片行 */
.card-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
}

.kpi-label {
  font-size: 13px;
  color: #6c757d;
}

.kpi-value {
  margin-top: 8px;
  font-size: 24px;
  font-weight: 700;
  color: #343a40;
}

.kpi-sub {
  margin-top: 4px;
  font-size: 12px;
  color: #adb5bd;
}

/* 内容区：左图右表 */
.content-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  gap: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
}

.chart-placeholder,
.table-placeholder {
  border: 1px dashed #dee2e6;
  border-radius: 4px;
  padding: 20px;
  font-size: 13px;
  color: #6c757d;
  text-align: center;
}

/* 小屏时改为一列 */
@media (max-width: 992px) {
  .card-row {
    grid-template-columns: 1fr;
  }
  .content-row {
    grid-template-columns: 1fr;
  }
}
</style>
