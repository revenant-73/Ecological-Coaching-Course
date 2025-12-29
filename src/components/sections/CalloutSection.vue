<template>
  <div class="group relative animate-fade-in-up">
    <div class="absolute inset-0 bg-accent-orange/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    <div class="relative bg-gray-800 border border-accent-orange group-hover:border-accent-orange backdrop-blur-sm p-6 sm:p-8 rounded-xl transition-all duration-500">
      <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <span class="text-2xl">💡</span> 
        <span class="text-accent-orange">{{ section.title }}</span>
      </h3>
      <div class="text-gray-200 text-lg sm:text-xl whitespace-pre-wrap leading-snug space-y-2">
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
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-accent-orange">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/>(.*?)$/gm, '<blockquote class="border-l-2 border-accent-orange pl-3 my-1 text-gray-300 italic">$1</blockquote>')
      
      if (line.startsWith('- ')) {
        return `<li class="ml-4 my-0">${line.replace(/^- /, '')}</li>`
      }
      return line ? `<p class="mb-2">${line}</p>` : '<br>'
    })
    .join('')
    .replace(/(<li.*?<\/li>)/gs, '<ul class="list-disc pl-4 my-2">$1</ul>')
    .replace(/(<\/ul>)<p/g, '$1<p')
    .replace(/(<\/ul><br><ul>)/g, '')
}
</script>
