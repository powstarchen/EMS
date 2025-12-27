<template>
  <div class="page">
    <h2>System Config</h2>
    <p class="hint">这里将来放：系统参数、采集间隔、阈值、告警策略（权限：system.config）</p>

    <div class="panel">
      <h3>Config Items (placeholder)</h3>
      <ul>
        <li>采集间隔（DPM/RIO/BTU/WM）</li>
        <li>告警阈值（电压/电流/功率/流量）</li>
        <li>TV 大屏配置（后期处理 screenId 映射）</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page { background:#fff; border:1px solid #dee2e6; border-radius:10px; padding:14px; }
.hint { color:#6c757d; font-size:13px; }
.panel { margin-top:12px; background:#f4f6f9; padding:12px; border-radius:10px; }
</style>
