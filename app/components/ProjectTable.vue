<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Proyecto
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Tipo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Estado
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Creado
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span class="text-white font-bold text-sm">{{ project.title.charAt(0) }}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ project.title }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{{ project.description }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getTypeBadgeClasses(project.type)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                {{ getTypeLabel(project.type) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusBadgeClasses(project.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                {{ getStatusLabel(project.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(project.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex space-x-2">
                <button
                  v-if="isAdmin"
                  @click="$emit('edit', project)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Edit class="h-4 w-4" />
                </button>
                <button
                  v-if="isAdmin"
                  @click="$emit('delete', project.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Trash2 } from 'lucide-vue-next'
import type { Project } from '../composables/useProjects'

interface Props {
  projects: Project[]
  isAdmin: boolean
}

defineProps<Props>()

defineEmits<{
  edit: [project: Project]
  delete: [id: string]
}>()

const getTypeBadgeClasses = (type: Project['type']) => {
  const classes: Record<string, string> = {
    web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    app: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    excel: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return (classes as any)[type] || 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
}

const getTypeLabel = (type: Project['type']) => {
  const labels: Record<string, string> = {
    web: 'Web',
    app: 'App',
    excel: 'Excel',
    other: 'Otro'
  }
  return (labels as any)[type] || type
}

const getStatusBadgeClasses = (status: Project['status']) => {
  const classes = {
    planning: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
  return classes[status]
}

const getStatusLabel = (status: Project['status']) => {
  const labels = {
    planning: 'Planificación',
    'in-progress': 'En progreso',
    completed: 'Completado'
  }
  return labels[status]
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}
</script>