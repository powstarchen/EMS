<template>
  <div class="hb-root">
    <div class="hb-left">
      <div class="hb-title">{{ title }}</div>
      <div class="hb-sub">Role: {{ user?.role || '-' }}</div>
    </div>

    <div class="hb-right">
      <el-button size="small" @click="toDashboard">Dashboard</el-button>
      <el-button size="small" type="danger" @click="logout">Logout</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const route = useRoute();
const router = useRouter();
const store = useAuthStore();

const user = computed(() => store.user);
const title = computed(() => route.meta?.title || 'EMS');

function toDashboard() {
  router.push('/app/dashboard');
}

function logout() {
  store.logout();
  router.replace('/login');
}
</script>

<style scoped>
.hb-root {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hb-title {
  font-weight: 700;
  font-size: 16px;
  color: #343a40;
}
.hb-sub {
  font-size: 12px;
  color: #6c757d;
}
.hb-right {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
