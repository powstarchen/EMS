<template>
  <div class="app-wrapper" :class="{ collapsed }">
    <Sidebar :menus="menus" :collapsed="collapsed" />

    <div class="main-container">
      <HeaderBar
        :collapsed="collapsed"
        @toggle-sidebar="toggleSidebar"
      />

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useUiStore } from '../../stores/ui';
import Sidebar from './components/sidebar.vue';
import HeaderBar from './components/headerBar.vue';

const auth = useAuthStore();
const ui = useUiStore();

const menus = computed(() => auth.menu || []);
console.log('DEBUG MENUS:', menus.value);
const collapsed = computed(() => ui.sidebarCollapsed);

function toggleSidebar() {
  ui.toggleSidebar();
}
</script>

<style scoped>
.app-wrapper {
  display: flex;
  height: 100vh;
  background: #f4f6f9;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.content {
  flex: 1;
  padding: 16px;
  overflow: auto;
  background: #f4f6f9;
}
</style>
