<script setup lang="ts">
import TrafficDonutChart from '../../components/charts/TrafficDonutChart.vue'
import ProductsBarChart from '../../components/charts/ProductsBarChart.vue'
import ConversionLineChart from '../../components/charts/ConversionLineChart.vue'

const metrics = [
  { label: 'Konversiya', value: '3.2%', icon: '📈' },
  { label: "O'rtacha buyurtma", value: "785,000 so'm", icon: '🛒' },
  { label: 'Qaytish foizi', value: '24%', icon: '🔁' },
  { label: 'Yangi mijozlar', value: '156', icon: '✨' },
]

const topProducts = [
  { name: 'Smartfon X1', sales: 124, revenue: '558M' },
  { name: 'Noutbuk Pro', sales: 89, revenue: '1.2B' },
  { name: 'Naushnik Z', sales: 256, revenue: '82M' },
  { name: 'Planshet Air', sales: 67, revenue: '596M' },
]
</script>

<template>
  <div class="admin-page">
    <section class="ui-stat-grid">
      <article v-for="metric in metrics" :key="metric.label" class="ui-stat-card">
        <div class="ui-stat-top">
          <p class="ui-stat-label">{{ metric.label }}</p>
          <span class="ui-stat-icon">{{ metric.icon }}</span>
        </div>
        <h2 class="ui-stat-value stat-value-sm">{{ metric.value }}</h2>
      </article>
    </section>

    <article class="ui-card chart-card">
      <div class="ui-card-body">
        <div class="chart-card-header">
          <div>
            <h3>Konversiya va tashriflar</h3>
            <p>Oylik dinamika</p>
          </div>
        </div>
        <ConversionLineChart />
      </div>
    </article>

    <section class="charts-grid">
      <article class="ui-card chart-card">
        <div class="ui-card-body">
          <div class="chart-card-header">
            <div>
              <h3>Trafik manbalari</h3>
              <p>Foydalanuvchilar qayerdan keladi</p>
            </div>
          </div>
          <TrafficDonutChart />
        </div>
      </article>

      <article class="ui-card chart-card">
        <div class="ui-card-body">
          <div class="chart-card-header">
            <div>
              <h3>Top mahsulotlar</h3>
              <p>Sotuvlar bo'yicha</p>
            </div>
          </div>
          <ProductsBarChart />
        </div>
      </article>
    </section>

    <article class="ui-card">
      <div class="ui-card-body">
        <div class="ui-card-header">
          <h3>Mahsulotlar reytingi</h3>
        </div>
        <ul class="product-list">
          <li v-for="(product, index) in topProducts" :key="product.name">
            <span class="rank">{{ index + 1 }}</span>
            <div class="product-info">
              <strong>{{ product.name }}</strong>
              <span>{{ product.sales }} ta sotuv · {{ product.revenue }}</span>
            </div>
            <div class="product-bar">
              <div :style="{ width: `${(product.sales / 256) * 100}%` }" />
            </div>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<style scoped>
.stat-value-sm {
  font-size: 22px !important;
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

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.product-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.product-list li {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--admin-bg);
  border-radius: var(--radius-md);
  transition: background var(--transition);
}

.product-list li:hover {
  background: var(--accent-bg);
}

.rank {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
}

.product-info strong {
  display: block;
  font-size: 14px;
  color: var(--text-h);
}

.product-info span {
  font-size: 12px;
  color: var(--text);
}

.product-bar {
  width: 80px;
  height: 6px;
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

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .product-list li {
    grid-template-columns: auto 1fr;
  }

  .product-bar {
    grid-column: 2;
    width: 100%;
  }
}
</style>
