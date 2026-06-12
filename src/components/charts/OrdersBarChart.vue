<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration, ScriptableContext } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartAnimations, chartPlugins } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
const data = [42, 58, 35, 72, 48, 91, 63]
const maxIndex = data.indexOf(Math.max(...data))

const barColors = ['#a5b4fc', '#818cf8', '#c4b5fd', '#8b5cf6', '#a78bfa', '#6366f1', '#7c3aed']

const config = computed(() => {
  const labels = dayKeys.map((key) => t(`days.${key}`))

  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: t('dashboard.orders'),
          data,
          borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 4, bottomRight: 4 },
          borderSkipped: false,
          backgroundColor: (ctx: ScriptableContext<'bar'>) => {
            const index = ctx.dataIndex
            const chart = ctx.chart
            const { ctx: canvasCtx, chartArea } = chart
            if (!chartArea) return barColors[index % barColors.length]

            const isPeak = index === maxIndex
            const top = isPeak ? '#818cf8' : barColors[index % barColors.length]
            const bottom = isPeak ? '#4f46e5' : '#6366f1'

            const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, top)
            gradient.addColorStop(1, bottom)
            return gradient
          },
          hoverBackgroundColor: '#4f46e5',
          maxBarThickness: 36,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: chartAnimations(),
      plugins: {
        ...chartPlugins(),
        legend: { display: false },
        tooltip: {
          ...chartPlugins()?.tooltip,
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
          },
        },
      },
      scales: {
        x: { ...cartesianScales()?.x, grid: { display: false } },
        y: {
          ...cartesianScales()?.y,
          beginAtZero: true,
          grid: { color: 'rgba(99, 102, 241, 0.08)', drawTicks: false },
        },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :key="locale" :config="config" class="orders-bar-chart" />
</template>

<style scoped>
.orders-bar-chart :deep(.chart-canvas) {
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.1));
}
</style>
