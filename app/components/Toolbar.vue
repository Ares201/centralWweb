<template>
  <header class="bg-orange-500 px-4 py-3 flex items-center fixed top-0 left-0 right-0 w-screen z-40">
    <!-- Sidebar toggle -->
    <button @click="$emit('toggle-sidebar')" class="p-2 rounded-md hover:bg-gray-200 transition-colors">
      <Menu class="w-6 h-6" />
    </button>
    <h1 class="text-white text-lg font-semibold ml-4">AresDev</h1>
  </header>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next'

defineEmits<{
  'toggle-sidebar': []
}>()
</script>