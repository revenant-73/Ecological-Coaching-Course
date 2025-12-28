<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto border border-accent-teal-light">
      <div class="sticky top-0 bg-gray-800 border-b border-accent-teal-light p-6 flex justify-between items-start gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ artifact.title }}</h2>
          <p class="text-gray-400 text-sm mt-1">{{ artifact.category }}</p>
        </div>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-white text-2xl flex-shrink-0"
        >
          ✕
        </button>
      </div>

      <div class="p-6 prose prose-invert max-w-none text-gray-200">
        <div class="artifact-content" v-html="renderedContent"></div>
      </div>

      <div class="sticky bottom-0 bg-gray-800 border-t border-accent-teal-light p-6 flex gap-3">
        <button 
          @click="downloadArtifact"
          class="px-4 py-2 bg-accent-teal-light hover:bg-accent-teal text-white rounded font-medium transition"
        >
          Download
        </button>
        <button 
          @click="closeModal"
          class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  artifact: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const downloadArtifact = () => {
  const content = props.artifact.content
  const filename = `${props.artifact.id}.md`
  
  const element = document.createElement('a')
  element.setAttribute('href', `data:text/markdown;charset=utf-8,${encodeURIComponent(content)}`)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const renderedContent = computed(() => {
  let html = props.artifact.content
  
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>')
  
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')
  
  html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>')
  html = html.replace(/^(\d+)\. (.*?)$/gm, '<li>$2</li>')
  
  html = html.replace(/> (.*?)$/gm, '<blockquote>$1</blockquote>')
  
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  
  html = html.replace(/(\d+\.|\-)?\s*\|/g, '|')
  
  html = html.replace(/\n/g, '<br/>')
  
  return html
})
</script>

<style scoped>
.artifact-content :deep(h1) {
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.artifact-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.artifact-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #14B8A6;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.artifact-content :deep(p) {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.625;
}

.artifact-content :deep(strong) {
  font-weight: bold;
  color: white;
}

.artifact-content :deep(em) {
  font-style: italic;
  color: #cbd5e1;
}

.artifact-content :deep(code) {
  background-color: #1e293b;
  color: #FF6B35;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;
}

.artifact-content :deep(li) {
  margin-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.artifact-content :deep(blockquote) {
  border-left: 4px solid #FF6B35;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  font-style: italic;
  color: #cbd5e1;
}

.artifact-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.artifact-content :deep(th),
.artifact-content :deep(td) {
  border: 1px solid #404854;
  padding: 1rem;
  text-align: left;
}

.artifact-content :deep(th) {
  background-color: #1e293b;
  color: white;
  font-weight: 600;
}
</style>
