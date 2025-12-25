<template>
  <div class="animate-fade-in-up">
    <h2 class="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-7 leading-tight">{{ section.content }}</h2>
  </div>
</template>

<script setup>
defineProps({
  section: {
    type: Object,
    required: true
  }
})
</script>
