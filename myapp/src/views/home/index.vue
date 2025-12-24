<template>
    <!-- <el-container>
      <nvaMenu />
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container> -->
    <div id = "module">
    <el-container>
      <nvaMenu />
      <el-container>
        <el-header>
          <el-button type="primary">Exit</el-button>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
  import {ref, reactive} from 'vue'
  import '../../assets/css/style.css'
  import nvaMenu from './nvaMenu.vue'
</script>
