<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration, ScriptableContext } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartAnimations, chartPlugins } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const labels = ['Smartfon X1', 'Noutbuk Pro', 'Naushnik Z', 'Planshet Air']
const data = [124, 89, 256, 67]
const maxIndex = data.indexOf(Math.max(...data))
const barColors = ['#818cf8', '#6366f1', '#8b5cf6', '#a855f7']

const config = computed(() => {
  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: t('analytics.sales'),
          data,
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 22,
          backgroundColor: (ctx: ScriptableContext<'bar'>) => {
            const index = ctx.dataIndex
            const chart = ctx.chart
            const { ctx: canvasCtx, chartArea } = chart
            if (!chartArea) return barColors[index % barColors.length]

            const isPeak = index === maxIndex
            const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
            if (isPeak) {
              gradient.addColorStop(0, '#818cf8')
              gradient.addColorStop(1, '#4f46e5')
            } else {
              gradient.addColorStop(0, barColors[index % barColors.length])
              gradient.addColorStop(1, '#6366f1')
            }
            return gradient
          },
          hoverBackgroundColor: '#4f46e5',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: chartAnimations(),
      indexAxis: 'y',
      plugins: {
        ...chartPlugins(),
        legend: { display: false },
        tooltip: {
          ...chartPlugins()?.tooltip,
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.x}`,
          },
        },
      },
      scales: {
        x: {
          ...cartesianScales()?.x,
          beginAtZero: true,
          grid: { color: 'rgba(99, 102, 241, 0.08)', drawTicks: false },
        },
        y: { ...cartesianScales()?.y, grid: { display: false } },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :key="locale" :config="config" class="products-chart" />
</template>

<style scoped>
.products-chart :deep(.chart-canvas) {
  min-height: 0;
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.1));
}
</style>
