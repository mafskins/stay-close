import { useState, useRef } from 'react'
import { daysSince } from '@/lib/friends'
import { burst } from '@/lib/confetti'

const AVATAR_COLORS = [
  ['#f43f5e','#fff'],['#f59e0b','#fff'],['#10b981','#fff'],
  ['#3b82f6','#fff'],['#8b5cf6','#fff'],['#ec4899','#fff'],
  ['#06b6d4','#fff'],['#84cc16','#fff'],['#f97316','#fff'],['#6366f1','#fff'],
]

const TAG_COLORS = {
  mate:      { bg: 'rgba(99,102,241,0.15)', color: '#818cf8' },
  family:    { bg: 'rgba(236,72,153,0.15)', color: '#f472b6' },
  colleague: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
  partner:   { bg: 'rgba(239,68,68,0.15)',  color: '#f87171' },
  friend:    { bg: 'rgba(16,185,129,0.15)', color: '#34d399' },
  other:     { bg: 'rgba(107,114,128,0.15)',color: '#9ca3af' },
}

function tagStyle(rel) {
  if (!rel) return null
  return TAG_COLORS[rel.toLowerCase()] || { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af' }
}

function avatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function moodColor(days) {
  if (days === null) return '#f43f5e'
  if (days <= 3)  return '#42b883'
  if (days <= 13) return '#f59e0b'
  return '#f43f5e'
}

function fmt(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function FriendCard({ friend: f, index, t, isNew, onCheckin, onRemove }) {
  const [expanded, setExpanded]     = useState(false)
  const [checked, setChecked]       = useState(false)
  const [chatPrompt, setChatPrompt] = useState(false)
  const [chatDraft, setChatDraft]   = useState('')
  const [editing, setEditing]       = useState(false)
  const [notesDraft, setNotesDraft] = useState(f.notes || '')
  const [saving, setSaving]         = useState(false)
  const [milestones, setMilestones] = useState(null)
  const [showAddDate, setShowAddDate] = useState(false)
  const [dateLabel, setDateLabel]   = useState('')
  const [dateMonth, setDateMonth]   = useState('')
  const [dateDay, setDateDay]       = useState('')
  const btnRef = useRef(null)

  const days = daysSince(f.last_contacted)
  const overdue = days === null || days >= 14
  const mood = moodColor(days)
  const [avatarBg, avatarFg] = avatarColor(f.name)
  const tag = tagStyle(f.relationship)

  const statusText = days === null
    ? 'Not connected yet'
    : days === 0 ? 'Spoken today'
    : days === 1 ? '1 day ago'
    : days < 7   ? days + ' days ago'
    : days < 30  ? Math.floor(days / 7) + ' weeks ago'
    : Math.floor(days / 30) + ' months ago'

  async function loadMilestones() {
    if (milestones !== null) return
    const data = await fetch('/friends/' + f.id + '/milestones').then(r => r.json())
    setMilestones(data)
  }

  function handleExpand() {
    if (editing) return
    setExpanded(x => !x)
    if (!expanded) loadMilestones()
  }

  function handleCheckinClick(e) {
    e.stopPropagation()
    if (btnRef.current) burst(btnRef.current)
    setChatPrompt(true)
  }

  async function submitCheckin(e) {
    e.stopPropagation()
    await fetch('/friends/' + f.id + '/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat: chatDraft.trim() || null }),
    })
    setChatPrompt(false)
    setChatDraft('')
    setChecked(true)
    setTimeout(() => setChecked(false), 2000)
    onCheckin()
  }

  async function saveNotes(e) {
    e.stopPropagation()
    setSaving(true)
    await fetch('/friends/' + f.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notesDraft }),
    })
    setSaving(false)
    setEditing(false)
    f.notes = notesDraft
  }

  async function addMilestone(e) {
    e.stopPropagation()
    if (!dateLabel || !dateMonth || !dateDay) return
    const result = await fetch('/friends/' + f.id + '/milestones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: dateLabel, month: parseInt(dateMonth), day: parseInt(dateDay) }),
    }).then(r => r.json())
    setMilestones(prev => [...(prev || []), { id: result.id, label: dateLabel, month: parseInt(dateMonth), day: parseInt(dateDay) }])
    setDateLabel(''); setDateMonth(''); setDateDay('')
    setShowAddDate(false)
  }

  async function removeMilestone(id, e) {
    e.stopPropagation()
    await fetch('/milestones/' + id, { method: 'DELETE' })
    setMilestones(prev => prev.filter(m => m.id !== id))
  }

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  return (
    <div className={'sc-card' + (overdue ? ' overdue' : '')} style={{ '--card-delay': (index * 60) + 'ms' }} onClick={handleExpand}>
      <div style={{
        padding: expanded ? '20px 20px 0' : '16px 20px',
        borderRadius: 12,
        backgroundColor: isNew ? 'rgba(66,184,131,0.08)' : t.card,
        border: '1px solid ' + (isNew ? 'rgba(66,184,131,0.4)' : overdue ? 'rgba(244,63,94,0.2)' : t.border),
        cursor: 'pointer', transition: 'background-color 150ms ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: avatarFg }}>
              {f.name[0].toUpperCase()}
            </div>
            <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', backgroundColor: mood, border: '2px solid ' + t.card }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: 15, color: t.text }}>{f.name}</span>
              {f.relationship && tag && (
                <span style={{ fontSize: 11, fontWeight: 600, backgroundColor: tag.bg, color: tag.color, borderRadius: 4, padding: '2px 7px', letterSpacing: '0.03em' }}>{f.relationship}</span>
              )}
            </div>
            {!expanded && f.notes && (
              <p style={{ fontSize: 12, color: t.textSec, margin: '3px 0 0', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 340 }}>
                {f.notes.slice(0, 55)}{f.notes.length > 55 ? '...' : ''}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 13, color: t.textSec }}>{statusText}</div>
            {f.last_contacted && <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{fmt(f.last_contacted)}</div>}
          </div>
        </div>

        {expanded && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid ' + t.border }}>

            {editing ? (
              <div onClick={e => e.stopPropagation()}>
                <textarea autoFocus value={notesDraft} onChange={e => setNotesDraft(e.target.value)} placeholder="Notes about this person..." style={{ width: '100%', minHeight: 80, backgroundColor: t.bg, color: t.text, border: '1px solid ' + t.borderAct, borderRadius: 8, padding: '10px 12px', fontSize: 14, fontFamily: 'inherit', lineHeight: 1.5, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 12 }}>
                  <button onClick={saveNotes} style={{ fontSize: 13, fontWeight: 600, color: '#fff', background: t.accent, border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: 'inherit' }}>{saving ? 'Saving...' : 'Save'}</button>
                  <button onClick={e => { e.stopPropagation(); setEditing(false); setNotesDraft(f.notes || '') }} style={{ fontSize: 13, color: t.muted, background: 'none', border: '1px solid ' + t.border, borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                {f.notes ? <p style={{ fontSize: 14, color: t.textSec, margin: '0 0 2px', lineHeight: 1.6 }}>{f.notes}</p> : <p style={{ fontSize: 13, color: t.muted, margin: '0 0 2px', fontStyle: 'italic' }}>No notes yet.</p>}
                {f.last_chat && <p style={{ fontSize: 12, color: t.muted, margin: '4px 0 2px' }}>Last chat: {f.last_chat}</p>}
                <button onClick={e => { e.stopPropagation(); setEditing(true) }} style={{ fontSize: 12, color: t.muted, background: 'none', border: 'none', padding: '0 0 12px', cursor: 'pointer', fontFamily: 'inherit' }}>{f.notes ? 'Edit notes' : '+ Add notes'}</button>
              </>
            )}

            <div style={{ borderTop: '1px solid ' + t.border, paddingTop: 12, marginBottom: 4 }}>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.muted, margin: '0 0 8px' }}>Important dates</p>
              {(milestones || []).map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: t.textSec }}>{m.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: t.muted }}>{MONTHS[m.month - 1]} {m.day}</span>
                    <button onClick={e => removeMilestone(m.id, e)} style={{ fontSize: 12, color: t.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
                  </div>
                </div>
              ))}
              {showAddDate ? (
                <div onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
                  <input value={dateLabel} onChange={e => setDateLabel(e.target.value)} placeholder="e.g. Dad's anniversary" style={{ flex: 2, minWidth: 140, padding: '6px 10px', borderRadius: 6, border: '1px solid ' + t.border, backgroundColor: t.bg, color: t.text, fontSize: 12, fontFamily: 'inherit', outline: 'none' }} />
                  <input value={dateMonth} onChange={e => setDateMonth(e.target.value)} placeholder="MM" maxLength={2} style={{ width: 44, padding: '6px 8px', borderRadius: 6, border: '1px solid ' + t.border, backgroundColor: t.bg, color: t.text, fontSize: 12, fontFamily: 'inherit', outline: 'none', textAlign: 'center' }} />
                  <input value={dateDay} onChange={e => setDateDay(e.target.value)} placeholder="DD" maxLength={2} style={{ width: 44, padding: '6px 8px', borderRadius: 6, border: '1px solid ' + t.border, backgroundColor: t.bg, color: t.text, fontSize: 12, fontFamily: 'inherit', outline: 'none', textAlign: 'center' }} />
                  <button onClick={addMilestone} style={{ fontSize: 12, fontWeight: 600, color: '#fff', background: t.accent, border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
                  <button onClick={e => { e.stopPropagation(); setShowAddDate(false) }} style={{ fontSize: 12, color: t.muted, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                </div>
              ) : (
                <button onClick={e => { e.stopPropagation(); setShowAddDate(true) }} style={{ fontSize: 12, color: t.muted, background: 'none', border: 'none', padding: '2px 0 10px', cursor: 'pointer', fontFamily: 'inherit' }}>+ Add important date</button>
              )}
            </div>

            {chatPrompt ? (
              <div onClick={e => e.stopPropagation()} style={{ borderTop: '1px solid ' + t.border, paddingTop: 12, paddingBottom: 16 }}>
                <p style={{ fontSize: 13, color: t.textSec, margin: '0 0 8px' }}>What did you chat about? <span style={{ color: t.muted }}>(optional)</span></p>
                <input autoFocus value={chatDraft} onChange={e => setChatDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitCheckin(e)} placeholder="e.g. Kids, work, the game..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid ' + t.borderAct, backgroundColor: t.bg, color: t.text, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: 8 }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button ref={btnRef} onClick={submitCheckin} style={{ fontSize: 13, fontWeight: 600, color: '#fff', background: t.accent, border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
                  <button onClick={submitCheckin} style={{ fontSize: 13, color: t.muted, background: 'none', border: '1px solid ' + t.border, borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>Skip</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, paddingBottom: 16, borderTop: '1px solid ' + t.border, paddingTop: 12 }}>
                <button ref={btnRef} onClick={handleCheckinClick} style={{ fontSize: 13, fontWeight: 600, color: '#fff', background: checked ? '#10b981' : t.accent, border: 'none', borderRadius: 8, padding: '9px 18px', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 200ms ease' }}>
                  {checked ? 'Checked in!' : 'You good? →'}
                </button>
                <button onClick={e => { e.stopPropagation(); onRemove() }} style={{ fontSize: 12, color: t.muted, background: 'none', border: '1px solid ' + t.border, borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>Remove</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
