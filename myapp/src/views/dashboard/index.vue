<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const isFullscreen = route.query.fullscreen === '1';
</script>

<template>
  <div class="dash">
    <div class="dash-header" v-if="!isFullscreen">
      <h2>EMS Dashboard</h2>
      <p class="hint">这里将来放：总功率/分区用电/趋势图/告警统计（来自 MySQL view + API）</p>
    </div>

    <div class="kpi">
      <div class="kpi-card">
        <div class="kpi-label">Total kW</div>
        <div class="kpi-value">--</div>
        <div class="kpi-sub">Realtime</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Today kWh</div>
        <div class="kpi-value">--</div>
        <div class="kpi-sub">Energy</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Alarms</div>
        <div class="kpi-value">--</div>
        <div class="kpi-sub">Active</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Devices Online</div>
        <div class="kpi-value">--/--</div>
        <div class="kpi-sub">Status</div>
      </div>
    </div>

    <div class="grid">
      <div class="panel">
        <h3>Trend (placeholder)</h3>
        <div class="placeholder">Chart area</div>
      </div>
      <div class="panel">
        <h3>Top Consumers (placeholder)</h3>
        <div class="placeholder">Table area</div>
      </div>
    </div>

    <div v-if="isFullscreen" class="fullscreen-badge">Fullscreen mode</div>
  </div>
</template>

<style scoped>
.dash-header h2 { margin: 0 0 6px; }
.hint { margin: 0 0 14px; color:#6c757d; font-size: 13px; }

.kpi {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.kpi-card {
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  padding: 12px;
}
.kpi-label { color:#6c757d; font-size: 12px; }
.kpi-value { font-size: 22px; font-weight: 800; margin-top: 6px; }
.kpi-sub { color:#6c757d; font-size: 12px; margin-top: 6px; }

.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
}
.panel {
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  padding: 12px;
}
.placeholder {
  height: 260px;
  border-radius: 8px;
  background: #f4f6f9;
  display: grid;
  place-items: center;
  color: #6c757d;
}
.fullscreen-badge{
  position: fixed;
  right: 14px;
  bottom: 14px;
  background: rgba(0,0,0,0.6);
  color:#fff;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
}
</style>
