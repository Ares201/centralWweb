<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Proyectos</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Administra tus proyectos web, aplicaciones y más
            </p>onfigu
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              @click="showAddForm = true"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <Plus class="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </button>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <SearchFilter
        :search-query="searchQuery"
        :selected-type="selectedType"
        :selected-status="selectedStatus"
        @update:search-query="searchQuery = $event"
        @update:selected-type="selectedType = $event"
        @update:selected-status="selectedStatus = $event"
      />

      <!-- View Toggle -->
      <div class="mb-6">
        <div class="flex items-center space-x-4">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Vista:</span>
          <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              @click="currentView = 'table'"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                currentView === 'table'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400'
              ]"
            >
              <List class="h-4 w-4 inline mr-1" />
              Tabla
            </button>
            <button
              @click="currentView = 'kanban'"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                currentView === 'kanban'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400'
              ]"
            >
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

      <ProjectTable
        v-else-if="currentView === 'table'"
        :projects="filteredProjects"
        @edit="handleEdit"
        @delete="handleDelete"
      />

      <ProjectKanban
        v-else
        :projects="filteredProjects"
        @edit="handleEdit"
        @delete="handleDelete"
        @update-status="handleUpdateStatus"
      />

      <!-- Add/Edit Form Modal -->
      <ProjectForm
        v-if="showAddForm || editingProject"
        :project="editingProject"
        @save="handleSave"
        @cancel="closeForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, List, Kanban, Folder } from 'lucide-vue-next'
import { useProjects } from '../composables/useProjects'
import SearchFilter from '../components/SearchFilter.vue'
import ProjectTable from '../components/ProjectTable.vue'
import ProjectKanban from '../components/ProjectKanban.vue'
import ProjectForm from '../components/ProjectForm.vue'
import type { Project } from '../composables/useProjects'

const {
  filteredProjects,
  searchQuery,
  selectedType,
  selectedStatus,
  addProject,
  updateProject,
  deleteProject,
  updateProjectStatus
} = useProjects()

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