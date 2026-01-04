<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8">
    <div class="w-full max-w-sm px-4">
      <!-- Logo y título -->
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg class="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-2xl font-light text-gray-800 dark:text-gray-200">
          {{ showRegister ? 'Crear cuenta' : 'Iniciar sesión' }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {{ showRegister ? 'Comienza tu experiencia' : 'Bienvenido de nuevo' }}
        </p>
      </div>

      <!-- Formulario -->
      <form class="space-y-5" @submit.prevent="handleLogin">
        <!-- Campo Usuario -->
        <div>
          <input id="username" v-model="username" type="text" required placeholder="Nombre de usuario"
            class="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
        </div>

        <!-- Campo Contraseña -->
        <div>
          <input id="password" v-model="password" type="password" required
            :placeholder="showRegister ? 'Crear contraseña' : 'Tu contraseña'"
            class="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
        </div>

        <!-- Campo Confirmar Contraseña (solo registro) -->
        <div v-if="showRegister">
          <input id="confirmPassword" v-model="confirmPassword" type="password" required
            placeholder="Confirmar contraseña"
            class="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
        </div>

        <!-- Botón principal -->
        <button type="submit"
          class="w-full py-3 mt-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {{ showRegister ? 'Continuar' : 'Acceder' }}
        </button>

        <!-- Enlace alternativo -->
        <!-- <div class="text-center pt-4">
          <button @click="showRegister = !showRegister" type="button"
            class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            {{ showRegister ? '¿Ya tienes cuenta? Iniciar sesión' : '¿Primera vez? Crear cuenta' }}
          </button>
        </div>-->
      </form>

      <!-- Enlace de regreso -->
      <div class="text-center mt-8">
        <NuxtLink to="/"
          class="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { ref, onMounted } from 'vue'

interface UserState {
  username: string
  role: string
}

const { $db } = useNuxtApp()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const showRegister = ref(false)
const users = ref<DocumentData[]>([])


// Cargar usuarios desde Firestore
onMounted(async () => {
  const querySnapshot = await getDocs(collection($db, 'users'))
  users.value = querySnapshot.docs.map(doc => doc.data() as DocumentData)
})

const handleLogin = async () => {
  if (showRegister.value) {
    // Registro
    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden')
      return
    }

    await addDoc(collection($db, 'users'), {
      username: username.value,
      password: password.value,
      role: 'user',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    alert('Cuenta creada correctamente')
    showRegister.value = false
    confirmPassword.value = ''
    username.value = ''
    password.value = ''
  } else {
    // Login - Load users first
    const querySnapshot = await getDocs(collection($db, 'users'))
    const loadedUsers = querySnapshot.docs.map(doc => doc.data() as DocumentData)

    const user = loadedUsers.find(
      (u: any) => u.username === username.value && u.password === password.value
    )

    if (user) {
      // Guardar estado tipado en Nuxt
      const userState = useState<UserState | null>('user', () => null)
      userState.value = {
        username: user.username,
        role: user.role,
      }

      // Guardar cookies
      const roleCookie = useCookie('role', { path: '/', maxAge: 60 * 60 * 24 * 7 }) // 7 días
      roleCookie.value = user.role

      const userCookie = useCookie('user', { path: '/', maxAge: 60 * 60 * 24 * 7 })
      userCookie.value = user.username

      // Redirigir al inicio
      navigateTo('/')
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  }
}

</script>

<style scoped>
/* Estilos minimalistas adicionales */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
}

input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
}

.dark input:-webkit-autofill {
  -webkit-text-fill-color: #e5e7eb;
}

/* Animación sutil para el foco */
input:focus {
  box-shadow: 0 1px 0 0 currentColor;
}
</style>