<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 sm:p-8">
    <div class="max-w-6xl mx-auto">
      <header class="mb-16 sm:mb-20 animate-fade-in-up">
        <div class="mb-4">
          <span class="inline-block px-3 py-1 bg-accent-orange text-white text-xs font-bold uppercase tracking-widest rounded-full border border-accent-orange">Welcome Back, Coach</span>
        </div>
        <h1 class="text-5xl sm:text-6xl font-black mb-3 text-white">Ecological Volleyball Coach</h1>
        <p class="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed">Design Better Games. Trust the Process. Let Players Learn.</p>
      </header>

      <div class="group relative mb-12 animate-fade-in-up" style="animation-delay: 100ms">
        <div class="absolute inset-0 bg-accent-orange/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gray-800 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-gray-700 hover:border-accent-orange transition-all duration-500">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 class="text-2xl font-bold mb-2 text-white">Your Progress</h2>
              <p class="text-gray-300 text-base sm:text-lg"><span class="font-semibold text-accent-orange">{{ completedModules }}</span> of <span class="font-semibold text-accent-teal-light">{{ modules.length }} modules</span> completed</p>
            </div>
            <div class="flex flex-col gap-4 w-full sm:w-auto">
              <div class="w-full sm:w-64">
                <div class="bg-gray-700 rounded-full h-5 overflow-hidden border border-gray-600 shadow-lg">
                  <div 
                    class="h-full bg-accent-orange transition-all duration-700 ease-out shadow-lg relative"
                    :style="{ width: completionPercentage + '%' }"
                  >
                    <div class="absolute inset-0 bg-white/20 animate-pulse-soft"></div>
                  </div>
                </div>
                <p class="text-gray-300 text-sm sm:text-base mt-3 text-right font-semibold">
                  <span class="text-accent-orange">{{ completionPercentage }}%</span>
                </p>
              </div>
              <button
                @click="viewReflections"
                class="px-4 py-2 bg-accent-teal-light hover:bg-accent-teal text-white rounded-lg font-semibold transition-all text-sm sm:text-base"
              >
                📝 View Reflections
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-12 animate-fade-in-up" style="animation-delay: 150ms">
        <h2 class="text-2xl font-bold mb-6 text-white">Course Tiers</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TierCard 
            v-for="tierNum in [0, 1, 2]"
            :key="tierNum"
            :tierNumber="tierNum"
            :tierInfo="tierInfo[`tier${tierNum}`]"
            :isUnlocked="unlockedTiers.includes(tierNum)"
            @unlock="unlockTier"
          />
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-6 text-white">Modules</h2>
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
            :isLocked="!canAccessModule(module.id)"
            @click="selectModule(module.id)"
          />
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-700 text-center">
        <button
          @click="resetProgressConfirm"
          class="text-gray-400 hover:text-accent-orange transition-colors text-sm underline decoration-gray-600 hover:decoration-accent-orange"
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
import TierCard from './TierCard.vue'

const emit = defineEmits(['navigate'])

const completionPercentage = computed(() => courseActions.getCompletionPercentage())
const completedModules = computed(() => {
  return Object.values(courseStore.progress).filter(p => p.completed).length
})

const unlockedTiers = computed(() => courseActions.unlockedTierNumbers())
const tierInfo = computed(() => courseActions.getTierInfo())

const getProgress = (moduleId) => courseActions.getProgress(moduleId)
const canAccessModule = (moduleId) => courseActions.canAccessModule(moduleId)

const selectModule = (moduleId) => {
  if (canAccessModule(moduleId)) {
    courseActions.startModule(moduleId)
    emit('navigate', { page: 'module', moduleId })
  }
}

const unlockTier = (tierNum) => {
  courseActions.unlockTier(tierNum)
}

const resetProgressConfirm = () => {
  if (confirm('Are you sure you want to clear all progress and notes? This cannot be undone.')) {
    courseActions.resetProgress()
  }
}

const viewReflections = () => {
  emit('navigate', { page: 'reflections' })
}
</script>
