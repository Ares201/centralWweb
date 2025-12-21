<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Cotizaciones</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Administra las solicitudes de cotización
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              @click="showAddForm = true"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Nueva Cotización
            </button>
          </div>
        </div>

        <!-- Add/Edit Form -->
        <div v-if="showAddForm || editingQuotation" class="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
          <form @submit.prevent="handleSave" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Teléfono
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Comentario
              </label>
              <textarea
                id="comment"
                v-model="form.comment"
                required
                rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
            <div class="flex gap-2">
              <button type="submit" class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md">Guardar</button>
              <button type="button" @click="closeForm" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-md">Cancelar</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Quotations Table -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teléfono</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comentario</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="quotation in quotations" :key="quotation.id">
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
                <button @click="handleEdit(quotation)" class="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 mr-4">
                  Editar
                </button>
                <button @click="handleDelete(quotation.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import { ref, computed } from 'vue'
import type { Quotation } from '../composables/useQuotations'
import { useQuotations } from '../composables/useQuotations'

const { quotations, addQuotation, updateQuotation, deleteQuotation } = useQuotations()

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
