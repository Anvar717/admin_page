<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  open: boolean
}>()

defineEmits<{
  navigate: []
}>()

const menuItems = [
  { name: 'overview', label: 'Dashboard', icon: 'dashboard' },
  { name: 'users', label: 'Foydalanuvchilar', icon: 'users' },
  { name: 'orders', label: 'Buyurtmalar', icon: 'orders' },
  { name: 'analytics', label: 'Analitika', icon: 'analytics' },
  { name: 'settings', label: 'Sozlamalar', icon: 'settings' },
]
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-brand">
      <div class="brand-icon">A</div>
      <div>
        <strong>Admin Panel</strong>
        <span>Boshqaruv tizimi</span>
      </div>
    </div>

    <p class="nav-label">Menyu</p>

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
          <span class="nav-icon" :data-icon="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="isActive" class="active-dot" />
        </a>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <div class="footer-card">
        <p>Admin v1.0</p>
        <span>Barcha tizimlar ishlayapti</span>
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
  font-weight: 700;
  font-size: 18px;
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

.active-dot {
  margin-left: auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-light);
  box-shadow: 0 0 8px var(--accent-light);
}

.nav-icon {
  width: 20px;
  height: 20px;
  opacity: 0.9;
  background: currentColor;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}

.nav-icon[data-icon='dashboard'] {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Crect x='3' y='3' width='7' height='7' rx='1'/%3E%3Crect x='14' y='3' width='7' height='7' rx='1'/%3E%3Crect x='3' y='14' width='7' height='7' rx='1'/%3E%3Crect x='14' y='14' width='7' height='7' rx='1'/%3E%3C/svg%3E");
}

.nav-icon[data-icon='users'] {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M22 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");
}

.nav-icon[data-icon='orders'] {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'/%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E");
}

.nav-icon[data-icon='analytics'] {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Cpath d='M3 3v18h18'/%3E%3Cpath d='m19 9-5 5-4-4-3 3'/%3E%3C/svg%3E");
}

.nav-icon[data-icon='settings'] {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/%3E%3C/svg%3E");
}

.sidebar-footer {
  padding: 16px;
}

.footer-card {
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--sidebar-border);
  border-radius: var(--radius-md);
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
