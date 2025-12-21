<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
        </h3>
      </div>

      <form @submit.prevent="handleSubmit" class="px-6 py-4 space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Título *
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Nombre del proyecto"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descripción *
          </label>
          <textarea
            id="description"
            v-model="form.description"
            required
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Descripción del proyecto"
          ></textarea>
        </div>

        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo *
          </label>
          <select
            id="type"
            v-model="form.type"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="web">Web</option>
            <option value="app">Aplicación</option>
            <option value="excel">Excel</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div v-if="isEditing">
          <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Estado
          </label>
          <select
            id="status"
            v-model="form.status"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="planning">Planificación</option>
            <option value="in-progress">En progreso</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        <div>
          <label for="downloadLink" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enlace de descarga
          </label>
          <input
            id="downloadLink"
            v-model="form.downloadLink"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="https://ejemplo.com/descarga"
          />
        </div>

        <div>
          <label for="imageUrl" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enlace de imagen
          </label>
          <input
            id="imageUrl"
            v-model="form.imageUrl"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
      </form>

      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
        <button
          @click="$emit('cancel')"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          @click="handleSubmit"
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          {{ isEditing ? 'Actualizar' : 'Crear' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Project } from '../composables/useProjects'

interface Props {
  project?: Project | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  save: [projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>]
  cancel: []
}>()

const isEditing = computed(() => !!props.project)

const form = ref({
  title: '',
  description: '',
  type: 'web' as Project['type'],
  status: 'completed' as Project['status'],
  downloadLink: '',
  imageUrl: '',
  dowload: 0
})

watch(() => props.project, (newProject) => {
  if (newProject) {
    form.value = {
      title: newProject.title,
      description: newProject.description,
      type: newProject.type,
      status: newProject.status,
      downloadLink: newProject.downloadLink || '',
      imageUrl: newProject.imageUrl || '',
      dowload: newProject.dowload
    }
  } else {
    form.value = {
      title: '',
      description: '',
      type: 'web',
      status: 'completed',
      downloadLink: '',
      imageUrl: '',
      dowload: 0
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('save', form.value)
}
</script>