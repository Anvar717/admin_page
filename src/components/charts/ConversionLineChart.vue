<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartPlugins, getChartColors } from '../../composables/useChartTheme'

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
          tension: 0.4,
          borderColor: '#8b5cf6',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#8b5cf6',
        },
        {
          label: t('analytics.visits'),
          data: visitors,
          yAxisID: 'y1',
          tension: 0.4,
          borderColor: colors.accent,
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          borderDash: [6, 4],
          pointRadius: 4,
          pointBackgroundColor: colors.accent,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: chartPlugins(),
      scales: {
        x: { ...cartesianScales()?.x, grid: { display: false } },
        y: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          grid: { color: colors.border },
          ticks: {
            color: colors.text,
            callback: (v) => `${v}%`,
          },
          border: { display: false },
        },
        y1: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          grid: { display: false },
          ticks: { color: colors.text },
          border: { display: false },
        },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :key="locale" :config="config" />
</template>
