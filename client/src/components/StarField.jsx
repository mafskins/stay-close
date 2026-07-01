import { useMemo } from 'react'

export default function StarField() {
  const stars = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    duration: Math.random() * 5 + 2,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.5 + 0.1,
  })), [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {stars.map(s => (
        <div
          key={s.id}
          className="sc-star"
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            backgroundColor: s.id % 5 === 0 ? '#a78bfa' : s.id % 7 === 0 ? '#93c5fd' : '#ffffff',
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  )
}
