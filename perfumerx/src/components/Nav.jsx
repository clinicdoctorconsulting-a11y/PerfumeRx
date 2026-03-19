import React from 'react'
import { Home, Sparkles, Heart, TrendingUp, User } from 'lucide-react'
import { IS_CONFIGURED } from '../lib/api.js'

const NAV_ITEMS = [
  { id: 'home',            Icon: Home      },
  { id: 'discover',        Icon: Sparkles  },
  { id: 'wishlist',        Icon: Heart     },
  { id: 'recommendations', Icon: TrendingUp },
  { id: 'profile',         Icon: User      },
]

export default function Nav({ view, setView, wishlistCount }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(10,10,10,0.93)', backdropFilter: 'blur(20px)',
      borderBottom: '0.5px solid #1A1612',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontFamily: 'Georgia,serif', fontWeight: 300, color: '#E8E3DB', letterSpacing: '6px', fontSize: '11px', margin: 0 }}>
            PERFUMERX
          </h1>
          {!IS_CONFIGURED && (
            <span style={{ fontSize: '7px', color: '#C47B4A', border: '0.5px solid #C47B4A', padding: '2px 6px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              offline
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {NAV_ITEMS.map(({ id, Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.25s', padding: '4px', display: 'flex',
                alignItems: 'center', position: 'relative',
                color: view === id ? '#D4C5A9' : '#4A4642',
              }}
            >
              <Icon size={13} strokeWidth={0.8} />
              {id === 'wishlist' && wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-2px', right: '-2px',
                  width: '4px', height: '4px', borderRadius: '50%', background: '#D4C5A9',
                }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
