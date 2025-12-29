<template>
  <header class="main-header">
    <!-- 左侧：标题 + 面包屑 -->
    <div class="left">
      <div class="page-title">{{ currentTitle }}</div>
      <div class="crumbs">
        <span v-for="(c, i) in crumbs" :key="i" class="crumb">
          <span v-if="i !== 0" class="sep">/</span>
          {{ c }}
        </span>
      </div>
    </div>

    <!-- 右侧：用户下拉 + Logout -->
    <div class="right">
      <el-dropdown trigger="click" v-if="user">
        <span class="user-trigger">
          {{ user.username }}
          <el-icon class="dropdown-icon">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goProfile">Profile</el-dropdown-item>
            <el-dropdown-item @click="goChangePassword">
              Change Password
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              Logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button
        v-else
        size="small"
        type="primary"
        @click="goLogin"
      >
        Login
      </el-button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth';
import { ArrowDown } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const store = useAuthStore();

const user = computed(() => store.user);

// === 1. 菜单标题 / 面包屑 ===
function findTitleByPath(menus, path) {
  for (const m of menus) {
    if (m.type === 'item' && m.path === path) {
      return { group: null, title: m.title };
    }
    if (m.type === 'tree') {
      if (m.path === path) return { group: null, title: m.title };
      const hit = (m.children || []).find(c => c.path === path);
      if (hit) return { group: m.title, title: hit.title };
    }
  }
  return null;
}

const match = computed(() => findTitleByPath(store.menu || [], route.path));

const currentTitle = computed(() => {
  // 优先用菜单里的 title，否则路由 meta.title，否则 path
  return match.value?.title || route.meta?.title || route.path;
});

const crumbs = computed(() => {
  if (match.value?.group) return [match.value.group, match.value.title];
  if (match.value?.title) return [match.value.title];
  if (route.meta?.title) return [route.meta.title];
  return [route.path];
});

// === 2. 用户动作 ===
function goProfile() {
  // 必须与 route-defs.js 中一致：/app/account/profile
  router.push('/app/account/profile');
}

function goChangePassword() {
  // ✅ 必须与 route-defs.js 中一致：/app/account/password
  router.push('/app/account/password');
}

function logout() {
  store.logout();
  router.replace('/login');
}

function goLogin() {
  router.push('/login');
}
</script>

<style scoped>
.main-header {
  width: 100%;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.left {
  display: flex;
  flex-direction: column;
}

.page-title {
  font-weight: 700;
  font-size: 16px;
  color: #343a40;
}

.crumbs {
  font-size: 12px;
  color: #6c757d;
  margin-top: 2px;
}

.crumb + .crumb {
  margin-left: 4px;
}

.sep {
  margin: 0 6px;
  opacity: 0.8;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 用户名触发器 */
.user-trigger {
  cursor: pointer;
  font-size: 13px;
  color: #343a40;
  display: inline-flex;
  align-items: center;
}

.dropdown-icon {
  margin-left: 4px;
  font-size: 14px;
}
</style>
