<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 sm:p-8 animate-fade-in">
    <div class="max-w-4xl mx-auto">
      <button
        @click="goBack"
        class="flex items-center gap-2 text-gray-400 hover:text-accent-orange mb-8 transition-all duration-300 text-sm sm:text-base group"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="group-hover:text-accent-orange transition-colors">Back to Dashboard</span>
      </button>

      <div v-if="isLocked" class="max-w-4xl mx-auto bg-accent-teal border border-accent-teal rounded-lg p-8 text-center">
        <div class="text-4xl mb-4">🔒</div>
        <h2 class="text-2xl font-bold text-white mb-3">Module Locked</h2>
        <p class="text-gray-100 mb-6">
          This module is part of <strong>Tier {{ module.tier }}</strong> and requires access to view.
        </p>
        <p class="text-gray-100">
          All content is currently free—you can unlock all tiers to explore the full course.
        </p>
        <button 
          @click="unlockAllTiers"
          class="mt-6 px-6 py-3 bg-accent-teal-light hover:bg-accent-teal text-white rounded-lg font-bold transition"
        >
          Unlock All Tiers
        </button>
      </div>

      <template v-else>

      <div class="mb-14 animate-slide-in-right" style="animation-delay: 50ms">
        <div class="inline-block px-3 py-1 bg-accent-orange rounded-full mb-4 border border-accent-orange">
          <span class="text-white text-xs font-bold uppercase tracking-widest">MODULE {{ module.number }}</span>
        </div>
        <h1 class="text-5xl sm:text-6xl font-black mb-4 leading-tight text-white">{{ module.title }}</h1>
        <p class="text-gray-400 text-base sm:text-lg flex items-center gap-2">
          <span>⏱️</span> 
          <span>{{ module.timeMinutes }} minute read</span>
        </p>
      </div>

      <div class="group relative mb-10 animate-fade-in-up" style="animation-delay: 100ms">
        <div class="absolute inset-0 bg-accent-orange/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gray-800 backdrop-blur-xl rounded-2xl border border-gray-700 hover:border-accent-orange p-8 sm:p-12 space-y-10 transition-all duration-500">
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

      <div v-if="moduleArtifacts.length > 0" class="border-t border-gray-700 mt-12 pt-12">
        <h2 class="text-2xl font-bold text-accent-teal-light mb-6">Supporting Resources</h2>
        <div class="space-y-4">
          <ArtifactSection 
            v-for="artifact in moduleArtifacts"
            :key="artifact.id"
            :artifact="artifact"
          />
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-5 mb-10 mt-12 animate-fade-in-up" style="animation-delay: 200ms">
        <button
          v-if="!progress.completed"
          @click="completeModule"
          class="group flex-1 relative overflow-hidden bg-accent-teal-light hover:bg-accent-teal text-white font-bold py-4 px-8 rounded-xl transition-all text-base sm:text-lg shadow-lg hover:shadow-2xl border border-accent-teal-light hover:border-accent-teal"
        >
          <div class="absolute inset-0 bg-white/10 group-hover:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
          <span class="relative flex items-center justify-center gap-2">
            ✓ Mark as Complete
          </span>
        </button>
        <button
          v-else
          disabled
          class="flex-1 bg-accent-teal text-white font-bold py-4 px-8 rounded-xl text-base sm:text-lg border border-accent-teal opacity-60"
        >
          ✓ Completed
        </button>
        
        <button
          @click="nextModule"
          v-if="module.id < 7"
          class="group flex-1 relative overflow-hidden bg-accent-orange hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all text-base sm:text-lg shadow-lg hover:shadow-2xl border border-accent-orange hover:border-orange-700 flex items-center justify-center gap-2"
        >
          <div class="absolute inset-0 bg-white/10 group-hover:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { modules } from '../data/modules.js'
import { artifacts, getArtifact } from '../data/artifacts.js'
import { courseStore, courseActions } from '../store/courseStore.js'
import TextSection from './sections/TextSection.vue'
import HeadingSection from './sections/HeadingSection.vue'
import CalloutSection from './sections/CalloutSection.vue'
import ReflectionSection from './sections/ReflectionSection.vue'
import ArtifactSection from './sections/ArtifactSection.vue'

const props = defineProps({
  moduleId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const module = computed(() => modules.find(m => m.id === props.moduleId))
const progress = computed(() => courseActions.getProgress(props.moduleId))
const isLocked = computed(() => !courseActions.canAccessModule(props.moduleId))

const moduleArtifacts = computed(() => {
  if (!module.value || !module.value.artifacts) return []
  return module.value.artifacts.map(id => getArtifact(id)).filter(a => a)
})

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
  if (props.moduleId < 7) {
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

const unlockAllTiers = () => {
  courseActions.unlockAllTiers()
}
</script>
