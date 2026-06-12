<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../composables/useAuth'
import AppIcon from '../components/icons/AppIcon.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const router = useRouter()
const { t } = useI18n()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

const recoverOpen = ref(false)
const recoverEmail = ref('')
const recoverLoading = ref(false)
const recoverSuccess = ref(false)
const recoverError = ref('')

async function handleSubmit() {
  error.value = ''
  loading.value = true

  const message = await login(username.value.trim(), password.value)

  loading.value = false

  if (message) {
    error.value = t(`login.${message}`)
    return
  }

  router.push({ name: 'overview' })
}

function openRecover() {
  recoverOpen.value = true
  recoverEmail.value = ''
  recoverSuccess.value = false
  recoverError.value = ''
}

function closeRecover() {
  recoverOpen.value = false
  recoverEmail.value = ''
  recoverSuccess.value = false
  recoverError.value = ''
}

async function handleRecover() {
  recoverError.value = ''
  const email = recoverEmail.value.trim()

  if (!email || !email.includes('@')) {
    recoverError.value = t('login.recoverInvalidEmail')
    return
  }

  recoverLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  recoverLoading.value = false
  recoverSuccess.value = true
}

function handleRecoverBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    closeRecover()
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-lang">
      <LanguageSwitcher variant="glass" />
    </div>

    <div class="login-visual">
      <div class="visual-content">
        <div class="visual-logo">
          <AppIcon name="shield" :size="28" :stroke-width="2.2" />
        </div>
        <h2>{{ t('login.title') }}</h2>
        <p>{{ t('login.subtitle') }}</p>
        <ul class="features">
          <li><AppIcon name="chart" :size="14" /> {{ t('login.feature1') }}</li>
          <li><AppIcon name="users" :size="14" /> {{ t('login.feature2') }}</li>
          <li><AppIcon name="orders" :size="14" /> {{ t('login.feature3') }}</li>
        </ul>
      </div>
    </div>

    <div class="login-form-side">
      <div class="login-card">
        <div class="login-header">
          <h1>{{ t('login.welcome') }}</h1>
          <p>{{ t('login.signIn') }}</p>
        </div>

        <form class="login-form" @submit.prevent="handleSubmit">
          <label class="field">
            <span>{{ t('login.loginLabel') }}</span>
            <div class="input-wrap">
              <AppIcon name="user" :size="16" class="input-icon" />
              <input
                v-model="username"
                type="text"
                :placeholder="t('login.loginLabel')"
                autocomplete="username"
                required
              />
            </div>
          </label>

          <label class="field">
            <span>{{ t('login.passwordLabel') }}</span>
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

          <div class="form-actions">
            <button type="button" class="forgot-link" @click="openRecover">
              {{ t('login.forgotCredentials') }}
            </button>
          </div>

          <p v-if="error" class="error">
            <AppIcon name="alert" :size="16" /> {{ error }}
          </p>

          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading" class="spinner" />
            {{ loading ? t('common.loading') : t('login.submit') }}
          </button>
        </form>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="recoverOpen" class="recover-overlay" @click="handleRecoverBackdrop">
        <div class="recover-modal" role="dialog" aria-modal="true">
          <div class="recover-accent" />

          <button type="button" class="recover-close" :aria-label="t('common.cancel')" @click="closeRecover">
            <AppIcon name="close" :size="18" />
          </button>

          <div v-if="!recoverSuccess" class="recover-body">
            <div class="recover-icon">
              <AppIcon name="lock" :size="22" />
            </div>
            <h2>{{ t('login.recoverTitle') }}</h2>
            <p>{{ t('login.recoverDesc') }}</p>

            <form class="recover-form" @submit.prevent="handleRecover">
              <label class="field">
                <span>{{ t('login.recoverEmail') }}</span>
                <div class="input-wrap">
                  <AppIcon name="user" :size="16" class="input-icon" />
                  <input
                    v-model="recoverEmail"
                    type="email"
                    :placeholder="t('login.recoverEmailPlaceholder')"
                    required
                  />
                </div>
              </label>

              <p v-if="recoverError" class="error">
                <AppIcon name="alert" :size="16" /> {{ recoverError }}
              </p>

              <button type="submit" class="submit-btn" :disabled="recoverLoading">
                <span v-if="recoverLoading" class="spinner" />
                {{ recoverLoading ? t('common.loading') : t('login.recoverSubmit') }}
              </button>
            </form>
          </div>

          <div v-else class="recover-success">
            <div class="success-icon">
              <AppIcon name="check-circle" :size="28" />
            </div>
            <h2>{{ t('login.recoverSuccess') }}</h2>
            <button type="button" class="back-btn" @click="closeRecover">
              {{ t('login.backToLogin') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.login-page {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100svh;
  position: relative;
}

.login-lang {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
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
  cursor: pointer;
}

.toggle-pass:hover {
  opacity: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: -8px;
}

.forgot-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  cursor: pointer;
  transition: opacity var(--transition);
}

.forgot-link:hover {
  opacity: 0.8;
  text-decoration: underline;
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
  cursor: pointer;
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

.recover-overlay {
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

.recover-modal {
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 32px 28px 28px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.18);
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.recover-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient);
}

.recover-close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: all var(--transition);
}

.recover-close:hover {
  background: var(--danger-bg);
  border-color: transparent;
  color: var(--danger);
}

.recover-body {
  text-align: center;
}

.recover-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: var(--accent-bg);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.recover-body h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.recover-body > p {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
}

.recover-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}

.recover-success {
  text-align: center;
  padding: 12px 0 4px;
}

.success-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: var(--success-bg);
  color: var(--success);
  display: grid;
  place-items: center;
}

.recover-success h2 {
  margin: 0 0 24px;
  font-size: 16px;
  color: var(--text-h);
  line-height: 1.5;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-h);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.back-btn:hover {
  background: var(--accent-bg);
  border-color: var(--accent-border);
  color: var(--accent);
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

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-visual {
    display: none;
  }

  .login-lang {
    top: 16px;
    right: 16px;
  }
}
</style>
