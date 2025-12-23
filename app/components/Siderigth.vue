<template>
  <!-- Overlay móvil -->
  <div v-if="open && isMobile" class="fixed inset-0 bg-black/40 z-20 lg:hidden" @click="toggle" />

  <aside :class="[
    'fixed lg:relative top-1/2 -translate-y-1/2 right-2 z-30',
    'bg-white text-gray-800',
    'shadow-xl rounded-2xl',
    'transition-all duration-300 ease-in-out',
    'flex flex-col',
    open
      ? 'translate-x-0 w-56'
      : 'translate-x-full lg:translate-x-0 lg:w-16'
  ]">
    <!-- Header -->
    <div class="h-14 flex items-center justify-center border-b border-gray-300">
      <button @click="toggle" class="p-2 rounded-full hover:bg-gray-200 transition" aria-label="Toggle right sidebar">
        <ChevronRight class="w-5 h-5 transition-transform" :class="open ? '' : 'rotate-180'" />
      </button>
    </div>

    <!-- Acciones -->
    <nav class="px-3 py-3 space-y-1">
      <button v-for="item in actions" :key="item.label"
        class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition group relative"
        @click="item.onClick ? item.onClick() : null">
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="open" class="whitespace-nowrap text-sm font-medium">
          {{ item.label }}
        </span>
        <!-- Tooltip -->
        <span v-if="!open"
          class="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
          {{ item.label }}
        </span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useState, useCookie, navigateTo } from '#app' // Nuxt 3 composables
import { ChevronRight, User, Settings, HelpCircle, LogOut } from 'lucide-vue-next'

const open = ref(false)
const isMobile = ref(false)
const logout = () => {
  // Borrar cookies
  useCookie('role').value = null
  useCookie('user').value = null

  // Reiniciar estado global
  const userState = useState('user')
  userState.value = null

  // Redirigir al login
  navigateTo('/')
}

const actions = [
  { icon: User, label: 'Perfil' },
  { icon: Settings, label: 'Configuración' },
  { icon: HelpCircle, label: 'Ayuda' },
  { icon: LogOut, label: 'Cerrar sesión', onClick: logout }
]

const toggle = () => {
  open.value = !open.value
}
</script>
