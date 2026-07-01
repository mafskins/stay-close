import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Stats from './components/Stats'
import FriendCard from './components/FriendCard'
import AddFriendModal from './components/AddFriendModal'
import NudgeBar from './components/NudgeBar'
import SpotlightCard from './components/SpotlightCard'
import MilestoneReminder from './components/MilestoneReminder'
import SearchBar from './components/SearchBar'
import { isOverdue, daysSince } from './lib/friends'
import './index.css'

const DARK = {
  bg:        '#18191a',
  card:      '#242526',
  cardHover: '#2d2e2f',
  border:    'rgba(255,255,255,0.08)',
  borderAct: 'rgba(66,184,131,0.5)',
  text:      '#e4e6eb',
  textSec:   '#b0b3b8',
  muted:     '#65676b',
  accent:    '#42b883',
  warning:   '#f59e0b',
  warnSub:   'rgba(66,184,131,0.08)',
  danger:    '#f43f5e',
}

const LIGHT = {
  bg:        '#f0f2f5',
  card:      '#ffffff',
  cardHover: '#f7f8fa',
  border:    'rgba(0,0,0,0.08)',
  borderAct: 'rgba(34,139,87,0.4)',
  text:      '#050505',
  textSec:   '#65676b',
  muted:     '#8a8d91',
  accent:    '#1a7a4a',
  warning:   '#d97706',
  warnSub:   'rgba(34,139,87,0.06)',
  danger:    '#e11d48',
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getName() {
  const saved = localStorage.getItem('sc-username')
  if (saved) return saved
  const name = window.prompt('What is your name?')
  if (name && name.trim()) {
    localStorage.setItem('sc-username', name.trim())
    return name.trim()
  }
  return ''
}

export default function App() {
  const [friends, setFriends]       = useState([])
  const [milestones, setMilestones] = useState([])
  const [search, setSearch]         = useState('')
  const [mode, setMode]             = useState(() => localStorage.getItem('sc-theme') || 'dark')
  const [modalOpen, setModalOpen]   = useState(false)
  const [newFriendId, setNewFriendId] = useState(null)
  const [greeting]                  = useState(getGreeting)
  const [userName]                  = useState(getName)

  const t = mode === 'dark' ? DARK : LIGHT

  useEffect(() => {
    document.documentElement.className = mode
    document.documentElement.style.setProperty('background-color', t.bg, 'important')
    document.body.style.setProperty('background-color', t.bg, 'important')
    document.body.style.color = t.text
    const root = document.getElementById('root')
    if (root) root.style.setProperty('background-color', t.bg, 'important')
    localStorage.setItem('sc-theme', mode)
  }, [mode, t.bg, t.text])

  useEffect(() => {
    const count = friends.filter(f => isOverdue(f.last_contacted)).length
    document.title = count > 0 ? 'Stay Close (' + count + ')' : 'Stay Close'
  }, [friends])

  const loadFriends = useCallback(async () => {
    try {
      const data = await fetch('/friends').then(r => r.json())
      const sorted = [...data].sort((a, b) => {
        const da = daysSince(a.last_contacted) ?? 9999
        const db = daysSince(b.last_contacted) ?? 9999
        return db - da
      })
      setFriends(sorted)
    } catch (_) {}
  }, [])

  const loadMilestones = useCallback(async () => {
    try {
      const data = await fetch('/milestones').then(r => r.json())
      setMilestones(data)
    } catch (_) {}
  }, [])

  useEffect(() => { loadFriends(); loadMilestones() }, [loadFriends, loadMilestones])

  function toggleTheme() { setMode(m => m === 'dark' ? 'light' : 'dark') }

  async function handleCheckin(id) {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, last_contacted: new Date().toISOString() } : f))
    loadFriends()
  }

  async function handleRemove(id) {
    await fetch('/friends/' + id, { method: 'DELETE' })
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
    if (added?.id) setNewFriendId(added.id)
    await loadFriends()
    setTimeout(() => setNewFriendId(null), 800)
  }

  const greetingLine = userName ? greeting + ', ' + userName : greeting
  const filtered = search.trim()
    ? friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || (f.notes || '').toLowerCase().includes(search.toLowerCase()) || (f.relationship || '').toLowerCase().includes(search.toLowerCase()))
    : friends

  return (
    <div style={{ backgroundColor: t.bg, minHeight: '100vh', color: t.text, position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header t={t} mode={mode} greeting={greetingLine} onToggleTheme={toggleTheme} onAdd={() => setModalOpen(true)} />

        <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>
          <Stats t={t} friends={friends} />
          <MilestoneReminder milestones={milestones} t={t} />
          {!search && <SpotlightCard friends={friends} t={t} onCheckin={handleCheckin} />}
          {!search && <NudgeBar friends={friends} t={t} onCheckin={handleCheckin} />}
          <SearchBar value={search} onChange={setSearch} t={t} />

          {filtered.length === 0 && friends.length > 0 ? (
            <p style={{ color: t.muted, fontSize: 14, textAlign: 'center', marginTop: 40 }}>No one matches that search.</p>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 80 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div className="sc-dot-pulse" style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: t.accent, flexShrink: 0 }} />
                <p style={{ color: t.muted, fontSize: 16, lineHeight: 1, margin: 0 }}>No one here yet. Who do you miss?</p>
              </div>
              <br />
              <button onClick={() => setModalOpen(true)} style={{ color: t.accent, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Add your first person</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.map((f, i) => (
                <FriendCard key={f.id} friend={f} index={i} t={t} isNew={f.id === newFriendId} onCheckin={() => handleCheckin(f.id)} onRemove={() => handleRemove(f.id)} />
              ))}
            </div>
          )}
        </main>
      </div>

      <AddFriendModal open={modalOpen} onOpenChange={setModalOpen} onAdd={handleAdd} t={t} />
    </div>
  )
}
