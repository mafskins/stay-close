import { daysSince } from '@/lib/friends'

function nudgeText(days) {
  if (days === null) return "Haven't connected yet - they'd love to hear from you"
  if (days < 14)    return days + ' days - worth a message?'
  const weeks = Math.floor(days / 7)
  if (days < 60)    return weeks + ' week' + (weeks > 1 ? 's' : '') + ' - they might be missing you'
  const months = Math.floor(days / 30)
  return months + ' month' + (months > 1 ? 's' : '') + ' - don leave it longer'
}

export default function NudgeBar({ friends, t, onCheckin }) {
  const overdue = friends.filter(f => {
    const d = daysSince(f.last_contacted)
    return d === null || d >= 7
  })

  if (overdue.length === 0) return null

  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.muted, marginBottom: 10 }}>
        Worth a message
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {overdue.map(f => {
          const days = daysSince(f.last_contacted)
          return (
            <div key={f.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', borderRadius: 10,
              backgroundColor: t.warnSub,
              border: '1px solid rgba(167,139,250,0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}>
              <div>
                <span style={{ fontWeight: 600, color: t.text, fontSize: 15 }}>{f.name}</span>
                <span style={{ marginLeft: 12, fontSize: 13, color: t.accent }}>{nudgeText(days)}</span>
              </div>
              <button onClick={() => onCheckin(f.id)} style={{
                fontSize: 12, fontWeight: 600, color: t.accent,
                background: 'none', border: '1px solid rgba(167,139,250,0.35)',
                borderRadius: 6, padding: '5px 12px', cursor: 'pointer',
                fontFamily: 'inherit', flexShrink: 0,
              }}>
                You good?
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
