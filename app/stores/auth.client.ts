// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {

        return {
            isAuth: false,
            expiredAt: 1720000000,
            accessToken: null as string | null
        }
    },
    actions: {
        login(accessToken: string, expiredAt: number) {
            this.isAuth = true
            this.accessToken = accessToken
            this.expiredAt = expiredAt
        },
        logout() {
            this.isAuth = false
            this.accessToken = null
        },
        setExpiredAt(expiredAt: number) {
            this.expiredAt = expiredAt
        },
        setToken(token: string) {
            this.accessToken = token
        },
        setIsAuth(isAuth: boolean) {
            this.isAuth = isAuth
        }
    },
    // persist: true // 👈 chỉ cần vậy, mặc định là localStorage
    persist: import.meta.client ? [{
        pick: ['accessToken'], // lưu vào cookie
        key: 'bearer_token',
        debug: true
    },
    {
        storage: localStorage,
        pick: ['expiredAt', 'isAuth'],
        debug: true
    }] : false,
})
