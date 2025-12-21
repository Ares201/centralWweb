<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section Mejorada -->
    <section class="relative py-12 md:py-20 overflow-hidden">
      <div class="container mx-auto px-4 text-center relative z-10">
        <!-- Decoración de fondo animada -->
        <div
          class="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000">
        </div>
        <div
          class="absolute bottom-10 right-10 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1500">
        </div>
        <div
          class="absolute top-1/2 left-1/3 w-16 h-16 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse">
        </div>

        <!-- Logo TikTok flotante -->
        <div class="absolute top-6 right-6 animate-bounce">
          <a href="https://www.tiktok.com/@aresdev98" target="_blank"
            class="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            title="Sígueme en TikTok">
            <svg class="w-7 h-7" fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
            </svg>
            <span
              class="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium bg-black text-white px-2 py-1 rounded">
              Sígueme en TikTok
            </span>
          </a>
        </div>

        <h1
          class="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 animate-gradient">
          Bienvenido
        </h1>
        <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Tu central para proyectos y ejemplos que puedan ayudarte
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
          Descarga los códigos fuente de mis proyectos de TikTok y aprende con ejemplos prácticos
        </p>

        <!-- Botón TikTok destacado -->
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <a href="https://www.tiktok.com/@aresdev98" target="_blank"
            class="px-8 py-3 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2 group">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
            </svg>
            <span>Sígueme en TikTok</span>
            <span class="ml-1 group-hover:animate-ping">👉</span>
          </a>

          <button @click="scrollToProjects"
            class="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            Ver Proyectos
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid Mejorado -->
    <section id="projects" class="py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Proyectos Destacados de TikTok
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Todos estos proyectos tienen tutoriales completos en mi canal de TikTok. Descarga el código y aprende paso a
            paso.
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
                <span
                  class="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                  </svg>
                  TikTok
                </span>
              </div>

              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-xl font-bold text-white">
                  {{ project.title }}
                </h3>
                <div class="flex items-center mt-1">
                  <span class="text-xs text-gray-300">Video tutorial disponible</span>
                </div>
              </div>
            </div>

            <!-- Contenido de la tarjeta -->
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Etiquetas de tipo -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span :class="getTypeBadgeClasses(project.type)" class="px-3 py-1 text-xs font-medium rounded-full">
                  {{ getTypeLabel(project.type) }}
                </span>
                <span
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium rounded-full">
                  Código Fuente
                </span>
                <span v-if="project.difficulty"
                  class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                  {{ project.difficulty }}
                </span>
              </div>

              <!-- Stats y acciones -->
              <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Eye class="w-4 h-4 mr-1" />
                  <span>{{ project.views }} vistas</span>
                  <span class="mx-2">•</span>
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                  </svg>
                  <span>Ver en TikTok</span>
                </div>

                <div class="flex space-x-2">
                  <button v-if="project.tiktokLink" @click.stop="openTikTok(project.tiktokLink)"
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
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Banner TikTok -->
        <div class="mt-16 mb-8">
          <div
            class="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-10 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
            <!-- Fondo decorativo -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20">
            </div>

            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div class="text-center md:text-left mb-6 md:mb-0">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
                  Más proyectos en TikTok
                </h3>
                <p class="text-gray-300 max-w-xl">
                  Sígueme en TikTok para ver tutoriales en video de cada proyecto, explicaciones paso a paso y nuevos
                  códigos cada semana.
                </p>
              </div>

              <a href="https://www.tiktok.com/@aresdev98" target="_blank"
                class="px-8 py-3 bg-white hover:bg-gray-100 text-black rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3 group">
                <svg class="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
                  <path
                    d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                </svg>
                <div class="text-left">
                  <div class="text-sm font-medium">Sígueme en</div>
                  <div class="text-lg">TikTok</div>
                </div>
                <span class="ml-1 group-hover:animate-bounce">🚀</span>
              </a>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center mt-12">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              No dudes en contactarme para discutir tus ideas y convertirla en realidad. También puedes sugerir temas
              para futuros videos de TikTok.
            </p>

            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button @click="openContactModal"
                class="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Contactar ahora
              </button>

              <a href="https://www.tiktok.com/@aresdev98" target="_blank"
                class="px-8 py-3 border-2 border-gray-800 dark:border-gray-600 hover:border-black dark:hover:border-gray-400 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                </svg>
                Ver todos los videos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer con TikTok -->
    <footer class="py-8 mt-16 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <div class="text-xl font-bold text-gray-800 dark:text-white mb-2">Mi Portafolio</div>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Proyectos y códigos fuente de mis videos de TikTok
            </p>
          </div>

          <div class="flex items-center space-x-6">
            <a href="https://www.tiktok.com/@aresdev98" target="_blank"
              class="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center gap-2">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
              </svg>
              <span class="font-medium">@TU_USUARIO_TIKTOK</span>
            </a>

            <a href="mailto:contacto@example.com"
              class="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300">
              Contacto
            </a>
          </div>
        </div>

        <div class="text-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <p class="text-gray-500 dark:text-gray-500 text-sm">
            &copy; 2023 - Todos los proyectos incluyen tutoriales en TikTok
          </p>
        </div>
      </div>
    </footer>

    <!-- Modal de Contacto (simplificado) -->
    <div v-if="showContactModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contáctame</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          ¿Tienes una idea para un proyecto o video de TikTok? Escríbeme.
        </p>

        <div class="space-y-4">
          <input type="text" placeholder="Tu nombre"
            class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent">
          <input type="email" placeholder="Tu email"
            class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent">
          <textarea placeholder="Tu mensaje" rows="4"
            class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"></textarea>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="showContactModal = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg">
            Cancelar
          </button>
          <button @click="showContactModal = false"
            class="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg">
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProjects } from '../composables/useProjects'
import { Download, Eye } from 'lucide-vue-next'

const { projects, incrementViews } = useProjects()
const showContactModal = ref(false)

// Filter only completed projects for the home page
const completedProjects = computed(() =>
  projects.value.filter(project => project.status === 'completed').map(project => ({
    ...project,
    // Agregar enlace a TikTok si no existe
    tiktokLink: project.tiktokLink || `https://www.https://www.tiktok.com/@aresdev98`, // Ejemplo
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

const openTikTok = (link: string) => {
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