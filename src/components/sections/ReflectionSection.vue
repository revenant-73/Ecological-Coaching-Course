<template>
  <div class="group relative animate-fade-in-up">
    <div class="absolute inset-0 bg-accent-teal-light/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    <div class="relative bg-gray-800 border border-accent-teal-light group-hover:border-accent-teal-light backdrop-blur-sm p-6 sm:p-8 rounded-xl transition-all duration-500">
      <h3 class="text-2xl font-bold text-white mb-7 flex items-center gap-3">
        <span class="text-2xl">✍️</span> 
        <span class="text-accent-teal-light">{{ section.title }}</span>
      </h3>
      
      <div class="space-y-7">
        <div v-for="(prompt, idx) in section.prompts" :key="idx" class="space-y-3">
          <label class="block text-base sm:text-lg font-semibold text-white">
            {{ prompt }}
          </label>
          <textarea
            v-model="reflectionNotes[idx]"
            @input="saveReflection(idx)"
            placeholder="Your thoughts..."
            class="w-full bg-gray-700 border border-accent-teal-light hover:border-accent-teal-light focus:border-accent-teal-light focus:ring-2 focus:ring-accent-teal-light/50 rounded-lg px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-gray-500 focus:outline-none text-base sm:text-lg resize-none transition-all duration-300 backdrop-blur-sm"
            rows="4"
          ></textarea>
        </div>
      </div>

      <p v-if="section.instruction" class="text-gray-400 text-sm sm:text-base italic mt-7 pt-7 border-t border-accent-teal-light/20">
        💭 {{ section.instruction }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { courseActions } from '../../store/courseStore.js'

const props = defineProps({
  section: {
    type: Object,
    required: true
  },
  moduleId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['save-reflection'])

const reflectionKey = computed(() => `reflection_${props.section.title}`)
const reflectionNotes = ref(new Array(props.section.prompts.length).fill(''))

watch(() => props.moduleId, () => {
  const saved = courseActions.getNotes(props.moduleId)
  const key = reflectionKey.value
  if (saved[key] && Array.isArray(saved[key])) {
    reflectionNotes.value = saved[key]
  } else {
    reflectionNotes.value = new Array(props.section.prompts.length).fill('')
  }
}, { immediate: true })

const saveReflection = (idx) => {
  const saved = courseActions.getNotes(props.moduleId)
  courseActions.saveNotes(props.moduleId, {
    ...saved,
    [reflectionKey.value]: reflectionNotes.value
  })
}
</script>
