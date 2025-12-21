<template>
  <aside :class="['bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 fixed lg:relative top-16 left-0 h-full z-30', open ? 'translate-x-0 w-64' : '-translate-x-full w-64 lg:w-16 lg:translate-x-0']">
    <nav class="p-4">
      <ul class="space-y-2">
        <li>
          <NuxtLink to="/" class="flex items-center p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
            <Home class="w-6 h-6 mr-3 flex-shrink-0" />
            <span :class="open ? 'inline' : 'hidden'">Inicio</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/projects" class="flex items-center p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
            <Folder class="w-6 h-6 mr-3 flex-shrink-0" />
            <span :class="open ? 'inline' : 'hidden'">Proyectos</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Home, Folder } from 'lucide-vue-next'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>