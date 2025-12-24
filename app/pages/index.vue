<template>
  <div class="min-h-screen">
    <!-- Tabs -->
    <PageHeader>
      <nav class="-mb-px flex space-x-8">
        <button @click="activeTab = 'gratuitos'" class="py-4 px-1 border-b-2 font-medium text-sm" :class="activeTab === 'gratuitos'
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
          Gratuitos
        </button>
        <button @click="activeTab = 'personalizadas'" class="py-4 px-1 border-b-2 font-medium text-sm" :class="activeTab === 'personalizadas'
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
          Soluciones Personalizadas
        </button>
      </nav>
    </PageHeader>

    <!-- Projects Section -->
    <div v-if="activeTab === 'gratuitos'">
      <main class="container mx-auto py-6">
        <div class="mb-10">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Proyectos Destacados</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Selección de soluciones implementadas con metodologías ágiles y mejores prácticas de desarrollo
          </p>
        </div>

        <!-- Professional Filters -->
        <div class="max-w-4xl mx-auto mb-8">
          <div class="mb-4 hidden md:flex">
            <div class="flex flex-wrap justify-center gap-3">
              <button @click="selectedType = 'all'" :class="[
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300',
                'border',
                selectedType === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:shadow-md'
              ]">
                Todas las categorías
              </button>
              <button @click="selectedType = 'web'" :class="[
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300',
                'border',
                selectedType === 'web'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:shadow-md'
              ]">
                Desarrollo Web
              </button>
              <!-- <button @click="selectedType = 'app'" :class="[
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300',
                'border',
                selectedType === 'app'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:shadow-md'
              ]">
                Aplicaciones
              </button> -->
              <!-- <button @click="selectedType = 'excel'" :class="[
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300',
                'border',
                selectedType === 'excel'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:shadow-md'
              ]">
                Automatización
              </button>
              <button @click="selectedType = 'other'" :class="[
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300',
                'border',
                selectedType === 'other'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:shadow-md'
              ]"> -->
                <!-- Otros Proyectos
              </button> -->
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in filteredCompletedProjects" :key="project.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <!-- Project Image/Thumbnail -->
            <div
              class="h-64 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <div class="w-full h-full transition-transform duration-700 group-hover:scale-105" :style="{
                backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"></div>
              <!-- Professional Badge -->
              <div class="absolute top-4 right-4">
                <span :class="getTypeBadgeClasses(project.type)"
                  class="px-4 py-2 text-xs font-semibold rounded-full shadow-md">
                  {{ getTypeLabel(project.type) }}
                </span>
              </div>
              <!-- Project Status -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-bold text-white">{{ project.title }}</h3>
                  <span
                    class="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                    Completado
                  </span>
                </div>
              </div>
            </div>
            <!-- Project Details -->
            <div class="p-4 md:p-6">
              <div class="flex items-center space-x-4 md:space-x-6">
                <div>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {{ project.description }}
                  </p>
                </div>
                <div class="text-center">
                  <div class="flex items-center text-gray-500 dark:text-gray-400">
                    <Download class="w-4 h-4 mr-2" />
                    <span class="font-medium">{{ project.downloads || 0 }}</span>
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">Descargas</div>
                </div>
                <div class="text-center">
                  <div class="flex items-center text-gray-500 dark:text-gray-400">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                    </svg>
                    <span>{{ project.viewsTiktok }}</span>
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">TikTok</div>
                </div>
              </div>
              <!-- Project Stats -->
              <div
                class="flex justify-center items-center space-x-2 mt-4">
                <!-- Action Buttons -->
                <div>
                  <button
                    v-if="project.tiktokLink"
                    @click.stop="openTikTok(project.tiktokLink, project.id)"
                    class="mr-2 px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-xs font-medium flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                    </svg>
                    Video
                  </button>
                </div>
                <div>
                  <button v-if="project.downloadLink"
                    @click.stop="downloadProject(project.downloadLink); incrementDownloads(project.id)"
                    class="mr-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center transition-colors duration-300 shadow-md hover:shadow-lg">
                    <Download class="w-4 h-4 mr-2" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCompletedProjects.length === 0" class="text-center py-16">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No se encontraron proyectos
          </h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Actualmente no hay proyectos disponibles en esta categoría. Próximamente se agregarán nuevas soluciones.
          </p>
        </div>
      </main>
    </div>

    <!-- Custom Solutions Section -->
    <div v-if="activeTab === 'personalizadas'">
      <main class="container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Soluciones Personalizadas</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Desarrollamos plataformas web y aplicaciones personalizadas que se adaptan a las necesidades específicas de
            tu empresa.
          </p>
        </div>

        <!-- Contact Section -->
        <section
          class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 border-t border-gray-200 dark:border-gray-800">
          <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
                <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                ¿Necesitas una solución digital?
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Desarrollamos plataformas web y aplicaciones personalizadas que se adaptan a las necesidades específicas
                de tu empresa.
                Desde sistemas de gestión hasta soluciones innovadoras.
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <a href="https://wa.me/51953111647" target="_blank"
                  class="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                  Solicitar Cátalogo
                </a>

                <button @click="showContactForm = true"
                  class="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Dejar un comentario
                </button>

                <!-- Contact Form Modal -->
                <div v-if="showContactForm"
                  class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                  <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
                    <div class="mt-3">
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Dejar un comentario
                      </h3>
                      <form @submit.prevent="submitQuotation" class="space-y-4">
                        <div>
                          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombres
                          </label>
                          <input id="name" v-model="name" type="text" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Número de celular
                          </label>
                          <input id="phone" v-model="phone" type="tel" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Comentario
                          </label>
                          <textarea id="comment" v-model="comment" required rows="3"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                          <button @click="showContactForm = false" type="button"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                            Cancelar
                          </button>
                          <button type="submit"
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Enviar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Floating WhatsApp Button -->
      <div class="fixed bottom-6 right-6 z-50">
        <div class="relative group">
          <!-- Tooltip -->
          <div
            class="absolute right-14 bottom-1/2 transform translate-y-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            ¿Necesitas ayuda?
            <div
              class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900">
            </div>
          </div>

          <!-- WhatsApp Button -->
          <a href="https://wa.me/51953111647" target="_blank"
            class="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95 group">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
            </svg>

            <!-- Notification dot -->
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useProjects } from '../composables/useProjects'
import { Download } from 'lucide-vue-next'
import Pageheader from '~/components/PageHeader.vue'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

// Active tab
const activeTab = ref<'gratuitos' | 'personalizadas'>('gratuitos')

const { projects, incrementViews, incrementViewsTiktok, incrementDownloads } = useProjects()
const selectedType = ref<'all' | 'web' | 'app' | 'excel' | 'other'>('all')
const { $db } = useNuxtApp()

// Contact form
const showContactForm = ref(false)
const name = ref('')
const phone = ref('')
const comment = ref('')

const submitQuotation = async () => {
  if (!name.value || !phone.value || !comment.value) {
    alert('Por favor completa todos los campos')
    return
  }
  try {
    await addDoc(collection($db, 'quotations'), {
      name: name.value,
      phone: phone.value,
      comment: comment.value,
      createdAt: Timestamp.now()
    })
    alert('Cotización enviada correctamente')
    name.value = ''
    phone.value = ''
    comment.value = ''
    showContactForm.value = false
  } catch (error) {
    console.error('Error saving quotation:', error)
    alert('Error al enviar la cotización')
  }
}

// Filter only completed projects for the home page
const completedProjects = computed(() =>
  projects.value.filter(project => project.status === 'completed').map(project => ({
    ...project,
    // Add default values for corporate presentation
    difficulty: project.difficulty || 'Intermedio',
    estimatedTime: project.estimatedTime || '4-6 semanas',
    documentationLink: project.documentationLink || null,
    demoLink: project.demoLink || null,
    downloads: project.downloads || 0,
    tiktokLink: project.tiktokLink || `https://www.tiktok.com/@aresdev98`
  }))
)

// Statistics
const totalDownloads = computed(() =>
  completedProjects.value.reduce((sum, project) => sum + (project.downloads || 0), 0)
)

const filteredCompletedProjects = computed(() =>
  completedProjects.value
    .filter(project => selectedType.value === 'all' || project.type === selectedType.value)
    .sort((a, b) => b.views - a.views) // Sort by views for corporate relevance
)

const getTypeBadgeClasses = (type: 'web' | 'app' | 'excel' | 'other') => {
  const classes = {
    web: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    app: 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20',
    excel: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20',
    other: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20'
  }
  return classes[type]
}

const getTypeLabel = (type: 'web' | 'app' | 'excel' | 'other') => {
  const labels = {
    web: 'Desarrollo Web',
    app: 'Aplicación',
    excel: 'Automatización',
    other: 'Solución Personalizada'
  }
  return labels[type]
}

const downloadProject = (link: string) => {
  window.open(link, '_blank')
}

const openDocumentation = (link: string) => {
  window.open(link, '_blank')
}

const openDemo = (link: string) => {
  window.open(link, '_blank')
}

const openTikTok = (link: string, id: string) => {
  incrementViewsTiktok(id)
  window.open(link, '_blank')
}

const openContactForm = () => {
  // In a real implementation, this would open a contact form modal
  console.log('Opening contact form')
}

</script>

<style scoped>
/* Professional Animations */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth card entrance animation */
@keyframes fadeInUp {
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
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: backwards;
}

/* Staggered animation delays */
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

/* Professional hover effects */
.group:hover {
  transform: translateY(-4px);
}

/* Custom scrollbar for corporate look */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>