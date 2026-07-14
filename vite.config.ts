import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 新增：配置开发服务器代理，解决跨域问题
  server: {
    proxy: {
      // 拦截所有以 /api 开头的请求
      '/api': {
        target: 'http://localhost:8000', // 你的 FastAPI 后端地址
        changeOrigin: true, // 允许跨域
        // 注意：因为你的后端路由本身就是 /api/v1 开头，所以这里不需要 rewrite 去掉前缀！
      }
    }
  }
})