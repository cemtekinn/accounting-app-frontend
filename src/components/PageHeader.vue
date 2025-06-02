<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
})
</script>

<template>
  <header class="p-2 border-bottom bg-light">
    <h1 v-if="props.title" class="h4 fw-semibold text-dark">{{ props.title }}</h1>
    <p v-if="props.subtitle" class="text-muted small">{{ props.subtitle }}</p>
  </header>
</template>
