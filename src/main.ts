import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 导入所有图标
// 导入全局样式，放在最顶部优先加载
import '@/assets/styles/global.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 遍历并全局注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')