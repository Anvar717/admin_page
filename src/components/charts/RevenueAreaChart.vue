<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration, ScriptableContext } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartAnimations, chartPlugins, getChartColors } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'] as const
const data = [12, 19, 14, 22, 18, 28, 24, 32, 26, 35, 30, 38]

const config = computed(() => {
  const colors = getChartColors()
  const labels = monthKeys.map((key) => t(`months.${key}`))

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: t('analytics.revenueMln'),
          data,
          fill: true,
          tension: 0.45,
          borderColor: (ctx: ScriptableContext<'line'>) => {
            const chart = ctx.chart
            const { ctx: canvasCtx, chartArea } = chart
            if (!chartArea) return colors.accent

            const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
            gradient.addColorStop(0, colors.lineGradient[0])
            gradient.addColorStop(0.5, colors.lineGradient[1])
            gradient.addColorStop(1, colors.lineGradient[2])
            return gradient
          },
          backgroundColor: (ctx: ScriptableContext<'line'>) => {
            const chart = ctx.chart
            const { ctx: canvasCtx, chartArea } = chart
            if (!chartArea) return colors.gradientStops[0]

            const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, colors.gradientStops[0])
            gradient.addColorStop(0.55, colors.gradientStops[1])
            gradient.addColorStop(1, colors.gradientStops[2])
            return gradient
          },
          borderWidth: 3,
          pointRadius: data.map((_, i) => (i === data.length - 1 ? 5 : 0)),
          pointHoverRadius: 7,
          pointBackgroundColor: '#fff',
          pointBorderColor: colors.accent,
          pointBorderWidth: 3,
          pointHoverBackgroundColor: colors.accent,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: chartAnimations(),
      interaction: { mode: 'index', intersect: false },
      plugins: {
        ...chartPlugins(),
        legend: { display: false },
        tooltip: {
          ...chartPlugins()?.tooltip,
          callbacks: {
            label: (ctx) => `${ctx.parsed.y} mln`,
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
  <ChartCanvas :key="locale" :config="config" class="revenue-chart" />
</template>

<style scoped>
.revenue-chart :deep(.chart-canvas) {
  filter: drop-shadow(0 4px 14px rgba(99, 102, 241, 0.12));
}
</style>
