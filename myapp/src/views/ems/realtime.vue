<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { emsApi } from '../../api';

const loading = ref(false);
const rows = ref([]);
const error = ref('');

let timer = null;

async function fetchData() {
  loading.value = true;
  error.value = '';

  try {
    const res = await emsApi.getRealtime();
    // Node-RED 返回 { success, count, rows }
    rows.value = Array.isArray(res.rows) ? res.rows : [];
  } catch (e) {
    console.error('fetch realtime error:', e);
    error.value = e?.message || 'Failed to load realtime data';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
  // 每 10 秒刷新一次
  timer = setInterval(fetchData, 10000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

function formatSgTime(value) {
  if (!value) return '';

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    // 解析失败就原样返回，避免整行报错
    return value;
  }

  // 统一格式化为新加坡时间
  return d.toLocaleString('en-SG', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}
</script>

<template>
  <div class="ems-realtime">
    <el-card shadow="never" class="card">
      <div class="card-header">
        <div class="title">DPM Real-time Data</div>
        <div class="actions">
          <el-button size="small" @click="fetchData" :loading="loading">
            Refresh
          </el-button>
        </div>
      </div>

      <el-alert
        v-if="error"
        type="error"
        :closable="false"
        class="mb-8"
        :title="error"
      />

      <el-table
        v-loading="loading"
        :data="rows"
        height="calc(100vh - 180px)"
        size="small"
        border
      >
        <el-table-column prop="device_id" label="ID" width="70" />
        <el-table-column prop="device_name" label="Device" width="200" />
        <el-table-column label="Time" width="200">
          <template #default="{ row }">
            {{ formatSgTime(row.collection_time) }}
          </template>
        </el-table-column>

        <!-- 下面列名要和你的 DPM_real_data 字段一致 -->
        <el-table-column prop="active_power_total" label="P (kW)" width="110" />
        <el-table-column prop="voltage_ab" label="U12 (V)" width="110" />
        <el-table-column prop="voltage_bc" label="U23 (V)" width="110" />
        <el-table-column prop="voltage_ca" label="U31 (V)" width="110" />
        <el-table-column prop="current_a" label="I1 (A)" width="110" />
        <el-table-column prop="current_b" label="I2 (A)" width="110" />
        <el-table-column prop="current_c" label="I3 (A)" width="110" />
        <el-table-column prop="power_factor_total" label="PF" width="90" />

        <el-table-column prop="collection_status" label="Status" width="100" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.ems-realtime {
  height: 100%;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

.actions {
  display: flex;
  gap: 8px;
}

.mb-8 {
  margin-bottom: 8px;
}
</style>
