<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartConfiguration,
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  BarController,
  DoughnutController,
  Filler,
  Tooltip,
  Legend,
)

const props = defineProps<{
  config: ChartConfiguration
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

function renderChart() {
  if (!canvasRef.value) return
  chart?.destroy()
  chart = new Chart(canvasRef.value, props.config)
}

onMounted(renderChart)

watch(
  () => props.config,
  () => renderChart(),
  { deep: true },
)

onBeforeUnmount(() => {
  chart?.destroy()
})
</script>

<template>
  <div class="chart-canvas">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>
.chart-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 260px;
}

.chart-canvas canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
