import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ecological Volleyball Coach',
        short_name: 'EVC',
        description: 'Design Better Games. Trust the Process. Let Players Learn.',
        theme_color: '#1a1a1a',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/Ecological-Coaching-Course/',
        start_url: '/Ecological-Coaching-Course/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23000" width="192" height="192" rx="45"/><text x="50%" y="50%" font-size="100" fill="%23fff" text-anchor="middle" dominant-baseline="middle" font-weight="bold">VC</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        navigateFallback: 'index.html'
      }
    })
  ],
  base: '/Ecological-Coaching-Course/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
