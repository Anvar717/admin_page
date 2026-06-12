<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon, { type IconName } from '../../components/icons/AppIcon.vue'
import OrderEditModal, { type Order } from '../../components/admin/OrderEditModal.vue'
import OrderDeleteModal from '../../components/admin/OrderDeleteModal.vue'
import { statusClass, useOrders } from '../../composables/useOrders'

const { t } = useI18n()
const { orders, updateOrder, deleteOrder } = useOrders()

const miniStats: { labelKey: string; value: string; icon: IconName }[] = [
  { labelKey: 'common.newItem', value: '24', icon: 'new' },
  { labelKey: 'common.inProgress', value: '18', icon: 'clock' },
  { labelKey: 'common.completed', value: '312', icon: 'check-circle' },
]

const editModalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingOrder = ref<Order | null>(null)
const deletingOrder = ref<Order | null>(null)

function openEdit(order: Order) {
  editingOrder.value = { ...order }
  editModalOpen.value = true
}

function openDelete(order: Order) {
  deletingOrder.value = { ...order }
  deleteModalOpen.value = true
}

function closeEditModal() {
  editModalOpen.value = false
  editingOrder.value = null
}

function closeDeleteModal() {
  deleteModalOpen.value = false
  deletingOrder.value = null
}

function saveOrder(updated: Order) {
  updateOrder(updated)
}

function confirmDelete() {
  if (!deletingOrder.value) return
  deleteOrder(deletingOrder.value.id)
  closeDeleteModal()
}
</script>

<template>
  <div class="admin-page">
    <section class="mini-stats">
      <article v-for="stat in miniStats" :key="stat.labelKey" class="ui-stat-card">
        <div class="ui-stat-top">
          <p class="ui-stat-label">{{ t(stat.labelKey) }}</p>
          <span class="ui-stat-icon">
            <AppIcon :name="stat.icon" :size="20" />
          </span>
        </div>
        <h2 class="ui-stat-value">{{ stat.value }}</h2>
      </article>
    </section>

    <div class="page-toolbar">
      <p class="toolbar-info">{{ t('orders.count', { n: orders.length }) }}</p>
      <RouterLink :to="{ name: 'order-create' }" class="create-btn">
        <AppIcon name="plus" :size="16" />
        {{ t('orders.newOrder') }}
      </RouterLink>
    </div>

    <article class="ui-card ui-card-flush">
      <div class="ui-table-wrap">
        <table class="ui-table">
          <thead>
            <tr>
              <th>{{ t('orders.colOrderId') }}</th>
              <th>{{ t('orders.colCustomer') }}</th>
              <th>{{ t('orders.colProduct') }}</th>
              <th>{{ t('orders.colAmount') }}</th>
              <th>{{ t('orders.colStatus') }}</th>
              <th>{{ t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="orders.length === 0">
              <td colspan="6" class="empty-cell">
                {{ t('orders.empty') }}
                <RouterLink :to="{ name: 'order-create' }">{{ t('orders.createFirst') }}</RouterLink>
              </td>
            </tr>
            <tr v-for="order in orders" :key="order.id">
              <td><strong>{{ order.id }}</strong></td>
              <td>{{ order.customer }}</td>
              <td>{{ order.product }}</td>
              <td>{{ order.amount }} {{ t('common.currency') }}</td>
              <td>
                <span class="ui-badge" :class="statusClass[order.status]">
                  {{ t(`status.${order.status}`) }}
                </span>
              </td>
              <td>
                <div class="action-btns">
                  <button type="button" class="action-btn edit" @click="openEdit(order)">
                    <AppIcon name="edit" :size="15" />
                    {{ t('common.edit') }}
                  </button>
                  <button type="button" class="action-btn delete" @click="openDelete(order)">
                    <AppIcon name="delete" :size="15" />
                    {{ t('common.delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <OrderEditModal
      :open="editModalOpen"
      :order="editingOrder"
      @close="closeEditModal"
      @save="saveOrder"
    />

    <OrderDeleteModal
      :open="deleteModalOpen"
      :order="deletingOrder"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.mini-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.page-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.toolbar-info {
  margin: 0;
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
}

.create-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: var(--radius-md);
  background: var(--gradient);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  box-shadow: var(--shadow-glow);
  transition: all var(--transition);
}

.create-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.empty-cell {
  text-align: center !important;
  padding: 40px 20px !important;
  color: var(--text);
}

.empty-cell a {
  color: var(--accent);
  font-weight: 500;
  text-decoration: none;
  margin-left: 6px;
}

.empty-cell a:hover {
  text-decoration: underline;
}

.action-btns {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-md);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.action-btn.edit {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--accent);
}

.action-btn.edit:hover {
  background: var(--accent-bg);
  border-color: var(--accent-border);
}

.action-btn.delete {
  border: 1px solid transparent;
  background: var(--danger-bg);
  color: var(--danger);
}

.action-btn.delete:hover {
  background: var(--danger);
  color: #fff;
}

@media (max-width: 768px) {
  .mini-stats {
    grid-template-columns: 1fr;
  }

  .page-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .create-btn {
    justify-content: center;
  }

  .action-btns {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
