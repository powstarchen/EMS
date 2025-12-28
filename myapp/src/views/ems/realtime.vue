<template>
  <div class="page">
    <div class="card">
      <div class="card-header">
        <div class="title">EMS Realtime</div>
        <div class="actions">
          <el-button size="small" @click="refresh">Refresh</el-button>
          <el-switch v-model="auto" active-text="Auto" inactive-text="Manual" />
        </div>
      </div>

      <div class="card-body">
        <p class="hint">这里将显示实时数据（来自 Node-RED/MySQL view）。</p>

        <div class="grid">
          <div class="stat" v-for="n in 6" :key="n">
            <div class="label">Metric {{ n }}</div>
            <div class="value">--</div>
            <div class="sub">unit</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="title">Realtime Table</div>
      </div>
      <div class="card-body">
        <el-table :data="rows" style="width:100%">
          <el-table-column prop="device" label="Device" />
          <el-table-column prop="kwh" label="kWh" />
          <el-table-column prop="kw" label="kW" />
          <el-table-column prop="ts" label="Time" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const auto = ref(true);
const rows = ref([]);

function refresh() {
  // 后续：调用 /api/ems/realtime
  rows.value = [];
}
</script>

<style scoped>
.page { display: grid; gap: 16px; }
.card { background:#fff; border:1px solid #e6e6e6; border-radius:10px; overflow:hidden; }
.card-header { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-bottom:1px solid #eee; }
.title { font-weight:700; color:#343a40; }
.actions { display:flex; gap:10px; align-items:center; }
.card-body { padding:14px; }
.hint { color:#6c757d; margin:0 0 12px; }
.grid { display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.stat { background:#f8f9fa; border-radius:10px; padding:12px; border:1px solid #eee; }
.label { font-size:12px; color:#6c757d; }
.value { font-size:22px; font-weight:800; margin-top:6px; }
.sub { font-size:12px; color:#6c757d; margin-top:6px; }
</style>
