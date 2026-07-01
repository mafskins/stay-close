export default function SearchBar({ value, onChange, t }) {
  return (
    <div style={{ marginBottom: 24, position: 'relative' }}>
      <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="6.5" cy="6.5" r="5" stroke={t.muted} strokeWidth="1.5"/>
        <path d="M10.5 10.5L13.5 13.5" stroke={t.muted} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search your people..."
        style={{
          width: '100%',
          padding: '10px 14px 10px 38px',
          borderRadius: 10,
          border: '1px solid ' + t.border,
          backgroundColor: t.card,
          color: t.text,
          fontSize: 14,
          fontFamily: 'inherit',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 150ms ease',
        }}
        onFocus={e => e.target.style.borderColor = t.borderAct}
        onBlur={e => e.target.style.borderColor = t.border}
      />
      {value && (
        <button onClick={() => onChange('')} style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: t.muted, cursor: 'pointer',
          fontSize: 16, lineHeight: 1, padding: 2,
        }}>×</button>
      )}
    </div>
  )
}
