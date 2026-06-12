<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../components/icons/AppIcon.vue'
import { statusOptions, useOrders, type OrderStatus } from '../../composables/useOrders'

const router = useRouter()
const { t } = useI18n()
const { generateOrderId, addOrder } = useOrders()

const form = ref({
  customer: '',
  product: '',
  amount: '',
  status: 'new' as OrderStatus,
})

const orderId = computed(() => generateOrderId())

const selectedStatus = computed(
  () => statusOptions.find((s) => s.value === form.value.status) ?? statusOptions[0],
)

function handleSubmit() {
  addOrder({
    id: orderId.value,
    customer: form.value.customer.trim(),
    product: form.value.product.trim(),
    amount: form.value.amount.trim(),
    status: form.value.status,
  })
  router.push({ name: 'orders' })
}

function handleCancel() {
  router.push({ name: 'orders' })
}

function setStatus(status: OrderStatus) {
  form.value.status = status
}
</script>

<template>
  <div class="admin-page create-page">
    <div class="page-top">
      <button type="button" class="back-btn" @click="handleCancel">
        <AppIcon name="arrow-left" :size="16" />
        {{ t('common.back') }}
      </button>
      <div class="page-title">
        <h2>{{ t('orders.createPageTitle') }}</h2>
        <p>{{ t('orders.createPageDesc') }}</p>
      </div>
    </div>

    <div class="create-layout">
      <article class="form-card">
        <div class="card-accent" />

        <div class="card-header">
          <div class="header-icon">
            <AppIcon name="plus" :size="22" />
          </div>
          <div>
            <h3>{{ t('orders.createTitle') }}</h3>
            <span class="order-id">{{ orderId }}</span>
          </div>
        </div>

        <form class="form-body" @submit.prevent="handleSubmit">
          <div class="form-grid">
            <label class="field">
              <span class="field-label">
                <AppIcon name="user" :size="14" />
                {{ t('orders.customer') }}
              </span>
              <input
                v-model="form.customer"
                type="text"
                :placeholder="t('orders.customerPlaceholder')"
                required
              />
            </label>

            <label class="field">
              <span class="field-label">
                <AppIcon name="orders" :size="14" />
                {{ t('orders.product') }}
              </span>
              <input
                v-model="form.product"
                type="text"
                :placeholder="t('orders.productPlaceholder')"
                required
              />
            </label>
          </div>

          <label class="field">
            <span class="field-label">
              <AppIcon name="revenue" :size="14" />
              {{ t('orders.amount') }}
            </span>
            <div class="amount-input">
              <input
                v-model="form.amount"
                type="text"
                :placeholder="t('orders.amountPlaceholder')"
                required
              />
              <span class="currency">{{ t('common.currency') }}</span>
            </div>
          </label>

          <div class="field">
            <span class="field-label">
              <AppIcon name="activity" :size="14" />
              {{ t('orders.status') }}
            </span>
            <div class="status-grid">
              <button
                v-for="status in statusOptions"
                :key="status.value"
                type="button"
                class="status-pill"
                :class="[status.class, { active: form.status === status.value }]"
                @click="setStatus(status.value)"
              >
                {{ t(`status.${status.value}`) }}
              </button>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="handleCancel">
              {{ t('common.cancel') }}
            </button>
            <button type="submit" class="btn-primary">
              <AppIcon name="plus" :size="16" />
              {{ t('orders.createSubmit') }}
            </button>
          </div>
        </form>
      </article>

      <aside class="preview-card">
        <h4>{{ t('common.preview') }}</h4>
        <p class="preview-desc">{{ t('orders.createPreviewDesc') }}</p>

        <div class="preview-item">
          <span>{{ t('orders.colOrderId') }}</span>
          <strong>{{ orderId }}</strong>
        </div>
        <div class="preview-item">
          <span>{{ t('orders.customer') }}</span>
          <strong>{{ form.customer || '—' }}</strong>
        </div>
        <div class="preview-item">
          <span>{{ t('orders.product') }}</span>
          <strong>{{ form.product || '—' }}</strong>
        </div>
        <div class="preview-item">
          <span>{{ t('orders.amount') }}</span>
          <strong>{{ form.amount ? `${form.amount} ${t('common.currency')}` : '—' }}</strong>
        </div>
        <div class="preview-item">
          <span>{{ t('orders.status') }}</span>
          <span class="ui-badge" :class="selectedStatus.class">{{ t(`status.${form.status}`) }}</span>
        </div>

        <div class="preview-tip">
          <AppIcon name="check-circle" :size="16" />
          {{ t('orders.createTip') }}
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.create-page {
  max-width: 960px;
}

.page-top {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 8px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg);
  color: var(--text-h);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.back-btn:hover {
  background: var(--admin-bg);
  border-color: var(--accent-border);
}

.page-title h2 {
  margin: 0 0 4px;
  font-size: 22px;
}

.page-title p {
  margin: 0;
  font-size: 14px;
  color: var(--text);
}

.create-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

.form-card {
  position: relative;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.card-accent {
  height: 4px;
  background: var(--gradient);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 28px 0;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--accent-bg);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.card-header h3 {
  margin: 0 0 4px;
  font-size: 18px;
}

.order-id {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 24px 28px 28px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
}

.field input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font: inherit;
  font-size: 14px;
  background: var(--admin-bg);
  color: var(--text-h);
  transition: all var(--transition);
}

.field input:focus {
  outline: none;
  border-color: var(--accent);
  background: var(--bg);
  box-shadow: 0 0 0 3px var(--accent-bg);
}

.amount-input {
  position: relative;
}

.amount-input input {
  padding-right: 52px;
}

.currency {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
}

.status-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.status-pill {
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--admin-bg);
  color: var(--text);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.status-pill:hover {
  border-color: var(--accent-border);
}

.status-pill.active {
  border-color: transparent;
  color: #fff;
}

.status-pill.active.info { background: var(--info); }
.status-pill.active.purple { background: #a855f7; }
.status-pill.active.warning { background: var(--warning); }
.status-pill.active.danger { background: var(--danger); }
.status-pill.active.success { background: var(--success); }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}

.btn-secondary,
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
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

.preview-card {
  position: sticky;
  top: 88px;
  padding: 24px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.preview-card h4 {
  margin: 0 0 6px;
  font-size: 16px;
}

.preview-desc {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--text);
}

.preview-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--border-light, var(--border));
}

.preview-item:last-of-type {
  border-bottom: none;
}

.preview-item span:first-child {
  color: var(--text);
}

.preview-item strong {
  color: var(--text-h);
  font-weight: 600;
  text-align: right;
}

.preview-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 14px;
  background: var(--success-bg);
  color: var(--success);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 500;
}

@media (max-width: 860px) {
  .create-layout {
    grid-template-columns: 1fr;
  }

  .preview-card {
    position: static;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
