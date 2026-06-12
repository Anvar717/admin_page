<script setup lang="ts">
const stats = [
  { label: 'Jami foydalanuvchilar', value: '1,248', change: '+12%', up: true, icon: '👥' },
  { label: 'Buyurtmalar', value: '356', change: '+8%', up: true, icon: '📦' },
  { label: 'Daromad', value: '24.5M', change: '+23%', up: true, icon: '💰' },
  { label: 'Faol sessiyalar', value: '89', change: '-3%', up: false, icon: '⚡' },
]

const recentOrders = [
  { id: '#1024', user: 'Ali Valiyev', amount: '450,000', status: 'Yangi', statusClass: 'info', date: '11.06.2026' },
  { id: '#1023', user: 'Dilnoza Karimova', amount: '1,200,000', status: 'Tasdiqlangan', statusClass: 'purple', date: '11.06.2026' },
  { id: '#1022', user: 'Jasur Rahimov', amount: '320,000', status: 'Yetkazilmoqda', statusClass: 'warning', date: '10.06.2026' },
  { id: '#1021', user: 'Nodira Saidova', amount: '890,000', status: 'Bekor qilingan', statusClass: 'danger', date: '10.06.2026' },
]

const activities = [
  'Yangi foydalanuvchi ro\'yxatdan o\'tdi',
  '#1024 buyurtma yaratildi',
  'Tizim yangilanishi muvaffaqiyatli',
  '3 ta buyurtma yetkazildi',
]

const chartBars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]
</script>

<template>
  <div class="admin-page">
    <section class="ui-stat-grid">
      <article v-for="stat in stats" :key="stat.label" class="ui-stat-card">
        <div class="ui-stat-top">
          <p class="ui-stat-label">{{ stat.label }}</p>
          <span class="ui-stat-icon">{{ stat.icon }}</span>
        </div>
        <h2 class="ui-stat-value">{{ stat.value }}</h2>
        <span class="ui-stat-change" :class="{ down: !stat.up }">
          {{ stat.change }} o'tgan oyga nisbatan
        </span>
      </article>
    </section>

    <section class="ui-grid-2-1">
      <article class="ui-card">
        <div class="ui-card-body">
          <div class="ui-card-header">
            <h3>Oylik daromad</h3>
            <span>2026 yil</span>
          </div>
          <div class="ui-chart">
            <div
              v-for="(height, index) in chartBars"
              :key="index"
              class="ui-chart-bar"
              :style="{ height: `${height}%` }"
            />
          </div>
        </div>
      </article>

      <article class="ui-card">
        <div class="ui-card-body">
          <div class="ui-card-header">
            <h3>So'nggi faoliyat</h3>
          </div>
          <div class="activity-list">
            <div v-for="(item, i) in activities" :key="i" class="ui-activity-item">
              <span class="ui-activity-dot" />
              {{ item }}
            </div>
            <div></div>
          </div>
        </div>
      </article>
    </section>

    <article class="ui-card ui-card-flush">
      <div class="ui-card-body" style="padding: 24px 24px 0">
        <div class="ui-card-header">
          <h3>So'nggi buyurtmalar</h3>
        </div>
      </div>
      <div class="ui-table-wrap">
        <table class="ui-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Foydalanuvchi</th>
              <th>Summa</th>
              <th>Holat</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td><strong>{{ order.id }}</strong></td>
              <td>{{ order.user }}</td>
              <td>{{ order.amount }} so'm</td>
              <td>
                <span class="ui-badge" :class="order.statusClass">{{ order.status }}</span>
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
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
