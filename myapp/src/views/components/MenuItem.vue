<template>
  <div>
    <router-link
      v-if="!item.children"
      :to="item.path"
      class="menu-item"
      active-class="active"
    >
      {{ item.meta?.title }}
    </router-link>

    <div v-else class="menu-group">
      <div class="menu-title">
        {{ item.meta?.title }}
      </div>
      <MenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
});
</script>

<style scoped>
.menu-item {
  display: block;
  padding: 10px 16px;
  color: #c2c7d0;
  text-decoration: none;
}

.menu-item:hover {
  background: #495057;
  color: #fff;
}

.active {
  background: #007bff;
  color: #fff;
}

.menu-title {
  padding: 10px 16px;
  font-size: 12px;
  color: #adb5bd;
}
</style>
