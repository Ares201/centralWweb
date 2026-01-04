<template>
  <div class="min-h-screen mt-4">
    <PageHeader>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Gestión de Proyectos
        </h1>
        <button v-if="isAdmin" @click="showAddForm = true" class="w-8 h-8 rounded-full flex items-center justify-center bg-orange-500">
          <Plus class="w-4 h-4 text-white" />
        </button>
      </div>
    </PageHeader>

    <!-- Search and Filters -->
    <SearchFilter :search-query="searchQuery" :selected-type="selectedType" :selected-status="selectedStatus" :unique-types="uniqueTypes"
      @update:search-query="searchQuery = $event" @update:selected-type="selectedType = $event"
      @update:selected-status="selectedStatus = $event" />

    <!-- View Toggle -->
    <div class="mb-6">
      <div class="flex items-center space-x-4">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Vista:</span>
        <div class="flex rounded-lg p-1 border-2 border-orange-400">
          <button @click="currentView = 'table'" :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            currentView === 'table'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400'
          ]">
            <List class="h-4 w-4 inline mr-1" />
            Tabla
          </button>
          <button @click="currentView = 'kanban'" :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            currentView === 'kanban'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400'
          ]">
            <Kanban class="h-4 w-4 inline mr-1" />
            Kanban
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Views -->
    <div v-if="filteredProjects.length === 0" class="text-center py-12">
      <Folder class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay proyectos</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Comienza creando tu primer proyecto.
      </p>
    </div>

    <ProjectTable v-else-if="currentView === 'table'" :projects="filteredProjects" :is-admin="isAdmin"
      @edit="handleEdit" @delete="handleDelete" />

    <ProjectKanban v-else :projects="filteredProjects" :is-admin="isAdmin" @edit="handleEdit" @delete="handleDelete"
      @update-status="handleUpdateStatus" />

    <!-- Add/Edit Form Modal -->
    <ProjectForm v-if="showAddForm || editingProject" :project="editingProject" @save="handleSave"
      @cancel="closeForm" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useState } from 'nuxt/app'
import { Plus, List, Kanban, Folder } from 'lucide-vue-next'
import { useProjects } from '../composables/useProjects'
import type { Project } from '../composables/useProjects'

const {
  filteredProjects,
  uniqueTypes,
  searchQuery,
  selectedType,
  selectedStatus,
  addProject,
  updateProject,
  deleteProject,
  updateProjectStatus
} = useProjects()

const userState = useState<{ username: string; role: string } | null>('user', () => null)
const isAdmin = computed(() => userState.value?.role === 'admin')

const currentView = ref<'table' | 'kanban'>('table')
const showAddForm = ref(false)
const editingProject = ref<Project | null>(null)

const handleEdit = (project: Project) => {
  editingProject.value = project
}

const handleDelete = (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
    deleteProject(id)
  }
}

const handleUpdateStatus = (id: string, status: Project['status']) => {
  updateProjectStatus(id, status)
}

const handleSave = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (editingProject.value) {
    updateProject(editingProject.value.id, projectData)
  } else {
    addProject(projectData)
  }
  closeForm()
}

const closeForm = () => {
  showAddForm.value = false
  editingProject.value = null
}
</script>