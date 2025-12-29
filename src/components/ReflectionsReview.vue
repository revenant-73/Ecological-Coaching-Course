<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 sm:p-8 animate-fade-in">
    <div class="max-w-4xl mx-auto">
      <button
        @click="goBack"
        class="flex items-center gap-2 text-gray-400 hover:text-accent-orange mb-8 transition-all duration-300 text-sm sm:text-base group"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="group-hover:text-accent-orange transition-colors">Back to Dashboard</span>
      </button>

      <div class="mb-12">
        <h1 class="text-5xl sm:text-6xl font-black mb-3 text-white">Your Reflections</h1>
        <p class="text-gray-300 text-lg sm:text-xl">Review and export your learning journey</p>
      </div>

      <div v-if="hasAnyReflections" class="space-y-8">
        <div v-for="module in modules" :key="module.id" class="space-y-6">
          <div v-if="getModuleReflections(module.id).length > 0" class="group relative animate-fade-in-up">
            <div class="absolute inset-0 bg-accent-teal-light/10 rounded-2xl blur-xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div class="relative bg-gray-800 backdrop-blur-xl rounded-2xl border border-gray-700 hover:border-accent-teal-light p-8 sm:p-10 transition-all duration-500">
              <div class="mb-8 pb-6 border-b border-gray-700">
                <div class="inline-block px-3 py-1 bg-accent-teal rounded-full mb-3 border border-accent-teal">
                  <span class="text-white text-xs font-bold uppercase tracking-widest">Module {{ module.number }}</span>
                </div>
                <h2 class="text-3xl font-bold text-white">{{ module.title }}</h2>
              </div>

              <div class="space-y-8">
                <div v-for="(reflection, idx) in getModuleReflections(module.id)" :key="idx" class="space-y-5">
                  <h3 class="text-xl font-bold text-accent-teal-light flex items-center gap-2">
                    <span>✍️</span>
                    {{ reflection.title }}
                  </h3>
                  
                  <div v-for="(answer, promptIdx) in reflection.answers" :key="promptIdx" class="space-y-3 ml-2">
                    <p class="text-gray-300 font-semibold text-base">{{ reflection.prompts[promptIdx] }}</p>
                    <p v-if="answer" class="text-gray-200 text-base leading-relaxed bg-gray-700 rounded-lg p-4 border-l-4 border-accent-teal-light">
                      {{ answer }}
                    </p>
                    <p v-else class="text-gray-500 text-base italic">No response entered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="exportMarkdown"
            class="group flex-1 relative overflow-hidden bg-accent-teal-light hover:bg-accent-teal text-white font-bold py-4 px-8 rounded-xl transition-all text-base sm:text-lg shadow-lg hover:shadow-2xl border border-accent-teal-light hover:border-accent-teal flex items-center justify-center gap-2"
          >
            <div class="absolute inset-0 bg-white/10 group-hover:animate-shimmer" style="background-size: 1000px 100%; animation: shimmer 2s infinite;"></div>
            <span class="relative flex items-center gap-2">
              📥 Export as Markdown
            </span>
          </button>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <p class="text-gray-400 text-lg mb-6">No reflections yet.</p>
        <p class="text-gray-500">Complete modules and answer reflection prompts to see them here.</p>
      </div>

      <button
        @click="goBack"
        class="w-full text-slate-400 hover:text-slate-200 py-4 transition-all text-sm sm:text-base group mt-12"
      >
        <span class="group-hover:text-blue-300 transition-colors">← Back to Dashboard</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { modules } from '../data/modules.js'
import { courseActions } from '../store/courseStore.js'

const emit = defineEmits(['navigate'])

const goBack = () => {
  emit('navigate', { page: 'dashboard' })
}

const getModuleReflections = (moduleId) => {
  const module = modules.find(m => m.id === moduleId)
  if (!module) return []

  const notes = courseActions.getNotes(moduleId)
  const reflections = []

  module.sections.forEach(section => {
    if (section.type === 'reflection') {
      const key = `reflection_${section.title}`
      const answers = notes[key] || []
      reflections.push({
        title: section.title,
        prompts: section.prompts,
        answers: Array.isArray(answers) ? answers : []
      })
    }
  })

  return reflections
}

const hasAnyReflections = computed(() => {
  return modules.some(module => getModuleReflections(module.id).length > 0)
})

const exportMarkdown = () => {
  let markdown = '# My Ecological Coaching Reflections\n\n'
  markdown += `Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n`

  modules.forEach(module => {
    const reflections = getModuleReflections(module.id)
    if (reflections.length > 0) {
      markdown += `## Module ${module.number}: ${module.title}\n\n`

      reflections.forEach(reflection => {
        markdown += `### ${reflection.title}\n\n`
        reflection.prompts.forEach((prompt, idx) => {
          markdown += `**${prompt}**\n\n`
          const answer = reflection.answers[idx] || '(No response entered)'
          markdown += `${answer}\n\n`
        })
      })
    }
  })

  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ecological-coaching-reflections-${new Date().toISOString().split('T')[0]}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
