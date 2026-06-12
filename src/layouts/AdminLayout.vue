<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminHeader from '../components/admin/AdminHeader.vue'

const route = useRoute()
const sidebarOpen = ref(false)
const isFitPage = computed(() => route.name === 'overview' || route.name === 'analytics')

function closeSidebar() {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="admin-layout">
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      @click="closeSidebar"
    />

    <AdminSidebar :open="sidebarOpen" @navigate="closeSidebar" />

    <div class="admin-main">
      <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="admin-content" :class="{ 'admin-content--fit': isFitPage }">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  height: 100svh;
  width: 100%;
  background: var(--admin-bg);
  overflow: hidden;
}

.sidebar-overlay {
  display: none;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.admin-content {
  flex: 1;
  min-height: 0;
  padding: 16px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.admin-content--fit {
  overflow: hidden;
}

.admin-content--fit > :deep(*) {
  flex: 1;
  min-height: 0;
}

@media (max-width: 1200px) {
  .admin-content--fit {
    overflow-y: auto;
  }
}

@media (max-width: 1024px) {
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(4px);
    z-index: 40;
    animation: fadeIn 0.2s ease;
  }

  .admin-content {
    padding: 16px;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
