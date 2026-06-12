<script setup lang="ts">
import type { Component } from 'vue'
import {
  Activity,
  ArrowLeft,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  LayoutDashboard,
  LineChart,
  Lock,
  LogOut,
  Menu,
  Package,
  Pencil,
  Plus,
  Repeat2,
  Search,
  Save,
  Trash2,
  X,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Wallet,
  Zap,
} from '@lucide/vue'

export type IconName =
  | 'dashboard'
  | 'users'
  | 'orders'
  | 'analytics'
  | 'settings'
  | 'user'
  | 'lock'
  | 'search'
  | 'bell'
  | 'eye'
  | 'eye-off'
  | 'alert'
  | 'alert-triangle'
  | 'revenue'
  | 'sessions'
  | 'conversion'
  | 'cart'
  | 'repeat'
  | 'sparkles'
  | 'new'
  | 'clock'
  | 'check'
  | 'check-circle'
  | 'menu'
  | 'arrow-left'
  | 'logout'
  | 'shield'
  | 'plus'
  | 'edit'
  | 'delete'
  | 'save'
  | 'close'
  | 'activity'
  | 'chart'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number
    strokeWidth?: number
  }>(),
  {
    size: 20,
    strokeWidth: 2,
  },
)

const icons: Record<IconName, Component> = {
  dashboard: LayoutDashboard,
  users: Users,
  orders: ShoppingBag,
  analytics: LineChart,
  settings: Settings,
  user: User,
  lock: Lock,
  search: Search,
  bell: Bell,
  eye: Eye,
  'eye-off': EyeOff,
  alert: AlertCircle,
  'alert-triangle': AlertTriangle,
  revenue: Wallet,
  sessions: Zap,
  conversion: TrendingUp,
  cart: ShoppingCart,
  repeat: Repeat2,
  sparkles: Sparkles,
  new: Package,
  clock: Clock,
  check: Check,
  'check-circle': CheckCircle2,
  menu: Menu,
  'arrow-left': ArrowLeft,
  logout: LogOut,
  shield: Shield,
  plus: Plus,
  edit: Pencil,
  delete: Trash2,
  save: Save,
  close: X,
  activity: Activity,
  chart: BarChart3,
}
</script>

<template>
  <component
    :is="icons[name]"
    class="app-icon"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
  />
</template>

<style scoped>
.app-icon {
  flex-shrink: 0;
}
</style>
