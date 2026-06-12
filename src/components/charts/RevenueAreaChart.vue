<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration, ScriptableContext } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartPlugins, getChartColors } from '../../composables/useChartTheme'

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
          tension: 0.42,
          borderColor: colors.accent,
          backgroundColor: (ctx: ScriptableContext<'line'>) => {
            const chart = ctx.chart
            const { ctx: canvasCtx, chartArea } = chart
            if (!chartArea) return colors.gradientStops[0]

            const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, colors.gradientStops[0])
            gradient.addColorStop(1, colors.gradientStops[1])
            return gradient
          },
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: colors.accent,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
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
