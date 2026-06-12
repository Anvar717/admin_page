<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RevenueAreaChart from '../../components/charts/RevenueAreaChart.vue'
import OrdersBarChart from '../../components/charts/OrdersBarChart.vue'
import StatusDonutChart from '../../components/charts/StatusDonutChart.vue'
import AppIcon, { type IconName } from '../../components/icons/AppIcon.vue'

const { t } = useI18n()

const stats: { labelKey: string; value: string; change: string; up: boolean; icon: IconName }[] = [
  { labelKey: 'dashboard.totalUsers', value: '1,248', change: '+12%', up: true, icon: 'users' },
  { labelKey: 'dashboard.orders', value: '356', change: '+8%', up: true, icon: 'orders' },
  { labelKey: 'dashboard.revenue', value: '24.5M', change: '+23%', up: true, icon: 'revenue' },
  { labelKey: 'dashboard.activeSessions', value: '89', change: '-3%', up: false, icon: 'sessions' },
]

const recentOrders = [
  { id: '#1024', user: 'Ali Valiyev', amount: '450,000', status: 'new', statusClass: 'info' },
  { id: '#1023', user: 'Dilnoza K.', amount: '1,200,000', status: 'confirmed', statusClass: 'purple' },
  { id: '#1022', user: 'Jasur R.', amount: '320,000', status: 'shipping', statusClass: 'warning' },
]

const activities = [
  { textKey: 'dashboard.activity1', timeKey: 'dashboard.minutesAgo', timeVal: '5' },
  { textKey: 'dashboard.activity2', timeKey: 'dashboard.minutesAgo', timeVal: '12' },
  { textKey: 'dashboard.activity3', timeKey: 'dashboard.hourAgo', timeVal: '1' },
]
</script>

<template>
  <div class="admin-page dashboard-page">
    <section class="dash-stats">
      <article v-for="stat in stats" :key="stat.labelKey" class="dash-stat">
        <span class="dash-stat-icon">
          <AppIcon :name="stat.icon" :size="16" />
        </span>
        <div class="dash-stat-body">
          <p class="dash-stat-label">{{ t(stat.labelKey) }}</p>
          <div class="dash-stat-row">
            <strong>{{ stat.value }}</strong>
            <span class="dash-stat-change" :class="{ down: !stat.up }">{{ stat.change }}</span>
          </div>
        </div>
      </article>
    </section>

    <section class="dash-grid">
      <article class="dash-panel dash-panel--wide">
        <div class="dash-panel-head">
          <h3>{{ t('dashboard.monthlyRevenue') }}</h3>
          <span class="dash-badge">+23%</span>
        </div>
        <div class="dash-chart">
          <RevenueAreaChart />
        </div>
      </article>

      <article class="dash-panel">
        <div class="dash-panel-head">
          <h3>{{ t('dashboard.orderStatus') }}</h3>
        </div>
        <div class="dash-chart dash-chart--donut">
          <StatusDonutChart compact />
        </div>
      </article>

      <article class="dash-panel">
        <div class="dash-panel-head">
          <h3>{{ t('dashboard.weeklyOrders') }}</h3>
          <span class="dash-meta">409</span>
        </div>
        <div class="dash-chart">
          <OrdersBarChart />
        </div>
      </article>

      <article class="dash-panel dash-panel--split">
        <div class="dash-split-col">
          <div class="dash-panel-head">
            <h3>{{ t('dashboard.recentActivity') }}</h3>
          </div>
          <ul class="dash-activity">
            <li v-for="(item, i) in activities" :key="i">
              <span class="dash-activity-dot" />
              <div>
                <p>{{ t(item.textKey) }}</p>
                <span>{{ item.timeVal }} {{ t(item.timeKey) }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="dash-split-col">
          <div class="dash-panel-head">
            <h3>{{ t('dashboard.recentOrders') }}</h3>
          </div>
          <div class="dash-orders">
            <div v-for="order in recentOrders" :key="order.id" class="dash-order">
              <div class="dash-order-main">
                <strong>{{ order.id }}</strong>
                <span>{{ order.user }}</span>
              </div>
              <div class="dash-order-side">
                <span>{{ order.amount }}</span>
                <span class="ui-badge" :class="order.statusClass">{{ t(`status.${order.status}`) }}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.dashboard-page {
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
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 12px 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.dash-panel--wide {
  grid-column: 1 / 3;
}

.dash-panel--split {
  grid-column: 2 / 4;
  flex-direction: row;
  gap: 14px;
  padding: 10px 12px;
}

.dash-split-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.dash-split-col + .dash-split-col {
  border-left: 1px solid var(--border-light, var(--border));
  padding-left: 14px;
}

.dash-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  flex-shrink: 0;
}

.dash-panel-head h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dash-badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: var(--success);
  background: var(--success-bg);
  flex-shrink: 0;
}

.dash-meta {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
}

.dash-chart {
  flex: 1;
  min-height: 0;
}

.dash-chart :deep(.chart-canvas) {
  min-height: 0 !important;
  height: 100% !important;
}

.dash-chart--donut :deep(.chart-canvas) {
  min-height: 0 !important;
}

.dash-activity {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-height: 0;
  justify-content: space-between;
}

.dash-activity li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
  padding: 6px 8px;
  background: var(--admin-bg);
  border-radius: var(--radius-sm);
}

.dash-activity-dot {
  width: 6px;
  height: 6px;
  margin-top: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.dash-activity p {
  margin: 0;
  font-size: 11px;
  color: var(--text-h);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dash-activity span {
  font-size: 10px;
  color: var(--text);
}

.dash-orders {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-height: 0;
  justify-content: space-between;
}

.dash-order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex: 1;
  padding: 6px 8px;
  background: var(--admin-bg);
  border-radius: var(--radius-sm);
}

.dash-order-main {
  min-width: 0;
}

.dash-order-main strong {
  display: block;
  font-size: 11px;
  color: var(--text-h);
}

.dash-order-main span {
  font-size: 10px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dash-order-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  flex-shrink: 0;
}

.dash-order-side > span:first-child {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-h);
}

.dash-order-side .ui-badge {
  padding: 2px 7px;
  font-size: 9px;
}

@media (max-width: 1200px) {
  .dashboard-page {
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

  .dash-panel--split {
    flex-direction: column;
  }

  .dash-split-col + .dash-split-col {
    border-left: none;
    border-top: 1px solid var(--border-light, var(--border));
    padding-left: 0;
    padding-top: 10px;
  }
}
</style>
