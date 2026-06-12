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
    status: ['#3b82f6', '#8b5cf6', '#10b981', '#f43f5e'],
    barGradients: ['#818cf8', '#6366f1', '#8b5cf6', '#a855f7', '#7c3aed', '#6366f1', '#4f46e5'],
    gradientStops: ['rgba(99, 102, 241, 0.5)', 'rgba(139, 92, 246, 0.12)', 'rgba(99, 102, 241, 0)'],
    lineGradient: ['#818cf8', '#6366f1', '#8b5cf6'],
  }
}

export function chartAnimations(): ChartOptions['animation'] {
  return {
    duration: 900,
    easing: 'easeOutQuart',
  }
}

export function chartPlugins(): ChartOptions['plugins'] {
  const colors = getChartColors()

  return {
    legend: {
      labels: {
        color: colors.text,
        font: { family: 'Inter', size: 11, weight: 500 },
        padding: 12,
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        boxHeight: 8,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      titleColor: '#f8fafc',
      bodyColor: '#cbd5e1',
      borderColor: 'rgba(99, 102, 241, 0.35)',
      borderWidth: 1,
      padding: 14,
      cornerRadius: 12,
      displayColors: true,
      boxPadding: 6,
      titleFont: { family: 'Inter', size: 13, weight: 600 },
      bodyFont: { family: 'Inter', size: 12 },
      caretSize: 6,
    },
  }
}

export function cartesianScales(): ChartOptions['scales'] {
  const colors = getChartColors()

  return {
    x: {
      grid: { display: false },
      ticks: {
        color: colors.text,
        font: { family: 'Inter', size: 10, weight: 500 },
        padding: 6,
      },
      border: { display: false },
    },
    y: {
      grid: {
        color: 'rgba(148, 163, 184, 0.15)',
        drawTicks: false,
      },
      ticks: {
        color: colors.text,
        font: { family: 'Inter', size: 10 },
        padding: 8,
        maxTicksLimit: 5,
      },
      border: { display: false },
    },
  }
}
