<template>
  <div class="h-screen flex overflow-hidden">
    <!-- Sidebar izquierdo -->
    <Sidebar v-if="isAdmin" v-model:open="sidebarOpen" />

    <!-- Contenido central -->
    <div class="flex-1 flex flex-col relative">
      <Toolbar v-if="!isAdmin" />
      <main class="flex-1 overflow-y-auto px-6">
        <slot />
      </main>
    </div>

    <!-- Sidebar derecho -->
    <SideRight v-if="isAdmin" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import Toolbar from '~/components/Toolbar.vue'
import SideRight from '~/components/Siderigth.vue'

const sidebarOpen = ref(true)

// Leer cookies de usuario con default como función
const roleCookie = useCookie<string>('role', { default: () => '' })
const usernameCookie = useCookie<string>('user', { default: () => '' })

const isAdmin = computed(() => roleCookie.value === 'admin')
const username = computed(() => usernameCookie.value)
</script>

