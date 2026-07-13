<script setup lang="ts">
</script>

<template>
  <div class="page">
    <h2>测试页面1</h2>
    <el-card shadow="hover">
      <template #header>
        <span>测试表格</span>
      </template>
      <el-table :data="[]" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="value" label="值" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
</style>