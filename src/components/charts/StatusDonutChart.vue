<script setup lang="ts">
import { computed } from 'vue'
import type { ChartConfiguration } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { chartPlugins, getChartColors } from '../../composables/useChartTheme'

const props = withDefaults(
  defineProps<{
    title?: string
    labels?: string[]
    values?: number[]
  }>(),
  {
    title: 'Buyurtma holati',
    labels: () => ['Yangi', 'Jarayonda', 'Yakunlangan', 'Bekor'],
    values: () => [24, 18, 312, 12],
  },
)

const config = computed(() => {
  const colors = getChartColors()

  return {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [
        {
          data: props.values,
          backgroundColor: colors.palette.slice(0, props.labels.length),
          borderWidth: 0,
          hoverOffset: 8,
          spacing: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        ...chartPlugins(),
        legend: {
          ...chartPlugins()?.legend,
          position: 'bottom',
        },
      },
    },
  } as ChartConfiguration
})
</script>

<template>
  <ChartCanvas :config="config" class="donut-chart" />
</template>

<style scoped>
.donut-chart :deep(.chart-canvas) {
  min-height: 300px;
}
</style>
