<template>
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :lg="16">
      <div>
        <div class="font-bold test-5xl text-light-50 nm-4">Enermy Monitor System</div>
      </div>
    </el-col>
    <el-col :lg="8" class="bg-indigo-50 flex flex-col">
      <h2 class="font-bold text-3xl text-gray-800">User Login</h2>
      <div class="flex item-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>AAAAAA</span>
        <span class="h-[1px] w16 bg-gray-200">BBBBBB</span>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
