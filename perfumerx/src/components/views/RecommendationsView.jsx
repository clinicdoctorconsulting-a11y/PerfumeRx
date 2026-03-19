import React from 'react'
import { Loader, AlertCircle } from 'lucide-react'
import { IS_CONFIGURED } from '../../lib/api.js'

const CSS = `@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`

export default function RecommendationsView({ recs, loading, profile, ac, onExplore, setView }) {
  return (
    <div style={{ minHeight: '100vh', padding: '104px 22px 62px', background: '#0A0A0A' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ width: '1px', height: '50px', background: 'linear-gradient(180deg,transparent,#D4C5A9,transparent)', margin: '0 auto 20px' }} />
          <p style={{ color: '#D4C5A9', letterSpacing: '5px', fontSize: '7px', textTransform: 'uppercase', marginBottom: '11px' }}>Curated For You</p>
          <h1 style={{ fontFamily: 'Georgia,serif', fontWeight: 300, fontSize: 'clamp(22px,5vw,38px)', color: '#E8E3DB', letterSpacing: '2px', marginBottom: '8px' }}>Your Prescription</h1>
          {profile && <p style={{ color: ac.accent, fontSize: '11px', fontStyle: 'italic', letterSpacing: '0.5px' }}>Based on your {profile.name} archetype</p>}
        </div>

        {/* States */}
        {!IS_CONFIGURED && (
          <div style={{ textAlign: 'center', padding: '56px 0' }}>
            <AlertCircle size={28} style={{ color: '#C47B4A', margin: '0 auto 14px', display: 'block' }} />
            <p style={{ color: '#9B8E7E', fontSize: '12px', letterSpacing: '1px', marginBottom: '7px' }}>Google Sheets not connected yet.</p>
            <p style={{ color: '#6B6658', fontSize: '10px' }}>Add your <code style={{ color: '#D4C5A9' }}>VITE_APPS_SCRIPT_URL</code> in Netlify environment variables.</p>
          </div>
        )}

        {IS_CONFIGURED && loading && (
          <div style={{ textAlign: 'center', padding: '56px 0' }}>
            <Loader size={18} style={{ color: '#9B8E7E', margin: '0 auto 12px', display: 'block', animation: 'spin 1.5s linear infinite' }} />
            <p style={{ color: '#6B6658', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Analyzing your profile…</p>
          </div>
        )}

        {IS_CONFIGURED && !loading && recs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '56px 0' }}>
            <p style={{ color: '#9B8E7E', fontSize: '12px', fontStyle: 'italic', marginBottom: '18px' }}>
              Swipe some perfumes first to help the algorithm learn your preferences.
            </p>
            <button onClick={() => setView('discover')} style={{ color: ac.accent, fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: '5px' }}>
              Start Discovering
            </button>
          </div>
        )}

        {IS_CONFIGURED && !loading && recs.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '28px' }}>
            {recs.map((p, i) => (
              <RecCard key={p.perfumeId || i} perfume={p} ac={ac} onExplore={onExplore} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function RecCard({ perfume: p, ac, onExplore }) {
  return (
    <div
      style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid #2A2622', padding: '22px', transition: 'border-color 0.25s', cursor: 'default' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = ac.accent}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2622'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <p style={{ color: '#6B6658', letterSpacing: '2px', fontSize: '6px', textTransform: 'uppercase', margin: 0 }}>{p.family}</p>
        {p.recommendationScore >= 7 && (
          <span style={{ color: ac.accent, fontSize: '6px', letterSpacing: '2px', textTransform: 'uppercase', border: `0.5px solid ${ac.accent}`, padding: '2px 6px' }}>Top Pick</span>
        )}
      </div>
      <h3 style={{ fontFamily: 'Georgia,serif', color: '#E8E3DB', fontWeight: 300, fontSize: '18px', letterSpacing: '1px', marginBottom: '3px' }}>{p.name}</h3>
      <p style={{ color: '#9B8E7E', fontSize: '10px', letterSpacing: '1px', marginBottom: '11px' }}>{p.brand}</p>
      <p style={{ color: '#6B6658', fontSize: '10px', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '16px' }}>{p.quote}</p>
      <div style={{ borderTop: '0.5px solid #2A2622', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#6B6658', fontSize: '8px', letterSpacing: '1px' }}>{p.season} · {p.longevity}</span>
        <button
          onClick={() => onExplore(p.perfumeId, p.name)}
          style={{ color: ac.accent, fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Explore →
        </button>
      </div>
    </div>
  )
}
