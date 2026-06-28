import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Stats from './components/Stats'
import FriendCard from './components/FriendCard'
import AddFriendModal from './components/AddFriendModal'

export default function App() {
  const [friends, setFriends] = useState([])
  const [theme, setTheme] = useState(() => localStorage.getItem('sc-theme') || 'dark')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = '#1c1917'
    document.documentElement.className = theme
    localStorage.setItem('sc-theme', theme)
  }, [theme])

  const loadFriends = useCallback(async () => {
    try {
      const data = await fetch('/friends').then(r => r.json())
      setFriends(data)
    } catch (_) {}
  }, [])

  useEffect(() => { loadFriends() }, [loadFriends])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
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

  const isEmpty = friends.length === 0

  return (
    <div style={{ backgroundColor: '#1c1917', minHeight: '100vh', color: '#f5f0eb' }}>
      <Header theme={theme} onToggleTheme={toggleTheme} onAdd={() => setModalOpen(true)} />

      <main className="max-w-[800px] mx-auto px-6 pb-20">
        <Stats friends={friends} />

        {isEmpty ? (
          <div className="text-center mt-20">
            <p
              className="text-base mb-3.5 leading-relaxed"
              style={{ color: 'var(--sc-text-muted)' }}
            >
              No one's here yet.<br />Who do you miss?
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm bg-transparent border-none cursor-pointer transition-opacity duration-150 hover:opacity-75"
              style={{ color: 'var(--sc-accent)' }}
            >
              Add your first person →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[10px]">
            {friends.map((f, i) => (
              <FriendCard
                key={f.id}
                friend={f}
                index={i}
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
      />
    </div>
  )
}
