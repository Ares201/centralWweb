<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Search Input -->
      <div class="flex-1">
        <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Buscar proyectos
        </label>
        <div class="relative">
          <Search class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por título o descripción..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <!-- Type Filter -->
      <div class="md:w-48">
        <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipo
        </label>
        <select
          id="type"
          v-model="selectedType"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Todos los tipos</option>
          <option value="web">Web</option>
          <option value="app">Aplicación</option>
          <option value="excel">Excel</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <!-- Status Filter -->
      <div class="md:w-48">
        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Estado
        </label>
        <select
          id="status"
          v-model="selectedStatus"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Todos los estados</option>
          <option value="planning">Planificación</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completado</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search } from 'lucide-vue-next'

interface Props {
  searchQuery: string
  selectedType: string
  selectedStatus: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedType': [value: string]
  'update:selectedStatus': [value: string]
}>()

const searchQuery = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update:searchQuery', value)
})

const selectedType = computed({
  get: () => props.selectedType,
  set: (value) => emit('update:selectedType', value)
})

const selectedStatus = computed({
  get: () => props.selectedStatus,
  set: (value) => emit('update:selectedStatus', value)
})
</script>