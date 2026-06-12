<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from '../icons/AppIcon.vue'
import type { User } from '../../composables/useUsers'

const props = defineProps<{
  open: boolean
  user: User | null
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const { t } = useI18n()

const roleKeys: Record<string, string> = {
  user: 'users.roleUser',
  moderator: 'users.roleModerator',
  admin: 'users.roleAdmin',
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open && user" class="modal-overlay" @click="handleBackdropClick">
      <div class="modal" role="alertdialog" aria-modal="true">
        <div class="modal-icon">
          <AppIcon name="delete" :size="24" />
        </div>

        <h2>{{ t('users.deleteTitle') }}</h2>
        <p>
          <strong>{{ user.name }}</strong> {{ t('users.deleteConfirm') }}
          {{ t('users.deleteWarning') }}
        </p>

        <div class="user-preview">
          <span>{{ user.email }}</span>
          <span>{{ t(roleKeys[user.role]) }}</span>
          <span>{{ t(`common.${user.status}`) }}</span>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-cancel" @click="emit('close')">
            {{ t('common.cancel') }}
          </button>
          <button type="button" class="btn-delete" @click="emit('confirm')">
            <AppIcon name="delete" :size="16" />
            {{ t('common.delete') }}
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
  z-index: 110;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  animation: fadeIn 0.2s ease;
}

.modal {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: var(--danger-bg);
  color: var(--danger);
  display: grid;
  place-items: center;
}

.modal h2 {
  margin: 0 0 10px;
  font-size: 20px;
}

.modal p {
  margin: 0 0 20px;
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
}

.modal p strong {
  color: var(--text-h);
}

.user-preview {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  margin-bottom: 24px;
  background: var(--admin-bg);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-h);
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: var(--radius-md);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.btn-cancel {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-h);
}

.btn-cancel:hover {
  background: var(--admin-bg);
}

.btn-delete {
  border: none;
  background: var(--danger);
  color: #fff;
}

.btn-delete:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
