import { UserStore } from '@/stores/users'

// 统一重置所有业务store
export function resetStores() {
    UserStore().$reset()
    // 新增store只需要在这里加一行，一处维护全局生效
}