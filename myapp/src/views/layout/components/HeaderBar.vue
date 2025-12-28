<template>
  <header class="main-header">
    <div class="left">
      <!-- AdminLTE 风格：pushmenu 按钮（先只做样式/事件，后面可联动 sidebar 收缩） -->
      <button class="nav-btn" type="button" @click="$emit('toggleSidebar')">
        ☰
      </button>

      <div class="titles">
        <div class="page-title">{{ currentTitle }}</div>

        <nav class="breadcrumb">
          <span v-for="(c, i) in crumbs" :key="i" class="bc-item">
            <span v-if="i !== 0" class="sep">/</span>
            <span class="bc-text">{{ c }}</span>
          </span>
        </nav>
      </div>
    </div>

    <div class="right">
      <div class="userbox">
        <span class="user">{{ user?.username || 'Guest' }}</span>
        <span class="role" v-if="user?.role">({{ user.role }})</span>
      </div>

      <el-button size="small" type="danger" @click="logout">Logout</el-button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth';

const route = useRoute();
const router = useRouter();
const store = useAuthStore();

const user = computed(() => store.user);

/**
 * 在 store.menu 里找“当前 path 对应的标题”
 * menu 结构：
 * - {type:'header', title:'MAIN NAVIGATION'}
 * - {type:'item', path:'/app/ems', title:'EMS Data'}
 * - {type:'tree', title:'Reports', children:[{path:'/app/reports/daily', title:'Daily'}]}
 */
function findMenuHit(menus, path) {
  const list = Array.isArray(menus) ? menus : [];
  for (const m of list) {
    if (m.type === 'item' && m.path === path) return { group: null, title: m.title };
    if (m.type === 'tree') {
      if (m.path === path) return { group: null, title: m.title };
      const hit = (m.children || []).find(c => c.path === path);
      if (hit) return { group: m.title, title: hit.title };
    }
  }
  return null;
}

// route.path 有时是 /app/xxx；如果你后续会用 query，仍然不会影响 path 匹配
const hit = computed(() => findMenuHit(store.menu || [], route.path));

const currentTitle = computed(() => {
  // 1) 优先菜单命中
  if (hit.value?.title) return hit.value.title;
  // 2) 其次路由 meta.title
  if (route.meta?.title) return route.meta.title;
  // 3) 最后用 path
  return route.path;
});

const crumbs = computed(() => {
  // AdminLTE 风格：Group / Page
  if (hit.value?.group) return [hit.value.group, hit.value.title];
  if (hit.value?.title) return [hit.value.title];
  if (route.meta?.title) return [route.meta.title];
  return [route.path];
});

function logout() {
  store.logout();
  router.replace('/login');
}
</script>

<style scoped>
/* AdminLTE-ish header */
.main-header {
  width: 100%;
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.nav-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  line-height: 34px;
  font-size: 16px;
  color: #343a40;
}
.nav-btn:hover {
  background: #f8f9fa;
}

.titles {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.page-title {
  font-weight: 700;
  font-size: 15px;
  color: #343a40;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumb {
  margin-top: 2px;
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sep {
  margin: 0 6px;
  opacity: 0.8;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.userbox {
  display: flex;
  align-items: baseline;
  gap: 6px;
  color: #343a40;
  font-size: 13px;
}

.role {
  color: #6c757d;
  font-size: 12px;
}
</style>
