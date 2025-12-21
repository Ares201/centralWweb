<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <!-- Sidebar Overlay on mobile -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-60 z-20 lg:hidden transition-opacity duration-300"></div>

    <!-- Sidebar -->
    <Sidebar v-model:open="sidebarOpen" />

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Toolbar -->
      <Toolbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Page content -->
      <main class="flex-1 overflow-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-tl-lg md:rounded-none shadow-sm">
        <div class="max-w-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Toolbar from '../components/Toolbar.vue'

const sidebarOpen = ref(false)
</script>

<style scoped>
/* Smooth transitions for overlay */
.fixed {
  transition: opacity 0.3s ease;
}

/* Custom scrollbar for main content */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark main::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark main::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>