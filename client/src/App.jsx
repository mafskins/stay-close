import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Stats from './components/Stats'
import FriendCard from './components/FriendCard'
import AddFriendModal from './components/AddFriendModal'
import { isOverdue } from './lib/friends'
import './index.css'

const DARK = {
  bg:        '#1c1917',
  card:      '#292524',
  cardHover: '#3c3836',
  border:    'rgba(255,220,160,0.09)',
  borderAct: 'rgba(255,220,160,0.18)',
  text:      '#f5f0eb',
  textSec:   '#a8a29e',
  muted:     '#78716c',
  accent:    '#22c55e',
  warning:   '#f59e0b',
  warnSub:   'rgba(245,158,11,0.07)',
  danger:    '#ef4444',
}

const LIGHT = {
  bg:        '#faf9f7',
  card:      '#ffffff',
  cardHover: '#ede9e4',
  border:    'rgba(0,0,0,0.07)',
  borderAct: 'rgba(0,0,0,0.14)',
  text:      '#1c1917',
  textSec:   '#57534e',
  muted:     '#a8a29e',
  accent:    '#22c55e',
  warning:   '#f59e0b',
  warnSub:   'rgba(245,158,11,0.09)',
  danger:    '#ef4444',
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function App() {
  const [friends, setFriends]         = useState([])
  const [mode, setMode]               = useState(() => localStorage.getItem('sc-theme') || 'dark')
  const [modalOpen, setModalOpen]     = useState(false)
  const [newFriendId, setNewFriendId] = useState(null)
  const [greeting]                    = useState(getGreeting)

  const t = mode === 'dark' ? DARK : LIGHT

  // Background — set on html, body, and root div (layer 3, after React mounts)
  useEffect(() => {
    document.documentElement.className = mode
    document.documentElement.style.setProperty('background-color', t.bg, 'important')
    document.body.style.setProperty('background-color', t.bg, 'important')
    document.body.style.color = t.text
    const root = document.getElementById('root')
    if (root) root.style.setProperty('background-color', t.bg, 'important')
    localStorage.setItem('sc-theme', mode)
  }, [mode, t.bg, t.text])

  // Page title — shows overdue count in tab
  useEffect(() => {
    const count = friends.filter(f => isOverdue(f.last_contacted)).length
    document.title = count > 0 ? `Stay Close (${count})` : 'Stay Close'
  }, [friends])

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
    // Optimistic update — date + status change immediately
    setFriends(prev =>
      prev.map(f => f.id === id ? { ...f, last_contacted: new Date().toISOString() } : f)
    )
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
    if (!res.ok) return
    const added = await res.json().catch(() => null)
    setModalOpen(false)
    // Set newFriendId before loadFriends so React batches the renders —
    // the new card mounts knowing it's new and gets the slide-in animation
    if (added?.id) setNewFriendId(added.id)
    await loadFriends()
    setTimeout(() => setNewFriendId(null), 800)
  }

  return (
    <div style={{ backgroundColor: t.bg, minHeight: '100vh', color: t.text }}>

      <Header
        t={t}
        mode={mode}
        greeting={greeting}
        onToggleTheme={toggleTheme}
        onAdd={() => setModalOpen(true)}
      />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>

        <Stats t={t} friends={friends} />

        {friends.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}>
              <div
                className="sc-dot-pulse"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: t.accent,
                  flexShrink: 0,
                }}
              />
              <p style={{ color: t.muted, fontSize: 16, lineHeight: 1, margin: 0 }}>
                No one's here yet. Who do you miss?
              </p>
            </div>
            <br />
            <button
              onClick={() => setModalOpen(true)}
              style={{
                color: t.accent,
                fontSize: 13,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
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
                isNew={f.id === newFriendId}
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
