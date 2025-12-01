// stores/auth.ts
import { defineStore } from 'pinia'
type AuthState = {
  isAuth: boolean
  expiredAt: number
  accessToken: string | null | undefined
}
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      isAuth: false,
      expiredAt: 1_720_000_000,
      accessToken: undefined,
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
      this.accessToken = undefined
    },
    setExpiredAt(expiredAt: number) {
      this.expiredAt = expiredAt
    },
    setToken(token: string) {
      this.accessToken = token
    },
    setIsAuth(isAuth: boolean) {
      this.isAuth = isAuth
    },
  },
  // persist: true // 👈 chỉ cần vậy, mặc định là localStorage
  persist: import.meta.client
    ? [
        {
          pick: ['accessToken'], // lưu vào cookie
          key: 'bearer_token',
          debug: true,
        },
        {
          storage: localStorage,
          pick: ['expiredAt', 'isAuth'],
          debug: true,
        },
      ]
    : false,
})
