<template>
  <div class="group relative">
    <div v-if="!isUnlocked" class="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    
    <div :class="[
      'relative bg-gradient-to-br rounded-lg border transition-all duration-300 p-6 cursor-pointer',
      isUnlocked 
        ? 'from-slate-800/60 to-slate-800/20 border-slate-700/40 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10' 
        : 'from-slate-800/30 to-slate-800/10 border-slate-700/20 hover:border-yellow-500/30 opacity-75'
    ]">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div v-if="isUnlocked" class="inline-block px-2 py-1 bg-emerald-500/20 rounded text-emerald-300 text-xs font-semibold mb-2">
            ✓ UNLOCKED
          </div>
          <div v-else class="inline-block px-2 py-1 bg-yellow-500/20 rounded text-yellow-300 text-xs font-semibold mb-2">
            🔒 LOCKED
          </div>
        </div>
      </div>

      <h3 class="text-lg font-bold text-white mb-2">Tier {{ tierNumber }}</h3>
      <p class="text-slate-300 text-sm mb-3">{{ tierInfo.name }}</p>
      
      <div class="space-y-2 mb-4 text-sm">
        <p class="text-slate-400">
          <span class="font-semibold">Duration:</span> {{ tierInfo.duration }}
        </p>
        <p class="text-slate-400">
          <span class="font-semibold">Price:</span> 
          <span v-if="isUnlocked" class="text-emerald-300">{{ tierInfo.price }}</span>
          <span v-else class="text-slate-300">{{ tierInfo.price }}</span>
        </p>
      </div>

      <button 
        v-if="!isUnlocked"
        @click="$emit('unlock', tierNumber)"
        class="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-medium text-sm transition"
      >
        Unlock Tier
      </button>
      <div v-else class="w-full px-4 py-2 bg-emerald-600/30 text-emerald-200 rounded font-medium text-sm text-center border border-emerald-500/30">
        Ready to Start
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tierNumber: {
    type: Number,
    required: true
  },
  tierInfo: {
    type: Object,
    required: true
  },
  isUnlocked: {
    type: Boolean,
    default: false
  }
})

defineEmits(['unlock'])
</script>
