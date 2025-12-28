---
description: Repository Information Overview
alwaysApply: true
---

# Ecological Coaching Course Information

## Summary
A Vue.js 3 single-page application designed to deliver an ecological volleyball coaching curriculum. The app features a dashboard for browsing course modules and a module reader for consuming course content. It includes PWA (Progressive Web App) support for offline access and responsive design via Tailwind CSS.

## Structure
- **src/**: Application source code
  - **components/**: Vue components (Dashboard, ModuleReader, ModuleCard, TierCard)
  - **data/**: JSON-like data files (modules.js, artifacts.js containing course content)
  - **store/**: State management (courseStore.js)
  - **App.vue**: Root component with routing logic
  - **main.js**: Vue application entry point
  - **style.css**: Global styles
- **index.html**: HTML entry point
- **Configuration files**: vite.config.js, tailwind.config.js, postcss.config.js

## Language & Runtime
**Language**: JavaScript (ES Module)  
**Runtime**: Node.js (for development/build)  
**Framework**: Vue.js 3.5.26  
**Build System**: Vite 7.3.0  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- vue (^3.5.26) - Progressive JavaScript framework

**Development Dependencies**:
- @tailwindcss/postcss (^4.1.18) - Tailwind CSS PostCSS plugin
- @vitejs/plugin-vue (^6.0.3) - Vue plugin for Vite
- autoprefixer (^10.4.23) - PostCSS plugin for vendor prefixes
- postcss (^8.5.6) - CSS transformation tool
- tailwindcss (^4.1.18) - Utility-first CSS framework
- vite (^7.3.0) - Frontend build tool
- vite-plugin-pwa (^1.2.0) - PWA support with Service Workers

## Build & Installation
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Build Output
**Output Directory**: `dist/`  
**Build Configuration**: Vite production build with sourcemap disabled

## Main Files & Resources
**Entry Points**:
- `index.html` - HTML entry point
- `src/main.js` - Vue application initialization and PWA registration
- `src/App.vue` - Root component managing page navigation

**Core Components**:
- `src/components/Dashboard.vue` - Main landing page with module listing
- `src/components/ModuleReader.vue` - Module content viewer
- `src/components/ModuleCard.vue` - Individual module preview
- `src/components/TierCard.vue` - Tier/section display component

**State Management**:
- `src/store/courseStore.js` - Centralized course state store

**Content Data**:
- `src/data/modules.js` - Course module definitions (28.15 KB)
- `src/data/artifacts.js` - Course artifacts and reference materials (28.79 KB)

## PWA Configuration
**Features**:
- Auto-updating service workers
- Offline caching strategy with runtime caching for Google Fonts
- Manifest configuration with app metadata and SVG icons
- Base path: `/Ecological-Coaching-Course/`

**Manifest Details**:
- Name: "Ecological Volleyball Coach"
- Short name: "EVC"
- Theme color: #1a1a1a (dark)
- Standalone display mode
