import { avatarColor, initials, daysSince, daysStatus, isOverdue } from '@/lib/friends'

export default function FriendCard({ friend, index, onCheckin, onRemove }) {
  const overdue = isOverdue(friend.last_contacted)
  const days    = daysSince(friend.last_contacted)
  const status  = daysStatus(days)
  const color   = avatarColor(friend.name)
  const rel     = friend.relationship || 'Mate'
  const wm      = (friend.name.trim()[0] || '?').toUpperCase()

  return (
    <div
      className={`sc-card flex items-center justify-between px-8 py-7${overdue ? ' overdue' : ''}`}
      style={{ '--card-delay': `${index * 80}ms`, backgroundColor: '#292524' }}
    >
      {/* Watermark initial */}
      <div className="sc-watermark">{wm}</div>

      {/* Left: avatar + name */}
      <div className="flex items-center gap-4 relative z-10">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 tracking-wide"
          style={{ background: color.bg, color: color.fg }}
        >
          {initials(friend.name)}
        </div>
        <div className="flex flex-col gap-[5px]">
          <div
            className="text-[15px] font-semibold tracking-tight leading-none capitalize"
            style={{ color: 'var(--sc-text)' }}
          >
            {friend.name}
          </div>
          <div className="text-xs leading-none" style={{ color: 'var(--sc-text-muted)' }}>
            · {rel}
          </div>
        </div>
      </div>

      {/* Right: status + actions */}
      <div className="flex flex-col items-end gap-2 shrink-0 ml-4 relative z-10">
        <div className={`text-xs leading-none whitespace-nowrap ${status.cls}`}>
          {status.text}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onRemove}
            className="sc-card-action text-xs font-medium bg-transparent border-none cursor-pointer leading-none whitespace-nowrap transition-colors duration-150"
            style={{ color: 'var(--sc-text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--sc-danger)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--sc-text-muted)'}
          >
            Remove
          </button>
          <button
            onClick={onCheckin}
            className="sc-card-action text-xs font-medium bg-transparent border-none cursor-pointer leading-none whitespace-nowrap active:scale-[0.97] transition-transform duration-75"
            style={{ color: 'var(--sc-accent)' }}
          >
            Reach out →
          </button>
        </div>
      </div>
    </div>
  )
}
