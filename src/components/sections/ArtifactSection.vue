<template>
  <div class="bg-emerald-900 border border-emerald-700 rounded-lg p-6 my-6">
    <div class="flex items-start gap-3 mb-4">
      <svg class="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5 4v12h10V4H5zm-1-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      <div class="flex-grow">
        <h3 class="text-lg font-semibold text-white">RESOURCE</h3>
        <p class="text-emerald-200 text-sm">{{ artifact.title }}</p>
      </div>
    </div>

    <p class="text-emerald-100 mb-4 text-sm">
      {{ artifact.category }}
    </p>

    <div class="flex gap-3">
      <button 
        @click="viewArtifact"
        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium text-sm transition"
      >
        View
      </button>
      <button 
        @click="downloadArtifact"
        class="px-4 py-2 border border-emerald-400 hover:bg-emerald-900 text-emerald-200 rounded font-medium text-sm transition"
      >
        Download
      </button>
    </div>
  </div>

  <ArtifactModal 
    v-if="showModal" 
    :artifact="artifact"
    @close="showModal = false"
  />
</template>

<script setup>
import { ref } from 'vue'
import ArtifactModal from './ArtifactModal.vue'

defineProps({
  artifact: {
    type: Object,
    required: true
  }
})

const showModal = ref(false)

const viewArtifact = () => {
  showModal.value = true
}

const downloadArtifact = () => {
  const content = artifactContent.value
  const filename = `${artifact.value.id}.md`
  
  const element = document.createElement('a')
  element.setAttribute('href', `data:text/markdown;charset=utf-8,${encodeURIComponent(content)}`)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const artifactContent = ref('')

const artifact = ref(props.artifact)

const getContent = () => {
  return artifact.value.content
}

artifactContent.value = getContent()
</script>
