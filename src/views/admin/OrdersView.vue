<script setup lang="ts">
const orders = [
  { id: '#1024', customer: 'Ali Valiyev', product: 'Smartfon', amount: '4,500,000', status: 'Yangi' },
  { id: '#1023', customer: 'Dilnoza K.', product: 'Noutbuk', amount: '12,000,000', status: 'Tasdiqlangan' },
  { id: '#1022', customer: 'Jasur R.', product: 'Naushnik', amount: '320,000', status: 'Yetkazilmoqda' },
  { id: '#1021', customer: 'Nodira S.', product: 'Planshet', amount: '8,900,000', status: 'Bekor qilingan' },
  { id: '#1020', customer: 'Sardor T.', product: 'Soat', amount: '1,150,000', status: 'Yakunlangan' },
]

const statusClass: Record<string, string> = {
  'Yangi': 'info',
  'Tasdiqlangan': 'purple',
  'Yetkazilmoqda': 'warning',
  'Bekor qilingan': 'danger',
  'Yakunlangan': 'success',
}

const miniStats = [
  { label: 'Yangi', value: '24', icon: '🆕' },
  { label: 'Jarayonda', value: '18', icon: '⏳' },
  { label: 'Yakunlangan', value: '312', icon: '✅' },
]
</script>

<template>
  <div class="admin-page">
    <section class="mini-stats">
      <article v-for="stat in miniStats" :key="stat.label" class="ui-stat-card">
        <div class="ui-stat-top">
          <p class="ui-stat-label">{{ stat.label }}</p>
          <span class="ui-stat-icon">{{ stat.icon }}</span>
        </div>
        <h2 class="ui-stat-value">{{ stat.value }}</h2>
      </article>
    </section>

    <article class="ui-card ui-card-flush">
      <div class="ui-table-wrap">
        <table class="ui-table">
          <thead>
            <tr>
              <th>Buyurtma ID</th>
              <th>Mijoz</th>
              <th>Mahsulot</th>
              <th>Summa</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td><strong>{{ order.id }}</strong></td>
              <td>{{ order.customer }}</td>
              <td>{{ order.product }}</td>
              <td>{{ order.amount }} so'm</td>
              <td>
                <span class="ui-badge" :class="statusClass[order.status]">
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
</template>

<style scoped>
.mini-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .mini-stats {
    grid-template-columns: 1fr;
  }
}
</style>
