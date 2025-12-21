<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section Mejorada -->
    <section class="relative py-12 md:py-20 overflow-hidden">
      <div class="container mx-auto px-4 text-center relative z-10">
        <h1
          class="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 animate-gradient">
          Bienvenido
        </h1>
        <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Tu central para proyectos y ejemplos que puedan ayudarte
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in completedProjects" :key="project.id"
          class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
          <!-- Imagen con efecto de zoom y overlay -->
          <div class="h-52 relative overflow-hidden">
            <div class="w-full h-full transition-transform duration-700 group-hover:scale-110" :style="{
              backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            <!-- Badge TikTok en la imagen -->
            <div class="absolute top-4 left-4">
              <span :class="getTypeBadgeClasses(project.type)" class="px-3 py-1 text-xs font-medium rounded-full">
                {{ getTypeLabel(project.type) }}
              </span>
            </div>

            <div class="absolute bottom-4 left-4 right-4">
              <h3 class="text-xl font-bold text-white">
                {{ project.title }}
              </h3>
            </div>
          </div>

          <!-- Contenido de la tarjeta -->
          <div class="p-6">
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {{ project.description }}
            </p>

            <!-- Stats y acciones -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Eye class="w-4 h-4 mr-1" />
                <span>{{ project.dowload }} Descargas</span>
                <span class="mx-2">•</span>
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                </svg>
                <span>{{ project.viewsTiktok }} vistas TikTok</span>
              </div>

              <div class="flex space-x-2">
                <button v-if="project.tiktokLink" @click.stop="openTikTok(project.tiktokLink, project.id)"
                  class="px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-medium flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                  title="Ver video en TikTok">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                  </svg>
                  Video
                </button>

                <button v-if="project.downloadLink"
                  @click.stop="downloadProject(project.downloadLink); incrementViews(project.id)"
                  class="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                  <Download class="w-4 h-4 mr-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProjects } from '../composables/useProjects'
import { Download, Eye } from 'lucide-vue-next'

const { projects, incrementViews, incrementViewsTiktok } = useProjects()
const showContactModal = ref(false)

// Filter only completed projects for the home page
const completedProjects = computed(() =>
  projects.value.filter(project => project.status === 'completed').map(project => ({
    ...project,
    // Agregar enlace a TikTok si no existe
    tiktokLink: project.tiktokLink || `https://www.tiktok.com/@aresdev98`, // Ejemplo
    // Agregar dificultad si no existe
    difficulty: project.difficulty || (project.type === 'web' ? 'Intermedio' : 'Básico')
  }))
)

const getTypeBadgeClasses = (type: 'web' | 'app' | 'excel' | 'other') => {
  const classes = {
    web: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    app: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    excel: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    other: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
  }
  return classes[type]
}

const getTypeLabel = (type: 'web' | 'app' | 'excel' | 'other') => {
  const labels = {
    web: 'Web',
    app: 'App',
    excel: 'Excel',
    other: 'Otro'
  }
  return labels[type]
}

const downloadProject = (link: string) => {
  window.open(link, '_blank')
}

const openTikTok = (link: string, id: string) => {
  incrementViewsTiktok(id)
  window.open(link, '_blank')
}

const openContactModal = () => {
  showContactModal.value = true
}

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Animaciones personalizadas */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-1500 {
  animation-delay: 1.5s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Efecto de carga para las tarjetas */
@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid>div {
  animation: cardEntrance 0.5s ease-out;
  animation-fill-mode: backwards;
}

.grid>div:nth-child(1) {
  animation-delay: 0.1s;
}

.grid>div:nth-child(2) {
  animation-delay: 0.2s;
}

.grid>div:nth-child(3) {
  animation-delay: 0.3s;
}

.grid>div:nth-child(4) {
  animation-delay: 0.4s;
}

.grid>div:nth-child(5) {
  animation-delay: 0.5s;
}

.grid>div:nth-child(6) {
  animation-delay: 0.6s;
}
</style>