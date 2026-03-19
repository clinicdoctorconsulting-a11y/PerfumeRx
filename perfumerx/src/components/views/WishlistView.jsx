import React from 'react'
import { Heart, X } from 'lucide-react'
import { FALLBACK_IMAGES } from '../../data/perfumes.js'

export default function WishlistView({ wishlist, onRemove, setView }) {
  return (
    <div style={{ minHeight: '100vh', padding: '104px 22px 62px', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ width: '1px', height: '50px', background: 'linear-gradient(180deg,transparent,#D4C5A9,transparent)', margin: '0 auto 20px' }} />
          <p style={{ color: '#D4C5A9', letterSpacing: '5px', fontSize: '7px', textTransform: 'uppercase', marginBottom: '11px' }}>Your Collection</p>
          <h1 style={{ fontFamily: 'Georgia,serif', fontWeight: 300, fontSize: 'clamp(22px,5vw,38px)', color: '#E8E3DB', letterSpacing: '2px' }}>Saved Essences</h1>
        </div>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '62px 0' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '0.5px solid #3A3632', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
              <Heart size={17} strokeWidth={0.5} style={{ color: '#3A3632' }} />
            </div>
            <p style={{ fontFamily: 'Georgia,serif', color: '#6B6658', fontStyle: 'italic', letterSpacing: '1px', marginBottom: '26px', fontSize: '12px' }}>
              A space for cherished scents awaits
            </p>
            <button
              onClick={() => setView('discover')}
              style={{ color: '#D4C5A9', letterSpacing: '4px', fontSize: '8px', textDecoration: 'underline', textUnderlineOffset: '7px', textDecorationThickness: '0.5px', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'inherit' }}
            >
              Discover
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '32px' }}>
            {wishlist.map((p, i) => (
              <WishlistCard key={`${p.perfumeId}-${i}`} item={p} onRemove={onRemove} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function WishlistCard({ item: p, onRemove }) {
  const img = p.image || FALLBACK_IMAGES[p.family] || FALLBACK_IMAGES.Floral

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '14px', aspectRatio: '3/4', overflow: 'hidden', background: '#1A1612', position: 'relative' }}>
        <img
          src={img}
          alt={p.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, transition: 'opacity 0.6s' }}
          onMouseEnter={e => { e.target.style.opacity = '1' }}
          onMouseLeave={e => { e.target.style.opacity = '0.75' }}
        />
        <button
          onClick={() => onRemove(p.perfumeId)}
          style={{ position: 'absolute', top: '9px', right: '9px', background: 'rgba(10,10,10,0.72)', border: '0.5px solid #3A3632', color: '#9B8E7E', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
          aria-label={`Remove ${p.name}`}
        >
          <X size={9} strokeWidth={1} />
        </button>
      </div>
      <div style={{ width: '38px', height: '0.5px', background: '#D4C5A9', margin: '0 auto 10px' }} />
      <p style={{ color: '#6B6658', letterSpacing: '3px', fontSize: '6px', textTransform: 'uppercase', marginBottom: '5px' }}>{p.family}</p>
      <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 300, color: '#E8E3DB', letterSpacing: '1px', fontSize: '16px', marginBottom: '3px' }}>{p.name}</h3>
      <p style={{ color: '#9B8E7E', letterSpacing: '2px', fontSize: '9px' }}>{p.brand}</p>
    </div>
  )
}
