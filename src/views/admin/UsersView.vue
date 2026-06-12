<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from '../../components/icons/AppIcon.vue'

const { t } = useI18n()

const users = [
  { id: 1, name: 'Ali Valiyev', email: 'ali@mail.com', role: 'user', status: 'active' },
  { id: 2, name: 'Dilnoza Karimova', email: 'dilnoza@mail.com', role: 'moderator', status: 'active' },
  { id: 3, name: 'Jasur Rahimov', email: 'jasur@mail.com', role: 'user', status: 'inactive' },
  { id: 4, name: 'Nodira Saidova', email: 'nodira@mail.com', role: 'admin', status: 'active' },
  { id: 5, name: 'Sardor Tursunov', email: 'sardor@mail.com', role: 'user', status: 'active' },
]

const roleKeys: Record<string, string> = {
  user: 'users.roleUser',
  moderator: 'users.roleModerator',
  admin: 'users.roleAdmin',
}
</script>

<template>
  <div class="admin-page">
    <div class="ui-toolbar">
      <input type="search" :placeholder="t('users.search')" class="ui-input" />
      <button type="button" class="ui-btn ui-btn-primary">
        <AppIcon name="plus" :size="16" />
        {{ t('users.addUser') }}
      </button>
    </div>

    <article class="ui-card ui-card-flush">
      <div class="ui-table-wrap">
        <table class="ui-table">
          <thead>
            <tr>
              <th>{{ t('users.colId') }}</th>
              <th>{{ t('users.colName') }}</th>
              <th>{{ t('users.colEmail') }}</th>
              <th>{{ t('users.colRole') }}</th>
              <th>{{ t('users.colStatus') }}</th>
              <th>{{ t('common.actions') }}</th>
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
              <td>{{ t(roleKeys[user.role]) }}</td>
              <td>
                <span
                  class="ui-badge"
                  :class="user.status === 'active' ? 'success' : 'danger'"
                >
                  {{ t(`common.${user.status}`) }}
                </span>
              </td>
              <td>
                <button type="button" class="ui-btn-text">{{ t('common.edit') }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
</template>
