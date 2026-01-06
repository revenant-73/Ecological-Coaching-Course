import { reactive } from 'vue'
import { modules } from '../data/modules.js'

const STORAGE_KEY = 'ecological_coach_progress'
const PAYWALL_KEY = 'ecological_coach_paywall'

const initialState = {
  currentModuleId: null,
  progress: {},
  notes: {},
  unlockedTiers: [0, 1, 2],
  userEmail: null,
  lastPurchase: null
}

function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      return { ...initialState, ...parsed }
    } catch (e) {
      console.error('Failed to parse stored progress:', e)
      return { ...initialState }
    }
  }
  return { ...initialState }
}

function saveToStorage(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const courseStore = reactive(loadFromStorage())

export const courseActions = {
  startModule(moduleId) {
    courseStore.currentModuleId = moduleId
    if (!courseStore.progress[moduleId]) {
      courseStore.progress[moduleId] = { started: Date.now(), completed: false }
    }
    saveToStorage(courseStore)
  },

  completeModule(moduleId) {
    if (!courseStore.progress[moduleId]) {
      courseStore.progress[moduleId] = { started: Date.now(), completed: false }
    }
    courseStore.progress[moduleId].completed = true
    courseStore.progress[moduleId].completedAt = Date.now()
    saveToStorage(courseStore)
  },

  saveNotes(moduleId, notes) {
    if (!courseStore.notes[moduleId]) {
      courseStore.notes[moduleId] = {}
    }
    courseStore.notes[moduleId] = notes
    saveToStorage(courseStore)
  },

  getNotes(moduleId) {
    return courseStore.notes[moduleId] || {}
  },

  getProgress(moduleId) {
    return courseStore.progress[moduleId] || { started: null, completed: false }
  },

  getCompletionPercentage() {
    const totalModules = modules.length
    if (totalModules === 0) return 0
    const completed = Object.values(courseStore.progress).filter(p => p.completed).length
    return Math.round((completed / totalModules) * 100)
  },

  resetProgress() {
    courseStore.currentModuleId = null
    courseStore.progress = {}
    courseStore.notes = {}
    saveToStorage(courseStore)
  },

  canAccessModule(moduleId) {
    const module = modules.find(m => m.id === moduleId)
    if (!module) return false
    return courseStore.unlockedTiers.includes(module.tier)
  },

  unlockTier(tierNumber) {
    if (!courseStore.unlockedTiers.includes(tierNumber)) {
      courseStore.unlockedTiers.push(tierNumber)
      courseStore.lastPurchase = Date.now()
      saveToStorage(courseStore)
    }
  },

  unlockedTierNumbers() {
    return courseStore.unlockedTiers
  },

  isModuleLocked(moduleId) {
    return !this.canAccessModule(moduleId)
  },

  getModulesByTier(tierNumber) {
    return modules.filter(m => m.tier === tierNumber)
  },

  unlockAllTiers() {
    courseStore.unlockedTiers = [0, 1, 2]
    courseStore.lastPurchase = Date.now()
    saveToStorage(courseStore)
  },

  getTierInfo() {
    return {
      currentTiers: courseStore.unlockedTiers,
      tier0: {
        name: 'Orientation',
        duration: '10–15 min',
        price: 'Free',
        unlocked: true
      },
      tier1: {
        name: 'Foundations & Translation',
        duration: '35–45 min',
        price: 'Free (for now)',
        unlocked: courseStore.unlockedTiers.includes(1)
      },
      tier2: {
        name: 'Implementation & Mastery',
        duration: '25–35 min',
        price: 'Free (for now)',
        unlocked: courseStore.unlockedTiers.includes(2)
      }
    }
  }
}
