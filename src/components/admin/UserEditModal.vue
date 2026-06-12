<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../icons/AppIcon.vue'
import {
  roleOptions,
  userStatusOptions,
  type User,
  type UserRole,
  type UserStatus,
} from '../../composables/useUsers'

export type { User }

const props = defineProps<{
  open: boolean
  user: User | null
}>()

const emit = defineEmits<{
  close: []
  save: [user: User]
}>()

const { t } = useI18n()

const form = ref<User>({
  id: 0,
  name: '',
  email: '',
  role: 'user',
  status: 'active',
})

const selectedRole = computed(
  () => roleOptions.find((r) => r.value === form.value.role) ?? roleOptions[0],
)

const selectedStatus = computed(
  () => userStatusOptions.find((s) => s.value === form.value.status) ?? userStatusOptions[0],
)

watch(
  () => props.user,
  (user) => {
    if (user) {
      form.value = { ...user }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('save', {
    ...form.value,
    name: form.value.name.trim(),
    email: form.value.email.trim(),
  })
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

function setRole(role: UserRole) {
  form.value.role = role
}

function setStatus(status: UserStatus) {
  form.value.status = status
}

function roleLabel(role: UserRole) {
  const keys: Record<UserRole, string> = {
    user: 'users.roleUser',
    moderator: 'users.roleModerator',
    admin: 'users.roleAdmin',
  }
  return t(keys[role])
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open && user" class="modal-overlay" @click="handleBackdropClick">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="user-edit-title">
        <div class="modal-accent" />

        <div class="modal-header">
          <div class="header-left">
            <div class="header-icon">
              <AppIcon name="edit" :size="20" />
            </div>
            <div>
              <h2 id="user-edit-title">{{ t('users.editTitle') }}</h2>
              <span class="modal-subtitle">ID: {{ form.id }}</span>
            </div>
          </div>
          <button type="button" class="close-btn" :aria-label="t('common.cancel')" @click="emit('close')">
            <AppIcon name="close" :size="18" />
          </button>
        </div>

        <form class="modal-body" @submit.prevent="handleSubmit">
          <label class="field">
            <span class="field-label">
              <AppIcon name="user" :size="14" />
              {{ t('users.colName') }}
            </span>
            <input
              v-model="form.name"
              type="text"
              :placeholder="t('users.namePlaceholder')"
              required
            />
          </label>

          <label class="field">
            <span class="field-label">
              <AppIcon name="user" :size="14" />
              {{ t('users.colEmail') }}
            </span>
            <input
              v-model="form.email"
              type="email"
              :placeholder="t('users.emailPlaceholder')"
              required
            />
          </label>

          <div class="field">
            <span class="field-label">
              <AppIcon name="shield" :size="14" />
              {{ t('users.colRole') }}
            </span>
            <div class="pill-grid">
              <button
                v-for="role in roleOptions"
                :key="role.value"
                type="button"
                class="pill"
                :class="[role.class, { active: form.role === role.value }]"
                @click="setRole(role.value)"
              >
                {{ roleLabel(role.value) }}
              </button>
            </div>
          </div>

          <div class="field">
            <span class="field-label">
              <AppIcon name="activity" :size="14" />
              {{ t('users.colStatus') }}
            </span>
            <div class="pill-grid">
              <button
                v-for="status in userStatusOptions"
                :key="status.value"
                type="button"
                class="pill"
                :class="[status.class, { active: form.status === status.value }]"
                @click="setStatus(status.value)"
              >
                {{ t(`common.${status.value}`) }}
              </button>
            </div>
          </div>

          <div class="preview-card">
            <p class="preview-label">{{ t('common.preview') }}</p>
            <div class="preview-row">
              <span>{{ t('users.colName') }}</span>
              <strong>{{ form.name || '—' }}</strong>
            </div>
            <div class="preview-row">
              <span>{{ t('users.colEmail') }}</span>
              <strong>{{ form.email || '—' }}</strong>
            </div>
            <div class="preview-row">
              <span>{{ t('users.colRole') }}</span>
              <span class="ui-badge" :class="selectedRole.class">{{ roleLabel(form.role) }}</span>
            </div>
            <div class="preview-row">
              <span>{{ t('users.colStatus') }}</span>
              <span class="ui-badge" :class="selectedStatus.class">{{ t(`common.${form.status}`) }}</span>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="emit('close')">
              {{ t('common.cancel') }}
            </button>
            <button type="submit" class="btn-primary">
              <AppIcon name="save" :size="16" />
              {{ t('common.save') }}
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

.modal-subtitle {
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

.pill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
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

.pill:hover {
  border-color: var(--accent-border);
}

.pill.active {
  border-color: transparent;
  color: #fff;
  box-shadow: var(--shadow-sm);
}

.pill.active.info { background: var(--info); }
.pill.active.purple { background: #a855f7; }
.pill.active.warning { background: var(--warning); }
.pill.active.success { background: var(--success); }
.pill.active.danger { background: var(--danger); }

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
</style>
