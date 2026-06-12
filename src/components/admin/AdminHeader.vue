<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../../composables/useAuth'
import AppIcon from '../icons/AppIcon.vue'
import LanguageSwitcher from '../LanguageSwitcher.vue'

defineEmits<{
  toggleSidebar: []
}>()

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const { logout } = useAuth()

const titleKeys: Record<string, string> = {
  overview: 'nav.dashboard',
  users: 'nav.users',
  orders: 'nav.orders',
  'order-create': 'nav.orderCreate',
  analytics: 'nav.analytics',
  settings: 'nav.settings',
}

const pageTitle = computed(() => {
  const key = titleKeys[route.name as string]
  return key ? t(key) : t('common.admin')
})

const todayLabel = computed(() => {
  const localeMap: Record<string, string> = {
    'uz-Latn': 'uz-UZ',
    'uz-Cyrl': 'uz-UZ',
    ru: 'ru-RU',
  }
  return `${t('common.today')}, ${new Date().toLocaleDateString(localeMap[locale.value] ?? 'uz-UZ')}`
})

function handleLogout() {
  logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="admin-header">
    <div class="header-left">
      <button type="button" class="menu-btn" :aria-label="t('common.menu')" @click="$emit('toggleSidebar')">
        <AppIcon name="menu" :size="18" />
      </button>
      <div class="title-block">
        <h1>{{ pageTitle }}</h1>
        <p>{{ todayLabel }}</p>
      </div>
    </div>

    <div class="header-center">
      <div class="search-box">
        <AppIcon name="search" :size="16" class="search-icon" />
        <input type="search" :placeholder="t('common.search')" />
      </div>
    </div>

    <div class="header-right">
      <LanguageSwitcher />

      <button type="button" class="icon-btn" :aria-label="t('common.notifications')">
        <AppIcon name="bell" :size="18" />
        <span class="notif-dot" />
      </button>

      <div class="user-menu">
        <span class="avatar">
          <AppIcon name="user" :size="16" />
        </span>
        <div class="user-info">
          <strong>admin</strong>
          <span>{{ t('common.administrator') }}</span>
        </div>
      </div>

      <button type="button" class="logout-btn" @click="handleLogout">
        <AppIcon name="logout" :size="16" />
        <span class="logout-text">{{ t('common.logout') }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  position: sticky;
  top: 0;
  z-index: 30;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 28px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

@media (prefers-color-scheme: dark) {
  .admin-header {
    background: rgba(30, 41, 59, 0.85);
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.title-block h1 {
  font-size: 20px;
  margin: 0 0 2px;
}

.title-block p {
  margin: 0;
  font-size: 12px;
  color: var(--text);
}

.menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg);
  color: var(--text-h);
  cursor: pointer;
}

.header-center {
  flex: 1;
  max-width: 400px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text);
  opacity: 0.6;
  pointer-events: none;
}

.search-box input {
  width: 100%;
  padding: 10px 14px 10px 42px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--admin-bg);
  color: var(--text-h);
  font-size: 14px;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.search-box input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-bg);
  background: var(--bg);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg);
  color: var(--text-h);
  display: grid;
  place-items: center;
  transition: background var(--transition), color var(--transition);
}

.icon-btn:hover {
  background: var(--accent-bg);
  color: var(--accent);
}

.notif-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--danger);
  border: 2px solid var(--bg);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient);
  color: #fff;
  display: grid;
  place-items: center;
}

.user-info strong {
  display: block;
  font-size: 13px;
  color: var(--text-h);
}

.user-info span {
  font-size: 11px;
  color: var(--text);
}

.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: inherit;
  padding: 9px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-h);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all var(--transition);
}

.logout-btn:hover {
  border-color: var(--danger);
  background: var(--danger-bg);
  color: var(--danger);
}

@media (max-width: 1024px) {
  .menu-btn {
    display: inline-flex;
  }

  .header-center {
    display: none;
  }

  .user-info {
    display: none;
  }
}

@media (max-width: 640px) {
  .admin-header {
    padding: 12px 16px;
  }

  .title-block p {
    display: none;
  }

  .logout-btn {
    padding: 9px 12px;
  }

  .logout-text {
    display: none;
  }
}
</style>
