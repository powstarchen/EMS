<!-- src/layouts/AdminLayout.vue -->
<template>
  <div class="layout">
    <!-- 非全屏才显示 sidebar -->
    <aside v-if="!isFullscreen" class="sidebar">
      <div class="brand">EMS</div>
      <nav>
        <div
          v-for="item in menu"
          :key="item.path"
          class="menu-item"
          @click="$router.push(item.path)"
        >
          {{ item.title }}
        </div>
      </nav>
    </aside>

    <main class="content" :class="{ fullscreen: isFullscreen }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isFullscreen = computed(() => {
  return route.query.fullscreen === '1';
});

// 从当前已注册路由生成菜单
const menu = computed(() => {
  const app = router.getRoutes().find(r => r.name === 'app');
  const children = app?.children || [];
  return children.map(r => ({
    path: `/app/${r.path}`,
    title: r.meta?.title || r.name
  }));
});
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 240px;
  background: #1f2937;
  color: #fff;
  padding: 16px;
}
.brand {
  font-weight: bold;
  margin-bottom: 16px;
}
.menu-item {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.menu-item:hover {
  background: #374151;
}
.content {
  flex: 1;
  background: #f3f4f6;
}
.content.fullscreen {
  width: 100vw;
  height: 100vh;
}
</style>
