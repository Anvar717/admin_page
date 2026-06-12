<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration, Plugin } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { chartAnimations, chartPlugins, getChartColors } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const props = withDefaults(
  defineProps<{
    values?: number[]
    compact?: boolean
  }>(),
  {
    values: () => [24, 18, 312, 12],
    compact: false,
  },
)

const statusLabelKeys = ['status.new', 'common.inProgress', 'status.done', 'status.cancelled'] as const

const total = computed(() => props.values.reduce((sum, v) => sum + v, 0))

const centerPlugin = computed<Plugin<'doughnut'>>(() => ({
  id: 'donutCenter',
  beforeDraw(chart) {
    if (!props.compact) return

    const { ctx, chartArea } = chart
    if (!chartArea) return

    const centerX = (chartArea.left + chartArea.right) / 2
    const centerY = (chartArea.top + chartArea.bottom) / 2

    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.font = '700 22px Inter, sans-serif'
    ctx.fillStyle = getChartColors().textH
    ctx.fillText(String(total.value), centerX, centerY - 6)

    ctx.font = '500 10px Inter, sans-serif'
    ctx.fillStyle = getChartColors().text
    ctx.fillText(t('common.total'), centerX, centerY + 14)
    ctx.restore()
  },
}))

const config = computed(() => {
  const colors = getChartColors()
  const labels = statusLabelKeys.map((key) => t(key))

  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: props.values,
          backgroundColor: colors.status,
          borderWidth: 3,
          borderColor: colors.adminBg,
          hoverOffset: 12,
          hoverBorderWidth: 0,
          spacing: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: chartAnimations(),
      cutout: props.compact ? '72%' : '68%',
      plugins: {
        ...chartPlugins(),
        legend: {
          ...chartPlugins()?.legend,
          position: props.compact ? 'right' : 'bottom',
          labels: {
            boxWidth: props.compact ? 7 : 10,
            padding: props.compact ? 10 : 16,
            font: { size: props.compact ? 10 : 12, weight: 500 },
          },
        },
        tooltip: {
          ...chartPlugins()?.tooltip,
          callbacks: {
            label: (ctx) => {
              const value = ctx.parsed
              const pct = total.value ? Math.round((value / total.value) * 100) : 0
              return `${ctx.label}: ${value} (${pct}%)`
            },
          },
        },
      },
    },
    plugins: props.compact ? [centerPlugin.value] : [],
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :key="locale" :config="config" :class="['donut-chart', { 'donut-chart--compact': compact }]" />
</template>

<style scoped>
.donut-chart :deep(.chart-canvas) {
  min-height: 300px;
}

.donut-chart--compact :deep(.chart-canvas) {
  min-height: 0;
  filter: drop-shadow(0 4px 14px rgba(99, 102, 241, 0.1));
}
</style>
