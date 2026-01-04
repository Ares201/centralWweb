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
import { useState } from 'nuxt/app'
import Sidebar from '~/components/Sidebar.vue'
import Toolbar from '~/components/Toolbar.vue'
import SideRight from '~/components/Siderigth.vue'

const sidebarOpen = ref(true)

const userState = useState<{ username: string; role: string } | null>('user', () => null)

const isAdmin = computed(() => userState.value?.role === 'admin')
const username = computed(() => userState.value?.username || '')
</script>

