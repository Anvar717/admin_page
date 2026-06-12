import type { ChartOptions } from 'chart.js'

export function getChartColors() {
  const style = getComputedStyle(document.documentElement)
  const accent = style.getPropertyValue('--accent').trim() || '#6366f1'
  const text = style.getPropertyValue('--text').trim() || '#64748b'
  const textH = style.getPropertyValue('--text-h').trim() || '#0f172a'
  const border = style.getPropertyValue('--border').trim() || '#e2e8f0'
  const adminBg = style.getPropertyValue('--admin-bg').trim() || '#f1f5f9'

  return {
    accent,
    text,
    textH,
    border,
    adminBg,
    palette: ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#14b8a6', '#f59e0b'],
    gradientStops: ['rgba(99, 102, 241, 0.45)', 'rgba(99, 102, 241, 0.02)'],
  }
}

export function chartPlugins(): ChartOptions['plugins'] {
  const colors = getChartColors()

  return {
    legend: {
      labels: {
        color: colors.text,
        font: { family: 'Inter', size: 12 },
        padding: 16,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: colors.textH,
      titleColor: '#fff',
      bodyColor: '#e2e8f0',
      borderColor: colors.border,
      borderWidth: 1,
      padding: 12,
      cornerRadius: 10,
      titleFont: { family: 'Inter', size: 13, weight: 600 },
      bodyFont: { family: 'Inter', size: 12 },
    },
  }
}

export function cartesianScales(): ChartOptions['scales'] {
  const colors = getChartColors()

  return {
    x: {
      grid: { color: 'transparent' },
      ticks: { color: colors.text, font: { family: 'Inter', size: 11 } },
      border: { display: false },
    },
    y: {
      grid: { color: colors.border },
      ticks: { color: colors.text, font: { family: 'Inter', size: 11 } },
      border: { display: false },
    },
  }
}
