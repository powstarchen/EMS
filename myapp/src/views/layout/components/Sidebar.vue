<template>
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-text">EMS</span>
    </div>

    <nav class="menu">
      <ul class="nav">
        <template v-for="(item, idx) in menus" :key="idx">
          <!-- Header -->
          <li v-if="item.type === 'header'" class="nav-header">
            {{ item.title }}
          </li>

          <!-- Tree -->
          <li v-else-if="item.type === 'tree'" class="nav-item has-tree" :class="{ open: isOpen(item) }">
            <a class="nav-link" href="javascript:void(0)" @click="toggle(item)">
              <span class="icon">
                <component v-if="item.icon" :is="iconMap[item.icon] || DefaultIcon" />
              </span>
              <span class="text">{{ item.title }}</span>
              <span class="arrow">›</span>
            </a>

            <ul class="nav nav-tree">
              <li v-for="(ch, cidx) in item.children" :key="cidx" class="nav-item" :class="{ active: isActive(ch.path) }">
                <router-link :to="ch.path" class="nav-link sub">
                  <span class="icon">
                    <component v-if="ch.icon" :is="iconMap[ch.icon] || DefaultIcon" />
                  </span>
                  <span class="text">{{ ch.title }}</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Normal item -->
          <li v-else class="nav-item" :class="{ active: isActive(item.path) }">
            <router-link :to="item.path" class="nav-link">
              <span class="icon">
                <component v-if="item.icon" :is="iconMap[item.icon] || DefaultIcon" />
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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DataLine, Monitor, Histogram, Tools, Grid } from '@element-plus/icons-vue';

const props = defineProps({
  menus: { type: Array, required: true }
});

const route = useRoute();

const iconMap = { DataLine, Monitor, Histogram, Tools, Grid };
const DefaultIcon = DataLine;

// 记录展开的 tree（用 name/path 都行，这里用 path）
const openMap = ref({});

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/');
}

function isOpen(tree) {
  // 1) 手动打开优先
  if (openMap.value[tree.path]) return true;
  // 2) 当前路由在该 tree 下则自动展开
  return route.path.startsWith(tree.path);
}

function toggle(tree) {
  openMap.value[tree.path] = !openMap.value[tree.path];
}

// 路由变化时：自动打开当前 tree（让体验像 AdminLTE）
watch(
  () => route.path,
  () => {
    for (const it of props.menus) {
      if (it.type === 'tree' && route.path.startsWith(it.path)) {
        openMap.value[it.path] = true;
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.sidebar {
  width: 260px;
  background-color: #343a40;
  color: #c2c7d0;
  display: flex;
  flex-direction: column;
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
.brand-text { font-size: 18px; }

.menu { flex: 1; overflow-y: auto; }
.nav { list-style: none; padding: 0; margin: 0; }

.nav-header {
  padding: 10px 16px;
  font-size: 12px;
  color: #adb5bd;
  text-transform: uppercase;
}

.nav-item { display: block; }
.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #c2c7d0;
  text-decoration: none;
  transition: background 0.2s;
}
.nav-link:hover { background-color: #495057; color: #fff; }
.nav-item.active > .nav-link { background-color: #007bff; color: #fff; }

.icon {
  width: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.text { flex: 1; }

/* Tree */
.has-tree > .nav-link { position: relative; }
.arrow {
  transform: rotate(0deg);
  transition: transform 0.2s;
  opacity: 0.9;
}
.has-tree.open .arrow { transform: rotate(90deg); }

.nav-tree {
  padding-left: 12px;
  background: rgba(255,255,255,0.03);
}
.nav-link.sub { padding-left: 28px; font-size: 13px; }
</style>
