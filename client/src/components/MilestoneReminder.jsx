function daysUntil(month, day) {
  const now = new Date()
  const thisYear = now.getFullYear()
  let next = new Date(thisYear, month - 1, day)
  if (next - now < -86400000) next = new Date(thisYear + 1, month - 1, day)
  return Math.round((next - now) / 86400000)
}

export default function MilestoneReminder({ milestones, t }) {
  if (!milestones || milestones.length === 0) return null

  const upcoming = milestones
    .map(m => ({ ...m, days: daysUntil(m.month, m.day) }))
    .filter(m => m.days >= 0 && m.days <= 14)
    .sort((a, b) => a.days - b.days)

  if (upcoming.length === 0) return null

  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.muted, marginBottom: 10 }}>
        Coming up
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {upcoming.map(m => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px', borderRadius: 10,
            backgroundColor: t.card,
            border: '1px solid rgba(251,191,36,0.25)',
          }}>
            <div>
              <span style={{ fontWeight: 600, color: t.text, fontSize: 15 }}>{m.friend_name}</span>
              <span style={{ marginLeft: 10, fontSize: 13, color: t.textSec }}>{m.label}</span>
            </div>
            <span style={{
              fontSize: 12, fontWeight: 600,
              color: m.days === 0 ? '#f43f5e' : m.days <= 3 ? '#f59e0b' : t.muted,
              whiteSpace: 'nowrap', marginLeft: 12,
            }}>
              {m.days === 0 ? 'Today' : m.days === 1 ? 'Tomorrow' : 'In ' + m.days + ' days'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
