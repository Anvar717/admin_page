<script setup lang="ts">
const users = [
  { id: 1, name: 'Ali Valiyev', email: 'ali@mail.com', role: 'Foydalanuvchi', status: 'Faol' },
  { id: 2, name: 'Dilnoza Karimova', email: 'dilnoza@mail.com', role: 'Moderator', status: 'Faol' },
  { id: 3, name: 'Jasur Rahimov', email: 'jasur@mail.com', role: 'Foydalanuvchi', status: 'Nofaol' },
  { id: 4, name: 'Nodira Saidova', email: 'nodira@mail.com', role: 'Admin', status: 'Faol' },
  { id: 5, name: 'Sardor Tursunov', email: 'sardor@mail.com', role: 'Foydalanuvchi', status: 'Faol' },
]
</script>

<template>
  <div class="admin-page">
    <div class="ui-toolbar">
      <input type="search" placeholder="Foydalanuvchi qidirish..." class="ui-input" />
      <button type="button" class="ui-btn ui-btn-primary">+ Yangi foydalanuvchi</button>
    </div>

    <article class="ui-card ui-card-flush">
      <div class="ui-table-wrap">
        <table class="ui-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ism</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Holat</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>
                <div class="ui-user-cell">
                  <span class="ui-avatar">{{ user.name[0] }}</span>
                  {{ user.name }}
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span
                  class="ui-badge"
                  :class="user.status === 'Faol' ? 'success' : 'danger'"
                >
                  {{ user.status }}
                </span>
              </td>
              <td>
                <button type="button" class="ui-btn-text">Tahrirlash</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
</template>
