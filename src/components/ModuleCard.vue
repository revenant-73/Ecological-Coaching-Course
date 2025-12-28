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
        ? 'bg-gradient-to-br from-slate-700/20 to-slate-800/10' 
        : 'bg-gradient-to-br from-slate-700/40 to-slate-800/20 group-hover:from-slate-700/60 group-hover:to-slate-800/40'
    ]"></div>
    
    <!-- Glow effect on hover -->
    <div v-if="!isLocked" class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-transparent rounded-2xl blur-2xl"></div>
    </div>
    
    <!-- Border with gradient -->
    <div :class="[
      'absolute inset-0 rounded-2xl border transition-colors duration-500 pointer-events-none',
      isLocked 
        ? 'border-slate-600/20' 
        : 'border-slate-600/30 group-hover:border-purple-500/40'
    ]"></div>
    
    <!-- Content -->
    <div class="relative p-7 sm:p-8 z-10">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div :class="[
            'inline-block px-2.5 py-1 rounded-full mb-3 border transition-colors',
            isLocked
              ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
              : 'bg-gradient-to-r from-blue-500/20 to-blue-600/10 border-blue-500/30 group-hover:border-blue-400/50 text-blue-300'
          ]">
            <span v-if="isLocked" class="text-xs font-bold uppercase tracking-widest">🔒 Tier {{ module.tier }}</span>
            <span v-else class="text-xs font-bold uppercase tracking-widest">Module {{ module.number }}</span>
          </div>
          <h3 :class="[
            'text-xl sm:text-2xl font-bold transition-colors duration-300 leading-tight mb-1',
            isLocked ? 'text-slate-400' : 'text-slate-100 group-hover:text-blue-100'
          ]">{{ module.title }}</h3>
        </div>
        <div v-if="progress.completed && !isLocked" class="flex-shrink-0 ml-3">
          <div class="bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 text-emerald-300 rounded-full p-2 flex items-center justify-center border border-emerald-500/50 group-hover:border-emerald-400/70 group-hover:bg-emerald-500/40 transition-all duration-300 shadow-lg shadow-emerald-500/20">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        <div v-if="isLocked" class="flex-shrink-0 ml-3">
          <div class="bg-yellow-500/20 text-yellow-300 rounded-full p-2 flex items-center justify-center border border-yellow-500/50">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <p class="text-slate-400 text-sm sm:text-base mb-6 group-hover:text-slate-300 transition-colors flex items-center gap-2">
        <span>⏱️</span> {{ module.timeMinutes }} minute read
      </p>
      
      <button
        :class="[
          'w-full inline-flex items-center justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 relative overflow-hidden group/btn',
          isLocked 
            ? 'bg-slate-600/20 text-slate-400 border border-slate-500/20 cursor-not-allowed' 
            : progress.completed 
            ? 'bg-gradient-to-r from-emerald-600/40 to-emerald-700/20 text-emerald-200 hover:from-emerald-600/60 hover:to-emerald-700/40 border border-emerald-500/40 hover:border-emerald-400/70 hover:shadow-lg hover:shadow-emerald-500/30' 
            : 'bg-gradient-to-r from-blue-600/40 to-purple-600/30 text-blue-100 hover:from-blue-600/60 hover:to-purple-600/50 border border-blue-500/40 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/40'
        ]"
        @click.stop
      >
        <!-- Shimmer effect -->
        <div v-if="!isLocked" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover/btn:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
        
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
