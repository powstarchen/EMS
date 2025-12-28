<template>
  <div class="page">
    <div class="card">
      <div class="card-header">
        <div class="title">Devices</div>
        <div class="actions">
          <el-input v-model="q" size="small" placeholder="Search..." style="width:220px" />
          <el-button size="small" @click="load">Reload</el-button>
        </div>
      </div>
      <div class="card-body">
        <el-table :data="rows" style="width:100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="type" label="Type" width="120" />
          <el-table-column prop="ip" label="IP" width="160" />
          <el-table-column prop="status" label="Status" width="120" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const q = ref('');
const rows = ref([]);

function load() {
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
