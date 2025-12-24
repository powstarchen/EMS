<template>
    <div>
        <el-result
        icon="warning"
        title="404"
        sub-title="Not Found"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">Back</el-button>
        </template>
      </el-result>
    </div>
</template>