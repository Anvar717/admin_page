<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon, { type IconName } from '../icons/AppIcon.vue'

const router = useRouter()
const { t } = useI18n()

defineProps<{
  open: boolean
}>()

defineEmits<{
  navigate: []
}>()

const menuItems: { name: string; labelKey: string; icon: IconName }[] = [
  { name: 'overview', labelKey: 'nav.dashboard', icon: 'dashboard' },
  { name: 'users', labelKey: 'nav.users', icon: 'users' },
  { name: 'orders', labelKey: 'nav.orders', icon: 'orders' },
  { name: 'analytics', labelKey: 'nav.analytics', icon: 'analytics' },
  { name: 'settings', labelKey: 'nav.settings', icon: 'settings' },
]
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-brand">
      <div class="brand-icon">
        <AppIcon name="shield" :size="22" :stroke-width="2.2" />
      </div>
      <div>
        <strong>{{ t('common.adminPanel') }}</strong>
        <span>{{ t('common.managementSystem') }}</span>
      </div>
    </div>

    <p class="nav-label">{{ t('common.menuLabel') }}</p>

    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        v-slot="{ isActive }"
        :to="{ name: item.name }"
        custom
      >
        <a
          href="#"
          class="nav-item"
          :class="{ active: isActive }"
          @click.prevent="router.push({ name: item.name }); $emit('navigate')"
        >
          <AppIcon :name="item.icon" :size="18" class="nav-icon" />
          <span>{{ t(item.labelKey) }}</span>
          <span v-if="isActive" class="active-dot" />
        </a>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <div class="footer-card">
        <AppIcon name="activity" :size="14" class="footer-icon" />
        <div>
          <p>{{ t('common.version') }}</p>
          <span>{{ t('common.allSystemsOk') }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 272px;
  flex-shrink: 0;
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--sidebar-border);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 28px 24px 20px;
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--gradient);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}

.sidebar-brand strong {
  display: block;
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
}

.sidebar-brand span {
  font-size: 12px;
  color: var(--sidebar-muted);
}

.nav-label {
  margin: 0 24px 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--sidebar-muted);
}

.sidebar-nav {
  flex: 1;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition);
}

.nav-item:hover {
  background: var(--sidebar-hover);
  color: #e2e8f0;
}

.nav-item.active {
  background: var(--sidebar-active);
  color: #a5b4fc;
}

.nav-icon {
  opacity: 0.9;
}

.active-dot {
  margin-left: auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-light);
  box-shadow: 0 0 8px var(--accent-light);
}

.sidebar-footer {
  padding: 16px;
}

.footer-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--sidebar-border);
  border-radius: var(--radius-md);
}

.footer-icon {
  color: #34d399;
  margin-top: 2px;
}

.footer-card p {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.footer-card span {
  font-size: 11px;
  color: var(--sidebar-muted);
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-lg);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
