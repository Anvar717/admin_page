<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration, ScriptableContext } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartPlugins, getChartColors } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
const data = [42, 58, 35, 72, 48, 91, 63]

const config = computed(() => {
  const colors = getChartColors()
  const labels = dayKeys.map((key) => t(`days.${key}`))

  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: t('dashboard.orders'),
          data,
          borderRadius: 8,
          borderSkipped: false,
          backgroundColor: (ctx: ScriptableContext<'bar'>) => {
            const chart = ctx.chart
            const { ctx: canvasCtx, chartArea } = chart
            if (!chartArea) return colors.accent

            const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, '#818cf8')
            gradient.addColorStop(1, '#6366f1')
            return gradient
          },
          hoverBackgroundColor: '#4f46e5',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        ...chartPlugins(),
        legend: { display: false },
      },
      scales: {
        x: { ...cartesianScales()?.x, grid: { display: false } },
        y: { ...cartesianScales()?.y, beginAtZero: true },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :key="locale" :config="config" />
</template>
