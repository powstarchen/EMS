<template>
  <div class="page">
    <h2>EMS Data</h2>
    <p class="hint">
      这里将来放：按设备/时间范围查询 MySQL（real_data / view），展示表格 + 图表。
    </p>

    <div class="panel">
      <h3>Query Panel (placeholder)</h3>
      <ul>
        <li>设备选择：DPM / RIO / BTU / WM</li>
        <li>时间范围：近 1 小时 / 24 小时 / 自定义</li>
        <li>聚合：1m / 5m / 15m（来自 SQL view）</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page { background:#fff; border:1px solid #dee2e6; border-radius:10px; padding:14px; }
.hint { color:#6c757d; font-size:13px; }
.panel { margin-top:12px; background:#f4f6f9; padding:12px; border-radius:10px; }
</style>
