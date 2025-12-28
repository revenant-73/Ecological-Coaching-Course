<template>
  <div class="group relative">
    <div v-if="!isUnlocked" class="absolute inset-0 bg-accent-teal/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    
    <div :class="[
      'relative bg-gray-800 rounded-lg border transition-all duration-300 p-6 cursor-pointer',
      isUnlocked 
        ? 'border-gray-700 hover:border-accent-teal-light hover:shadow-lg' 
        : 'border-gray-700 hover:border-accent-teal opacity-75'
    ]">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div v-if="isUnlocked" class="inline-block px-2 py-1 bg-accent-teal-light rounded text-white text-xs font-semibold mb-2">
            ✓ UNLOCKED
          </div>
          <div v-else class="inline-block px-2 py-1 bg-accent-teal rounded text-white text-xs font-semibold mb-2">
            🔒 LOCKED
          </div>
        </div>
      </div>

      <h3 class="text-lg font-bold text-white mb-2">Tier {{ tierNumber }}</h3>
      <p class="text-gray-300 text-sm mb-3">{{ tierInfo.name }}</p>
      
      <div class="space-y-2 mb-4 text-sm">
        <p class="text-gray-400">
          <span class="font-semibold">Duration:</span> {{ tierInfo.duration }}
        </p>
        <p class="text-gray-400">
          <span class="font-semibold">Price:</span> 
          <span v-if="isUnlocked" class="text-accent-teal-light">{{ tierInfo.price }}</span>
          <span v-else class="text-gray-300">{{ tierInfo.price }}</span>
        </p>
      </div>

      <button 
        v-if="!isUnlocked"
        @click="$emit('unlock', tierNumber)"
        class="w-full px-4 py-2 bg-accent-teal hover:bg-accent-teal-light text-white rounded font-medium text-sm transition"
      >
        Unlock Tier
      </button>
      <div v-else class="w-full px-4 py-2 bg-accent-teal-light text-white rounded font-medium text-sm text-center border border-accent-teal-light">
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
