<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../../components/icons/AppIcon.vue'

const siteName = ref('Admin Panel')
const email = ref('admin@example.com')
const notifications = ref(true)
const darkMode = ref(false)
</script>

<template>
  <div class="admin-page settings-page">
    <article class="ui-card">
      <div class="ui-card-body">
        <div class="ui-card-header">
          <h3>Umumiy sozlamalar</h3>
        </div>
        <form class="settings-form" @submit.prevent>
          <label class="field">
            <span>Sayt nomi</span>
            <input v-model="siteName" type="text" class="ui-input" style="min-width: unset" />
          </label>

          <label class="field">
            <span>Admin email</span>
            <input v-model="email" type="email" class="ui-input" style="min-width: unset" />
          </label>

          <label class="toggle-field">
            <div>
              <strong>Bildirishnomalar</strong>
              <span>Email orqali xabarlar olish</span>
            </div>
            <label class="switch">
              <input v-model="notifications" type="checkbox" />
              <span class="slider" />
            </label>
          </label>

          <label class="toggle-field">
            <div>
              <strong>Qorong'u rejim</strong>
              <span>Interfeys rangini o'zgartirish</span>
            </div>
            <label class="switch">
              <input v-model="darkMode" type="checkbox" />
              <span class="slider" />
            </label>
          </label>

          <button type="submit" class="ui-btn ui-btn-primary">Saqlash</button>
        </form>
      </div>
    </article>

    <article class="ui-card danger-card">
      <div class="ui-card-body">
        <div class="ui-card-header">
          <h3 class="danger-title">
            <AppIcon name="alert-triangle" :size="18" />
            Xavfli zona
          </h3>
        </div>
        <p>Hisob ma'lumotlarini o'chirish yoki tizimni qayta tiklash.</p>
        <button type="button" class="danger-btn">Ma'lumotlarni tozalash</button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 640px;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
}

.toggle-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  background: var(--admin-bg);
  border-radius: var(--radius-md);
}

.toggle-field strong {
  display: block;
  font-size: 14px;
  color: var(--text-h);
}

.toggle-field span {
  font-size: 12px;
  color: var(--text);
}

.switch {
  position: relative;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: var(--border);
  border-radius: 999px;
  cursor: pointer;
  transition: background var(--transition);
}

.slider::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  bottom: 3px;
  background: #fff;
  border-radius: 50%;
  transition: transform var(--transition);
  box-shadow: var(--shadow-sm);
}

.switch input:checked + .slider {
  background: var(--accent);
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

.danger-card {
  border-color: rgba(239, 68, 68, 0.3);
}

.danger-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--danger) !important;
}

.danger-card p {
  margin: 0 0 16px;
  font-size: 14px;
  color: var(--text);
}

.danger-btn {
  padding: 10px 18px;
  border: 1px solid var(--danger);
  border-radius: var(--radius-md);
  background: var(--danger-bg);
  color: var(--danger);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.danger-btn:hover {
  background: var(--danger);
  color: #fff;
}
</style>
