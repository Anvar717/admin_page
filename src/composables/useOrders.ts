import { ref } from 'vue'

export type Order = {
  id: string
  customer: string
  product: string
  amount: string
  status: string
}

const orders = ref<Order[]>([
  { id: '#1024', customer: 'Ali Valiyev', product: 'Smartfon', amount: '4,500,000', status: 'Yangi' },
  { id: '#1023', customer: 'Dilnoza K.', product: 'Noutbuk', amount: '12,000,000', status: 'Tasdiqlangan' },
  { id: '#1022', customer: 'Jasur R.', product: 'Naushnik', amount: '320,000', status: 'Yetkazilmoqda' },
  { id: '#1021', customer: 'Nodira S.', product: 'Planshet', amount: '8,900,000', status: 'Bekor qilingan' },
  { id: '#1020', customer: 'Sardor T.', product: 'Soat', amount: '1,150,000', status: 'Yakunlangan' },
])

export const statusOptions = [
  { value: 'Yangi', class: 'info' },
  { value: 'Tasdiqlangan', class: 'purple' },
  { value: 'Yetkazilmoqda', class: 'warning' },
  { value: 'Bekor qilingan', class: 'danger' },
  { value: 'Yakunlangan', class: 'success' },
] as const

export const statusClass: Record<string, string> = {
  'Yangi': 'info',
  'Tasdiqlangan': 'purple',
  'Yetkazilmoqda': 'warning',
  'Bekor qilingan': 'danger',
  'Yakunlangan': 'success',
}

export function useOrders() {
  function generateOrderId() {
    const nums = orders.value
      .map((o) => parseInt(o.id.replace('#', ''), 10))
      .filter((n) => !Number.isNaN(n))
    const max = nums.length ? Math.max(...nums) : 1020
    return `#${max + 1}`
  }

  function addOrder(order: Order) {
    orders.value.unshift(order)
  }

  function updateOrder(updated: Order) {
    const index = orders.value.findIndex((o) => o.id === updated.id)
    if (index !== -1) {
      orders.value[index] = updated
    }
  }

  function deleteOrder(id: string) {
    orders.value = orders.value.filter((o) => o.id !== id)
  }

  return {
    orders,
    generateOrderId,
    addOrder,
    updateOrder,
    deleteOrder,
  }
}
