<template>
  <aside class="sidebar">
    <!-- Brand -->
    <div class="brand">
      <span class="brand-text">EMS</span>
    </div>

    <!-- Menu -->
    <nav class="menu">
      <ul class="nav">
        <template v-for="(item, idx) in menus" :key="idx">
          <!-- Header -->
          <li v-if="item.type === 'header'" class="nav-header">
            {{ item.title }}
          </li>

          <!-- Normal item -->
          <li
            v-else
            class="nav-item"
            :class="{ active: isActive(item.path) }"
          >
            <router-link :to="item.path" class="nav-link">
              <span class="icon">
                <component
                  v-if="item.icon"
                  :is="iconMap[item.icon] || DefaultIcon"
                />
              </span>
              <span class="text">{{ item.title }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router';

// Element Plus Icons（你已安装）
import {
  DataLine,
  Monitor,
  Histogram,
  Tools,
  Grid
} from '@element-plus/icons-vue';

const props = defineProps({
  menus: {
    type: Array,
    required: true
  }
});

const route = useRoute();

// icon 名称 → 组件 映射（严格对齐 route-defs meta.icon）
const iconMap = {
  DataLine,
  Monitor,
  Histogram,
  Tools,
  Grid
};

// fallback icon
const DefaultIcon = DataLine;

function isActive(path) {
  return route.path.startsWith(path);
}
</script>

<style scoped>
/* ===== AdminLTE-ish Sidebar ===== */
.sidebar {
  width: 240px;
  background-color: #343a40;
  color: #c2c7d0;
  display: flex;
  flex-direction: column;
}

/* Brand */
.brand {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #2f343a;
  font-weight: bold;
  color: #fff;
}

.brand-text {
  font-size: 18px;
}

/* Menu */
.menu {
  flex: 1;
  overflow-y: auto;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Header */
.nav-header {
  padding: 10px 16px;
  font-size: 12px;
  color: #adb5bd;
  text-transform: uppercase;
}

/* Item */
.nav-item {
  display: block;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #c2c7d0;
  text-decoration: none;
  transition: background 0.2s;
}

.nav-link:hover {
  background-color: #495057;
  color: #fff;
}

/* Active */
.nav-item.active > .nav-link {
  background-color: #007bff;
  color: #fff;
}

/* Icon */
.icon {
  width: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.text {
  flex: 1;
}
</style>
