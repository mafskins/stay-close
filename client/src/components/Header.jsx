import { Sun, Moon } from 'lucide-react'

export default function Header({ t, mode, greeting, onToggleTheme, onAdd }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: t.bg,
      borderBottom: `1px solid ${t.border}`,
      overflow: 'hidden',
    }}>
      {/* Pounamu glow — faint green light through the header, like light through greenstone */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 120% 180% at 50% -40%, rgba(34,197,94,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

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

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg className="sc-pin" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5C5 1.5 2.5 4 2.5 7C2.5 10.5 8 14.5 8 14.5C8 14.5 13.5 10.5 13.5 7C13.5 4 11 1.5 8 1.5Z" fill="#22c55e"/>
            <path d="M8 4.5V10.5M8 4.5C8 4.5 6 6.5 6 8.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: t.text, lineHeight: 1 }}>
              Stay Close
            </span>
            <span style={{ fontSize: 11, color: t.muted, lineHeight: 1 }}>
              {greeting}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              background: 'transparent',
              color: t.muted,
              cursor: 'pointer',
              transition: 'border-color 150ms ease, color 150ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = t.borderAct
              e.currentTarget.style.color = t.text
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = t.border
              e.currentTarget.style.color = t.muted
            }}
          >
            {mode === 'dark' ? <Sun size={14} /> : <Moon size={13} />}
          </button>

          <button
            onClick={onAdd}
            style={{
              background: t.accent,
              color: '#000',
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
