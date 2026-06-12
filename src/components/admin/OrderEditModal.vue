<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppIcon from '../icons/AppIcon.vue'
import { statusOptions, type Order } from '../../composables/useOrders'

export type { Order }

const props = defineProps<{
  open: boolean
  order: Order | null
}>()

const emit = defineEmits<{
  close: []
  save: [order: Order]
}>()

const form = ref<Order>({
  id: '',
  customer: '',
  product: '',
  amount: '',
  status: 'Yangi',
})

const selectedStatus = computed(
  () => statusOptions.find((s) => s.value === form.value.status) ?? statusOptions[0],
)

watch(
  () => props.order,
  (order) => {
    if (order) {
      form.value = { ...order }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('save', { ...form.value })
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal-overlay" @click="handleBackdropClick">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-accent" />

        <div class="modal-header">
          <div class="header-left">
            <div class="header-icon">
              <AppIcon name="edit" :size="20" />
            </div>
            <div>
              <h2 id="modal-title">Buyurtmani tahrirlash</h2>
              <span class="order-id">{{ form.id }}</span>
            </div>
          </div>
          <button type="button" class="close-btn" aria-label="Yopish" @click="emit('close')">
            <AppIcon name="close" :size="18" />
          </button>
        </div>

        <form class="modal-body" @submit.prevent="handleSubmit">
          <div class="form-grid">
            <label class="field">
              <span class="field-label">
                <AppIcon name="user" :size="14" />
                Mijoz
              </span>
              <input v-model="form.customer" type="text" placeholder="Mijoz ismi" required />
            </label>

            <label class="field">
              <span class="field-label">
                <AppIcon name="orders" :size="14" />
                Mahsulot
              </span>
              <input v-model="form.product" type="text" placeholder="Mahsulot nomi" required />
            </label>
          </div>

          <label class="field">
            <span class="field-label">
              <AppIcon name="revenue" :size="14" />
              Summa
            </span>
            <div class="amount-input">
              <input v-model="form.amount" type="text" placeholder="0" required />
              <span class="currency">so'm</span>
            </div>
          </label>

          <div class="field">
            <span class="field-label">
              <AppIcon name="activity" :size="14" />
              Holat
            </span>
            <div class="status-grid">
              <button
                v-for="status in statusOptions"
                :key="status.value"
                type="button"
                class="status-pill"
                :class="[status.class, { active: form.status === status.value }]"
                @click="form.status = status.value"
              >
                {{ status.value }}
              </button>
            </div>
          </div>

          <div class="preview-card">
            <p class="preview-label">Ko'rib chiqish</p>
            <div class="preview-row">
              <span>Mijoz</span>
              <strong>{{ form.customer || '—' }}</strong>
            </div>
            <div class="preview-row">
              <span>Mahsulot</span>
              <strong>{{ form.product || '—' }}</strong>
            </div>
            <div class="preview-row">
              <span>Summa</span>
              <strong>{{ form.amount ? `${form.amount} so'm` : '—' }}</strong>
            </div>
            <div class="preview-row">
              <span>Holat</span>
              <span class="ui-badge" :class="selectedStatus.class">{{ form.status }}</span>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="emit('close')">
              Bekor qilish
            </button>
            <button type="submit" class="btn-primary">
              <AppIcon name="save" :size="16" />
              Saqlash
            </button>
          </div>
        </form>
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
  gap: 20px;
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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
  display: flex;
  align-items: center;
}

.amount-input input {
  padding-right: 52px;
}

.currency {
  position: absolute;
  right: 14px;
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
  box-shadow: var(--shadow-sm);
}

.status-pill.active.info { background: var(--info); }
.status-pill.active.purple { background: #a855f7; }
.status-pill.active.warning { background: var(--warning); }
.status-pill.active.danger { background: var(--danger); }
.status-pill.active.success { background: var(--success); }

.preview-card {
  padding: 16px 18px;
  background: var(--admin-bg);
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
}

.preview-label {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text);
}

.preview-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--border);
}

.preview-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.preview-row span:first-child {
  color: var(--text);
}

.preview-row strong {
  color: var(--text-h);
  font-weight: 600;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
  margin-top: 4px;
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
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
