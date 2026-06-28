export const AVATAR_PALETTE = [
  { bg: '#3d2b1f', fg: '#fdba74' },
  { bg: '#1f3320', fg: '#86efac' },
  { bg: '#3a1f2e', fg: '#f9a8d4' },
  { bg: '#1f2a3d', fg: '#93c5fd' },
  { bg: '#3d3020', fg: '#fcd34d' },
  { bg: '#2a1f3d', fg: '#c4b5fd' },
]

export function avatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

export function initials(name) {
  return name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export function daysSince(d) {
  if (!d) return null
  return Math.floor((Date.now() - new Date(d)) / 86400000)
}

export function daysStatus(days) {
  if (days === null)  return { text: 'No contact yet',  cls: 'text-[var(--sc-text-muted)] italic' }
  if (days === 0)     return { text: 'Spoke today',     cls: 'text-[var(--sc-accent)]' }
  if (days === 1)     return { text: 'Yesterday',       cls: 'text-[var(--sc-accent)]' }
  if (days <= 6)      return { text: `${days} days ago`, cls: 'text-[var(--sc-text-sec)]' }
  const months = Math.floor(days / 30)
  if (months >= 1)    return { text: `${months} month${months > 1 ? 's' : ''} ago`, cls: 'text-[var(--sc-warning)]' }
  return { text: `${days} days ago`, cls: 'text-[var(--sc-warning)]' }
}

export function isOverdue(lastContacted) {
  const d = daysSince(lastContacted)
  return d === null || d >= 7
}
