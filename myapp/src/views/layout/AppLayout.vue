<template>
  <div class="al3-wrapper">
    <aside class="al3-sidebar">
      <Sidebar :menus="menus" />
    </aside>

    <div class="al3-main">
      <header class="al3-header">
        <HeaderBar />
      </header>

      <main class="al3-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import Sidebar from '../components/Sidebar.vue';
import HeaderBar from '../components/HeaderBar.vue';

const store = useAuthStore();
const menus = computed(() => store.menu || []);
</script>

<style scoped>
.al3-wrapper {
  display: flex;
  height: 100vh;
  background: #f4f6f9;
}

/* AdminLTE 左侧深色侧边栏风格 */
.al3-sidebar {
  width: 260px;
  background: #343a40;
  color: #c2c7d0;
  flex-shrink: 0;
  display: flex;
}

/* 右侧主体 */
.al3-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* 顶部栏 */
.al3-header {
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

/* 内容区 */
.al3-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
}
</style>
