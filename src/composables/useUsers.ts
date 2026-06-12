import { ref } from 'vue'

export type UserRole = 'user' | 'moderator' | 'admin'
export type UserStatus = 'active' | 'inactive'

export type User = {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

export const userRoleKeys: UserRole[] = ['user', 'moderator', 'admin']

export const roleClass: Record<UserRole, string> = {
  user: 'info',
  moderator: 'purple',
  admin: 'warning',
}

export const roleOptions = userRoleKeys.map((key) => ({
  value: key,
  class: roleClass[key],
}))

export const userStatusKeys: UserStatus[] = ['active', 'inactive']

export const userStatusClass: Record<UserStatus, string> = {
  active: 'success',
  inactive: 'danger',
}

export const userStatusOptions = userStatusKeys.map((key) => ({
  value: key,
  class: userStatusClass[key],
}))

const users = ref<User[]>([
  { id: 1, name: 'Ali Valiyev', email: 'ali@mail.com', role: 'user', status: 'active' },
  { id: 2, name: 'Dilnoza Karimova', email: 'dilnoza@mail.com', role: 'moderator', status: 'active' },
  { id: 3, name: 'Jasur Rahimov', email: 'jasur@mail.com', role: 'user', status: 'inactive' },
  { id: 4, name: 'Nodira Saidova', email: 'nodira@mail.com', role: 'admin', status: 'active' },
  { id: 5, name: 'Sardor Tursunov', email: 'sardor@mail.com', role: 'user', status: 'active' },
])

export function useUsers() {
  function generateUserId() {
    const ids = users.value.map((u) => u.id)
    const max = ids.length ? Math.max(...ids) : 0
    return max + 1
  }

  function addUser(user: User) {
    users.value.unshift(user)
  }

  function updateUser(updated: User) {
    const index = users.value.findIndex((u) => u.id === updated.id)
    if (index !== -1) {
      users.value[index] = updated
    }
  }

  function deleteUser(id: number) {
    users.value = users.value.filter((u) => u.id !== id)
  }

  return {
    users,
    generateUserId,
    addUser,
    updateUser,
    deleteUser,
  }
}
