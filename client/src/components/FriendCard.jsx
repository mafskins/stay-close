import { useState, useEffect } from 'react'
import { burst } from '../lib/confetti'

var AVATAR_COLORS = ['#42b883','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#14b8a6','#f97316','#6366f1','#84cc16']

var TAG_COLORS = { Mate: '#6366f1', Family: '#ec4899', Colleague: '#f59e0b', Partner: '#ef4444', Friend: '#42b883', Other: '#94a3b8' }

function nameHash(name) {
  var h = 0
  for (var i = 0; i < name.length; i++) { h = (h * 31 + name.charCodeAt(i)) & 0xffffffff }
  return Math.abs(h)
}

function moodColor(days) {
  if (days === null || days === undefined) return '#ef4444'
  if (days <= 3)  return '#42b883'
  if (days <= 13) return '#f59e0b'
  return '#ef4444'
}

function moodLabel(days) {
  if (days === null || days === undefined) return 'Never checked in'
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return days + ' days ago'
}

export default function FriendCard({ friend, index, t, isNew, onRemove, onRefresh }) {
  var [expanded, setExpanded]     = useState(!!isNew)
  var [editing, setEditing]       = useState(false)
  var [noteVal, setNoteVal]       = useState(friend.notes || '')
  var [chat, setChat]             = useState('')
  var [chatting, setChatting]     = useState(false)
  var [milestones, setMilestones] = useState(null)
  var [showAdd, setShowAdd]       = useState(false)
  var [newLabel, setNewLabel]     = useState('')
  var [newMM, setNewMM]           = useState('')
  var [newDD, setNewDD]           = useState('')

  var avatarColor = AVATAR_COLORS[nameHash(friend.name) % AVATAR_COLORS.length]
  var tagColor    = TAG_COLORS[friend.relationship] || TAG_COLORS.Other
  var days        = friend.days_since_contact
  var mc          = moodColor(days)

  useEffect(function() {
    if (expanded && milestones === null) {
      fetch('/friends/' + friend.id + '/milestones')
        .then(function(r) { return r.json() })
        .then(function(data) { setMilestones(data) })
        .catch(function() { setMilestones([]) })
    }
  }, [expanded])

  function saveNotes() {
    fetch('/friends/' + friend.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ notes: noteVal }) })
      .then(function() { setEditing(false); onRefresh() })
  }

  function sendChat(e) {
    e.preventDefault()
    if (!chat.trim()) return
    fetch('/friends/' + friend.id + '/checkin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat: chat }) })
      .then(function(r) { return r.json() }).then(function() { burst(e.target); setChat(''); setChatting(false); onRefresh() })
  }

  function addMilestone(e) {
    e.preventDefault()
    fetch('/friends/' + friend.id + '/milestones', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label: newLabel, month: parseInt(newMM), day: parseInt(newDD) }) })
      .then(function(r) { return r.json() }).then(function(m) { setMilestones(function(prev) { return prev.concat(m) }); setNewLabel(''); setNewMM(''); setNewDD(''); setShowAdd(false) })
  }

  function deleteMilestone(mid) {
    fetch('/milestones/' + mid, { method: 'DELETE' })
      .then(function() { setMilestones(function(prev) { return prev.filter(function(m) { return m.id !== mid }) }) })
  }

  var cardDelay = (index * 60) + 'ms'

  return (
    <div className={'sc-card' + (days >= 14 ? ' overdue' : '')} style={{ '--card-delay': cardDelay, borderRadius: 14, marginBottom: 12 }}>
      <div style={{ background: t.card, border: '1px solid ' + t.border, borderRadius: 14, overflow: 'hidden' }}>

        <div onClick={function() { setExpanded(function(v) { return !v }) }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}
        >
          <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: avatarColor + '22', border: '2px solid ' + avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: avatarColor }}>
            {friend.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{friend.name}</span>
              {friend.relationship && friend.relationship !== 'Other' && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: tagColor + '22', color: tagColor }}>{friend.relationship}</span>
              )}
            </div>
            <span style={{ fontSize: 12, color: mc }}>{moodLabel(days)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="sc-dot-pulse" style={{ width: 10, height: 10, borderRadius: '50%', background: mc, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: t.muted }}>{expanded ? '\u25b2' : '\u25bc'}</span>
          </div>
        </div>

        {expanded && (
          <div style={{ padding: '0 16px 16px', borderTop: '1px solid ' + t.border }}>

            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Notes</span>
                {!editing && <button onClick={function() { setEditing(true) }} style={{ fontSize: 11, color: t.muted, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>edit</button>}
              </div>
              {editing ? (
                <div>
                  <textarea value={noteVal} onChange={function(e) { setNoteVal(e.target.value) }} rows={3} autoFocus
                    style={{ width: '100%', resize: 'vertical', borderRadius: 8, padding: '8px 10px', fontSize: 13, fontFamily: 'inherit', color: t.text, background: t.bg, border: '1px solid ' + t.borderAct, outline: 'none', boxSizing: 'border-box' }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <button onClick={saveNotes} style={{ background: t.accent, color: '#000', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
                    <button onClick={function() { setEditing(false); setNoteVal(friend.notes || '') }} style={{ background: 'none', color: t.muted, border: '1px solid ' + t.border, borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: noteVal ? t.text : t.muted, fontStyle: noteVal ? 'normal' : 'italic' }}>
                  {noteVal || 'Nothing yet - add something about their life.'}
                </p>
              )}
            </div>

            <div style={{ marginTop: 16 }}>
              {chatting ? (
                <form onSubmit={sendChat} style={{ display: 'flex', gap: 8 }}>
                  <input value={chat} onChange={function(e) { setChat(e.target.value) }} placeholder={'How did it go with ' + friend.name + '?'} autoFocus
                    style={{ flex: 1, borderRadius: 8, padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', color: t.text, background: t.bg, border: '1px solid ' + t.borderAct, outline: 'none' }}
                  />
                  <button type="submit" style={{ background: t.accent, color: '#000', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Log</button>
                  <button type="button" onClick={function() { setChatting(false) }} style={{ background: 'none', color: t.muted, border: '1px solid ' + t.border, borderRadius: 8, padding: '8px 12px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>X</button>
                </form>
              ) : (
                <button onClick={function() { setChatting(true) }} style={{ background: 'none', border: '1px solid ' + t.accent + '60', borderRadius: 8, padding: '8px 14px', fontSize: 12, color: '#42b883', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  You good? -&gt;
                </button>
              )}
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Important dates</span>
                <button onClick={function() { setShowAdd(function(v) { return !v }) }} style={{ fontSize: 11, color: t.muted, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {showAdd ? 'cancel' : '+ add date'}
                </button>
              </div>
              {showAdd && (
                <form onSubmit={addMilestone} style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  <input value={newLabel} onChange={function(e) { setNewLabel(e.target.value) }} placeholder="e.g. Birthday" required style={{ flex: 2, minWidth: 100, borderRadius: 8, padding: '6px 10px', fontSize: 12, fontFamily: 'inherit', color: t.text, background: t.bg, border: '1px solid ' + t.border, outline: 'none' }} />
                  <input value={newMM} onChange={function(e) { setNewMM(e.target.value) }} placeholder="MM" required type="number" min="1" max="12" style={{ width: 52, borderRadius: 8, padding: '6px 8px', fontSize: 12, fontFamily: 'inherit', color: t.text, background: t.bg, border: '1px solid ' + t.border, outline: 'none' }} />
                  <input value={newDD} onChange={function(e) { setNewDD(e.target.value) }} placeholder="DD" required type="number" min="1" max="31" style={{ width: 52, borderRadius: 8, padding: '6px 8px', fontSize: 12, fontFamily: 'inherit', color: t.text, background: t.bg, border: '1px solid ' + t.border, outline: 'none' }} />
                  <button type="submit" style={{ background: t.accent, color: '#000', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
                </form>
              )}
              {milestones === null ? (
                <p style={{ fontSize: 12, color: t.muted, fontStyle: 'italic' }}>Loading...</p>
              ) : milestones.length === 0 ? (
                <p style={{ fontSize: 12, color: t.muted, fontStyle: 'italic' }}>No dates saved yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {milestones.map(function(m) {
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    return (
                      <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 8, background: t.bg, border: '1px solid ' + t.border }}>
                        <span style={{ fontSize: 12, color: t.text }}>{m.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 12, color: t.muted }}>{months[(m.month || 1) - 1]} {m.day}</span>
                          <button onClick={function() { deleteMilestone(m.id) }} style={{ background: 'none', border: 'none', color: t.muted, cursor: 'pointer', fontSize: 13, padding: '0 2px', lineHeight: 1 }}>X</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div style={{ marginTop: 18, textAlign: 'right' }}>
              <button onClick={function() { if (window.confirm('Remove ' + friend.name + '?')) onRemove(friend.id) }}
                style={{ background: 'none', border: 'none', fontSize: 11, color: t.danger, cursor: 'pointer', fontFamily: 'inherit', opacity: 0.6 }}>
                Remove
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
