import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/storage'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth', name: 'auth',meta: { isPublic: true },
    component: () => import('@/views/users/Auth.vue'),
  },
  {
    path: '/', name: 'home',redirect: '/dashboard',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/dashboard', name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/test1', name: 'test1',
        component: () => import('@/views/tests/Test1.vue'),
      },
      {
        path: '/test2', name: 'test2',
        component: () => import('@/views/tests/Test2.vue'),
      },
      {
        path: '/test3', name: 'test3',
        component: () => import('@/views/tests/Test3.vue'),
      },
    ],
  },
  {
    path: '/:PathMatch(.*)*', redirect: '/dashboard',
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to: RouteLocationNormalized) => {
  const hasToken = !!getToken()
  if (!hasToken && !to.meta.isPublic) {
    return { path: '/auth', query: { redirect: to.fullPath } }
  }
  if (hasToken && to.path === '/auth') {
    return { path: '/' }
  }
})

export default router