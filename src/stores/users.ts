import {defineStore} from 'pinia'
import {setToken, removeToken, getToken} from '@/utils/storage'
import {apiLogin, apiRegister, apiGetProfile, type ProfileResponse, type LoginRequest} from '@/api/users'
import router from "@/router";
import {resetStores} from "@/utils/resetStores.ts";

export const UserStore = defineStore('user', {
    state: () => ({
        token: getToken(),
        profile: null as ProfileResponse | null,
    }),
    getters: {
        hasToken: (state) => !!state.token,
    },
    actions: {
        async login(username: string, password: string){
            const ret = await apiLogin({username, password})
            this.token = ret.data.token
            setToken(ret.data.token)
            return ret
        },
        async register(username: string, password: string) {
            const ret = await apiRegister({ username, password })
            return ret
        },
        async getProfile() {
            const ret = await apiGetProfile()
            this.profile = ret.data
        },
        logout() {
            removeToken()
            resetStores()
            router.push('/auth');
        }
    },
})