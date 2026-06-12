import { ref } from 'vue'

export type OrderStatus = 'new' | 'confirmed' | 'shipping' | 'cancelled' | 'done'

export type Order = {
  id: string
  customer: string
  product: string
  amount: string
  status: OrderStatus
}

export const orderStatusKeys: OrderStatus[] = [
  'new', 'confirmed', 'shipping', 'cancelled', 'done',
]

export const statusClass: Record<OrderStatus, string> = {
  new: 'info',
  confirmed: 'purple',
  shipping: 'warning',
  cancelled: 'danger',
  done: 'success',
}

export const statusOptions = orderStatusKeys.map((key) => ({
  value: key,
  class: statusClass[key],
}))

const orders = ref<Order[]>([
  { id: '#1024', customer: 'Ali Valiyev', product: 'Smartfon', amount: '4,500,000', status: 'new' },
  { id: '#1023', customer: 'Dilnoza K.', product: 'Noutbuk', amount: '12,000,000', status: 'confirmed' },
  { id: '#1022', customer: 'Jasur R.', product: 'Naushnik', amount: '320,000', status: 'shipping' },
  { id: '#1021', customer: 'Nodira S.', product: 'Planshet', amount: '8,900,000', status: 'cancelled' },
  { id: '#1020', customer: 'Sardor T.', product: 'Soat', amount: '1,150,000', status: 'done' },
])

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
