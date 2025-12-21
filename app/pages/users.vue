<template>
  <div class="min-h-screen bg-gray-800 dark:bg-gray-800 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Administra los usuarios del sistema
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              v-if="isAdmin"
              @click="showAddForm = true"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Nuevo Usuario
            </button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-gray-800 dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-800 dark:bg-gray-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usuario</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rol</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-gray-800 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <span class="text-white font-medium">{{ user.username.charAt(0).toUpperCase() }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ user.username }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ user.role === 'admin' ? 'Administrador' : 'Usuario' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button v-if="isAdmin" @click="handleEdit(user)" class="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 mr-4">
                  Editar
                </button>
                <button v-if="isAdmin" @click="handleDelete(user.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Form Modal -->
      <div v-if="showAddForm || editingUser" class="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800 dark:bg-gray-800">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
            </h3>
            <form @submit.prevent="handleSave" class="space-y-4">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Usuario
                </label>
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rol
                </label>
                <select
                  id="role"
                  v-model="form.role"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  @click="closeForm"
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-800 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {{ isEditing ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import { ref, computed } from 'vue'
import type { User } from '../composables/useUsers'
import { useUsers } from '../composables/useUsers'

const { users, addUser, updateUser, deleteUser } = useUsers()

const showAddForm = ref(false)
const editingUser = ref<User | null>(null)

const isAdmin = computed(() => {

  if (process.client) {

    return localStorage.getItem('userRole') === 'admin'

  }

  return false

})

const isEditing = computed(() => !!editingUser.value)

const form = ref({
  username: '',
  password: '',
  role: 'user' as 'user' | 'admin'
})

const handleEdit = (user: User) => {
  editingUser.value = user
  form.value = {
    username: user.username,
    password: user.password,
    role: user.role
  }
}

const handleDelete = (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    deleteUser(id)
  }
}

const handleSave = () => {
  if (editingUser.value) {
    updateUser(editingUser.value.id, form.value)
  } else {
    addUser(form.value)
  }
  closeForm()
}

const closeForm = () => {
  showAddForm.value = false
  editingUser.value = null
  form.value = {
    username: '',
    password: '',
    role: 'user'
  }
}
</script>