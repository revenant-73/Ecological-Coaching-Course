<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-8">
    <div class="max-w-6xl mx-auto">
      <header class="mb-16 sm:mb-20 animate-fade-in-up">
        <div class="mb-4">
          <span class="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-widest border border-blue-500/30">Welcome Back, Coach</span>
        </div>
        <h1 class="text-5xl sm:text-6xl font-black mb-3 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Ecological Volleyball Coach</h1>
        <p class="text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed">Design Better Games. Trust the Process. Let Players Learn.</p>
      </header>

      <div class="group relative mb-12 animate-fade-in-up" style="animation-delay: 100ms">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 class="text-2xl font-bold mb-2 text-slate-100">Your Progress</h2>
              <p class="text-slate-400 text-base sm:text-lg"><span class="font-semibold text-blue-300">{{ completedModules }}</span> of <span class="font-semibold text-purple-300">9 modules</span> completed</p>
            </div>
            <div class="w-full sm:w-64">
              <div class="bg-slate-700/30 rounded-full h-5 overflow-hidden border border-slate-600/50 shadow-lg shadow-slate-900/50">
                <div 
                  class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out shadow-lg shadow-blue-500/50 relative"
                  :style="{ width: completionPercentage + '%' }"
                >
                  <div class="absolute inset-0 bg-white/10 animate-pulse-soft"></div>
                </div>
              </div>
              <p class="text-slate-300 text-sm sm:text-base mt-3 text-right font-semibold">
                <span class="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">{{ completionPercentage }}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        <div
          v-for="(module, idx) in modules"
          :key="module.id"
          class="animate-fade-in-up"
          :style="`animation-delay: ${idx * 50}ms`"
        >
          <ModuleCard
            :module="module"
            :progress="getProgress(module.id)"
            @click="selectModule(module.id)"
          />
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-slate-700/50 text-center">
        <button
          @click="resetProgressConfirm"
          class="text-slate-400 hover:text-amber-400 transition-colors text-sm underline decoration-slate-600 hover:decoration-amber-400/50"
        >
          🔄 Clear all progress
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { modules } from '../data/modules.js'
import { courseStore, courseActions } from '../store/courseStore.js'
import ModuleCard from './ModuleCard.vue'

const completionPercentage = computed(() => courseActions.getCompletionPercentage())
const completedModules = computed(() => {
  return Object.values(courseStore.progress).filter(p => p.completed).length
})

const getProgress = (moduleId) => courseActions.getProgress(moduleId)

const selectModule = (moduleId) => {
  courseActions.startModule(moduleId)
  const event = new CustomEvent('navigate', { detail: { page: 'module', moduleId } })
  window.dispatchEvent(event)
}

const resetProgressConfirm = () => {
  if (confirm('Are you sure you want to clear all progress and notes? This cannot be undone.')) {
    courseActions.resetProgress()
  }
}
</script>
