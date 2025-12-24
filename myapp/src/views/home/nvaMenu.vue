<template>
    <el-aside width="200px" class="aside">
        <el-icon><HomeFilled /></el-icon>
            <span>Home</span>
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo">

            <el-sub-menu index="1">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Floor Plan</span>
                </template>
                
                <el-menu-item index="1-1">
                    <el-icon><ArrowRight /></el-icon>
                    <template #title>Level 22</template>
                </el-menu-item>

                <el-menu-item index="1-2">
                    <el-icon><ArrowRight /></el-icon>
                    <template #title>lEVEL 23</template>
                </el-menu-item>

            </el-sub-menu>

            <el-menu-item index="2">
                <el-icon><SetUp /></el-icon>
                <template #title>Electrical</template>
            </el-menu-item>

            <el-menu-item index="3">
                <el-icon><Odometer /></el-icon>
                <template #title>Equipments</template>
            </el-menu-item>

            <el-menu-item index="4">
                <el-icon><DataLine /></el-icon>
                <template #title>Dashboard</template>
            </el-menu-item>

        </el-menu>
    </el-aside>
</template>


<script setup>
    import {ref, reactive} from 'vue'
    import {
        Document,
        ArrowRight,
        Menu as IconMenu,
        HomeFilled,
        DataLine,
        SetUp,
        Odometer,
        Setting,
    } from '@element-plus/icons-vue'

</script>