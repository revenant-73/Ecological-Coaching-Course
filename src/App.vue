<template>
  <div class="bg-gray-900 min-h-screen">
    <Dashboard v-if="currentPage === 'dashboard'" @navigate="handleNavigate" />
    <ModuleReader 
      v-else-if="currentPage === 'module'" 
      :moduleId="currentModuleId"
      @navigate="handleNavigate"
    />
    <ReflectionsReview 
      v-else-if="currentPage === 'reflections'"
      @navigate="handleNavigate"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { courseStore } from './store/courseStore.js'
import Dashboard from './components/Dashboard.vue'
import ModuleReader from './components/ModuleReader.vue'
import ReflectionsReview from './components/ReflectionsReview.vue'

const currentPage = ref('dashboard')
const currentModuleId = ref(null)

const handleNavigate = (data) => {
  if (data.page === 'dashboard') {
    currentPage.value = 'dashboard'
  } else if (data.page === 'module') {
    currentPage.value = 'module'
    currentModuleId.value = data.moduleId
  } else if (data.page === 'reflections') {
    currentPage.value = 'reflections'
  }
  window.scrollTo(0, 0)
}

window.addEventListener('navigate', (e) => {
  handleNavigate(e.detail)
})

watch(() => courseStore.currentModuleId, (newId) => {
  if (newId !== null) {
    handleNavigate({ page: 'module', moduleId: newId })
  }
}, { immediate: true })
</script>
