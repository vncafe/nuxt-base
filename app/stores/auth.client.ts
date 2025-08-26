// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {

        return {
            isAuth: false,
            expiredAt: 1720000000,
            token: null as string | null
        }
    },
    actions: {
        login(token: string, expiredAt: number) {
            this.isAuth = true
            this.token = token
            this.expiredAt = expiredAt
        },
        logout() {
            this.isAuth = false
            this.token = null
        },
        setExpiredAt(expiredAt: number) {
            this.expiredAt = this.expiredAt + 1
        },
        setToken(token: string) {
            this.token = token
        },
        setIsAuth(isAuth: boolean) {
            this.isAuth = isAuth
        }
    },
    // persist: true // 👈 chỉ cần vậy, mặc định là localStorage
    persist: import.meta.client ? [{
        pick: ['token'], // lưu vào cookie
        key: 'bearer_token',
        debug: true
    },
    {
        storage: localStorage,
        pick: ['expiredAt', 'isAuth'],
        debug: true
    }] : false,
})
