import { daysSince } from '@/lib/friends'

export default function SpotlightCard({ friends, t, onCheckin }) {
  if (friends.length === 0) return null

  const candidate = [...friends]
    .sort((a, b) => {
      const da = daysSince(a.last_contacted) ?? 9999
      const db = daysSince(b.last_contacted) ?? 9999
      return db - da
    })[0]

  const days = daysSince(candidate.last_contacted)
  const sub = days === null
    ? 'You have not connected with them yet.'
    : days === 0
    ? 'You spoke today. Nice one.'
    : days < 7
    ? 'You spoke ' + days + ' day' + (days > 1 ? 's' : '') + ' ago. You are on it.'
    : days < 30
    ? 'It has been ' + Math.floor(days / 7) + ' week' + (Math.floor(days / 7) > 1 ? 's' : '') + '. They would love to hear from you.'
    : 'It has been ' + Math.floor(days / 30) + ' month' + (Math.floor(days / 30) > 1 ? 's' : '') + '. Do not leave it longer.'

  const isRecent = days !== null && days < 7

  return (
    <div style={{
      padding: '28px 32px',
      borderRadius: 16,
      marginBottom: 32,
      background: isRecent ? 'rgba(66,184,131,0.06)' : t.card,
      border: '1px solid ' + (isRecent ? 'rgba(66,184,131,0.25)' : t.border),
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.muted, margin: '0 0 8px' }}>
        Reach out today
      </p>
      <p style={{ fontSize: 28, fontWeight: 700, color: t.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
        {candidate.name}
      </p>
      <p style={{ fontSize: 14, color: t.textSec, margin: '0 0 20px' }}>
        {sub}
      </p>

      {!isRecent && (
        <button
          onClick={() => onCheckin(candidate.id)}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            background: t.accent,
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          You good? →
        </button>
      )}
    </div>
  )
}
