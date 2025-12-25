<template>
  <button
    @click="$emit('click')"
    class="group relative w-full text-left overflow-hidden rounded-2xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
  >
    <!-- Animated background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-700/40 to-slate-800/20 group-hover:from-slate-700/60 group-hover:to-slate-800/40 transition-all duration-500"></div>
    
    <!-- Glow effect on hover -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-transparent rounded-2xl blur-2xl"></div>
    </div>
    
    <!-- Border with gradient -->
    <div class="absolute inset-0 rounded-2xl border border-slate-600/30 group-hover:border-purple-500/40 transition-colors duration-500 pointer-events-none"></div>
    
    <!-- Content -->
    <div class="relative p-7 sm:p-8 z-10">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="inline-block px-2.5 py-1 bg-gradient-to-r from-blue-500/20 to-blue-600/10 rounded-full mb-3 border border-blue-500/30 group-hover:border-blue-400/50 transition-colors">
            <span class="text-blue-300 text-xs font-bold uppercase tracking-widest">Module {{ module.number }}</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-100 transition-colors duration-300 leading-tight mb-1">{{ module.title }}</h3>
        </div>
        <div v-if="progress.completed" class="flex-shrink-0 ml-3">
          <div class="bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 text-emerald-300 rounded-full p-2 flex items-center justify-center border border-emerald-500/50 group-hover:border-emerald-400/70 group-hover:bg-emerald-500/40 transition-all duration-300 shadow-lg shadow-emerald-500/20">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
      
      <p class="text-slate-400 text-sm sm:text-base mb-6 group-hover:text-slate-300 transition-colors flex items-center gap-2">
        <span>⏱️</span> {{ module.timeMinutes }} minute read
      </p>
      
      <button
        class="w-full inline-flex items-center justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 relative overflow-hidden group/btn"
        :class="progress.completed 
          ? 'bg-gradient-to-r from-emerald-600/40 to-emerald-700/20 text-emerald-200 hover:from-emerald-600/60 hover:to-emerald-700/40 border border-emerald-500/40 hover:border-emerald-400/70 hover:shadow-lg hover:shadow-emerald-500/30' 
          : 'bg-gradient-to-r from-blue-600/40 to-purple-600/30 text-blue-100 hover:from-blue-600/60 hover:to-purple-600/50 border border-blue-500/40 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/40'"
        @click.stop
      >
        <!-- Shimmer effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover/btn:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
        
        <span class="relative flex items-center gap-2">
          {{ progress.completed ? '✓ Completed' : '▶ Start Reading' }}
          <svg v-if="!progress.completed" class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
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
  }
})

defineEmits(['click'])
</script>
