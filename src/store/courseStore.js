import { reactive } from 'vue'

const STORAGE_KEY = 'ecological_coach_progress'

const initialState = {
  currentModuleId: null,
  progress: {},
  notes: {}
}

function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse stored progress:', e)
      return initialState
    }
  }
  return initialState
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
    const totalModules = Object.keys(courseStore.progress).length
    if (totalModules === 0) return 0
    const completed = Object.values(courseStore.progress).filter(p => p.completed).length
    return Math.round((completed / 9) * 100)
  },

  resetProgress() {
    courseStore.currentModuleId = null
    courseStore.progress = {}
    courseStore.notes = {}
    saveToStorage(courseStore)
  }
}
