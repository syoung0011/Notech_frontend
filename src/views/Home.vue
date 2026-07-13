<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { removeToken } from "@/utils/storage.ts"

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)
const handleLogout = () => {
  removeToken()
  ElMessage.success('已退出登录')
  router.push('/auth')
}
const handleProfile = () => ElMessage.info('个人信息功能开发中')
const handleHelp = () => ElMessage.info('帮助中心功能开发中')
</script>

<template>
  <!-- 最外层根容器：垂直布局，铺满整个视口 -->
  <el-container class="root-container">
    <!-- 顶栏，直接父级是el-container，符合规范 -->
    <el-header class="top-header">
      <div class="header-left">
        <el-icon :size="16"><Notebook /></el-icon>
        <span style="font-size: 20px;"> Notech </span>
      </div>
      <div class="header-right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon :size="20"><User/></el-icon>
            <span>用户名</span>
            <el-icon :size="14"><ArrowDown/></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleProfile">
                <el-icon :size="16"><User/></el-icon>
                <span>个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item @click="handleHelp">
                <el-icon :size="16"><Help/></el-icon>
                <span>帮助中心</span>
              </el-dropdown-item>
              <el-dropdown-item @click="handleLogout">
                <el-icon :size="16"><SwitchButton/></el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 内层横向容器：占剩余全部高度 -->
    <el-container class="body-container">
      <el-aside :width="isCollapse ? '64px' : '160px'" class="aside-wrap">
        <div class="collapse-toggle" @click="isCollapse = !isCollapse">
          <el-icon :size="32">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
        </div>
        <!-- 上部可滚动菜单 -->
        <div class="scroll-menu-wrap">
          <el-menu :default-active="route.path" :router="true" :collapse="isCollapse" style="border-right: none;">
            <el-menu-item index="/dashboard">
              <el-icon><HomeFilled /></el-icon>
              <template #title>看板</template>
            </el-menu-item>
            <el-menu-item index="/test1">
              <el-icon><Document /></el-icon>
              <template #title>测试页面1</template>
            </el-menu-item>
            <el-menu-item index="/test2">
              <el-icon><Setting /></el-icon>
              <template #title>测试页面2</template>
            </el-menu-item>
            <el-menu-item index="/test3">
              <el-icon><Help /></el-icon>
              <template #title>测试页面3</template>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 底部固定菜单 -->
        <div class="fixed-bottom-menu">
          <el-menu :collapse="isCollapse" style="border-right: none;">
            <el-menu-item index="profile" @click="handleProfile">
              <el-icon><User /></el-icon>
              <template #title>个人信息</template>
            </el-menu-item>
            <el-menu-item index="logout" @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>
              <template #title>退出登录</template>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.root-container {
  height: 100%;
  flex-direction: column !important;
  overflow: hidden;
}

/* 顶部Header固定高度，不压缩 */
.top-header {
  height: 40px;
  flex-shrink: 0;
  padding: 0 32px;
  border-bottom: 2px solid #81c5f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 内层主体容器：自动填充Header剩下的全部高度 */
.body-container {
  flex: 1;
  height: 0; /* 修复flex子元素内容撑高溢出bug */
}

/* 侧边栏垂直弹性布局 */
.aside-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
}

/* 折叠切换按钮 */
.collapse-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;
  transition: background-color 0.2s;
}

/* 上方菜单自动填充剩余高度，超出滚动 */
.scroll-menu-wrap {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}

/* 底部菜单固定不滚动 */
.fixed-bottom-menu {
  flex-shrink: 0;
  border-top: 1px solid #e6e6e6;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>