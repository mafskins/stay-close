import { useState } from 'react'
import { avatarColor, initials, daysSince, daysStatus, isOverdue, statusColor, formatDate } from '@/lib/friends'

export default function FriendCard({ friend, index, t, onCheckin, onRemove }) {
  const [hovered, setHovered] = useState(false)

  const overdue  = isOverdue(friend.last_contacted)
  const days     = daysSince(friend.last_contacted)
  const status   = daysStatus(days)
  const sColor   = statusColor(status.type, t)
  const color    = avatarColor(friend.name)
  const rel      = friend.relationship || 'Mate'
  const wm       = (friend.name.trim()[0] || '?').toUpperCase()
  const dateStr  = formatDate(friend.last_contacted)

  const bg = overdue
    ? `linear-gradient(90deg, ${hovered ? 'rgba(245,158,11,0.10)' : t.warnSub} 0%, ${hovered ? t.cardHover : t.card} 32%)`
    : hovered ? t.cardHover : t.card

  return (
    <div
      className={`sc-card${overdue ? ' overdue' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        '--card-delay': `${index * 80}ms`,
        background: bg,
        borderTop:    `1px solid ${t.border}`,
        borderRight:  `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        borderLeft:   `3px solid ${overdue ? t.warning : 'transparent'}`,
        borderRadius: 12,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'default',
        transition: 'transform 150ms ease, background 150ms ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Watermark letter */}
      <div className="sc-watermark" style={{ color: t.text }}>{wm}</div>

      {/* Left: avatar + name + relationship */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 700,
          flexShrink: 0,
          letterSpacing: '0.02em',
          background: color.bg,
          color: color.fg,
        }}>
          {initials(friend.name)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{
            fontSize: 15,
            fontWeight: 600,
            color: t.text,
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            {friend.name}
          </div>
          <div style={{ fontSize: 12, color: t.muted, lineHeight: 1 }}>
            · {rel}
          </div>
        </div>
      </div>

      {/* Right: status text + date + hover buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 6,
        flexShrink: 0,
        marginLeft: 16,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Status label e.g. "Spoke today", "3 days ago", "No contact yet" */}
        <div style={{
          fontSize: 12,
          lineHeight: 1,
          color: sColor,
          whiteSpace: 'nowrap',
          fontStyle: status.type === 'none' ? 'italic' : 'normal',
        }}>
          {status.text}
        </div>

        {/* Actual date e.g. "28 Jun 2026" */}
        {dateStr && (
          <div style={{
            fontSize: 11,
            lineHeight: 1,
            color: t.muted,
            whiteSpace: 'nowrap',
          }}>
            {dateStr}
          </div>
        )}

        {/* Hover-reveal action buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 4,
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'opacity 150ms ease',
        }}>
          <button
            onClick={onRemove}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'inherit',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
              color: t.muted,
              whiteSpace: 'nowrap',
              transition: 'color 100ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = t.danger }}
            onMouseLeave={e => { e.currentTarget.style.color = t.muted }}
          >
            Remove
          </button>
          <button
            onClick={onCheckin}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'inherit',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
              color: t.accent,
              whiteSpace: 'nowrap',
            }}
          >
            Reach out →
          </button>
        </div>
      </div>
    </div>
  )
}
