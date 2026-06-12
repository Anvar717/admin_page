<script setup lang="ts">
import { computed } from 'vue'
import type { ChartConfiguration } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { cartesianScales, chartPlugins, getChartColors } from '../../composables/useChartTheme'

const labels = ['Smartfon X1', 'Noutbuk Pro', 'Naushnik Z', 'Planshet Air']
const data = [124, 89, 256, 67]

const config = computed(() => {
  const colors = getChartColors()

  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Sotuvlar',
          data,
          borderRadius: 6,
          backgroundColor: colors.palette,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        ...chartPlugins(),
        legend: { display: false },
      },
      scales: {
        x: { ...cartesianScales()?.x, beginAtZero: true, grid: { color: colors.border } },
        y: { ...cartesianScales()?.y, grid: { display: false } },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :config="config" />
</template>
