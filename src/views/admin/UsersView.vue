<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../components/icons/AppIcon.vue'
import UserCreateModal from '../../components/admin/UserCreateModal.vue'
import UserEditModal, { type User } from '../../components/admin/UserEditModal.vue'
import UserDeleteModal from '../../components/admin/UserDeleteModal.vue'
import { useUsers } from '../../composables/useUsers'

const { t } = useI18n()
const { users, generateUserId, addUser, updateUser, deleteUser } = useUsers()

const createModalOpen = ref(false)
const editModalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingUser = ref<User | null>(null)
const deletingUser = ref<User | null>(null)

const roleKeys: Record<string, string> = {
  user: 'users.roleUser',
  moderator: 'users.roleModerator',
  admin: 'users.roleAdmin',
}

function openCreate() {
  createModalOpen.value = true
}

function closeCreateModal() {
  createModalOpen.value = false
}

function openEdit(user: User) {
  editingUser.value = { ...user }
  editModalOpen.value = true
}

function openDelete(user: User) {
  deletingUser.value = { ...user }
  deleteModalOpen.value = true
}

function closeEditModal() {
  editModalOpen.value = false
  editingUser.value = null
}

function closeDeleteModal() {
  deleteModalOpen.value = false
  deletingUser.value = null
}

function saveUser(data: User) {
  addUser({
    ...data,
    id: generateUserId(),
  })
}

function saveEdit(updated: User) {
  updateUser(updated)
}

function confirmDelete() {
  if (!deletingUser.value) return
  deleteUser(deletingUser.value.id)
  closeDeleteModal()
}
</script>

<template>
  <div class="admin-page">
    <div class="page-toolbar">
      <input type="search" :placeholder="t('users.search')" class="ui-input toolbar-search" />
      <button type="button" class="create-btn" @click="openCreate">
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
            <tr v-if="users.length === 0">
              <td colspan="6" class="empty-cell">
                {{ t('users.empty') }}
                <button type="button" class="empty-link" @click="openCreate">{{ t('users.createFirst') }}</button>
              </td>
            </tr>
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
                <div class="action-btns">
                  <button type="button" class="action-btn edit" @click="openEdit(user)">
                    <AppIcon name="edit" :size="15" />
                    {{ t('common.edit') }}
                  </button>
                  <button type="button" class="action-btn delete" @click="openDelete(user)">
                    <AppIcon name="delete" :size="15" />
                    {{ t('common.delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <UserCreateModal
      :open="createModalOpen"
      @close="closeCreateModal"
      @save="saveUser"
    />

    <UserEditModal
      :open="editModalOpen"
      :user="editingUser"
      @close="closeEditModal"
      @save="saveEdit"
    />

    <UserDeleteModal
      :open="deleteModalOpen"
      :user="deletingUser"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.page-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.toolbar-search {
  flex: 1;
  min-width: 0;
}

.create-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: var(--radius-md);
  background: var(--gradient);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-glow);
  transition: all var(--transition);
  flex-shrink: 0;
}

.create-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.empty-cell {
  text-align: center !important;
  padding: 40px 20px !important;
  color: var(--text);
}

.empty-link {
  background: none;
  border: none;
  color: var(--accent);
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  margin-left: 6px;
  padding: 0;
}

.empty-link:hover {
  text-decoration: underline;
}

.action-btns {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-md);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.action-btn.edit {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--accent);
}

.action-btn.edit:hover {
  background: var(--accent-bg);
  border-color: var(--accent-border);
}

.action-btn.delete {
  border: 1px solid transparent;
  background: var(--danger-bg);
  color: var(--danger);
}

.action-btn.delete:hover {
  background: var(--danger);
  color: #fff;
}

@media (max-width: 640px) {
  .page-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .create-btn {
    justify-content: center;
  }

  .action-btns {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
