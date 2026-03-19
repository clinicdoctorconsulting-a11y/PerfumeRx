import React from 'react'
import { Sparkles, TrendingUp, Heart, FlaskConical } from 'lucide-react'

const CSS = `
  @keyframes float {
    0%,100% { transform: translate(0,0) scale(1) }
    33%      { transform: translate(26px,-26px) scale(1.07) }
    66%      { transform: translate(-16px,16px) scale(0.94) }
  }
  @keyframes fadeIn { from { opacity:0; transform:translateY(15px) } to { opacity:1; transform:translateY(0) } }
  @keyframes typewriter { from { width: 0 } to { width: 100% } }
  .hv-fi1 { animation: fadeIn 1s ease-out forwards }
  .hv-fi2 { opacity: 0; animation: fadeIn 1s ease-out 1.4s forwards }
  .hv-tw  { display: inline-block; overflow: hidden; white-space: nowrap; animation: typewriter 2.5s steps(40) 0.5s forwards; width: 0 }
  .hv-feat { transition: transform 0.32s; cursor: pointer }
  .hv-feat:hover { transform: scale(1.025) !important }
`

export default function HomeView({ userInfo, archetype, profile, ac, setView }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#0A0A0A,#1A1612)', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* Ambient background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.13, background: 'radial-gradient(circle at 30% 40%,rgba(212,197,169,.15),transparent 50%),radial-gradient(circle at 70% 60%,rgba(212,197,169,.1),transparent 50%)', animation: 'float 20s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 30%,${ac.light},transparent 60%)`, pointerEvents: 'none' }} />

      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '92px 22px 34px' }}>
        <div className="hv-fi1" style={{ textAlign: 'center', maxWidth: '620px', width: '100%' }}>
          <div style={{ width: '1px', height: '70px', background: 'linear-gradient(180deg,transparent,#D4C5A9,transparent)', margin: '0 auto 24px' }} />

          {profile && (
            <div className="hv-fi2" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', border: `0.5px solid ${ac.accent}`, background: ac.light, color: ac.accent, fontSize: '7px', letterSpacing: '3px', textTransform: 'uppercase' }}>
                <FlaskConical size={8} />{profile.name}
              </span>
            </div>
          )}

          <p style={{ color: '#D4C5A9', letterSpacing: '5px', fontWeight: 300, fontSize: '8px', textTransform: 'uppercase', marginBottom: '22px' }}>
            {userInfo?.firstName ? `Welcome back, ${userInfo.firstName}` : 'YOUR PRESCRIPTION'}
          </p>

          <h1 style={{ fontFamily: '"Courier New",monospace', fontWeight: 400, fontSize: 'clamp(22px,5vw,44px)', color: '#E8E3DB', letterSpacing: '2px', lineHeight: 1.3, marginBottom: '30px' }}>
            <span className="hv-tw">Scents that make sense for you.</span>
          </h1>

          <div className="hv-fi2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '34px' }}>
            <div style={{ width: '32px', height: '1px', background: '#D4C5A9' }} />
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: `0.5px solid ${ac.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ac.light }}>
              <span style={{ fontFamily: 'Georgia,serif', color: ac.accent, fontSize: '15px' }}>R</span>
            </div>
            <div style={{ width: '32px', height: '1px', background: '#D4C5A9' }} />
          </div>

          <button className="hv-fi2" onClick={() => setView('discover')} style={{ color: '#E8E3DB', letterSpacing: '4px', fontSize: '8px', fontWeight: 300, textTransform: 'uppercase', background: 'transparent', border: 'none', padding: 0, textDecoration: 'underline', textDecorationColor: '#D4C5A9', textUnderlineOffset: '7px', textDecorationThickness: '0.5px', cursor: 'pointer', fontFamily: 'inherit' }}>
            Enter
          </button>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ padding: '0 22px 60px', maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
          {[
            { title: 'Discover', desc: 'Swipe through curated perfumes.',              Icon: Sparkles,   v: 'discover' },
            { title: 'For You',  desc: profile?.tagline || 'Matched to your archetype.', Icon: TrendingUp, v: 'recommendations' },
            { title: 'Collect',  desc: 'Build your fragrance wardrobe.',               Icon: Heart,      v: 'wishlist' },
          ].map(({ title, desc, Icon, v }) => (
            <div key={v} className="hv-feat" onClick={() => setView(v)} style={{ textAlign: 'center', padding: '28px 20px', background: 'rgba(212,197,169,0.02)', border: '0.5px solid rgba(212,197,169,0.08)' }}>
              <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}><Icon size={22} strokeWidth={0.8} style={{ color: ac.accent }} /></div>
              <h3 style={{ fontFamily: 'Georgia,serif', fontWeight: 300, color: '#E8E3DB', letterSpacing: '1px', fontSize: '15px', marginBottom: '8px' }}>{title}</h3>
              <p style={{ color: '#9B8E7E', fontWeight: 300, letterSpacing: '0.5px', lineHeight: 1.8, fontSize: '11px' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
