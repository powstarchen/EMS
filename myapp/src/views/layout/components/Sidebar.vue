<template>
  <aside class="sidebar" :class="{ collapsed }">
    <!-- Brand -->
    <div class="brand">
      <span class="brand-text">{{ collapsed ? 'E' : 'EMS' }}</span>
    </div>

    <!-- Menu -->
    <nav class="menu">
      <ul class="nav">
        <template v-for="(item, idx) in menus" :key="idx">
          <!-- Header -->
          <li v-if="item.type === 'header'" class="nav-header">
            <span v-if="!collapsed">{{ item.title }}</span>
            <span v-else class="nav-header-dot">•</span>
          </li>

          <!-- Tree 节点 -->
          <li
            v-else-if="item.type === 'tree'"
            class="nav-item has-tree"
            :class="{ open: isOpen(item), active: isActiveTree(item) }"
          >
            <a
              href="javascript:;"
              class="nav-link"
              :title="collapsed ? item.title : ''"
              @click="onTreeClick(item)"
            >
              <span class="icon">
                <component :is="iconMap[item.icon] || DefaultIcon" />
              </span>

              <span v-if="!collapsed" class="text">{{ item.title }}</span>
              <span v-if="!collapsed" class="arrow">›</span>
            </a>

            <!-- 子菜单：只在非折叠 && open 时展示 -->
            <ul
              v-if="!collapsed"
              class="nav nav-treeview"
            >
              <li
                v-for="(c, cidx) in (item.children || [])"
                :key="cidx"
                class="nav-item"
                :class="{ active: isActive(c.path) }"
              >
                <router-link :to="c.path" class="nav-link sub-link">
                  <span class="sub-dot">•</span>
                  <span class="text">{{ c.title }}</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- 普通 item -->
          <li
            v-else
            class="nav-item"
            :class="{ active: isActive(item.path) }"
          >
            <router-link
              :to="item.path"
              class="nav-link"
              :title="collapsed ? item.title : ''"
            >
              <span class="icon">
                <component :is="iconMap[item.icon] || DefaultIcon" />
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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

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
  },
  collapsed: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();

const iconMap = { DataLine, Monitor, Histogram, Tools, Grid };
const DefaultIcon = DataLine;

/**
 * openKey：
 *   null  = 还没自动展开（第一次由路由决定）
 *   ''    = 用户主动关闭所有 tree
 *   title = 当前展开的 tree title
 */
const openKey = ref(null);

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/');
}

function isActiveTree(tree) {
  return (tree.children || []).some(c => isActive(c.path));
}

/**
 * 决定一个 tree 是否“展开”
 * 只看 openKey，不再被当前路由强行打开，
 * 但第一次会根据路由自动设置 openKey（在下面的 watch 里）
 */
function isOpen(tree) {
  if (props.collapsed) return false;
  return openKey.value === tree.title;
}

/**
 * 点击 tree 标题：展开 / 收起
 */
function onTreeClick(tree) {
  if (props.collapsed) return;

  if (openKey.value === tree.title) {
    // 用户显式关闭所有 tree
    openKey.value = '';
  } else {
    openKey.value = tree.title;
  }
}

/**
 * 首次根据当前路由自动展开一次：
 *   - 只有在 openKey === null 时才自动；
 *   - 一旦用户点过 tree（openKey 变为 '' 或某个 title），就不再自动修改。
 */
watch(
  () => route.path,
  () => {
    if (props.collapsed) return;
    if (openKey.value !== null) return; // 说明用户已经点过 / 或我们已经自动设过

    const hitTree = props.menus.find(
      m =>
        m.type === 'tree' &&
        (m.children || []).some(c => isActive(c.path))
    );

    openKey.value = hitTree ? hitTree.title : '';
  },
  { immediate: true }
);
</script>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #343a40;
  color: #c2c7d0;
  display: flex;
  flex-direction: column;
  transition: width .2s ease;
}

.sidebar.collapsed {
  width: 72px;
}

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

.menu {
  flex: 1;
  overflow-y: auto;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-header {
  padding: 10px 16px;
  font-size: 12px;
  color: #adb5bd;
  text-transform: uppercase;
}

.sidebar.collapsed .nav-header {
  text-align: center;
  padding: 10px 0;
}

.nav-header-dot {
  opacity: .6;
}

.nav-item {
  display: block;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #c2c7d0;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  user-select: none;
}

.nav-link:hover {
  background-color: #495057;
  color: #fff;
}

.nav-item.active > .nav-link {
  background-color: #007bff;
  color: #fff;
}

/* 图标 */
.icon {
  width: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.sidebar.collapsed .icon {
  width: 100%;
  margin-right: 0;
  justify-content: center;
}

/* Tree arrow */
.has-tree > .nav-link .arrow {
  margin-left: auto;
  transform: rotate(0deg);
  transition: transform .15s ease;
  opacity: .8;
}

.has-tree.open > .nav-link .arrow {
  transform: rotate(90deg);
}

/* 子菜单 */
.nav-treeview {
  list-style: none;
  padding: 0 0 8px 0;
  margin: 0;
}

.sub-link {
  padding-left: 28px;
  font-size: 13px;
}

.sub-dot {
  width: 20px;
  display: inline-flex;
  justify-content: center;
  margin-right: 10px;
  opacity: .8;
}

/* 激活的 tree 整体高亮 */
.has-tree.active > .nav-link {
  background: rgba(255,255,255,.06);
  color: #fff;
}
</style>
