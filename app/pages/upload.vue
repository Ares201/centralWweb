<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Subir Nuevo Proyecto</h1>
    <form @submit.prevent="handleSubmit" class="max-w-md">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Título del Proyecto</label>
        <input v-model="form.title" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600" required>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Descripción</label>
        <textarea v-model="form.description" class="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600" rows="4" required></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Archivo del Proyecto</label>
        <input type="file" class="w-full" required>
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Subir Proyecto</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  title: '',
  description: ''
})

const handleSubmit = () => {
  // Handle upload logic here
  console.log('Uploading project:', form)
  alert('Proyecto subido exitosamente!')
}
</script>