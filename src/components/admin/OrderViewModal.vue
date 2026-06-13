<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../icons/AppIcon.vue'
import { statusClass, type Order } from '../../composables/useOrders'

const props = defineProps<{
  open: boolean
  order: Order | null
}>()

const emit = defineEmits<{
  close: []
  edit: [order: Order]
}>()

const { t } = useI18n()

const statusBadgeClass = computed(() =>
  props.order ? statusClass[props.order.status] : 'info',
)

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

function handleEdit() {
  if (!props.order) return
  emit('edit', props.order)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open && order" class="modal-overlay" @click="handleBackdropClick">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="view-modal-title">
        <div class="modal-accent" />

        <div class="modal-header">
          <div class="header-left">
            <div class="header-icon">
              <AppIcon name="eye" :size="20" />
            </div>
            <div>
              <h2 id="view-modal-title">{{ t('orders.viewTitle') }}</h2>
              <span class="order-id">{{ order.id }}</span>
            </div>
          </div>
          <button type="button" class="close-btn" :aria-label="t('common.cancel')" @click="emit('close')">
            <AppIcon name="close" :size="18" />
          </button>
        </div>

        <div class="modal-body">
          <div class="status-banner" :class="`status-banner--${order.status}`">
            <div class="status-banner-left">
              <span class="status-label">{{ t('orders.status') }}</span>
              <span class="ui-badge status-badge" :class="statusBadgeClass">
                {{ t(`status.${order.status}`) }}
              </span>
            </div>
            <div class="status-icon">
              <AppIcon name="orders" :size="22" />
            </div>
          </div>

          <div class="customer-card">
            <span class="avatar">{{ order.customer[0] }}</span>
            <div>
              <p class="card-label">{{ t('orders.customer') }}</p>
              <strong>{{ order.customer }}</strong>
            </div>
          </div>

          <div class="details-grid">
            <article class="detail-card">
              <span class="detail-icon detail-icon--product">
                <AppIcon name="orders" :size="16" />
              </span>
              <div>
                <p>{{ t('orders.product') }}</p>
                <strong>{{ order.product }}</strong>
              </div>
            </article>

            <article class="detail-card detail-card--amount">
              <span class="detail-icon detail-icon--amount">
                <AppIcon name="revenue" :size="16" />
              </span>
              <div>
                <p>{{ t('orders.amount') }}</p>
                <strong>{{ order.amount }} <span>{{ t('common.currency') }}</span></strong>
              </div>
            </article>
          </div>

          <div class="summary-card">
            <div class="summary-row">
              <span>{{ t('orders.colOrderId') }}</span>
              <strong>{{ order.id }}</strong>
            </div>
            <div class="summary-row">
              <span>{{ t('orders.colCustomer') }}</span>
              <strong>{{ order.customer }}</strong>
            </div>
            <div class="summary-row">
              <span>{{ t('orders.colProduct') }}</span>
              <strong>{{ order.product }}</strong>
            </div>
            <div class="summary-row">
              <span>{{ t('orders.colAmount') }}</span>
              <strong>{{ order.amount }} {{ t('common.currency') }}</strong>
            </div>
            <div class="summary-row">
              <span>{{ t('orders.colStatus') }}</span>
              <span class="ui-badge" :class="statusBadgeClass">{{ t(`status.${order.status}`) }}</span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" @click="emit('close')">
            {{ t('orders.viewClose') }}
          </button>
          <button type="button" class="btn-primary" @click="handleEdit">
            <AppIcon name="edit" :size="16" />
            {{ t('common.edit') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  animation: fadeIn 0.2s ease;
}

.modal {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.18);
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.modal-accent {
  height: 4px;
  background: var(--gradient);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 24px 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.header-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--accent-bg);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.modal-header h2 {
  margin: 0 0 4px;
  font-size: 18px;
}

.order-id {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

.close-btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: all var(--transition);
}

.close-btn:hover {
  background: var(--danger-bg);
  border-color: transparent;
  color: var(--danger);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

.status-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.status-banner--new { background: linear-gradient(135deg, var(--info-bg) 0%, var(--bg) 100%); }
.status-banner--confirmed { background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, var(--bg) 100%); }
.status-banner--shipping { background: linear-gradient(135deg, var(--warning-bg) 0%, var(--bg) 100%); }
.status-banner--cancelled { background: linear-gradient(135deg, var(--danger-bg) 0%, var(--bg) 100%); }
.status-banner--done { background: linear-gradient(135deg, var(--success-bg) 0%, var(--bg) 100%); }

.status-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text);
  margin-bottom: 8px;
}

.status-badge {
  font-size: 13px;
  padding: 6px 14px;
}

.status-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.customer-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: var(--admin-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gradient);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.card-label {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text);
}

.customer-card strong {
  font-size: 16px;
  color: var(--text-h);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.detail-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.detail-card:hover {
  border-color: var(--accent-border);
  box-shadow: var(--shadow-sm);
}

.detail-card--amount {
  background: linear-gradient(135deg, var(--accent-bg) 0%, var(--bg) 100%);
}

.detail-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.detail-icon--product {
  background: rgba(99, 102, 241, 0.12);
  color: var(--accent);
}

.detail-icon--amount {
  background: rgba(16, 185, 129, 0.12);
  color: var(--success);
}

.detail-card p {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
}

.detail-card strong {
  font-size: 14px;
  color: var(--text-h);
  word-break: break-word;
}

.detail-card--amount strong span {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.summary-card {
  padding: 4px 16px;
  background: var(--admin-bg);
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--border);
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row span:first-child {
  color: var(--text);
}

.summary-row strong {
  color: var(--text-h);
  font-weight: 600;
  text-align: right;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px;
  border-top: 1px solid var(--border);
}

.btn-secondary,
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: var(--radius-md);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.btn-secondary {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-h);
}

.btn-secondary:hover {
  background: var(--admin-bg);
}

.btn-primary {
  border: none;
  background: var(--gradient);
  color: #fff;
  box-shadow: var(--shadow-glow);
}

.btn-primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 540px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
