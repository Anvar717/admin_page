<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { STATIC_LOGIN, STATIC_PASSWORD, useAuth } from '../composables/useAuth'
import AppIcon from '../components/icons/AppIcon.vue'

const router = useRouter()
const { login } = useAuth()

const username = ref(STATIC_LOGIN)
const password = ref(STATIC_PASSWORD)
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true

  const message = await login(username.value.trim(), password.value)

  loading.value = false

  if (message) {
    error.value = message
    return
  }

  router.push({ name: 'overview' })
}
</script>

<template>
  <div class="login-page">
    <div class="login-visual">
      <div class="visual-content">
        <div class="visual-logo">
          <AppIcon name="shield" :size="28" :stroke-width="2.2" />
        </div>
        <h2>Admin boshqaruv tizimi</h2>
        <p>Ma'lumotlaringizni xavfsiz boshqaring va real vaqtda kuzating</p>
        <ul class="features">
          <li><AppIcon name="chart" :size="14" /> Real vaqt statistikasi</li>
          <li><AppIcon name="users" :size="14" /> Foydalanuvchilar boshqaruvi</li>
          <li><AppIcon name="orders" :size="14" /> Buyurtmalar monitoringi</li>
        </ul>
      </div>
    </div>

    <div class="login-form-side">
      <div class="login-card">
        <div class="login-header">
          <h1>Xush kelibsiz</h1>
          <p>Hisobingizga kiring</p>
        </div>

        <form class="login-form" @submit.prevent="handleSubmit">
          <label class="field">
            <span>Login</span>
            <div class="input-wrap">
              <AppIcon name="user" :size="16" class="input-icon" />
              <input
                v-model="username"
                type="text"
                placeholder="admin"
                autocomplete="username"
                required
              />
            </div>
          </label>

          <label class="field">
            <span>Parol</span>
            <div class="input-wrap">
              <AppIcon name="lock" :size="16" class="input-icon" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="toggle-pass"
                @click="showPassword = !showPassword"
              >
                <AppIcon :name="showPassword ? 'eye-off' : 'eye'" :size="16" />
              </button>
            </div>
          </label>

          <p v-if="error" class="error">
            <AppIcon name="alert" :size="16" /> {{ error }}
          </p>

          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading" class="spinner" />
            {{ loading ? 'Kutilmoqda...' : 'Kirish' }}
          </button>
        </form>

        <div class="demo-hint">
          <span class="hint-label">Demo hisob</span>
          <code>{{ STATIC_LOGIN }} / {{ STATIC_PASSWORD }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100svh;
}

.login-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: var(--gradient);
  overflow: hidden;
}

.login-visual::before,
.login-visual::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.login-visual::before {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
}

.login-visual::after {
  width: 300px;
  height: 300px;
  bottom: -80px;
  left: -80px;
}

.visual-content {
  position: relative;
  z-index: 1;
  max-width: 400px;
  color: #fff;
}

.visual-logo {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  color: #fff;
  margin-bottom: 28px;
}

.visual-content h2 {
  color: #fff;
  font-size: 32px;
  margin: 0 0 12px;
  letter-spacing: -0.03em;
}

.visual-content p {
  font-size: 16px;
  opacity: 0.85;
  line-height: 1.6;
  margin-bottom: 32px;
}

.features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  opacity: 0.9;
}

.features li :deep(svg) {
  width: 22px;
  height: 22px;
  padding: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

.login-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  background: var(--admin-bg);
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.login-header h1 {
  font-size: 28px;
  margin: 0 0 6px;
}

.login-header p {
  color: var(--text);
  margin-bottom: 32px;
}

.login-form {
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

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: var(--text);
  opacity: 0.5;
  pointer-events: none;
}

.input-wrap input {
  width: 100%;
  font: inherit;
  font-size: 14px;
  padding: 12px 14px 12px 42px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg);
  color: var(--text-h);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.input-wrap input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-bg);
}

.toggle-pass {
  position: absolute;
  right: 10px;
  border: none;
  background: none;
  color: var(--text);
  opacity: 0.6;
  padding: 4px;
  display: grid;
  place-items: center;
}

.toggle-pass:hover {
  opacity: 1;
}

.error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 12px 14px;
  font-size: 13px;
  color: var(--danger);
  background: var(--danger-bg);
  border-radius: var(--radius-md);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 20px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--gradient);
  color: #fff;
  box-shadow: var(--shadow-glow);
  transition: transform var(--transition), filter var(--transition);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.demo-hint {
  margin-top: 28px;
  padding: 16px;
  background: var(--admin-bg);
  border-radius: var(--radius-md);
  text-align: center;
}

.hint-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 6px;
}

.demo-hint code {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  background: none;
  padding: 0;
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-visual {
    display: none;
  }
}
</style>
