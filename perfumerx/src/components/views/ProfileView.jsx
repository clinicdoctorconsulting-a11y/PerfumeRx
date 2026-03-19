import React from 'react'
import { FlaskConical, BarChart2, RotateCcw } from 'lucide-react'
import { PROFILES } from '../../data/archetypes.js'
import { IS_CONFIGURED } from '../../lib/api.js'

export default function ProfileView({ userInfo, userId, archetype, profile, ac, wishlistCount, insights, onRetake }) {
  return (
    <div style={{ minHeight: '100vh', padding: '104px 22px 62px', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ width: '1px', height: '50px', background: 'linear-gradient(180deg,transparent,#D4C5A9,transparent)', margin: '0 auto 20px' }} />
          <p style={{ color: '#D4C5A9', letterSpacing: '5px', fontSize: '7px', textTransform: 'uppercase', marginBottom: '11px' }}>Your Profile</p>
          <h1 style={{ fontFamily: 'Georgia,serif', fontWeight: 300, fontSize: 'clamp(22px,5vw,38px)', color: '#E8E3DB', letterSpacing: '2px', marginBottom: '4px' }}>
            {userInfo?.firstName || 'Connoisseur'}
          </h1>
          {userInfo?.email && <p style={{ color: '#6B6658', fontSize: '10px', letterSpacing: '1px' }}>{userInfo.email}</p>}
        </div>

        {/* Archetype card */}
        {profile && (
          <div style={{ background: ac.light, border: `0.5px solid ${ac.accent}`, padding: '30px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FlaskConical size={12} style={{ color: ac.accent }} />
              <p style={{ color: ac.accent, letterSpacing: '3px', fontSize: '6px', textTransform: 'uppercase', margin: 0 }}>Your Archetype</p>
            </div>
            <h2 style={{ fontFamily: '"Courier New",monospace', fontWeight: 400, color: '#E8E3DB', fontSize: 'clamp(17px,4vw,26px)', letterSpacing: '2px', marginBottom: '4px' }}>{profile.name}</h2>
            <p style={{ color: ac.accent, fontStyle: 'italic', fontSize: '10px', letterSpacing: '0.5px', marginBottom: '16px' }}>{profile.tagline}</p>
            <p style={{ color: '#9B8E7E', fontWeight: 300, lineHeight: 1.9, fontSize: '11px', marginBottom: '20px' }}>{profile.description}</p>
            <div style={{ borderTop: `0.5px solid ${ac.accent}`, paddingTop: '14px' }}>
              <p style={{ color: '#6B6658', letterSpacing: '2px', fontSize: '6px', textTransform: 'uppercase', marginBottom: '8px' }}>Fragrances to Explore</p>
              <p style={{ color: '#9B8E7E', fontStyle: 'italic', fontSize: '10px', lineHeight: 1.8 }}>{profile.examples}</p>
            </div>
          </div>
        )}

        {/* Score breakdown */}
        {archetype?.percentages && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid #2A2622', padding: '24px', marginBottom: '18px' }}>
            <p style={{ color: '#9B8E7E', letterSpacing: '3px', fontSize: '6px', textTransform: 'uppercase', marginBottom: '16px' }}>Archetype Breakdown</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(archetype.percentages).sort((a, b) => b[1] - a[1]).map(([key, pct]) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: '#E8E3DB', fontSize: '10px', fontWeight: 300, letterSpacing: '1px' }}>{PROFILES[key].name}</span>
                    <span style={{ color: '#D4C5A9', fontSize: '9px', letterSpacing: '2px' }}>{pct}%</span>
                  </div>
                  <div style={{ height: '1px', background: '#2A2622' }}>
                    <div style={{ height: '1px', background: key === archetype.primary ? ac.accent : '#3A3632', width: `${pct}%`, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Swipe insights (only when Sheets connected) */}
        {insights && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid #2A2622', padding: '24px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BarChart2 size={12} style={{ color: '#9B8E7E' }} />
              <p style={{ color: '#9B8E7E', letterSpacing: '3px', fontSize: '6px', textTransform: 'uppercase', margin: 0 }}>Your Swipe Insights</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '18px', textAlign: 'center' }}>
              {[['Total Swipes', insights.totalSwipes], ['Saved', insights.rightSwipes], ['Your CTR', `${Math.round(insights.overallCTR * 100)}%`]].map(([label, val]) => (
                <div key={label} style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid #2A2622' }}>
                  <p style={{ color: ac.accent, fontFamily: 'Georgia,serif', fontSize: '22px', fontWeight: 300, marginBottom: '5px' }}>{val}</p>
                  <p style={{ color: '#6B6658', fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </div>
            {insights.topFamilies?.length > 0 && (
              <div>
                <p style={{ color: '#6B6658', letterSpacing: '2px', fontSize: '6px', textTransform: 'uppercase', marginBottom: '10px' }}>Families You Love</p>
                {insights.topFamilies.slice(0, 3).map(f => (
                  <div key={f.family} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#E8E3DB', fontSize: '10px', fontWeight: 300 }}>{f.family}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '1px', background: '#2A2622' }}>
                        <div style={{ height: '1px', background: ac.accent, width: `${Math.round(f.ctr * 100)}%`, transition: 'width 0.5s' }} />
                      </div>
                      <span style={{ color: '#9B8E7E', fontSize: '8px', letterSpacing: '1px', width: '28px' }}>{Math.round(f.ctr * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats row */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid #2A2622', padding: '18px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#9B8E7E', fontSize: '10px', letterSpacing: '1px', marginBottom: '2px' }}>Wishlist</p>
            <p style={{ color: '#E8E3DB', fontFamily: 'Georgia,serif', fontSize: '22px', fontWeight: 300 }}>{wishlistCount}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#9B8E7E', fontSize: '10px', letterSpacing: '1px', marginBottom: '2px' }}>Sheets</p>
            <p style={{ color: IS_CONFIGURED ? ac.accent : '#C47B4A', fontSize: '10px', letterSpacing: '1px' }}>
              {IS_CONFIGURED ? 'Connected' : 'Offline'}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#9B8E7E', fontSize: '10px', letterSpacing: '1px', marginBottom: '2px' }}>User ID</p>
            <p style={{ color: '#3A3632', fontSize: '8px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userId}</p>
          </div>
        </div>

        {/* Retake quiz */}
        <div style={{ textAlign: 'center', paddingTop: '22px', borderTop: '0.5px solid #2A2622' }}>
          <p style={{ color: '#6B6658', fontSize: '10px', letterSpacing: '1px', marginBottom: '14px', fontStyle: 'italic' }}>Want to reassess your preferences?</p>
          <button
            onClick={onRetake}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9B8E7E', fontSize: '7px', letterSpacing: '3px', textTransform: 'uppercase', background: 'none', border: '0.5px solid #3A3632', padding: '9px 18px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4C5A9'; e.currentTarget.style.color = '#E8E3DB' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A3632'; e.currentTarget.style.color = '#9B8E7E' }}
          >
            <RotateCcw size={9} /> Retake Quiz
          </button>
        </div>

      </div>
    </div>
  )
}
