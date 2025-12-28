// src/stores/ui.js
import { defineStore } from 'pinia';

const KEY = 'ems_sidebar_collapsed';

export const useUiStore = defineStore('ui', {
  state: () => ({
    sidebarCollapsed: localStorage.getItem(KEY) === '1'
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      localStorage.setItem(KEY, this.sidebarCollapsed ? '1' : '0');
    },
    setSidebar(val) {
      this.sidebarCollapsed = !!val;
      localStorage.setItem(KEY, this.sidebarCollapsed ? '1' : '0');
    }
  }
});
