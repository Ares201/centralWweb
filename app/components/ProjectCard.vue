<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <span class="text-white font-bold text-xs">{{ project.title.charAt(0) }}</span>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ project.title }}</h3>
          <span :class="getTypeBadgeClasses(project.type)" class="inline-flex px-2 py-0.5 text-xs font-medium rounded-full mt-1">
            {{ getTypeLabel(project.type) }}
          </span>
        </div>
      </div>
      <div class="flex space-x-1">
        <button
          v-if="project.downloadLink"
          @click="downloadProject(project.downloadLink)"
          class="text-gray-400 hover:text-green-600 dark:hover:text-green-400 p-1"
        >
          <Download class="h-3 w-3" />
        </button>
        <button
          @click="$emit('edit', project)"
          class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-1"
        >
          <Edit class="h-3 w-3" />
        </button>
        <button
          @click="$emit('delete', project.id)"
          class="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1"
        >
          <Trash2 class="h-3 w-3" />
        </button>
      </div>
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ project.description }}</p>
    <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>{{ formatDate(project.createdAt) }}</span>
      <span>{{ formatDate(project.updatedAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Trash2, Download } from 'lucide-vue-next'
import type { Project } from '../composables/useProjects'

interface Props {
  project: Project
}

defineProps<Props>()

defineEmits<{
  edit: [project: Project]
  delete: [id: string]
}>()

const getTypeBadgeClasses = (type: Project['type']) => {
  const classes = {
    web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    app: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    excel: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return classes[type]
}

const getTypeLabel = (type: Project['type']) => {
  const labels = {
    web: 'Web',
    app: 'App',
    excel: 'Excel',
    other: 'Otro'
  }
  return labels[type]
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const downloadProject = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>