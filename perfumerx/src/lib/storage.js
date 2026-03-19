/**
 * Thin localStorage wrapper that mirrors the window.storage async API
 * used in the Claude artifact version, so the rest of the app is unchanged.
 */

const PREFIX = 'perfumerx:'

export const storage = {
  async get(key) {
    try {
      const val = localStorage.getItem(PREFIX + key)
      if (val === null) return null
      return { key, value: val }
    } catch {
      return null
    }
  },

  async set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, value)
      return { key, value }
    } catch {
      return null
    }
  },

  async delete(key) {
    try {
      localStorage.removeItem(PREFIX + key)
      return { key, deleted: true }
    } catch {
      return null
    }
  },
}

// Session-scoped ID (survives re-renders, resets on tab close)
export const SESSION_ID = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5)
