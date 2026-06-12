<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfiguration } from 'chart.js'
import ChartCanvas from './ChartCanvas.vue'
import { chartPlugins, getChartColors } from '../../composables/useChartTheme'

const { t, locale } = useI18n()

const props = withDefaults(
  defineProps<{
    values?: number[]
  }>(),
  {
    values: () => [24, 18, 312, 12],
  },
)

const statusLabelKeys = ['status.new', 'common.inProgress', 'status.done', 'status.cancelled'] as const

const config = computed(() => {
  const colors = getChartColors()
  const labels = statusLabelKeys.map((key) => t(key))

  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: props.values,
          backgroundColor: colors.palette.slice(0, labels.length),
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
  <ChartCanvas :key="locale" :config="config" class="donut-chart" />
</template>

<style scoped>
.donut-chart :deep(.chart-canvas) {
  min-height: 300px;
}
</style>
