<template>
  <aside class="sidebar" :class="{ collapsed }">
    <!-- Brand -->
    <div class="brand">
      <span class="brand-text">EMS</span>
    </div>

    <nav class="menu">
      <ul class="nav">
        <template v-for="(item, idx) in menus" :key="idx">
          <!-- Header -->
          <li v-if="item.type === 'header'" class="nav-header">
            <span v-if="!collapsed">{{ item.title }}</span>
            <span v-else class="dot">•</span>
          </li>

          <!-- Tree -->
          <li
            v-else-if="item.type === 'tree'"
            class="nav-item has-tree"
            :class="{ open: isOpen(item), active: isActiveTree(item) }"
          >
            <a
              href="javascript:;"
              class="nav-link"
              :title="collapsed ? item.title : ''"
              @click="toggleTree(item)"
            >
              <span class="icon">
                <component :is="iconMap[item.icon] || DefaultIcon" />
              </span>

              <span v-if="!collapsed" class="text">{{ item.title }}</span>

              <span v-if="!collapsed" class="arrow">›</span>
            </a>

            <ul v-if="!collapsed" class="nav nav-treeview">
              <li
                v-for="(c, cidx) in item.children"
                :key="cidx"
                class="nav-item"
                :class="{ active: isActive(c.path) }"
              >
                <router-link :to="c.path" class="nav-link">
                  <span class="icon small">•</span>
                  <span class="text">{{ c.title }}</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Item -->
          <li
            v-else
            class="nav-item"
            :class="{ active: isActive(item.path) }"
          >
            <router-link :to="item.path" class="nav-link" :title="collapsed ? item.title : ''">
              <span class="icon">
                <component
                  v-if="item.icon"
                  :is="iconMap[item.icon] || DefaultIcon"
                />
              </span>
              <span v-if="!collapsed" class="text">{{ item.title }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../../stores/auth';

import { DataLine, Monitor, Histogram, Tools, Grid } from '@element-plus/icons-vue';

const props = defineProps({
  menus: { type: Array, required: true },
  collapsed: { type: Boolean, default: false }
});

const route = useRoute();
const store = useAuthStore();

const iconMap = { DataLine, Monitor, Histogram, Tools, Grid };
const DefaultIcon = DataLine;

// 记录当前展开的 tree：用 title 做 key（简化）
const openKey = ref('');

// 如果当前路由落在某个 tree 的 child 下，自动展开该 tree（仅在非 collapsed）
watch(
  () => route.path,
  () => {
    if (props.collapsed) return;
    const hit = (store.menu || []).find(m =>
      m.type === 'tree' && (m.children || []).some(c => c.path === route.path)
    );
    if (hit) openKey.value = hit.title;
  },
  { immediate: true }
);

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/');
}

function isActiveTree(tree) {
  return (tree.children || []).some(c => isActive(c.path));
}

function isOpen(tree) {
  // active 的 tree 优先展开（非 collapsed）
  if (props.collapsed) return false;
  return openKey.value === tree.title || isActiveTree(tree);
}

function toggleTree(tree) {
  if (props.collapsed) return;
  openKey.value = openKey.value === tree.title ? '' : tree.title;
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
  transition: width 0.2s ease;
}

.sidebar.collapsed {
  width: 72px;
}

/* Brand */
.brand {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #2f343a;
  color: #fff;
  font-weight: 700;
}

.sidebar.collapsed .brand-text {
  font-size: 16px;
}

/* Menu */
.menu {
  flex: 1;
  overflow-y: auto;
}

.nav { list-style: none; padding: 0; margin: 0; }

/* Header */
.nav-header {
  padding: 10px 16px;
  font-size: 12px;
  color: #adb5bd;
  text-transform: uppercase;
}
.sidebar.collapsed .nav-header { text-align: center; }
.dot { opacity: .6; }

/* Links */
.nav-item { display: block; }

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #c2c7d0;
  text-decoration: none;
  transition: background 0.2s;
  user-select: none;
}

.nav-link:hover { background-color: #495057; color: #fff; }

.nav-item.active > .nav-link {
  background-color: #007bff;
  color: #fff;
}

/* Tree styles */
.has-tree > .nav-link .arrow {
  margin-left: auto;
  transform: rotate(0deg);
  transition: transform .15s ease;
  opacity: .8;
}
.has-tree.open > .nav-link .arrow { transform: rotate(90deg); }

.nav-treeview {
  list-style: none;
  padding: 0 0 8px 0;
  margin: 0;
}

.nav-treeview .nav-link {
  padding-left: 28px;
  font-size: 13px;
}

.icon {
  width: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.sidebar.collapsed .icon { margin-right: 0; justify-content: center; width: 100%; }
.text { flex: 1; }
.small { width: 20px; margin-right: 10px; opacity: .8; }
</style>
