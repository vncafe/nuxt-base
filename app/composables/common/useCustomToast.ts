import { ref } from "vue"

export type ToastType = "info" | "success" | "error" | "warning"

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
  visible: boolean
  timeout?: ReturnType<typeof setTimeout>
}
interface ToastOptions {
  type?: ToastType
  duration?: number
}

const toasts = ref<Toast[]>([])
let seed = 0

export function useCustomToast() {
  const push = (
    message: string,
    { type = "info", duration = 3000 }: ToastOptions = {},
  ) => {
    const id = seed++

    const toast: Toast = {
      id,
      message,
      type,
      duration,
      visible: true,
    }

    toast.timeout = setTimeout(() => {
      hide(id)
    }, duration)

    toasts.value.push(toast)
  }

  const success = (msg: string, duration?: number) =>
    push(msg, { type: "success", duration })

  const error = (msg: string, duration?: number) =>
    push(msg, { type: "error", duration })

  const hide = (id: number) => {
    const toast = toasts.value.find((t) => t.id === id)
    if (!toast) return

    toast.visible = false

    setTimeout(() => {
      remove(id)
    }, 300) // animation
  }

  const remove = (id: number) => {
    const toast = toasts.value.find((t) => t.id === id)

    if (toast?.timeout) {
      clearTimeout(toast.timeout)
    }

    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toasts,
    push,
    success,
    error,
    hide,
    remove,
  }
}
