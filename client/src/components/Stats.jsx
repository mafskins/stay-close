import { useEffect, useRef } from 'react'
import { daysSince } from '@/lib/friends'

function useCountUp(target, duration = 700) {
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (animated.current) { el.textContent = target; return }
    if (target === 0) { el.textContent = 0; return }
    animated.current = true
    let rafId
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      el.textContent = Math.floor(p * target)
      if (p < 1) rafId = requestAnimationFrame(tick)
      else el.textContent = target
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration])

  return ref
}

function Stat({ value, label, color, glow, t, first }) {
  const ref = useCountUp(value)
  return (
    <div style={{ paddingLeft: first ? 0 : 40 }}>
      <div
        ref={ref}
        className={glow ? 'sc-stat-breathe' : ''}
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color,
          marginBottom: 10,
        }}
      >
        0
      </div>
      <div style={{
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: t.muted,
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Stats({ t, friends }) {
  const inTouch   = friends.filter(f => { const d = daysSince(f.last_contacted); return d !== null && d <= 6 })
  const needsAttn = friends.filter(f => { const d = daysSince(f.last_contacted); return d === null || d >= 7 })
  const none = friends.length === 0

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '60px 0',
      marginBottom: 48,
    }}>
      <Stat
        first
        value={friends.length}
        label="Your people"
        color={none ? t.muted : t.text}
        t={t}
      />
      <Stat
        value={inTouch.length}
        label="In touch this week"
        color={none || inTouch.length === 0 ? t.muted : t.text}
        t={t}
      />
      <Stat
        value={needsAttn.length}
        label="Need attention"
        color={none ? t.muted : needsAttn.length > 0 ? t.warning : t.text}
        glow={!none && needsAttn.length > 0}
        t={t}
      />
    </div>
  )
}
