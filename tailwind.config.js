/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#ffffff',
        accent: {
          orange: '#FF6B35',
          teal: '#0F766E',
          'teal-light': '#14B8A6',
          blue: '#0EA5E9',
          lime: '#22C55E',
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
