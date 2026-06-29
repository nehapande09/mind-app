import { useState, useCallback } from 'react'
import { useDiary } from '../../hooks/useDiary'

const MOODS = {
  happy:    { emoji: '😊', label: 'Happy',    color: '#7C9A8E' },
  calm:     { emoji: '😌', label: 'Calm',     color: '#8B7EC8' },
  anxious:  { emoji: '😰', label: 'Anxious',  color: '#B5876A' },
  sad:      { emoji: '😢', label: 'Sad',      color: '#4A87A8' },
  grateful: { emoji: '🙏', label: 'Grateful', color: '#7CAE7A' },
  tired:    { emoji: '😴', label: 'Tired',    color: '#9A8E7C' },
  hopeful:  { emoji: '🌱', label: 'Hopeful',  color: '#6BAA8E' },
  angry:    { emoji: '😤', label: 'Tense',    color: '#C47A7A' },
}

async function detectMood(text) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 50,
        system: 'You detect the dominant mood from diary text. Reply with ONLY one word from this list: happy, calm, anxious, sad, grateful, tired, hopeful, angry. No explanation.',
        messages: [{ role: 'user', content: text.slice(0, 500) }],
      }),
    })
    const data = await res.json()
    const word = data.content?.[0]?.text?.trim().toLowerCase()
    return MOODS[word] ? word : 'calm'
  } catch {
    return 'calm'
  }
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function groupByDate(entries) {
  const groups = {}
  entries.forEach(e => {
    const key = new Date(e.date).toDateString()
    if (!groups[key]) groups[key] = []
    groups[key].push(e)
  })
  return Object.entries(groups)
}

export default function DiaryPage() {
  const { entries, addEntry, deleteEntry, setMood } = useDiary()
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  const handleSave = useCallback(async () => {
    if (!text.trim()) return
    setSaving(true)
    const entry = addEntry(text.trim(), title.trim())
    setText('')
    setTitle('')
    // detect mood async
    const mood = await detectMood(entry.text)
    setMood(entry.id, mood)
    setSaving(false)
  }, [text, title, addEntry, setMood])

  const handleDelete = (id) => {
    setDeletingId(id)
    setTimeout(() => { deleteEntry(id); setDeletingId(null) }, 300)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-medium" style={{ color: 'var(--text)' }}>
          Your diary
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Write area */}
      <div className="card p-5 mb-8">
        <input
          type="text"
          placeholder="Give this entry a title… (optional)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full rounded-xl px-4 py-2.5 text-sm mb-3"
          style={{ fontSize: 14 }}
        />
        <textarea
          placeholder="What's on your mind today? Let it all out here — no judgment, just you and your thoughts…"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={6}
          className="w-full rounded-xl px-4 py-3 text-sm resize-none leading-relaxed"
          style={{ fontSize: 15, lineHeight: 1.7 }}
        />

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {wordCount > 0 ? `${wordCount} word${wordCount === 1 ? '' : 's'}` : 'Start writing…'}
          </span>
          <button
            onClick={handleSave}
            disabled={!text.trim() || saving}
            className="btn-primary flex items-center gap-2"
            style={{ opacity: (!text.trim() || saving) ? 0.5 : 1 }}
          >
            {saving ? (
              <>
                <SpinIcon />
                <span>Saving…</span>
              </>
            ) : (
              <>
                <SaveIcon />
                <span>Save entry</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Entries list */}
      {entries.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {groupByDate(entries).map(([dateStr, dayEntries]) => (
            <div key={dateStr}>
              <p className="text-xs font-medium mb-3 px-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                {new Date(dayEntries[0].date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
              </p>
              <div className="space-y-3">
                {dayEntries.map(entry => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    onDelete={() => handleDelete(entry.id)}
                    fading={deletingId === entry.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EntryCard({ entry, onDelete, fading }) {
  const [expanded, setExpanded] = useState(false)
  const mood = entry.mood ? MOODS[entry.mood] : null
  const isLong = entry.text.length > 180

  return (
    <div
      className="card p-4 transition-all"
      style={{
        opacity: fading ? 0 : 1,
        transform: fading ? 'translateY(8px)' : 'none',
        transition: 'opacity 0.3s, transform 0.3s',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {entry.title && (
            <span className="font-medium text-sm" style={{ color: 'var(--text)' }}>
              {entry.title}
            </span>
          )}
          {mood && (
            <span
              className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: mood.color + '20', color: mood.color }}
            >
              {mood.emoji} {mood.label}
            </span>
          )}
          {!mood && entry.mood === null && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <SpinIcon small /> detecting mood…
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 ml-2 shrink-0">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {new Date(entry.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={onDelete}
            className="ml-1 p-1 rounded-lg transition-all"
            style={{ color: 'var(--text-muted)' }}
            title="Delete entry"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{
          color: 'var(--text)',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 4,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'pre-wrap',
        }}
      >
        {entry.text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-xs mt-2"
          style={{ color: 'var(--accent)' }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-3">📖</div>
      <p className="font-serif text-base" style={{ color: 'var(--text-muted)' }}>
        Your diary is empty
      </p>
      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
        Write your first entry above — it's just for you.
      </p>
    </div>
  )
}

/* Icons */
function SaveIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  )
}
function SpinIcon({ small }) {
  const s = small ? 11 : 14
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin" style={{ display: 'inline' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  )
}
