import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { id: 'diary',   label: 'Diary',    icon: BookIcon },
  { id: 'breathe', label: 'Breathe',  icon: WindIcon },
  { id: 'believe', label: 'I Believe', icon: HeartIcon },
  { id: 'panic',   label: 'Anchor',   icon: AnchorIcon },
  { id: 'books',   label: 'Books',    icon: LibraryIcon },
]

export default function Nav({ page, setPage }) {
  const { theme, setTheme, themes } = useTheme()
  const [showThemes, setShowThemes] = useState(false)
  const [showMore, setShowMore] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <button onClick={() => setPage('diary')} className="flex items-center gap-2 font-serif text-base font-medium" style={{ color: 'var(--text)' }}>
          <LeafIcon /><span>YouMatter</span>
        </button>

        <div className="flex items-center gap-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setPage(id)} title={label}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm transition-all"
              style={{ background: page === id ? 'var(--accent)' : 'transparent', color: page === id ? '#fff' : 'var(--text-muted)', fontWeight: page === id ? 500 : 400 }}>
              <Icon size={15} />
              <span className="hidden md:inline text-xs">{label}</span>
            </button>
          ))}

          {/* More menu */}
          <div className="relative">
            <button onClick={() => setShowMore(v => !v)} title="More"
              className="flex items-center justify-center w-8 h-8 rounded-xl transition-all ml-0.5"
              style={{ background: (page === 'howto' || page === 'about') ? 'var(--accent)' : 'var(--surface2)', color: (page === 'howto' || page === 'about') ? '#fff' : 'var(--text-muted)' }}>
              <MoreIcon size={15} />
            </button>
            {showMore && (
              <div className="absolute right-0 top-10 card shadow-lg p-1.5 w-44 z-50" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                {[{ id: 'howto', label: '✦ How to use', }, { id: 'about', label: '🌿 About' }].map(item => (
                  <button key={item.id} onClick={() => { setPage(item.id); setShowMore(false) }}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm transition-all"
                    style={{ background: page === item.id ? 'var(--surface2)' : 'transparent', color: 'var(--text)', fontWeight: page === item.id ? 500 : 400 }}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme */}
          <div className="relative ml-0.5">
            <button onClick={() => setShowThemes(v => !v)} title="Change theme"
              className="flex items-center justify-center w-8 h-8 rounded-xl transition-all"
              style={{ background: 'var(--surface2)', color: 'var(--text-muted)' }}>
              <PaletteIcon size={15} />
            </button>
            {showThemes && (
              <div className="absolute right-0 top-10 card shadow-lg p-2 w-48 z-50" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                {themes.map(t => (
                  <button key={t.id} onClick={() => { setTheme(t.id); setShowThemes(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-all"
                    style={{ background: theme === t.id ? 'var(--surface2)' : 'transparent', color: 'var(--text)', fontWeight: theme === t.id ? 500 : 400 }}>
                    <span>{t.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13 }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.desc}</div>
                    </div>
                    {theme === t.id && <CheckIcon size={14} style={{ marginLeft: 'auto', color: 'var(--accent)' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {(showThemes || showMore) && <div className="fixed inset-0 z-40" onClick={() => { setShowThemes(false); setShowMore(false) }} />}
    </nav>
  )
}

function LeafIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>)
}
function BookIcon({ size = 15 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>)
}
function WindIcon({ size = 15 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>)
}
function HeartIcon({ size = 15 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>)
}
function AnchorIcon({ size = 15 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>)
}
function LibraryIcon({ size = 15 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>)
}
function PaletteIcon({ size = 15 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>)
}
function MoreIcon({ size = 15 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>)
}
function CheckIcon({ size = 14, style }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="20 6 9 17 4 12"/></svg>)
}
