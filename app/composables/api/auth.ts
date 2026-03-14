import { ref } from "vue"
import {
  login as loginService,
  logout as logoutService,
} from "~/services/auth.service"
import type { LoginRequest } from "~/types/api/auth"

export function useAuthApi() {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const login = async (credentials: LoginRequest) => {
    try {
      loading.value = true
      error.value = null
      const data = await loginService(credentials)
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error(String(err))
      error.value = errorMessage
      return { data: null, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      error.value = null
      const data = await logoutService()
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error(String(err))
      error.value = errorMessage
      return { data: null, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    login,
    logout,
  }
}
