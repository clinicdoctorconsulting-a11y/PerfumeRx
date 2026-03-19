import React, { useState, useEffect, useRef } from 'react'

import Splash      from './components/Splash.jsx'
import QuizFlow    from './components/QuizFlow.jsx'
import Nav         from './components/Nav.jsx'
import HomeView    from './components/views/HomeView.jsx'
import DiscoverView        from './components/views/DiscoverView.jsx'
import RecommendationsView from './components/views/RecommendationsView.jsx'
import WishlistView        from './components/views/WishlistView.jsx'
import ProfileView         from './components/views/ProfileView.jsx'

import { storage, SESSION_ID } from './lib/storage.js'
import api, { IS_CONFIGURED, fire } from './lib/api.js'
import { PROFILES, getColors } from './data/archetypes.js'
import { FALLBACK_PERFUMES, FALLBACK_IMAGES } from './data/perfumes.js'

// ── Local-storage keys ────────────────────────────────────────
const SK = {
  ARCHETYPE: 'archetype',
  USER:      'user',
  USERID:    'userId',
}

// ── Generate a stable user ID ─────────────────────────────────
function makeUserId() {
  return 'u_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5)
}

export default function App() {
  // App-level state
  const [appState,  setAppState]  = useState('loading') // 'loading' | 'quiz' | 'app'
  const [view,      setView]      = useState('home')

  // User / archetype
  const [archetype, setArchetype] = useState(null)
  const [userInfo,  setUserInfo]  = useState(null)
  const [userId,    setUserId]    = useState(null)

  // Perfume catalog (from Sheets; falls back to static data)
  const [perfumes,  setPerfumes]  = useState([])

  // Discover deck state
  const [swipeIndex, setSwipeIndex] = useState(0)
  const [swipeDir,   setSwipeDir]   = useState(null)
  const [syncStatus, setSyncStatus] = useState('idle') // 'idle' | 'syncing' | 'done' | 'error'

  // Wishlist
  const [wishlist, setWishlist] = useState([])

  // Recommendations
  const [recs,        setRecs]        = useState([])
  const [loadingRecs, setLoadingRecs] = useState(false)

  // Profile insights
  const [insights, setInsights] = useState(null)

  // Stable session ID for swipe grouping
  const sessionId = useRef(SESSION_ID)

  // ── Boot: check local storage ───────────────────────────────
  useEffect(() => {
    ;(async () => {
      const [a, u, uid] = await Promise.all([
        storage.get(SK.ARCHETYPE),
        storage.get(SK.USER),
        storage.get(SK.USERID),
      ])
      if (a && u && uid) {
        setArchetype(JSON.parse(a.value))
        setUserInfo(JSON.parse(u.value))
        setUserId(JSON.parse(uid.value))
        setAppState('app')
      } else {
        setAppState('quiz')
      }
    })()
  }, [])

  // ── Load Sheets catalog once app state is ready ─────────────
  useEffect(() => {
    if (appState !== 'app' || !IS_CONFIGURED) return
    fire(async () => {
      const res = await api.getPerfumes()
      if (res.perfumes?.length) setPerfumes(res.perfumes)
    })
  }, [appState])

  // ── Load wishlist from Sheets once userId is set ─────────────
  useEffect(() => {
    if (!IS_CONFIGURED || !userId) return
    fire(async () => {
      const res = await api.getWishlist(userId)
      if (res.items) {
        setWishlist(res.items.map(i => ({
          perfumeId: i.perfumeId,
          name:      i.perfumeName || i.name,
          brand:     i.brand,
          family:    i.family,
          image:     FALLBACK_IMAGES[i.family] || FALLBACK_IMAGES.Floral,
        })))
      }
    })
  }, [userId])

  // ── Load recs when "For You" tab opens ───────────────────────
  useEffect(() => {
    if (view !== 'recommendations' || !IS_CONFIGURED || !userId) return
    setLoadingRecs(true)
    setRecs([])
    fire(async () => {
      const res = await api.getRecommendations(userId)
      if (res.recommendations) setRecs(res.recommendations)
      setLoadingRecs(false)
    })
  }, [view, userId])

  // ── Load insights when Profile tab opens ────────────────────
  useEffect(() => {
    if (view !== 'profile' || !IS_CONFIGURED || !userId || insights) return
    fire(async () => {
      const res = await api.getInsights(userId)
      if (res.totalSwipes !== undefined) setInsights(res)
    })
  }, [view, userId])

  // ── Quiz complete ────────────────────────────────────────────
  async function handleQuizComplete(archetypeResult, userData) {
    const uid = makeUserId()
    setArchetype(archetypeResult)
    setUserInfo(userData)
    setUserId(uid)

    await Promise.all([
      storage.set(SK.ARCHETYPE, JSON.stringify(archetypeResult)),
      storage.set(SK.USER,      JSON.stringify(userData)),
      storage.set(SK.USERID,    JSON.stringify(uid)),
    ])

    if (IS_CONFIGURED) {
      fire(() => Promise.all([
        api.saveUser({ ...userData, userId: uid }),
        api.saveArchetype({ ...archetypeResult, userId: uid }),
      ]))
      fire(async () => {
        const res = await api.getPerfumes()
        if (res.perfumes?.length) setPerfumes(res.perfumes)
      })
    }

    setAppState('app')
    setView('home')
  }

  // ── Retake quiz ──────────────────────────────────────────────
  async function handleRetake() {
    await Promise.all([
      storage.delete(SK.ARCHETYPE),
      storage.delete(SK.USER),
      storage.delete(SK.USERID),
    ])
    setArchetype(null)
    setUserInfo(null)
    setUserId(null)
    setWishlist([])
    setRecs([])
    setInsights(null)
    setSwipeIndex(0)
    setAppState('quiz')
  }

  // ── Swipe ────────────────────────────────────────────────────
  const deck    = perfumes.length > 0 ? perfumes : FALLBACK_PERFUMES
  const current = deck[swipeIndex % deck.length]

  async function handleSwipe(dir) {
    if (!current) return
    setSwipeDir(dir)

    const pid = current.perfumeId || String(current.id)

    // Log swipe to Sheets (fire-and-forget)
    if (IS_CONFIGURED && userId) {
      fire(() => api.logSwipe({
        userId,
        perfumeId:   pid,
        perfumeName: current.name,
        family:      current.family,
        archetypes:  current.archetypes,
        direction:   dir,
        sessionId:   sessionId.current,
      }))
    }

    // Right swipe = save to wishlist
    if (dir === 'right') {
      const already = wishlist.find(w => w.perfumeId === pid)
      if (!already) {
        const entry = {
          perfumeId: pid,
          name:      current.name,
          brand:     current.brand,
          family:    current.family,
          image:     current.image || FALLBACK_IMAGES[current.family] || FALLBACK_IMAGES.Floral,
        }
        setWishlist(w => [...w, entry])

        if (IS_CONFIGURED && userId) {
          setSyncStatus('syncing')
          fire(async () => {
            try {
              await api.saveWishlist({
                userId,
                perfumeId:   pid,
                perfumeName: current.name,
                brand:       current.brand,
                family:      current.family,
              })
              setSyncStatus('done')
              setTimeout(() => setSyncStatus('idle'), 2000)
            } catch {
              setSyncStatus('error')
              setTimeout(() => setSyncStatus('idle'), 3000)
            }
          })
        }
      }
    }

    // Advance deck after animation
    setTimeout(() => {
      setSwipeDir(null)
      setSwipeIndex(i => i + 1)
    }, 380)
  }

  // ── Remove from wishlist ─────────────────────────────────────
  function handleRemoveWishlist(pid) {
    setWishlist(w => w.filter(p => p.perfumeId !== pid))
    if (IS_CONFIGURED && userId) {
      fire(() => api.removeWishlist({ userId, perfumeId: pid }))
    }
  }

  // ── Rec click ────────────────────────────────────────────────
  function handleRecClick(pid) {
    if (IS_CONFIGURED && userId) {
      fire(() => api.logRecClick({ userId, perfumeId: pid }))
    }
    setView('discover')
  }

  // ── Derived ──────────────────────────────────────────────────
  const ac      = getColors(archetype?.primary)
  const profile = PROFILES[archetype?.primary]

  // ── Render ───────────────────────────────────────────────────
  if (appState === 'loading') return <Splash />
  if (appState === 'quiz')    return <QuizFlow onComplete={handleQuizComplete} />

  return (
    <>
      <Nav view={view} setView={setView} wishlistCount={wishlist.length} />

      {view === 'home' && (
        <HomeView
          userInfo={userInfo}
          archetype={archetype}
          profile={profile}
          ac={ac}
          setView={setView}
        />
      )}

      {view === 'discover' && (
        <DiscoverView
          deck={deck}
          swipeIndex={swipeIndex}
          swipeDir={swipeDir}
          syncStatus={syncStatus}
          archetype={archetype}
          ac={ac}
          onSwipe={handleSwipe}
        />
      )}

      {view === 'recommendations' && (
        <RecommendationsView
          recs={recs}
          loading={loadingRecs}
          profile={profile}
          ac={ac}
          onExplore={handleRecClick}
          setView={setView}
        />
      )}

      {view === 'wishlist' && (
        <WishlistView
          wishlist={wishlist}
          onRemove={handleRemoveWishlist}
          setView={setView}
        />
      )}

      {view === 'profile' && (
        <ProfileView
          userInfo={userInfo}
          userId={userId}
          archetype={archetype}
          profile={profile}
          ac={ac}
          wishlistCount={wishlist.length}
          insights={insights}
          onRetake={handleRetake}
        />
      )}
    </>
  )
}
