import { useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'

export default function AddFriendModal({ open, onOpenChange, onAdd }) {
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

  function handleClose() {
    onOpenChange(false)
    setError('')
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--sc-bg)',
    border: '1px solid var(--sc-border-act)',
    borderRadius: '8px',
    color: 'var(--sc-text)',
    fontFamily: 'inherit',
    fontSize: '14px',
    padding: '11px 14px',
    outline: 'none',
    lineHeight: '1.5',
    transition: 'border-color 150ms ease',
    appearance: 'none',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="sc-backdrop" />
        <Dialog.Popup className="sc-popup">
          <div
            className="w-full rounded-2xl p-8 relative"
            style={{
              background: 'var(--sc-surface)',
              border: '1px solid var(--sc-border-act)',
            }}
          >
            {/* Close */}
            <Dialog.Close
              onClick={handleClose}
              className="absolute top-4 right-4 bg-transparent border-none text-lg leading-none cursor-pointer px-1.5 py-1 transition-colors duration-150"
              style={{ color: 'var(--sc-text-muted)', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--sc-text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--sc-text-muted)'}
            >
              ×
            </Dialog.Close>

            <Dialog.Title
              className="text-lg font-semibold leading-none mb-1.5"
              style={{ letterSpacing: '-0.02em', color: 'var(--sc-text)' }}
            >
              Add to your people
            </Dialog.Title>
            <Dialog.Description
              className="text-[13px] leading-relaxed mb-7"
              style={{ color: 'var(--sc-text-muted)' }}
            >
              The details you add here will help you show up for them.
            </Dialog.Description>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[11px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: 'var(--sc-text-muted)' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Sarah, Dad, Hemi"
                    required
                    autoComplete="off"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--sc-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--sc-border-act)'}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[11px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: 'var(--sc-text-muted)' }}
                  >
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    style={{
                      ...inputStyle,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2378716c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      paddingRight: '36px',
                      cursor: 'pointer',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--sc-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--sc-border-act)'}
                  >
                    <option value="Mate">Mate</option>
                    <option value="Family">Family</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[11px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: 'var(--sc-text-muted)' }}
                  >
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Kids names, what they're into, what's going on for them right now..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '96px' }}
                    onFocus={e => e.target.style.borderColor = 'var(--sc-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--sc-border-act)'}
                  />
                </div>

              </div>

              {error && (
                <p className="text-xs mt-3" style={{ color: 'var(--sc-danger)' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-7 rounded-lg py-3.5 text-sm font-semibold border-none cursor-pointer transition-[filter] duration-150 hover:brightness-110 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'var(--sc-accent)', color: '#000' }}
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
