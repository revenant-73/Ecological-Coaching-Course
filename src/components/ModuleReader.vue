<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-8 animate-fade-in">
    <div class="max-w-4xl mx-auto">
      <button
        @click="goBack"
        class="flex items-center gap-2 text-slate-400 hover:text-blue-300 mb-8 transition-all duration-300 text-sm sm:text-base group"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="group-hover:text-blue-300 transition-colors">Back to Dashboard</span>
      </button>

      <div class="mb-14 animate-slide-in-right" style="animation-delay: 50ms">
        <div class="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-4 border border-blue-500/30">
          <span class="text-blue-300 text-xs font-bold uppercase tracking-widest">MODULE {{ module.number }}</span>
        </div>
        <h1 class="text-5xl sm:text-6xl font-black mb-4 leading-tight bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">{{ module.title }}</h1>
        <p class="text-slate-400 text-base sm:text-lg flex items-center gap-2">
          <span>⏱️</span> 
          <span>{{ module.timeMinutes }} minute read</span>
        </p>
      </div>

      <div class="group relative mb-10 animate-fade-in-up" style="animation-delay: 100ms">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-slate-800/60 to-slate-800/20 backdrop-blur-xl rounded-2xl border border-slate-700/40 hover:border-blue-500/30 p-8 sm:p-12 space-y-10 transition-all duration-500">
          <div v-for="(section, idx) in module.sections" :key="idx">
            <component 
              :is="getSectionComponent(section.type)"
              :section="section"
              :moduleId="module.id"
              @save-reflection="saveReflection"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-5 mb-10 mt-12 animate-fade-in-up" style="animation-delay: 200ms">
        <button
          v-if="!progress.completed"
          @click="completeModule"
          class="group flex-1 relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-600 to-cyan-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all text-base sm:text-lg shadow-lg hover:shadow-2xl hover:shadow-emerald-500/40 border border-emerald-500/50 hover:border-emerald-400/70"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
          <span class="relative flex items-center justify-center gap-2">
            ✓ Mark as Complete
          </span>
        </button>
        <button
          v-else
          disabled
          class="flex-1 bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 text-emerald-200 font-bold py-4 px-8 rounded-xl text-base sm:text-lg border border-emerald-500/50"
        >
          ✓ Completed
        </button>
        
        <button
          @click="nextModule"
          v-if="module.id < 8"
          class="group flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all text-base sm:text-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/40 border border-blue-500/50 hover:border-blue-400/70 flex items-center justify-center gap-2"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
          <span class="relative flex items-center gap-2">
            Next Module
            <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </button>
      </div>

      <button
        @click="goBack"
        class="w-full text-slate-400 hover:text-slate-200 py-3 transition-all text-sm sm:text-base group"
      >
        <span class="group-hover:text-blue-300 transition-colors">← Back to Dashboard</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { modules } from '../data/modules.js'
import { courseStore, courseActions } from '../store/courseStore.js'
import TextSection from './sections/TextSection.vue'
import HeadingSection from './sections/HeadingSection.vue'
import CalloutSection from './sections/CalloutSection.vue'
import ReflectionSection from './sections/ReflectionSection.vue'

const props = defineProps({
  moduleId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const module = computed(() => modules.find(m => m.id === props.moduleId))
const progress = computed(() => courseActions.getProgress(props.moduleId))

const getSectionComponent = (type) => {
  const components = {
    'text': TextSection,
    'heading': HeadingSection,
    'callout': CalloutSection,
    'reflection': ReflectionSection
  }
  return components[type] || TextSection
}

const completeModule = () => {
  courseActions.completeModule(props.moduleId)
}

const goBack = () => {
  emit('navigate', { page: 'dashboard' })
}

const nextModule = () => {
  if (props.moduleId < 8) {
    emit('navigate', { page: 'module', moduleId: props.moduleId + 1 })
  }
}

const saveReflection = (data) => {
  const notes = courseActions.getNotes(props.moduleId)
  courseActions.saveNotes(props.moduleId, {
    ...notes,
    [data.key]: data.value
  })
}
</script>
