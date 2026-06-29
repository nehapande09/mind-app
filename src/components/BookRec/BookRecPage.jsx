import { useState, useCallback } from 'react'
import { useDiary } from '../../hooks/useDiary'

const MOOD_DEFAULTS = {
  happy:    { book: 'The Alchemist',          author: 'Paulo Coelho',      why: 'To ride that joy further and remind yourself the universe conspires for dreamers.' },
  calm:     { book: 'The Midnight Library',   author: 'Matt Haig',         why: 'A gentle story about the infinite lives we could live — perfect for a peaceful mind.' },
  anxious:  { book: 'Anxious People',         author: 'Fredrik Backman',   why: 'About imperfect, anxious humans finding each other — funny, warm, and deeply human.' },
  sad:      { book: 'When Things Fall Apart', author: 'Pema Chödrön',     why: 'A Buddhist teacher\'s gentle guide to sitting with pain without being swallowed by it.' },
  grateful: { book: 'The Gifts of Imperfection', author: 'Brené Brown',   why: 'To deepen that gratitude — it\'s about living wholeheartedly and letting go of who you think you should be.' },
  tired:    { book: 'Winnie-the-Pooh',        author: 'A.A. Milne',        why: 'The wisest book ever written, disguised as a children\'s story. Perfect for tired souls.' },
  hopeful:  { book: 'Atomic Habits',          author: 'James Clear',       why: 'Channel that hope into small, powerful changes that compound quietly over time.' },
  angry:    { book: 'The Four Agreements',    author: 'Don Miguel Ruiz',   why: 'Four simple but life-changing ideas about not taking things personally and doing your best.' },
}

async function getBookFromAI(mood, diaryText) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 200,
        system: `You are a warm, empathetic book therapist. Based on someone's diary entry and mood, recommend exactly ONE book that would genuinely help or resonate with them right now.

Reply ONLY in this exact JSON format (no other text):
{"title":"Book Title","author":"Author Name","why":"A warm 1-2 sentence reason why this book is perfect for them right now, speaking directly to them.","genre":"Fiction/Non-fiction/Poetry/etc"}`,
        messages: [{
          role: 'user',
          content: `Mood: ${mood}\n\nDiary entry (last 300 chars): ${diaryText?.slice(-300) || 'No entry yet'}`,
        }],
      }),
    })
    const data = await res.json()
    const raw = data.content?.[0]?.text?.trim()
    const clean = raw?.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return null
  }
}

export default function BookRecPage() {
  const { entries } = useDiary()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [savedBooks, setSavedBooks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ym-books') || '[]') } catch { return [] }
  })

  const lastEntry = entries[0]
  const lastMood  = lastEntry?.mood || 'calm'
  const moodLabel = lastMood.charAt(0).toUpperCase() + lastMood.slice(1)

  const getRecommendation = useCallback(async () => {
    setLoading(true)
    setBook(null)
    const aiBook = await getBookFromAI(lastMood, lastEntry?.text)
    if (aiBook) {
      setBook({ ...aiBook, source: 'ai' })
    } else {
      const fallback = MOOD_DEFAULTS[lastMood] || MOOD_DEFAULTS.calm
      setBook({ ...fallback, source: 'curated' })
    }
    setLoading(false)
  }, [lastMood, lastEntry])

  function saveBook(b) {
    const updated = [{ ...b, savedAt: new Date().toISOString(), mood: lastMood }, ...savedBooks]
      .slice(0, 10)
    setSavedBooks(updated)
    localStorage.setItem('ym-books', JSON.stringify(updated))
  }

  const alreadySaved = book && savedBooks.some(s => s.title === book.title)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-medium" style={{ color: 'var(--text)' }}>
          Your next read
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          A book chosen just for how you're feeling today.
        </p>
      </div>

      {/* Mood context */}
      {lastEntry ? (
        <div
          className="rounded-2xl p-4 mb-6 flex items-center gap-3"
          style={{ background: 'var(--surface2)' }}
        >
          <span className="text-2xl">
            {lastMood === 'happy' ? '😊' : lastMood === 'calm' ? '😌' : lastMood === 'anxious' ? '😰' :
             lastMood === 'sad' ? '😢' : lastMood === 'grateful' ? '🙏' : lastMood === 'tired' ? '😴' :
             lastMood === 'hopeful' ? '🌱' : '😤'}
          </span>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Your last mood: {moodLabel}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Based on your diary entry · {new Date(lastEntry.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-4 mb-6"
          style={{ background: 'var(--surface2)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            ✏️ Write a diary entry first — I'll pick a book based on your mood.
          </p>
        </div>
      )}

      {/* Get recommendation button */}
      {!book && !loading && (
        <button
          onClick={getRecommendation}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base"
          style={{ borderRadius: 14 }}
        >
          <BookOpenIcon />
          Find my book
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className="card p-8 flex flex-col items-center animate-pulse-soft">
          <span className="text-3xl mb-3">📚</span>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Finding the perfect book for you…
          </p>
        </div>
      )}

      {/* Book card */}
      {book && !loading && (
        <div className="animate-slide-up">
          <div className="card p-6">
            {/* Book visual */}
            <div className="flex gap-5 mb-5">
              <BookCover title={book.title} />
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-1" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                  {book.genre || 'Recommended for you'}
                </p>
                <h2 className="font-serif text-xl font-medium leading-tight mb-1" style={{ color: 'var(--text)' }}>
                  {book.title}
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  by {book.author}
                </p>
                {book.source === 'ai' && (
                  <span
                    className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--surface2)', color: 'var(--text-muted)' }}
                  >
                    ✦ AI-picked for today
                  </span>
                )}
              </div>
            </div>

            {/* Why */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--surface2)', borderLeft: '3px solid var(--accent)', borderRadius: 12 }}
            >
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--accent)' }}>Why this book, right now</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)', lineHeight: 1.7 }}>
                {book.why}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => !alreadySaved && saveBook(book)}
                className="btn-ghost flex items-center gap-1.5 text-sm"
                style={{ color: alreadySaved ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                <BookmarkIcon />
                {alreadySaved ? 'Saved' : 'Save this'}
              </button>
              <button
                onClick={getRecommendation}
                className="btn-ghost flex items-center gap-1.5 text-sm"
              >
                <RefreshIcon />
                Try another
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading list */}
      {savedBooks.length > 0 && (
        <div className="mt-8">
          <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            YOUR READING LIST
          </p>
          <div className="space-y-2">
            {savedBooks.map((b, i) => (
              <div key={i} className="card px-4 py-3 flex items-center gap-3">
                <span className="text-lg">📖</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{b.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>by {b.author}</p>
                </div>
                <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
                  when {b.mood}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function BookCover({ title }) {
  const colors = [
    ['#7C9A8E', '#5A7A6E'],
    ['#8B7EC8', '#6A5EA8'],
    ['#B5876A', '#955A40'],
    ['#4A87A8', '#2A6788'],
  ]
  const idx = title.length % colors.length
  const [bg, spine] = colors[idx]
  const initials = title.split(' ').slice(0, 2).map(w => w[0]).join('')

  return (
    <div className="relative shrink-0" style={{ width: 72, height: 96 }}>
      <div
        className="absolute inset-0 rounded-r-md flex items-center justify-center"
        style={{ background: bg }}
      >
        <span className="font-serif text-xl font-medium text-white opacity-80">{initials}</span>
      </div>
      <div
        className="absolute left-0 top-0 bottom-0 rounded-l-sm"
        style={{ width: 8, background: spine }}
      />
    </div>
  )
}

/* Icons */
function BookOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  )
}
function BookmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  )
}
function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
    </svg>
  )
}
