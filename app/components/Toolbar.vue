<template>
  <header class="transition-all duration-300">
    <div class="bg-gray-900 px-4 py-3 flex justify-between items-center rounded-xl shadow-md">
      <div>
        <img src="https://i.ibb.co/8ghgry6w/logo.png" alt="logo"
          class="h-11 w-11 rounded-xl object-cover shadow-md flex-shrink-0" />
      </div>
      <div>
        <h1 class="text-white">AresDev</h1>
      </div>
      <div>
        <button @click="login" class="text-white">
          Iniciar Sesion
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

const login = () => {
  navigateTo('login')
}
</script>