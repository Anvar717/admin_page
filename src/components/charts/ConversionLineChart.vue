<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration, ScriptableContext } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartAnimations, chartPlugins, getChartColors } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const weekKeys = ['week1', 'week2', 'week3', 'week4'] as const
const conversion = [2.1, 2.8, 3.0, 3.2]
const visitors = [1200, 1450, 1380, 1620]

const config = computed(() => {
  const colors = getChartColors()
  const labels = weekKeys.map((key) => t(`analytics.${key}`))

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `${t('analytics.conversion')} (%)`,
          data: conversion,
          yAxisID: 'y',
          fill: true,
          tension: 0.42,
          borderColor: '#8b5cf6',
          backgroundColor: (ctx: ScriptableContext<'line'>) => {
            const chart = ctx.chart
            const { ctx: canvasCtx, chartArea } = chart
            if (!chartArea) return 'rgba(139, 92, 246, 0.15)'

            const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.35)')
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
            return gradient
          },
          borderWidth: 3,
          pointRadius: conversion.map((_, i) => (i === conversion.length - 1 ? 5 : 3)),
          pointBackgroundColor: '#fff',
          pointBorderColor: '#8b5cf6',
          pointBorderWidth: 2,
          pointHoverRadius: 7,
        },
        {
          label: t('analytics.visits'),
          data: visitors,
          yAxisID: 'y1',
          tension: 0.42,
          borderColor: colors.accent,
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          borderDash: [6, 4],
          pointRadius: 3,
          pointBackgroundColor: colors.accent,
          pointHoverRadius: 6,
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
        legend: {
          ...chartPlugins()?.legend,
          position: 'top',
          align: 'end',
          labels: { boxWidth: 8, padding: 14, font: { size: 11 } },
        },
      },
      scales: {
        x: { ...cartesianScales()?.x, grid: { display: false } },
        y: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          grid: { color: 'rgba(99, 102, 241, 0.08)', drawTicks: false },
          ticks: {
            color: colors.text,
            font: { size: 10 },
            callback: (v) => `${v}%`,
            maxTicksLimit: 5,
          },
          border: { display: false },
        },
        y1: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          grid: { display: false },
          ticks: { color: colors.text, font: { size: 10 }, maxTicksLimit: 5 },
          border: { display: false },
        },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :key="locale" :config="config" class="conversion-chart" />
</template>

<style scoped>
.conversion-chart :deep(.chart-canvas) {
  min-height: 0;
  filter: drop-shadow(0 4px 14px rgba(139, 92, 246, 0.1));
}
</style>
