<template>
  <div class="animate-fade-in-up">
    <h2 class="text-4xl sm:text-5xl font-black text-accent-orange mb-5 leading-tight">{{ section.content }}</h2>
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
