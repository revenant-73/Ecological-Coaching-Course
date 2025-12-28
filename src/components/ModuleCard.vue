<template>
  <button
    @click="$emit('click')"
    :disabled="isLocked"
    :class="isLocked ? 'opacity-60 cursor-not-allowed' : ''"
    class="group relative w-full text-left overflow-hidden rounded-2xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
  >
    <!-- Animated background gradient -->
    <div :class="[
      'absolute inset-0 transition-all duration-500',
      isLocked 
        ? 'bg-gray-800' 
        : 'bg-gray-800 group-hover:bg-gray-750'
    ]"></div>
    
    <!-- Glow effect on hover -->
    <div v-if="!isLocked" class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div class="absolute inset-0 bg-accent-orange/10 rounded-2xl blur-2xl"></div>
    </div>
    
    <!-- Border with gradient -->
    <div :class="[
      'absolute inset-0 rounded-2xl border transition-colors duration-500 pointer-events-none',
      isLocked 
        ? 'border-gray-700' 
        : 'border-gray-700 group-hover:border-accent-orange'
    ]"></div>
    
    <!-- Content -->
    <div class="relative p-7 sm:p-8 z-10">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div :class="[
            'inline-block px-2.5 py-1 rounded-full mb-3 border transition-colors',
            isLocked
              ? 'bg-accent-teal text-white border-accent-teal'
              : 'bg-accent-orange text-white border-accent-orange group-hover:border-accent-orange'
          ]">
            <span v-if="isLocked" class="text-xs font-bold uppercase tracking-widest">🔒 Tier {{ module.tier }}</span>
            <span v-else class="text-xs font-bold uppercase tracking-widest">Module {{ module.number }}</span>
          </div>
          <h3 :class="[
            'text-xl sm:text-2xl font-bold transition-colors duration-300 leading-tight mb-1',
            isLocked ? 'text-gray-400' : 'text-white group-hover:text-white'
          ]">{{ module.title }}</h3>
        </div>
        <div v-if="progress.completed && !isLocked" class="flex-shrink-0 ml-3">
          <div class="bg-accent-teal-light text-white rounded-full p-2 flex items-center justify-center border border-accent-teal-light transition-all duration-300 shadow-lg">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        <div v-if="isLocked" class="flex-shrink-0 ml-3">
          <div class="bg-accent-teal text-white rounded-full p-2 flex items-center justify-center border border-accent-teal">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <p class="text-gray-400 text-sm sm:text-base mb-6 group-hover:text-gray-300 transition-colors flex items-center gap-2">
        <span>⏱️</span> {{ module.timeMinutes }} minute read
      </p>
      
      <button
        :class="[
          'w-full inline-flex items-center justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 relative overflow-hidden group/btn',
          isLocked 
            ? 'bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed' 
            : progress.completed 
            ? 'bg-accent-teal-light text-white hover:bg-accent-teal border border-accent-teal-light hover:border-accent-teal hover:shadow-lg' 
            : 'bg-accent-orange text-white hover:bg-orange-700 border border-accent-orange hover:border-orange-700 hover:shadow-lg'
        ]"
      >
        <!-- Shimmer effect -->
        <div v-if="!isLocked" class="absolute inset-0 bg-white/10 group-hover/btn:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
        
        <span class="relative flex items-center gap-2">
          <template v-if="isLocked">
            🔒 Unlock Tier {{ module.tier }}
          </template>
          <template v-else-if="progress.completed">
            ✓ Completed
          </template>
          <template v-else>
            ▶ Start Reading
            <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </template>
        </span>
      </button>
    </div>
  </button>
</template>

<script setup>
defineProps({
  module: {
    type: Object,
    required: true
  },
  progress: {
    type: Object,
    default: () => ({ started: null, completed: false })
  },
  isLocked: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>
