<template>
  <div class="min-h-screen mt-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <PageHeader>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <!-- Texto -->
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                Gestión de Cotizaciones
              </h1>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Administra las solicitudes de cotización
              </p>
            </div>
            <!-- Acción -->
            <div class="flex items-center">
              <button v-if="isAdmin" @click="showAddForm = true" class="w-9 h-9 rounded-full flex items-center justify-center
               bg-orange-500 hover:bg-orange-600 transition">
                <Plus class="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </PageHeader>

        <!-- Search -->
        <SearchFilter :search-query="searchQuery" @update:search-query="searchQuery = $event" />
      </div>

      <!-- Quotations Table -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nombre</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Teléfono</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Comentario</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="quotation in filteredQuotations" :key="quotation.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ quotation.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ quotation.phone }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                {{ quotation.comment }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(quotation.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="handleEdit(quotation)"
                  class="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 mr-4">
                  Editar
                </button>
                <button @click="handleDelete(quotation.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Form Modal -->
      <div v-if="showAddForm || editingQuotation"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {{ isEditing ? 'Editar Cotización' : 'Nueva Cotización' }}
            </h3>
            <form @submit.prevent="handleSave" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <input id="name" v-model="form.name" type="text" required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Teléfono
                </label>
                <input id="phone" v-model="form.phone" type="tel" required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Comentario
                </label>
                <textarea id="comment" v-model="form.comment" required rows="3"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"></textarea>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button @click="closeForm" type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancelar
                </button>
                <button type="submit"
                  class="px-4 py-2 text-sm font-medium text-orange-600 bg-transparent border border-orange-600 rounded-md hover:bg-orange-50 dark:hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
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
import { Plus } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useState } from 'nuxt/app'
import type { Quotation } from '../composables/useQuotations'
import { useQuotations } from '../composables/useQuotations'

const { filteredQuotations, searchQuery, addQuotation, updateQuotation, deleteQuotation } = useQuotations()

const userState = useState<{ username: string; role: string } | null>('user', () => null)
const isAdmin = computed(() => userState.value?.role === 'admin')

const showAddForm = ref(false)
const editingQuotation = ref<Quotation | null>(null)

const isEditing = computed(() => !!editingQuotation.value)

const form = ref({
  name: '',
  phone: '',
  comment: ''
})

const handleEdit = (quotation: Quotation) => {
  editingQuotation.value = quotation
  form.value = {
    name: quotation.name,
    phone: quotation.phone,
    comment: quotation.comment
  }
}

const handleDelete = (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta cotización?')) {
    deleteQuotation(id)
  }
}

const handleSave = () => {
  if (editingQuotation.value) {
    updateQuotation(editingQuotation.value.id, form.value)
  } else {
    addQuotation(form.value)
  }
  closeForm()
}

const closeForm = () => {
  showAddForm.value = false
  editingQuotation.value = null
  form.value = {
    name: '',
    phone: '',
    comment: ''
  }
}
</script>
