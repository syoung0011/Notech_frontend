<script setup lang="ts">
</script>

<template>
  <div class="dashboard">
    <h2>仪表盘</h2>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <el-icon :size="32"><User /></el-icon>
            <span>用户总数</span>
          </div>
          <div class="card-value">123</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <el-icon :size="32"><Document /></el-icon>
            <span>文档数量</span>
          </div>
          <div class="card-value">456</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <el-icon :size="32"><Star /></el-icon>
            <span>收藏数</span>
          </div>
          <div class="card-value">789</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <el-icon :size="32"><TrendCharts/></el-icon>
            <span>今日访问</span>
          </div>
          <div class="card-value">101</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <span>最近活动</span>
          </template>
          <el-timeline>
            <el-timeline-item>用户 A 登录系统</el-timeline-item>
            <el-timeline-item>用户 B 创建了文档</el-timeline-item>
            <el-timeline-item>用户 C 收藏了文章</el-timeline-item>
            <el-timeline-item>用户 D 修改了个人信息</el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <span>快速操作</span>
          </template>
          <el-button type="primary" style="width: 100%; margin-bottom: 10px;">创建文档</el-button>
          <el-button style="width: 100%; margin-bottom: 10px;">导入数据</el-button>
          <el-button style="width: 100%;">导出报告</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-card v-for="i in 16" :key="i">
      <template #header>
        <span>系统统计{{i}}</span>
      </template>
      <el-alert type="info" message="当前系统版本：1.0.0" show-icon></el-alert>
      <el-divider></el-divider>
      <el-timeline>
        <el-timeline-item>用户 A 登录系统</el-timeline-item>
        <el-timeline-item>用户 B 创建了文档</el-timeline-item>
        <el-timeline-item>用户 C 收藏了文章</el-timeline-item>
        <el-timeline-item>用户 D 修改了个人信息</el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #999;
}

.card-value {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}
</style>