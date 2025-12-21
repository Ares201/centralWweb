<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Admin Layout for logged in users -->
    <div v-if="isLoggedIn" class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar :open="sidebarOpen" @update:open="sidebarOpen = $event" />
      <div class="flex-1 flex flex-col">
        <Toolbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <main class="flex-1 overflow-auto p-6">
          <slot />
        </main>
      </div>
    </div>

    <!-- Public Layout -->
    <div v-else>
      <header class="fixed top-0 left-0 right-0 z-10 bg-gray-800 shadow-lg backdrop-blur-sm bg-opacity-95">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-4">
              <!-- Logo -->
              <div
                class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                <img src="https://i.ibb.co/8ghgry6w/logo.png" alt="logo" class="w-20 h-20 object-contain">
              </div>
              <!-- Texto -->
              <span class="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Inicio
              </span>
            </div>
            <NuxtLink to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </header>
      <main class="pt-16">
        <slot />
      </main>

      <!-- Optional Footer for public pages -->
      <footer v-if="!isLoggedIn" class="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <p class="text-gray-400 text-sm">
              © 2023 Mi Portafolio. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Toolbar from '../components/Toolbar.vue'

const isLoggedIn = ref(false)
const sidebarOpen = ref(false)

onMounted(() => {
  if (process.client) {
    isLoggedIn.value = localStorage.getItem('loggedIn') === 'true'
  }
})
</script>

<style scoped>
/* Optional: Add smooth transitions */
header {
  transition: all 0.3s ease;
}

/* Optional: Glass effect enhancement */
@media (min-width: 768px) {
  header {
    background: rgba(17, 24, 39, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
</style>