<script setup lang="ts">
import AppIcon from './icons/AppIcon.vue'
import { useToast } from '../composables/useToast'

const { toasts, dismissToast } = useToast()

const iconMap = {
  success: 'check-circle',
  error: 'alert',
  info: 'bell',
} as const
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite">
      <TransitionGroup name="toast">
        <article
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="`toast--${toast.type}`"
        >
          <span class="toast-icon">
            <AppIcon :name="iconMap[toast.type]" :size="20" />
          </span>
          <p class="toast-message">{{ toast.message }}</p>
          <button type="button" class="toast-close" @click="dismissToast(toast.id)">
            <AppIcon name="close" :size="16" />
          </button>
        </article>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 88px;
  right: 24px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(360px, calc(100vw - 32px));
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  pointer-events: auto;
}

.toast--success {
  border-color: rgba(16, 185, 129, 0.35);
  background: linear-gradient(135deg, var(--bg) 0%, rgba(16, 185, 129, 0.06) 100%);
}

.toast--error {
  border-color: rgba(239, 68, 68, 0.35);
  background: linear-gradient(135deg, var(--bg) 0%, rgba(239, 68, 68, 0.06) 100%);
}

.toast--info {
  border-color: rgba(99, 102, 241, 0.35);
  background: linear-gradient(135deg, var(--bg) 0%, rgba(99, 102, 241, 0.06) 100%);
}

.toast-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.toast--success .toast-icon {
  background: var(--success-bg);
  color: var(--success);
}

.toast--error .toast-icon {
  background: var(--danger-bg);
  color: var(--danger);
}

.toast--info .toast-icon {
  background: var(--accent-bg);
  color: var(--accent);
}

.toast-message {
  flex: 1;
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-h);
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition);
}

.toast-close:hover {
  background: var(--admin-bg);
}

.toast-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

.toast-move {
  transition: transform 0.25s ease;
}

@media (max-width: 640px) {
  .toast-container {
    top: auto;
    bottom: 20px;
    right: 16px;
    left: 16px;
    width: auto;
  }

  .toast-enter-from {
    transform: translateY(100%);
  }

  .toast-leave-to {
    transform: translateY(20px);
  }
}
</style>
