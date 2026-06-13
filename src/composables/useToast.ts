import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export type ToastItem = {
  id: number
  message: string
  type: ToastType
}

const toasts = ref<ToastItem[]>([])

export function useToast() {
  function showToast(message: string, type: ToastType = 'success', duration = 4000) {
    const id = Date.now()
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }

  function dismissToast(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toasts,
    showToast,
    dismissToast,
  }
}
