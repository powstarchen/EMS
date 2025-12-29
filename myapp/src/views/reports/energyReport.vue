<template>
  <div class="page">
    <div class="page-header">
      <h2>能耗报表</h2>
      <p class="desc">按区域 / 设备统计电量，用于能源分析及节能评估。</p>
    </div>

    <div class="card">
      <div class="filter-row">
        <div>
          <label>统计周期（占位）</label>
          <div class="filter-controls">
            <select>
              <option>按日</option>
              <option>按月</option>
              <option>按年</option>
            </select>
          </div>
        </div>
        <div>
          <button class="btn">查询</button>
          <button class="btn-outline">导出</button>
        </div>
      </div>

      <div class="chart-placeholder">
        将来这里放分区堆叠柱状图 / 饼图等，可直接从 MySQL 聚合视图 + Node-RED API 获取。
      </div>
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
.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
}
label {
  font-size: 13px;
  color: #495057;
}
.filter-controls {
  margin-top: 6px;
}
select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  font-size: 13px;
}
.btn,
.btn-outline {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  margin-left: 8px;
}
.btn {
  border: 1px solid #0d6efd;
  background: #0d6efd;
  color: #fff;
}
.btn:hover {
  background: #0b5ed7;
}
.btn-outline {
  border: 1px solid #6c757d;
  background: #fff;
  color: #343a40;
}
.btn-outline:hover {
  background: #f1f3f5;
}
.chart-placeholder {
  border: 1px dashed #dee2e6;
  border-radius: 4px;
  padding: 40px;
  font-size: 13px;
  color: #6c757d;
  text-align: center;
}
</style>
