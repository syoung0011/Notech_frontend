<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({})
</script>

<template>
  <div class="page">
    <h2>测试页面2</h2>
    <el-card shadow="hover">
      <template #header>
        <span>测试表单</span>
      </template>
      <el-form :model="form" label-width="100px">
        <el-form-item label="输入框">
          <el-input placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="选择器">
          <el-select placeholder="请选择">
            <el-option label="选项1" value="1" />
            <el-option label="选项2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
</style>