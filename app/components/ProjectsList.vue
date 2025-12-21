<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CardProject v-for="project in projects" :key="project.title" :project="project" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  projects: Array<{
    title: string
    description: string
  }>
}>()
</script>