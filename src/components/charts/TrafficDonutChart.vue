<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { chartPlugins, getChartColors } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const sourceKeys = ['google', 'instagram', 'telegram', 'others'] as const
const values = [45, 30, 15, 10]

const config = computed(() => {
  const colors = getChartColors()
  const labels = sourceKeys.map((key) => t(`analytics.${key}`))

  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'],
          borderWidth: 3,
          borderColor: colors.adminBg,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        ...chartPlugins(),
        legend: {
          ...chartPlugins()?.legend,
          position: 'right',
        },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :key="locale" :config="config" class="donut-chart" />
</template>

<style scoped>
.donut-chart :deep(.chart-canvas) {
  min-height: 280px;
}
</style>
