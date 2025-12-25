<template>
  <div class="group relative animate-fade-in-up">
    <div class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    <div class="relative bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/30 group-hover:border-purple-500/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl transition-all duration-500">
      <h3 class="text-2xl font-bold text-purple-200 mb-5 flex items-center gap-3">
        <span class="text-2xl">💡</span> 
        <span class="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{{ section.title }}</span>
      </h3>
      <div class="text-slate-200 text-lg sm:text-xl whitespace-pre-wrap leading-relaxed space-y-3">
        <div v-html="renderMarkdown(section.content)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  section: {
    type: Object,
    required: true
  }
})

const renderMarkdown = (text) => {
  return text
    .split('\n')
    .map(line => {
      line = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-purple-300">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/>(.*?)$/gm, '<blockquote class="border-l-2 border-purple-400 pl-3 my-3 text-slate-300 italic">$1</blockquote>')
      
      if (line.startsWith('- ')) {
        return `<li class="ml-4 my-1">${line.replace(/^- /, '')}</li>`
      }
      return line ? `<p class="mb-3">${line}</p>` : '<br>'
    })
    .join('')
    .replace(/(<li.*?<\/li>)/gs, '<ul class="list-disc pl-4 my-4">$1</ul>')
    .replace(/(<\/ul>)<p/g, '$1<p')
    .replace(/(<\/ul><br><ul>)/g, '')
}
</script>
