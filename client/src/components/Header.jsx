import { Sun, Moon } from 'lucide-react'

export default function Header({ theme, onToggleTheme, onAdd }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--sc-border)]" style={{ background: 'var(--sc-bg)' }}>
      <div className="max-w-[800px] mx-auto h-16 flex items-center justify-between px-6">

        <div className="flex items-center gap-2.5">
          <svg className="sc-pin" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5C5 1.5 2.5 4 2.5 7C2.5 10.5 8 14.5 8 14.5C8 14.5 13.5 10.5 13.5 7C13.5 4 11 1.5 8 1.5Z" fill="#22c55e"/>
            <path d="M8 4.5V10.5M8 4.5C8 4.5 6 6.5 6 8.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[17px] font-semibold tracking-tight leading-none" style={{ color: 'var(--sc-text)' }}>
              Stay Close
            </span>
            <span className="text-[11px] leading-none" style={{ color: 'var(--sc-text-muted)' }}>
              The people who matter, remembered.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="w-[34px] h-[34px] flex items-center justify-center rounded-lg cursor-pointer bg-transparent transition-colors duration-150"
            style={{
              border: '1px solid var(--sc-border)',
              color: 'var(--sc-text-muted)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--sc-border-act)'
              e.currentTarget.style.color = 'var(--sc-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--sc-border)'
              e.currentTarget.style.color = 'var(--sc-text-muted)'
            }}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={13} />}
          </button>

          <button
            onClick={onAdd}
            className="rounded-full px-4 py-[9px] text-[13px] font-semibold cursor-pointer border-none leading-none transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97]"
            style={{ background: 'var(--sc-accent)', color: '#000' }}
          >
            + Add someone
          </button>
        </div>

      </div>
    </header>
  )
}
