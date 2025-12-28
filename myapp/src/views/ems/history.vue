<template>
  <div class="page">
    <div class="card">
      <div class="card-header">
        <div class="title">EMS History</div>
        <div class="actions">
          <el-date-picker v-model="range" type="datetimerange" start-placeholder="Start" end-placeholder="End" />
          <el-button size="small" type="primary" @click="query">Query</el-button>
        </div>
      </div>

      <div class="card-body">
        <el-table :data="rows" style="width:100%">
          <el-table-column prop="ts" label="Time" width="180" />
          <el-table-column prop="device" label="Device" />
          <el-table-column prop="kw" label="kW" />
          <el-table-column prop="kwh" label="kWh" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const range = ref([]);
const rows = ref([]);

function query() {
  // 后续：/api/ems/history?from=...&to=...
  rows.value = [];
}
</script>

<style scoped>
.page { display:grid; gap:16px; }
.card { background:#fff; border:1px solid #e6e6e6; border-radius:10px; overflow:hidden; }
.card-header { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-bottom:1px solid #eee; }
.title { font-weight:700; color:#343a40; }
.actions { display:flex; gap:10px; align-items:center; }
.card-body { padding:14px; }
</style>
