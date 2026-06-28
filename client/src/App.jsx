import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Stats from './components/Stats'
import FriendCard from './components/FriendCard'
import AddFriendModal from './components/AddFriendModal'
import './index.css'

const DARK = {
  bg:          '#1c1917',
  card:        '#292524',
  cardHover:   '#3c3836',
  border:      'rgba(255,220,160,0.09)',
  borderAct:   'rgba(255,220,160,0.18)',
  text:        '#f5f0eb',
  textSec:     '#a8a29e',
  muted:       '#78716c',
  accent:      '#22c55e',
  warning:     '#f59e0b',
  warnSub:     'rgba(245,158,11,0.07)',
  danger:      '#ef4444',
}

const LIGHT = {
  bg:          '#faf9f7',
  card:        '#ffffff',
  cardHover:   '#ede9e4',
  border:      'rgba(0,0,0,0.07)',
  borderAct:   'rgba(0,0,0,0.14)',
  text:        '#1c1917',
  textSec:     '#57534e',
  muted:       '#a8a29e',
  accent:      '#22c55e',
  warning:     '#f59e0b',
  warnSub:     'rgba(245,158,11,0.09)',
  danger:      '#ef4444',
}

export default function App() {
  const [friends, setFriends] = useState([])
  const [mode, setMode] = useState(() => localStorage.getItem('sc-theme') || 'dark')
  const [modalOpen, setModalOpen] = useState(false)

  const t = mode === 'dark' ? DARK : LIGHT

  useEffect(() => {
    document.documentElement.style.backgroundColor = t.bg
    document.documentElement.className = mode
    document.body.style.backgroundColor = t.bg
    document.body.style.color = t.text
    localStorage.setItem('sc-theme', mode)
  }, [mode, t.bg, t.text])

  const loadFriends = useCallback(async () => {
    try {
      const data = await fetch('/friends').then(r => r.json())
      setFriends(data)
    } catch (_) {}
  }, [])

  useEffect(() => { loadFriends() }, [loadFriends])

  function toggleTheme() {
    setMode(m => m === 'dark' ? 'light' : 'dark')
  }

  async function handleCheckin(id) {
    await fetch(`/friends/${id}/checkin`, { method: 'POST' })
    loadFriends()
  }

  async function handleRemove(id) {
    await fetch(`/friends/${id}`, { method: 'DELETE' })
    loadFriends()
  }

  async function handleAdd(data) {
    const res = await fetch('/friends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setModalOpen(false)
      loadFriends()
    }
  }

  return (
    <div style={{ backgroundColor: t.bg, minHeight: '100vh', color: t.text }}>

      <Header t={t} mode={mode} onToggleTheme={toggleTheme} onAdd={() => setModalOpen(true)} />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>

        <Stats t={t} friends={friends} />

        {friends.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <p style={{ color: t.muted, fontSize: 16, lineHeight: 1.6, marginBottom: 14, margin: '0 0 14px' }}>
              No one's here yet.<br />Who do you miss?
            </p>
            <button
              onClick={() => setModalOpen(true)}
              style={{ color: t.accent, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Add your first person →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {friends.map((f, i) => (
              <FriendCard
                key={f.id}
                friend={f}
                index={i}
                t={t}
                onCheckin={() => handleCheckin(f.id)}
                onRemove={() => handleRemove(f.id)}
              />
            ))}
          </div>
        )}

      </main>

      <AddFriendModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAdd={handleAdd}
        t={t}
      />

    </div>
  )
}
