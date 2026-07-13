import {defineStore} from 'pinia'
import {setToken, removeToken} from '@/utils/storage'
import {login as apiLogin, register as apiRegister} from '@/api/users'

export const UserStore = defineStore('user', {
    state: () => ({
        form: {
            username: '',
            password: '',
            confirmPassword: '',
            agreement: false,
        },
    }),
    getters: {
    },
    actions: {
        async login(username: string, password: string): Promise<boolean> {
            try {
                const res = await apiLogin({username, password})
                if (res.code === 200) {
                    setToken(res.data.token)
                    return true
                }
                return false
            } catch {
                return false
            }
        },
        async register(username: string, password: string): Promise<boolean> {
            try {
                const res = await apiRegister({username, password})
                return res.code === 200
            } catch {
                return false
            }
        },
    },
})