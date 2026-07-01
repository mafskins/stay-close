import { Sun, Moon } from 'lucide-react'

export default function Header({ t, mode, greeting, onToggleTheme, onAdd }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: t.bg,
      borderBottom: '1px solid ' + t.border,
      overflow: 'visible',
    }}>
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'relative',
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 28, height: 32, flexShrink: 0 }}>
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
              <path d="M14 2C8.48 2 4 6.48 4 12C4 19.5 14 30 14 30C14 30 24 19.5 24 12C24 6.48 19.52 2 14 2Z" fill={t.accent} />
              <circle cx="14" cy="12" r="4" fill={t.bg} />
            </svg>
            <span style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 36, height: 36, borderRadius: '50%',
              border: '2px solid ' + t.accent,
              opacity: 0,
              animation: 'pinRipple 2.4s ease-out infinite',
              pointerEvents: 'none',
            }} />
            <span style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 36, height: 36, borderRadius: '50%',
              border: '2px solid ' + t.accent,
              opacity: 0,
              animation: 'pinRipple 2.4s ease-out 0.8s infinite',
              pointerEvents: 'none',
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: t.text, lineHeight: 1 }}>
              Stay Close
            </span>
            <span style={{ fontSize: 11, color: t.muted, lineHeight: 1 }}>
              {greeting}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 8,
              border: '1px solid ' + t.border,
              background: 'transparent',
              color: t.muted,
              cursor: 'pointer',
              transition: 'border-color 150ms ease, color 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderAct; e.currentTarget.style.color = t.text }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted }}
          >
            {mode === 'dark' ? <Sun size={14} /> : <Moon size={13} />}
          </button>

          <button
            onClick={onAdd}
            style={{
              background: t.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 9999,
              padding: '9px 16px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              lineHeight: 1,
              transition: 'filter 150ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}
          >
            + Add someone
          </button>
        </div>

      </div>
    </header>
  )
}
