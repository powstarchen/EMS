// src/stores/auth.js
import { defineStore } from 'pinia';
import { getAccessToken, getCurrentUser, clearAuthData } from '../api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getAccessToken() || '',
    user: getCurrentUser() || null,
    routesAdded: false,
    menu: []
  }),
  actions: {
    hydrateFromStorage() {
      this.token = getAccessToken() || '';
      this.user = getCurrentUser() || null;
    },
    setAuthFromLogin(res) {
      // res 是 Node-RED login 返回：{ access_token, refresh_token, user }
      this.token = res?.access_token || '';
      this.user = res?.user || null;
      this.routesAdded = false; // 登录后一定要重置，重新注入动态路由
      this.menu = [];
    },
    logout() {
      clearAuthData();
      this.token = '';
      this.user = null;
      this.routesAdded = false;
      this.menu = [];
    },
    setMenu(menu) {
      this.menu = menu;
    },
    markRoutesAdded() {
      this.routesAdded = true;
    }
  }
});
