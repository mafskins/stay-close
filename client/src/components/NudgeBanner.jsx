import { daysSince, isOverdue } from '@/lib/friends'

function nudgeMessage(friend) {
  const days = daysSince(friend.last_contacted)
  if (days === null) return `You've never reached out to ${friend.name}. They're waiting.`
  if (days < 14) return `You haven't spoken to ${friend.name} in ${days} day${days === 1 ? '' : 's'}.`
  if (days < 30) {
    const weeks = Math.floor(days / 7)
    return `You haven't spoken to ${friend.name} in ${weeks} week${weeks === 1 ? '' : 's'}.`
  }
  const months = Math.floor(days / 30)
  return `You haven't spoken to ${friend.name} in ${months} month${months === 1 ? '' : 's'}.`
}

export default function NudgeBanner({ friends, t, onCheckin }) {
  const overdue = friends.filter(f => isOverdue(f.last_contacted))
  if (overdue.length === 0) return null

  const urgent = overdue[0]
  const othersCount = overdue.length - 1

  return (
    <div style={{
      background: `linear-gradient(90deg, rgba(245,158,11,0.10) 0%, ${t.card} 60%)`,
      border: `1px solid rgba(245,158,11,0.22)`,
      borderLeft: `3px solid ${t.warning}`,
      borderRadius: 12,
      padding: '18px 20px',
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      animation: 'fadeUp 0.4s ease-out both',
    }}>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 15,
          fontWeight: 500,
          color: t.text,
          margin: 0,
          lineHeight: 1.4,
        }}>
          {nudgeMessage(urgent)}
        </p>
        {othersCount > 0 && (
          <p style={{
            fontSize: 12,
            color: t.muted,
            margin: '5px 0 0',
            lineHeight: 1,
          }}>
            +{othersCount} other{othersCount > 1 ? 's' : ''} need attention too.
          </p>
        )}
      </div>

      <button
        onClick={() => onCheckin(urgent.id)}
        style={{
          background: t.warning,
          color: '#000',
          border: 'none',
          borderRadius: 9999,
          padding: '9px 18px',
          fontSize: 13,
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          lineHeight: 1,
          transition: 'filter 150ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
      >
        Reach out →
      </button>
    </div>
  )
}
