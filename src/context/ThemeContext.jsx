import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const themes = [
  { id: 'warm',     label: 'Warm Sand',  emoji: '🌿', desc: 'Earthy & grounding' },
  { id: 'ocean',    label: 'Ocean Calm', emoji: '🌊', desc: 'Cool & flowing' },
  { id: 'lavender', label: 'Lavender',   emoji: '💜', desc: 'Soft & dreamy' },
  { id: 'forest',   label: 'Forest',     emoji: '🌲', desc: 'Deep & peaceful' },
]

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('mn-theme') || 'warm')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'warm' ? '' : theme)
    localStorage.setItem('mn-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
