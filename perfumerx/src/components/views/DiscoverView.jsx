import React from 'react'
import { Heart, X } from 'lucide-react'

const CSS = `
  @keyframes swipeRight { from { transform: translateX(0) rotate(0deg); opacity: 1 } to { transform: translateX(110%) rotate(6deg); opacity: 0 } }
  @keyframes swipeLeft  { from { transform: translateX(0) rotate(0deg); opacity: 1 } to { transform: translateX(-110%) rotate(-6deg); opacity: 0 } }
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
  .dv-swipe-right { animation: swipeRight 0.38s cubic-bezier(.25,.46,.45,.94) forwards }
  .dv-swipe-left  { animation: swipeLeft  0.38s cubic-bezier(.25,.46,.45,.94) forwards }
  .dv-action:hover { opacity: 0.8 }
`

export default function DiscoverView({ deck, swipeIndex, swipeDir, syncStatus, archetype, ac, onSwipe }) {
  const current = deck[swipeIndex % deck.length]
  if (!current) return null

  const notes = (val) => Array.isArray(val) ? val.join(' · ') : String(val || '').split(',').map(s => s.trim()).join(' · ')
  const isMatch = current.archetypes?.includes?.(archetype?.primary)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '84px 14px 22px', background: 'linear-gradient(180deg,#0A0A0A,#1A1612)' }}>
      <style>{CSS}</style>
      <div style={{ width: '100%', maxWidth: '510px' }}>

        {/* Sync status pill */}
        <div style={{ textAlign: 'center', marginBottom: '10px', height: '16px' }}>
          {syncStatus === 'syncing' && <span style={{ color: '#9B8E7E', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', animation: 'pulse 1.5s ease-in-out infinite' }}>Saving…</span>}
          {syncStatus === 'done'    && <span style={{ color: ac.accent,  fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>✓ Saved</span>}
          {syncStatus === 'error'   && <span style={{ color: '#C47B4A', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>⚠ Saved locally only</span>}
        </div>

        {/* Card */}
        <div
          className={swipeDir === 'right' ? 'dv-swipe-right' : swipeDir === 'left' ? 'dv-swipe-left' : ''}
          style={{ background: 'linear-gradient(180deg,#C9BFB3,#B8ADA0)', minHeight: '76vh', padding: '38px 28px', position: 'relative' }}
        >
          {/* Centre divider */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '0.5px', background: 'rgba(255,255,255,0.11)', transform: 'translateX(-50%)' }} />

          {/* Match badge */}
          {isMatch && (
            <div style={{ position: 'absolute', top: '13px', right: '13px', padding: '3px 8px', background: ac.light, border: `0.5px solid ${ac.accent}` }}>
              <span style={{ color: ac.accent, fontSize: '6px', letterSpacing: '2px', textTransform: 'uppercase' }}>Matched for you</span>
            </div>
          )}

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <p style={{ color: 'rgba(0,0,0,0.36)', letterSpacing: '4px', fontSize: '6px', textTransform: 'uppercase', marginBottom: '14px' }}>{current.family}</p>
            <h2 style={{ fontFamily: 'Georgia,serif', fontWeight: 300, fontSize: 'clamp(22px,5vw,34px)', color: '#1A1612', letterSpacing: '2px', lineHeight: 1.2, marginBottom: '5px' }}>{current.name}</h2>
            <p style={{ color: 'rgba(0,0,0,0.46)', letterSpacing: '3px', fontSize: '8px', textTransform: 'uppercase', fontWeight: 300 }}>{current.brand}</p>
          </div>

          {/* Quote + description */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <p style={{ color: '#1A1612', fontWeight: 300, lineHeight: 2, fontStyle: 'italic', fontSize: '11px', marginBottom: '10px' }}>{current.quote}</p>
            <p style={{ color: 'rgba(0,0,0,0.53)', fontWeight: 300, lineHeight: 1.8, fontSize: '10px' }}>{current.description}</p>
          </div>

          {/* Notes grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '22px', textAlign: 'center' }}>
            {[['Top', current.topNotes], ['Heart', current.middleNotes], ['Base', current.baseNotes]].map(([label, val]) => (
              <div key={label}>
                <div style={{ width: '100%', height: '0.5px', background: 'rgba(0,0,0,0.13)', marginBottom: '8px' }} />
                <p style={{ color: 'rgba(0,0,0,0.36)', letterSpacing: '2px', fontSize: '6px', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</p>
                <p style={{ color: '#1A1612', fontWeight: 300, fontSize: '9px' }}>{notes(val)}</p>
              </div>
            ))}
          </div>

          {/* Counter */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '0.5px solid rgba(0,0,0,0.17)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Georgia,serif', fontSize: '6px', color: 'rgba(0,0,0,0.28)', letterSpacing: '8px', marginLeft: '4px' }}>· R ·</span>
            </div>
            <p style={{ color: 'rgba(0,0,0,0.24)', letterSpacing: '2px', fontSize: '9px' }}>{(swipeIndex % deck.length) + 1} of {deck.length}</p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {[['left', X, 'rgba(255,255,255,0.28)'], ['right', Heart, 'rgba(0,0,0,0.05)']].map(([dir, Icon, bg]) => (
              <button
                key={dir}
                className="dv-action"
                onClick={() => onSwipe(dir)}
                style={{ width: '42px', height: '42px', borderRadius: '50%', border: '0.5px solid rgba(0,0,0,0.14)', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                <Icon size={13} strokeWidth={0.8} style={{ color: '#1A1612' }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
