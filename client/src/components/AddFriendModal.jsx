import { useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'

export default function AddFriendModal({ open, onOpenChange, onAdd, t }) {
  const [name, setName] = useState('')
  const [relationship, setRelationship] = useState('Mate')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Name is required'); return }
    setSubmitting(true)
    try {
      await onAdd({ name: name.trim(), relationship, notes: notes.trim() })
      setName(''); setRelationship('Mate'); setNotes(''); setError('')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: t.bg,
    border: `1px solid ${t.borderAct}`,
    borderRadius: 8,
    color: t.text,
    fontFamily: 'inherit',
    fontSize: 14,
    padding: '11px 14px',
    outline: 'none',
    lineHeight: 1.5,
    boxSizing: 'border-box',
    transition: 'border-color 150ms ease',
  }

  const labelStyle = {
    fontSize: 11,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: t.muted,
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="sc-backdrop" />
        <Dialog.Popup className="sc-popup">

          <div style={{
            background: t.card,
            border: `1px solid ${t.borderAct}`,
            borderRadius: 16,
            padding: 32,
            position: 'relative',
          }}>

            {/* Close button */}
            <Dialog.Close
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'transparent',
                border: 'none',
                color: t.muted,
                fontSize: 18,
                lineHeight: 1,
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: '4px 6px',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = t.text}
              onMouseLeave={e => e.currentTarget.style.color = t.muted}
            >
              ×
            </Dialog.Close>

            <Dialog.Title style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: t.text,
              marginBottom: 6,
              marginTop: 0,
            }}>
              Add to your people
            </Dialog.Title>

            <Dialog.Description style={{
              fontSize: 13,
              color: t.muted,
              lineHeight: 1.6,
              marginBottom: 28,
              marginTop: 0,
            }}>
              The details you add here will help you show up for them.
            </Dialog.Description>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Sarah, Dad, Hemi"
                    required
                    autoComplete="off"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = t.accent}
                    onBlur={e => e.target.style.borderColor = t.borderAct}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Relationship</label>
                  <select
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2378716c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      paddingRight: 36,
                      cursor: 'pointer',
                    }}
                    onFocus={e => e.target.style.borderColor = t.accent}
                    onBlur={e => e.target.style.borderColor = t.borderAct}
                  >
                    <option value="Mate">Mate</option>
                    <option value="Family">Family</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Notes</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Kids names, what they're into, what's going on for them right now..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
                    onFocus={e => e.target.style.borderColor = t.accent}
                    onBlur={e => e.target.style.borderColor = t.borderAct}
                  />
                </div>

              </div>

              {error && (
                <p style={{ fontSize: 12, color: t.danger, margin: '12px 0 0' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  background: t.accent,
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  padding: 13,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  marginTop: 28,
                  opacity: submitting ? 0.6 : 1,
                  transition: 'filter 150ms ease',
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.filter = 'brightness(1.08)' }}
                onMouseLeave={e => e.currentTarget.style.filter = 'none'}
              >
                {submitting ? 'Adding…' : 'Add to your people'}
              </button>
            </form>

          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
