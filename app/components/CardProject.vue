<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <h3 class="text-lg font-semibold mb-2">{{ project.title }}</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
    <div class="flex space-x-2">
      <button class="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        <Eye class="w-4 h-4 mr-2" />
        View Page
      </button>
      <button class="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
        <Download class="w-4 h-4 mr-2" />
        Download
      </button>
      <button class="flex items-center px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
        <Upload class="w-4 h-4 mr-2" />
        Upload Version
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, Download, Upload } from 'lucide-vue-next'

defineProps<{
  project: {
    title: string
    description: string
  }
}>()
</script>