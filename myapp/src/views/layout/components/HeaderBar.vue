<template>
  <header class="main-header">
    <div class="left">
      <button class="toggle" type="button" @click="$emit('toggle-sidebar')" title="Toggle sidebar">
        ☰
      </button>

      <div class="titles">
        <div class="page-title">{{ currentTitle }}</div>
        <div class="crumbs">
          <span v-for="(c, i) in crumbs" :key="i" class="crumb">
            <span v-if="i !== 0" class="sep">/</span>
            {{ c }}
          </span>
        </div>
      </div>
    </div>

    <div class="right">
      <el-dropdown trigger="click">
        <span class="user">
          {{ user?.username }}
          <span class="caret">▼</span>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goChangePassword">Change Password</el-dropdown-item>
            <el-dropdown-item divided @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth';

defineEmits(['toggle-sidebar']);

const route = useRoute();
const router = useRouter();
const store = useAuthStore();

const user = computed(() => store.user);

function findTitleByPath(menus, path) {
  for (const m of menus) {
    if (m.type === 'item' && m.path === path) return { group: null, title: m.title };
    if (m.type === 'tree') {
      if (m.path === path) return { group: null, title: m.title };
      const hit = (m.children || []).find(c => c.path === path);
      if (hit) return { group: m.title, title: hit.title };
    }
  }
  return null;
}

const match = computed(() => findTitleByPath(store.menu || [], route.path));

const currentTitle = computed(() => match.value?.title || route.meta?.title || route.path);

const crumbs = computed(() => {
  if (match.value?.group) return [match.value.group, match.value.title];
  if (match.value?.title) return [match.value.title];
  if (route.meta?.title) return [route.meta.title];
  return [route.path];
});

function goChangePassword() {
  router.push('/app/profile/password');
}

function logout() {
  store.logout();
  router.replace('/login');
}
</script>

<style scoped>
.main-header{
  width: 100%;
  height:56px;
  background:#fff;
  border-bottom:1px solid #e6e6e6;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 16px;
}

.left{display:flex; align-items:center; gap:12px; min-width:0}
.toggle{
  border:0;
  background:transparent;
  font-size:18px;
  cursor:pointer;
  width:36px;
  height:36px;
  border-radius:8px;
}
.toggle:hover{background:#f1f1f1}

.titles{display:flex; flex-direction:column; min-width:0}
.page-title{font-weight:700; font-size:16px; color:#343a40; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.crumbs{font-size:12px; color:#6c757d; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.sep{margin:0 6px; opacity:.8}

.right{display:flex; align-items:center; gap:10px}
.user{font-size:13px; color:#343a40; cursor:pointer; user-select:none}
.caret{font-size:10px; margin-left:6px; opacity:.7}
</style>
