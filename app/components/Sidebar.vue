<template>
  <!-- Overlay para móvil -->
  <div v-if="open && isMobile" class="fixed inset-0 bg-black/50 z-20 lg:hidden" @click="toggleSidebar"></div>

  <aside ref="sidebarRef" :class="[
    'fixed lg:relative top-0 left-0 z-30 mr-3',
    'h-screen lg:h-[calc(100vh-1rem)] lg:mt-2',
    'bg-gray-800 text-white',
    'shadow-2xl lg:shadow-xl rounded-none lg:rounded-2xl',
    'border-r border-gray-700 lg:border-0',
    'transition-all duration-300 ease-in-out',
    'flex flex-col',
    open
      ? 'translate-x-0 w-60 min-w-[160px]'
      :
    isMobile
      ? '-translate-x-full w-20 min-w-[80px]'
      : 'lg:translate-x-0 lg:w-20'
  ]">
    <!-- Header -->
    <div class="h-16 flex items-center justify-between lg:justify-center px-4 border-b border-gray-700">
      <div class="flex items-center px-4 py-4 transition-all duration-300"
        :class="open ? 'justify-start gap-3' : 'justify-center'">
        <!-- Logo (SIEMPRE visible) -->
        <img src="https://i.ibb.co/8ghgry6w/logo.png" alt="logo"
          class="h-11 w-11 rounded-xl object-cover shadow-md flex-shrink-0" />

        <!-- Texto (solo cuando open=true) -->
        <div v-if="open" class="flex flex-col transition-opacity duration-200">
          <h1 class="text-lg font-semibold text-white leading-tight whitespace-nowrap">
            AresDev
          </h1>
          <h1 class="text-white leading-tight whitespace-nowrap">
            {{ currentNav?.label || 'Inicio' }}
          </h1>
        </div>
      </div>

      <!-- Toggle -->
      <button @click="toggleSidebar"
        class="p-2 rounded-full bg-gray-700 hover:bg-gray-900 transition-colors lg:absolute lg:right-0 lg:translate-x-1/2"
        :class="open ? 'opacity-0 lg:opacity-100' : 'opacity-100'" aria-label="Toggle sidebar">
        <ChevronLeft class="w-5 h-5 text-white transition-transform duration-300" :class="open ? '' : 'rotate-180'" />
      </button>
    </div>

    <!-- Navegación -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink :to="item.to" class="flex items-center gap-3 p-3 rounded-xl relative group transition-colors"
            :class="[
              route.path === item.to
                ? 'bg-gray-700 text-white border-l-4 border-white-900'
                : 'text-gray-300 hover:bg-gray-700'
            ]" @click="isMobile ? toggleSidebar() : null">
            <!-- Indicador activo -->
            <span v-if="route.path === item.to"
              class="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-white-900 rounded-r-full"></span>

            <!-- Icono -->
            <component :is="item.icon" class="w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110" />

            <!-- Texto -->
            <span class="whitespace-nowrap font-medium transition-all duration-200"
              :class="open ? 'opacity-100 w-auto' : 'opacity-0 w-0'">
              {{ item.label }}
            </span>

            <!-- Tooltip -->
            <div v-if="!open" class="absolute left-full ml-3 px-3 py-2 bg-black text-white text-sm rounded-lg
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible
                     transition-all duration-200 z-50 whitespace-nowrap shadow-lg">
              {{ item.label }}
              <div class="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1
                       w-0 h-0 border-t-4 border-b-4 border-r-4
                       border-transparent border-r-black"></div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'
import { Home, Folder, User, MessageSquare, ChevronLeft } from 'lucide-vue-next'

const open = ref(true)
const sidebarRef = ref(null)
const route = useRoute()
const isMobile = ref(false)

const navItems = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/projects', icon: Folder, label: 'Proyectos' },
  { to: '/users', icon: User, label: 'Usuarios' },
  { to: '/quotations', icon: MessageSquare, label: 'Cotizaciones' }
]

const currentNav = computed(() => navItems.find(item => item.to === route.path))

const toggleSidebar = () => {
  open.value = !open.value
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) open.value = false
}

const handleClickOutside = (event) => {
  if (isMobile.value && open.value && sidebarRef.value && !sidebarRef.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
