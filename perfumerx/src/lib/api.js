const BASE_URL = import.meta.env.VITE_APPS_SCRIPT_URL

export const IS_CONFIGURED =
  !!BASE_URL && BASE_URL !== 'https://script.google.com/macros/s/AKfycbxRkB04JFfl4k7cymOR007Va58u-ijvZOFKGGXYvy3xIfPKT0Apu5Hn6ZM8z3TfFONJ/exec'

/** Fire-and-forget — never blocks the UI */
export function fire(asyncFn) {
  asyncFn().catch(() => {})
}

const api = {
  async get(params) {
    const qs = new URLSearchParams(params).toString()
    const res = await fetch(`${BASE_URL}?${qs}`)
    return res.json()
  },

  async post(body) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return res.json()
  },

  // ── Users ────────────────────────────────────────────────
  saveUser: (data)        => api.post({ action: 'saveUser', data }),

  // ── Archetypes ───────────────────────────────────────────
  saveArchetype: (data)   => api.post({ action: 'saveArchetype', data }),

  // ── Wishlist ─────────────────────────────────────────────
  getWishlist: (userId)   => api.get({ action: 'getWishlist', userId }),
  saveWishlist: (data)    => api.post({ action: 'saveWishlist', data }),
  removeWishlist: (data)  => api.post({ action: 'removeWishlist', data }),

  // ── Perfumes & Recommendations ───────────────────────────
  getPerfumes: ()         => api.get({ action: 'getPerfumes' }),
  getRecommendations: (userId) => api.get({ action: 'getRecommendations', userId }),

  // ── Swipe & Click Logging ────────────────────────────────
  logSwipe: (data)        => api.post({ action: 'logSwipe', data }),
  logRecClick: (data)     => api.post({ action: 'logRecClick', data }),

  // ── Insights ─────────────────────────────────────────────
  getInsights: (userId)   => api.get({ action: 'getInsights', userId }),
}

export default api
