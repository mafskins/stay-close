import { useEffect, useRef } from 'react'
import { daysSince } from '@/lib/friends'

function useCountUp(target, duration = 700) {
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (animated.current) {
      el.textContent = target
      return
    }

    if (target === 0) {
      el.textContent = 0
      return
    }

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

function StatNumber({ value, isWarning, isZero }) {
  const ref = useCountUp(value)

  const color = isZero
    ? 'var(--sc-text-muted)'
    : isWarning
    ? 'var(--sc-warning)'
    : 'var(--sc-text)'

  const textShadow = isWarning && !isZero
    ? '0 0 20px rgba(245,158,11,0.4)'
    : undefined

  return (
    <div
      ref={ref}
      className="text-[40px] font-bold leading-none mb-2.5"
      style={{ letterSpacing: '-0.04em', color, textShadow }}
    >
      0
    </div>
  )
}

export default function Stats({ friends }) {
  const inTouch = friends.filter(f => {
    const d = daysSince(f.last_contacted)
    return d !== null && d <= 6
  })
  const needsAttn = friends.filter(f => {
    const d = daysSince(f.last_contacted)
    return d === null || d >= 7
  })
  const none = friends.length === 0

  return (
    <div className="grid grid-cols-3 mb-12" style={{ padding: '60px 0' }}>
      <div>
        <StatNumber value={friends.length} isZero={none} />
        <div className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--sc-text-muted)' }}>
          Your people
        </div>
      </div>

      <div className="pl-10">
        <StatNumber value={inTouch.length} isZero={none || inTouch.length === 0} />
        <div className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--sc-text-muted)' }}>
          In touch this week
        </div>
      </div>

      <div className="pl-10">
        <StatNumber
          value={needsAttn.length}
          isZero={none}
          isWarning={!none && needsAttn.length > 0}
        />
        <div className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--sc-text-muted)' }}>
          Need attention
        </div>
      </div>
    </div>
  )
}
