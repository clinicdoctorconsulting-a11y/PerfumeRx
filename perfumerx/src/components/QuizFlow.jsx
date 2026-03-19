import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { questions, computeArchetype } from '../data/quiz.js'

const CSS = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
  @keyframes slideIn { from { opacity:0; transform:translateX(14px) } to { opacity:1; transform:translateX(0) } }
  @keyframes slideOut { from { opacity:1; transform:translateX(0) } to { opacity:0; transform:translateX(-18px) } }
  .qz-fadeup  { animation: fadeUp  0.8s ease-out forwards }
  .qz-in      { animation: slideIn 0.32s ease-out forwards }
  .qz-out     { animation: slideOut 0.28s ease-in  forwards }
  .qz-input {
    background: #111; border: 0.5px solid #3A3632; color: #E8E3DB;
    padding: 13px 15px; width: 100%; outline: none; font-weight: 300;
    font-size: 13px; letter-spacing: 0.5px; transition: border-color 0.3s;
    font-family: inherit; box-sizing: border-box; appearance: none;
  }
  .qz-input:focus  { border-color: #D4C5A9 }
  .qz-input::placeholder { color: #6B6658 }
  .qz-opt {
    width: 100%; text-align: left; padding: 15px 19px;
    border: 0.5px solid #2A2622; background: transparent; color: #9B8E7E;
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center;
    justify-content: space-between; font-weight: 300; font-size: 13px;
    letter-spacing: 0.5px; line-height: 1.5; font-family: inherit;
  }
  .qz-opt:hover  { border-color: #D4C5A9; color: #E8E3DB; background: rgba(212,197,169,0.04) }
  .qz-btn {
    padding: 13px 34px; background: transparent; border: 0.5px solid #D4C5A9;
    color: #E8E3DB; font-size: 10px; letter-spacing: 5px; text-transform: uppercase;
    cursor: pointer; font-weight: 300; font-family: inherit; transition: background 0.3s;
  }
  .qz-btn:hover  { background: rgba(212,197,169,0.07) }
`

export default function QuizFlow({ onComplete }) {
  const [step,      setStep]      = useState('intro')
  const [qIndex,    setQIndex]    = useState(0)
  const [answers,   setAnswers]   = useState({})
  const [user,      setUser]      = useState({ firstName: '', lastName: '', email: '', country: '' })
  const [animating, setAnimating] = useState(false)

  function handleAnswer(scores) {
    if (animating) return
    const next = { ...answers }
    Object.entries(scores).forEach(([k, v]) => { next[k] = (next[k] || 0) + v })
    setAnswers(next)
    setAnimating(true)
    setTimeout(() => {
      setAnimating(false)
      if (qIndex < questions.length - 1) {
        setQIndex(qIndex + 1)
      } else {
        onComplete(computeArchetype(next), user)
      }
    }, 320)
  }

  // ── Intro ─────────────────────────────────────────────────
  if (step === 'intro') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#0A0A0A' }}>
      <style>{CSS}</style>
      <div className="qz-fadeup" style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '38px' }}>
          <div style={{ width: '1px', height: '54px', background: 'linear-gradient(180deg,transparent,#D4C5A9,transparent)', margin: '0 auto 20px' }} />
          <p style={{ color: '#D4C5A9', letterSpacing: '6px', fontSize: '10px', fontFamily: 'Georgia,serif', marginBottom: '11px' }}>PERFUMERX</p>
          <h1 style={{ fontFamily: '"Courier New",monospace', fontWeight: 400, fontSize: 'clamp(22px,5vw,34px)', color: '#E8E3DB', letterSpacing: '3px', marginBottom: '9px' }}>The Apothecary</h1>
          <p style={{ color: '#9B8E7E', fontSize: '12px', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.9 }}>Let's find the fragrances that already feel like home.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.025)', border: '0.5px solid #2A2622', padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px', marginBottom: '11px' }}>
            <div>
              <label style={{ display: 'block', color: '#9B8E7E', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '7px' }}>First Name *</label>
              <input className="qz-input" required value={user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })} placeholder="Your name" />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9B8E7E', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '7px' }}>Last Name</label>
              <input className="qz-input" value={user.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })} placeholder="Optional" />
            </div>
          </div>
          <div style={{ marginBottom: '11px' }}>
            <label style={{ display: 'block', color: '#9B8E7E', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '7px' }}>Email *</label>
            <input className="qz-input" type="email" required value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="your@email.com" />
          </div>
          <div style={{ marginBottom: '26px' }}>
            <label style={{ display: 'block', color: '#9B8E7E', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '7px' }}>Country</label>
            <select className="qz-input" value={user.country} onChange={e => setUser({ ...user, country: e.target.value })}>
              <option value="">Select…</option>
              {['United States','United Kingdom','Canada','Australia','France','Germany','Italy','Japan','South Korea','UAE','Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button className="qz-btn" style={{ width: '100%' }} onClick={() => { if (!user.firstName || !user.email) return; setStep('pause') }}>
            Begin Journey
          </button>
        </div>
      </div>
    </div>
  )

  // ── Pause ─────────────────────────────────────────────────
  if (step === 'pause') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#0A0A0A' }}>
      <style>{CSS}</style>
      <div className="qz-fadeup" style={{ width: '100%', maxWidth: '440px', textAlign: 'center' }}>
        <div style={{ width: '1px', height: '54px', background: 'linear-gradient(180deg,transparent,#D4C5A9,transparent)', margin: '0 auto 22px' }} />
        <h1 style={{ fontFamily: '"Courier New",monospace', fontWeight: 400, fontSize: 'clamp(30px,6vw,46px)', color: '#E8E3DB', letterSpacing: '4px', marginBottom: '30px' }}>Pause.</h1>
        <div style={{ background: 'rgba(255,255,255,0.025)', border: '0.5px solid #2A2622', padding: '38px', marginBottom: '30px' }}>
          <p style={{ color: '#E8E3DB', fontWeight: 300, lineHeight: 2, fontSize: '14px', marginBottom: '14px' }}>Before we begin, take a breath.</p>
          <p style={{ color: '#9B8E7E', fontWeight: 300, lineHeight: 2, fontSize: '13px', marginBottom: '14px' }}>What follows isn't about who others want you to be.</p>
          <p style={{ color: '#9B8E7E', fontWeight: 300, lineHeight: 2, fontSize: '13px', fontStyle: 'italic' }}>Trust your instincts. There are no wrong answers.</p>
        </div>
        <button className="qz-btn" onClick={() => setStep('quiz')}>I'm Ready</button>
      </div>
    </div>
  )

  // ── Questions ─────────────────────────────────────────────
  const q        = questions[qIndex]
  const progress = ((qIndex + 1) / questions.length) * 100

  return (
    <div style={{ minHeight: '100vh', padding: '34px 18px', background: '#0A0A0A' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        {/* Progress bar */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6B6658', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase' }}>Question {qIndex + 1} of {questions.length}</span>
            <span style={{ color: '#D4C5A9', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '1px', background: '#2A2622' }}>
            <div style={{ height: '1px', background: '#D4C5A9', width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Question card */}
        <div className={animating ? 'qz-out' : 'qz-in'}>
          <h2 style={{ fontFamily: '"Courier New",monospace', fontWeight: 400, fontSize: 'clamp(16px,4vw,23px)', color: '#E8E3DB', letterSpacing: '1px', marginBottom: '22px', lineHeight: 1.4 }}>
            {q.question}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {q.options.map((opt, i) => (
              <button key={i} className="qz-opt" onClick={() => handleAnswer(opt.scores)}>
                <span>{opt.text}</span>
                <ChevronRight size={11} style={{ flexShrink: 0, marginLeft: '9px', opacity: 0.3 }} />
              </button>
            ))}
          </div>
        </div>

        {qIndex > 0 && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setQIndex(qIndex - 1)} style={{ color: '#6B6658', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              ← Previous
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
