<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AppLocale } from '../i18n'
import { saveLocale } from '../i18n'
import AppIcon from './icons/AppIcon.vue'

withDefaults(
  defineProps<{
    variant?: 'default' | 'glass'
  }>(),
  { variant: 'default' },
)

const { locale, t } = useI18n()
const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const locales: { code: AppLocale; labelKey: string; short: string }[] = [
  { code: 'uz-Latn', labelKey: 'lang.uzLatn', short: 'UZ' },
  { code: 'uz-Cyrl', labelKey: 'lang.uzCyrl', short: 'ЎЗ' },
  { code: 'ru', labelKey: 'lang.ru', short: 'RU' },
]

const current = computed(() => locales.find((l) => l.code === locale.value) ?? locales[0])

function toggle() {
  open.value = !open.value
}

function setLocale(code: AppLocale) {
  locale.value = code
  saveLocale(code)
  document.documentElement.lang = code
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="rootRef" class="lang-switcher" :class="[`lang-switcher--${variant}`, { open }]">
    <button
      type="button"
      class="lang-trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click.stop="toggle"
    >
      <span class="lang-trigger-icon">
        <AppIcon name="globe" :size="16" />
      </span>
      <span class="lang-trigger-code">{{ current.short }}</span>
      <AppIcon name="chevron-down" :size="14" class="lang-trigger-chevron" />
    </button>

    <Transition name="lang-menu">
      <div v-if="open" class="lang-menu" role="listbox" @click.stop>
        <button
          v-for="item in locales"
          :key="item.code"
          type="button"
          role="option"
          class="lang-option"
          :class="{ active: locale === item.code }"
          :aria-selected="locale === item.code"
          @click="setLocale(item.code)"
        >
          <span class="lang-option-badge">{{ item.short }}</span>
          <span class="lang-option-label">{{ t(item.labelKey) }}</span>
          <AppIcon v-if="locale === item.code" name="check" :size="14" class="lang-option-check" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
}

.lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg);
  color: var(--text-h);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
}

.lang-trigger:hover,
.lang-switcher.open .lang-trigger {
  border-color: var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
}

.lang-trigger-icon {
  display: grid;
  place-items: center;
  color: var(--accent);
}

.lang-trigger-code {
  min-width: 22px;
  text-align: center;
  letter-spacing: 0.02em;
}

.lang-trigger-chevron {
  opacity: 0.55;
  transition: transform var(--transition);
}

.lang-switcher.open .lang-trigger-chevron {
  transform: rotate(180deg);
  opacity: 0.85;
}

.lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 50;
  min-width: 196px;
  padding: 6px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-h);
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}

.lang-option:hover {
  background: var(--admin-bg);
}

.lang-option.active {
  background: var(--accent-bg);
  color: var(--accent);
}

.lang-option-badge {
  flex-shrink: 0;
  width: 30px;
  height: 24px;
  border-radius: 6px;
  background: var(--admin-bg);
  color: var(--text-h);
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.lang-option.active .lang-option-badge {
  background: var(--gradient);
  color: #fff;
}

.lang-option-label {
  flex: 1;
  font-weight: 500;
}

.lang-option-check {
  flex-shrink: 0;
  color: var(--accent);
}

.lang-menu-enter-active,
.lang-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.lang-menu-enter-from,
.lang-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.lang-switcher--glass .lang-trigger {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.28);
  color: #fff;
  backdrop-filter: blur(8px);
}

.lang-switcher--glass .lang-trigger:hover,
.lang-switcher--glass.open .lang-trigger {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.45);
  color: #fff;
}

.lang-switcher--glass .lang-trigger-icon {
  color: #fff;
}

.lang-switcher--glass .lang-menu {
  background: var(--bg);
  border-color: var(--border);
}

@media (max-width: 640px) {
  .lang-trigger {
    padding: 0 10px;
    gap: 6px;
  }

  .lang-menu {
    min-width: 176px;
  }
}
</style>
