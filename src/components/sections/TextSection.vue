<template>
  <div class="animate-fade-in-up">
    <div class="max-w-none text-gray-200 text-lg sm:text-xl leading-relaxed whitespace-pre-wrap space-y-4">
      <div v-html="renderMarkdown(section.content)"></div>
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
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>')
        .replace(/>(.*?)$/gm, '<blockquote class="border-l-4 border-accent-orange pl-4 my-3 text-gray-300 italic">$1</blockquote>')
      
      if (line.startsWith('- ')) {
        return `<li class="ml-4">${line.replace(/^- /, '')}</li>`
      }
      return line ? `<p class="mb-4">${line}</p>` : '<br>'
    })
    .join('')
    .replace(/(<li.*?<\/li>)/gs, '<ul class="list-disc pl-4 my-4">$1</ul>')
    .replace(/(<\/ul>)<p/g, '$1<p')
    .replace(/(<\/ul><br><ul>)/g, '')
}
</script>
