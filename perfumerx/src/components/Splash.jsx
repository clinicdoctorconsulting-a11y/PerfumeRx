import React from 'react'
import { Loader } from 'lucide-react'

export default function Splash() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '1px', height: '76px', background: 'linear-gradient(180deg,transparent,#D4C5A9,transparent)', margin: '0 auto 24px' }} />
        <p style={{ color: '#D4C5A9', letterSpacing: '6px', fontSize: '11px', fontFamily: 'Georgia,serif', marginBottom: '20px' }}>PERFUMERX</p>
        <Loader size={13} style={{ color: '#6B6658', margin: '0 auto', animation: 'spin 1.5s linear infinite', display: 'block' }} />
      </div>
    </div>
  )
}
