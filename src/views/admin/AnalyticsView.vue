<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TrafficDonutChart from '../../components/charts/TrafficDonutChart.vue'
import ProductsBarChart from '../../components/charts/ProductsBarChart.vue'
import ConversionLineChart from '../../components/charts/ConversionLineChart.vue'
import AppIcon, { type IconName } from '../../components/icons/AppIcon.vue'

const { t } = useI18n()

const metrics: { labelKey: string; value: string; change: string; up: boolean; icon: IconName }[] = [
  { labelKey: 'analytics.conversion', value: '3.2%', change: '+0.8%', up: true, icon: 'conversion' },
  { labelKey: 'analytics.avgOrder', value: `785K`, change: '+5%', up: true, icon: 'cart' },
  { labelKey: 'analytics.returnRate', value: '24%', change: '-2%', up: false, icon: 'repeat' },
  { labelKey: 'analytics.newCustomers', value: '156', change: '+18%', up: true, icon: 'sparkles' },
]

const topProducts = [
  { name: 'Smartfon X1', sales: 124, revenue: '558M' },
  { name: 'Noutbuk Pro', sales: 89, revenue: '1.2B' },
  { name: 'Naushnik Z', sales: 256, revenue: '82M' },
]
</script>

<template>
  <div class="admin-page analytics-page">
    <section class="dash-stats">
      <article v-for="metric in metrics" :key="metric.labelKey" class="dash-stat">
        <span class="dash-stat-icon">
          <AppIcon :name="metric.icon" :size="16" />
        </span>
        <div class="dash-stat-body">
          <p class="dash-stat-label">{{ t(metric.labelKey) }}</p>
          <div class="dash-stat-row">
            <strong>{{ metric.value }}</strong>
            <span class="dash-stat-change" :class="{ down: !metric.up }">{{ metric.change }}</span>
          </div>
        </div>
      </article>
    </section>

    <section class="dash-grid">
      <article class="dash-panel dash-panel--wide dash-panel--chart">
        <div class="dash-panel-glow dash-panel-glow--purple" />
        <div class="dash-panel-head">
          <div class="dash-panel-title">
            <span class="dash-panel-icon dash-panel-icon--conversion">
              <AppIcon name="conversion" :size="14" />
            </span>
            <div>
              <h3>{{ t('analytics.conversionVisits') }}</h3>
              <p>{{ t('analytics.monthlyDynamics') }}</p>
            </div>
          </div>
          <span class="dash-badge">3.2%</span>
        </div>
        <div class="dash-chart">
          <ConversionLineChart />
        </div>
      </article>

      <article class="dash-panel dash-panel--chart">
        <div class="dash-panel-glow" />
        <div class="dash-panel-head">
          <div class="dash-panel-title">
            <span class="dash-panel-icon dash-panel-icon--traffic">
              <AppIcon name="sessions" :size="14" />
            </span>
            <div>
              <h3>{{ t('analytics.trafficSources') }}</h3>
              <p>{{ t('analytics.trafficDesc') }}</p>
            </div>
          </div>
        </div>
        <div class="dash-chart dash-chart--donut">
          <TrafficDonutChart compact />
        </div>
      </article>

      <article class="dash-panel dash-panel--chart">
        <div class="dash-panel-glow dash-panel-glow--blue" />
        <div class="dash-panel-head">
          <div class="dash-panel-title">
            <span class="dash-panel-icon dash-panel-icon--products">
              <AppIcon name="orders" :size="14" />
            </span>
            <div>
              <h3>{{ t('analytics.topProducts') }}</h3>
              <p>{{ t('analytics.salesBy') }}</p>
            </div>
          </div>
        </div>
        <div class="dash-chart">
          <ProductsBarChart />
        </div>
      </article>

      <article class="dash-panel dash-panel--split">
        <div class="dash-split-col dash-split-col--full">
          <div class="dash-panel-head">
            <div class="dash-panel-title">
              <span class="dash-panel-icon dash-panel-icon--ranking">
                <AppIcon name="sparkles" :size="14" />
              </span>
              <h3>{{ t('analytics.productRanking') }}</h3>
            </div>
          </div>
          <ul class="product-list">
            <li v-for="(product, index) in topProducts" :key="product.name">
              <span class="rank">{{ index + 1 }}</span>
              <div class="product-info">
                <strong>{{ product.name }}</strong>
                <span>{{ product.sales }} {{ t('analytics.salesUnit') }} · {{ product.revenue }}</span>
                <div class="product-bar">
                  <div :style="{ width: `${(product.sales / 256) * 100}%` }" />
                </div>
              </div>
              <span class="product-sales">{{ product.sales }}</span>
            </li>
          </ul>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.analytics-page {
  gap: 10px;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dash-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  flex-shrink: 0;
}

.dash-stat {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
}

.dash-stat:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.dash-stat-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: var(--accent-bg);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.dash-stat-body {
  min-width: 0;
}

.dash-stat-label {
  margin: 0 0 2px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dash-stat-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.dash-stat-row strong {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-h);
  letter-spacing: -0.02em;
}

.dash-stat-change {
  font-size: 11px;
  font-weight: 600;
  color: var(--success);
}

.dash-stat-change.down {
  color: var(--danger);
}

.dash-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

.dash-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 12px 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.dash-panel--chart {
  background: linear-gradient(180deg, var(--bg) 0%, rgba(99, 102, 241, 0.03) 100%);
}

.dash-panel-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient);
  opacity: 0.85;
}

.dash-panel-glow--purple {
  background: linear-gradient(90deg, #8b5cf6, #a855f7);
}

.dash-panel-glow--blue {
  background: linear-gradient(90deg, #6366f1, #818cf8);
}

.dash-panel--wide {
  grid-column: 1 / 3;
}

.dash-panel--split {
  grid-column: 2 / 4;
  padding: 10px 12px;
}

.dash-split-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.dash-split-col--full {
  width: 100%;
}

.dash-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  flex-shrink: 0;
}

.dash-panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.dash-panel-title h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dash-panel-title p {
  margin: 2px 0 0;
  font-size: 10px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dash-panel-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 8px;
  display: grid;
  place-items: center;
}

.dash-panel-icon--conversion {
  background: rgba(139, 92, 246, 0.12);
  color: #8b5cf6;
}

.dash-panel-icon--traffic {
  background: rgba(99, 102, 241, 0.12);
  color: #6366f1;
}

.dash-panel-icon--products {
  background: rgba(168, 85, 247, 0.12);
  color: #a855f7;
}

.dash-panel-icon--ranking {
  background: rgba(236, 72, 153, 0.12);
  color: #ec4899;
}

.dash-badge {
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.12);
  flex-shrink: 0;
}

.dash-chart {
  flex: 1;
  min-height: 0;
  padding-top: 2px;
}

.dash-chart :deep(.chart-canvas) {
  min-height: 0 !important;
  height: 100% !important;
}

.dash-chart--donut :deep(.chart-canvas) {
  min-height: 0 !important;
}

.product-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-height: 0;
  justify-content: space-between;
}

.product-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  padding: 8px 10px;
  background: var(--admin-bg);
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  transition: border-color var(--transition), background var(--transition);
}

.product-list li:hover {
  background: var(--accent-bg);
  border-color: var(--accent-border);
}

.rank {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--gradient);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-info strong {
  display: block;
  font-size: 11px;
  color: var(--text-h);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-info span {
  font-size: 10px;
  color: var(--text);
}

.product-bar {
  height: 4px;
  margin-top: 5px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
}

.product-bar div {
  height: 100%;
  background: var(--gradient);
  border-radius: 999px;
  transition: width 0.6s ease;
}

.product-sales {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
}

@media (max-width: 1200px) {
  .analytics-page {
    height: auto;
    min-height: 600px;
    overflow: visible;
  }

  .dash-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr auto;
  }

  .dash-panel--wide {
    grid-column: 1 / -1;
  }

  .dash-panel--split {
    grid-column: 1 / -1;
  }

  .dash-chart :deep(.chart-canvas) {
    min-height: 140px !important;
  }
}

@media (max-width: 768px) {
  .dash-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .dash-grid {
    grid-template-columns: 1fr;
  }

  .dash-panel--wide,
  .dash-panel--split {
    grid-column: 1;
  }
}
</style>
