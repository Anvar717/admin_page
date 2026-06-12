import { computed, ref } from 'vue'

const TOKEN_KEY = 'auth_token'

export const STATIC_LOGIN = 'admin'
export const STATIC_PASSWORD = '12345'

const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(login: string, password: string): Promise<string | null> {
    if (login !== STATIC_LOGIN || password !== STATIC_PASSWORD) {
      return 'Login yoki parol noto\'g\'ri'
    }

    const authToken = btoa(`${login}:${Date.now()}`)
    token.value = authToken
    localStorage.setItem(TOKEN_KEY, authToken)
    return null
  }

  function logout() {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
}
