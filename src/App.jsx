import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav/Nav'
import Welcome from './components/Welcome'
import DiaryPage from './components/Diary/DiaryPage'
import BreathePage from './components/Breathe/BreathePage'
import IBelievePage from './components/IBelieve/IBelievePage'
import PanicGuidePage from './components/PanicGuide/PanicGuidePage'
import BookRecPage from './components/BookRec/BookRecPage'
import AboutPage from './components/About/AboutPage'
import HowToUsePage from './components/HowToUse/HowToUsePage'

function AppContent() {
  const [page, setPage] = useState('diary')
  const [welcomed, setWelcomed] = useState(() => !!localStorage.getItem('ym-welcomed'))

  function handleEnter() {
    localStorage.setItem('ym-welcomed', '1')
    setWelcomed(true)
  }

  if (!welcomed) return <Welcome onEnter={handleEnter} />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav page={page} setPage={setPage} />
      <main style={{ paddingBottom: 40 }}>
        {page === 'diary'   && <DiaryPage />}
        {page === 'breathe' && <BreathePage />}
        {page === 'believe' && <IBelievePage />}
        {page === 'panic'   && <PanicGuidePage />}
        {page === 'books'   && <BookRecPage />}
        {page === 'about'   && <AboutPage />}
        {page === 'howto'   && <HowToUsePage setPage={setPage} />}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
