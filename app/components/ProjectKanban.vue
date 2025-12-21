<template>
  <div class="flex space-x-6 overflow-x-auto pb-6">
    <div
      v-for="status in statuses"
      :key="status.key"
      class="flex-shrink-0 w-80"
    >
      <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ status.label }}</h3>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
            {{ getProjectsByStatus(status.key).length }}
          </span>
        </div>

        <div
          class="space-y-3 min-h-32"
          :class="status.key"
          @dragover.prevent
          @drop="onDrop($event, status.key)"
        >
          <ProjectCard
            v-for="project in getProjectsByStatus(status.key)"
            :key="project.id"
            :project="project"
            :draggable="true"
            @dragstart="onDragStart($event, project)"
            @edit="$emit('edit', project)"
            @delete="$emit('delete', project.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectCard from './ProjectCard.vue'
import type { Project } from '../composables/useProjects'

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [project: Project]
  delete: [id: string]
  updateStatus: [id: string, status: Project['status']]
}>()

const draggedProject = ref<Project | null>(null)

const statuses = [
  { key: 'planning', label: 'Planificación' },
  { key: 'in-progress', label: 'En Progreso' },
  { key: 'completed', label: 'Completado' }
] as const

const getProjectsByStatus = (status: Project['status']) => {
  return props.projects.filter(project => project.status === status)
}

const onDragStart = (event: DragEvent, project: Project) => {
  draggedProject.value = project
  event.dataTransfer!.effectAllowed = 'move'
  event.dataTransfer!.setData('text/plain', project.id)
}

const onDrop = (event: DragEvent, newStatus: Project['status']) => {
  event.preventDefault()
  if (draggedProject.value && draggedProject.value.status !== newStatus) {
    emit('updateStatus', draggedProject.value.id, newStatus)
  }
  draggedProject.value = null
}
</script>