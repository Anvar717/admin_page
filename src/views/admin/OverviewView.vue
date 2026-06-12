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
  { id: '#1024', user: 'Ali Valiyev', amount: '450,000', status: 'new', statusClass: 'info', date: '11.06.2026' },
  { id: '#1023', user: 'Dilnoza Karimova', amount: '1,200,000', status: 'confirmed', statusClass: 'purple', date: '11.06.2026' },
  { id: '#1022', user: 'Jasur Rahimov', amount: '320,000', status: 'shipping', statusClass: 'warning', date: '10.06.2026' },
  { id: '#1021', user: 'Nodira Saidova', amount: '890,000', status: 'cancelled', statusClass: 'danger', date: '10.06.2026' },
]

const activities = [
  { textKey: 'dashboard.activity1', timeKey: 'dashboard.minutesAgo', timeVal: '5' },
  { textKey: 'dashboard.activity2', timeKey: 'dashboard.minutesAgo', timeVal: '12' },
  { textKey: 'dashboard.activity3', timeKey: 'dashboard.hourAgo', timeVal: '1' },
  { textKey: 'dashboard.activity4', timeKey: 'dashboard.hoursAgo', timeVal: '2' },
]
</script>

<template>
  <div class="admin-page">
    <section class="ui-stat-grid">
      <article v-for="stat in stats" :key="stat.labelKey" class="ui-stat-card">
        <div class="ui-stat-top">
          <p class="ui-stat-label">{{ t(stat.labelKey) }}</p>
          <span class="ui-stat-icon">
            <AppIcon :name="stat.icon" :size="20" />
          </span>
        </div>
        <h2 class="ui-stat-value">{{ stat.value }}</h2>
        <span class="ui-stat-change" :class="{ down: !stat.up }">
          {{ stat.change }} {{ t('common.comparedToLastMonth') }}
        </span>
      </article>
    </section>

    <section class="charts-row-main">
      <article class="ui-card chart-card chart-card--large">
        <div class="ui-card-body">
          <div class="chart-card-header">
            <div>
              <h3>{{ t('dashboard.monthlyRevenue') }}</h3>
              <p>{{ t('dashboard.yearlyDynamics') }}</p>
            </div>
            <span class="chart-badge">+23% {{ t('dashboard.growth') }}</span>
          </div>
          <RevenueAreaChart />
        </div>
      </article>

      <article class="ui-card chart-card">
        <div class="ui-card-body">
          <div class="chart-card-header">
            <div>
              <h3>{{ t('dashboard.orderStatus') }}</h3>
              <p>{{ t('dashboard.currentDistribution') }}</p>
            </div>
          </div>
          <StatusDonutChart />
        </div>
      </article>
    </section>

    <section class="charts-row-secondary">
      <article class="ui-card chart-card">
        <div class="ui-card-body">
          <div class="chart-card-header">
            <div>
              <h3>{{ t('dashboard.weeklyOrders') }}</h3>
              <p>{{ t('dashboard.dailyStats') }}</p>
            </div>
            <span class="chart-total">{{ t('common.total') }}: 409</span>
          </div>
          <OrdersBarChart />
        </div>
      </article>

      <article class="ui-card chart-card">
        <div class="ui-card-body">
          <div class="chart-card-header">
            <div>
              <h3>{{ t('dashboard.recentActivity') }}</h3>
              <p>{{ t('dashboard.realtimeUpdates') }}</p>
            </div>
          </div>
          <div class="activity-list">
            <div v-for="(item, i) in activities" :key="i" class="activity-item">
              <span class="activity-dot" />
              <div>
                <p>{{ t(item.textKey) }}</p>
                <span>{{ item.timeVal }} {{ t(item.timeKey) }}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <article class="ui-card ui-card-flush">
      <div class="ui-card-body" style="padding: 24px 24px 0">
        <div class="ui-card-header">
          <h3>{{ t('dashboard.recentOrders') }}</h3>
        </div>
      </div>
      <div class="ui-table-wrap">
        <table class="ui-table">
          <thead>
            <tr>
              <th>{{ t('dashboard.colId') }}</th>
              <th>{{ t('dashboard.colUser') }}</th>
              <th>{{ t('dashboard.colAmount') }}</th>
              <th>{{ t('dashboard.colStatus') }}</th>
              <th>{{ t('dashboard.colDate') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td><strong>{{ order.id }}</strong></td>
              <td>{{ order.user }}</td>
              <td>{{ order.amount }} {{ t('common.currency') }}</td>
              <td>
                <span class="ui-badge" :class="order.statusClass">{{ t(`status.${order.status}`) }}</span>
              </td>
              <td>{{ order.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
</template>

<style scoped>
.charts-row-main {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 20px;
}

.charts-row-secondary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.chart-card-header h3 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-h);
}

.chart-card-header p {
  margin: 0;
  font-size: 12px;
  color: var(--text);
}

.chart-badge {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--success);
  background: var(--success-bg);
  white-space: nowrap;
}

.chart-total {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--admin-bg);
  border-radius: var(--radius-md);
  transition: background var(--transition);
}

.activity-item:hover {
  background: var(--accent-bg);
}

.activity-dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-bg);
  flex-shrink: 0;
}

.activity-item p {
  margin: 0 0 4px;
  font-size: 14px;
  color: var(--text-h);
}

.activity-item span {
  font-size: 12px;
  color: var(--text);
}

@media (max-width: 1200px) {
  .charts-row-main {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .charts-row-secondary {
    grid-template-columns: 1fr;
  }
}
</style>
