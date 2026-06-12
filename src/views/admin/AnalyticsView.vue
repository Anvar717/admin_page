<script setup lang="ts">
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

const traffic = [
  { name: 'Google', percent: 45 },
  { name: 'Instagram', percent: 30 },
  { name: 'Telegram', percent: 15 },
  { name: 'Boshqalar', percent: 10 },
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
        <h2 class="ui-stat-value" style="font-size: 22px">{{ metric.value }}</h2>
      </article>
    </section>

    <section class="ui-grid-2">
      <article class="ui-card">
        <div class="ui-card-body">
          <div class="ui-card-header">
            <h3>Trafik manbalari</h3>
          </div>
          <div class="ui-progress-list">
            <div v-for="item in traffic" :key="item.name" class="progress-item">
              <div class="ui-progress-header">
                <span>{{ item.name }}</span>
                <span>{{ item.percent }}%</span>
              </div>
              <div class="ui-progress-bar">
                <div :style="{ width: `${item.percent}%` }" />
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="ui-card">
        <div class="ui-card-body">
          <div class="ui-card-header">
            <h3>Top mahsulotlar</h3>
          </div>
          <ul class="product-list">
            <li v-for="(product, index) in topProducts" :key="product.name">
              <span class="rank">{{ index + 1 }}</span>
              <div>
                <strong>{{ product.name }}</strong>
                <span>{{ product.sales }} ta sotuv · {{ product.revenue }}</span>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.product-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-list li {
  display: flex;
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
  flex-shrink: 0;
}

.product-list strong {
  display: block;
  font-size: 14px;
  color: var(--text-h);
}

.product-list span {
  font-size: 12px;
  color: var(--text);
}
</style>
