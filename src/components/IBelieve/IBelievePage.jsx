import { useState, useRef } from 'react'

const PROMPTS = [
  'I am letting go of…',
  'Today I felt…',
  'I am proud that I…',
  'What scared me today was…',
  'I forgive myself for…',
  'I am grateful for…',
  'What I really need right now is…',
  'I believe in myself because…',
  'Something I want to release is…',
  'Tomorrow I will…',
]

const AFFIRMATIONS = [
  'Your feelings are valid. You are enough.',
  'You are not your thoughts. You are the one who notices them.',
  'Being brave doesn\'t mean not being afraid. It means writing anyway.',
  'Every word you write is a step towards feeling lighter.',
  'You are doing better than you think.',
  'Your mind is not your enemy. It just needs a gentle place to rest.',
  'You deserve to take up space — in this page, and in this world.',
  'This too shall pass. You\'ve survived hard days before.',
]

const RELEASE_ANIMATIONS = ['burn', 'float', 'dissolve']

export default function IBelievePage() {
  const [text, setText] = useState('')
  const [prompt, setPrompt] = useState(null)
  const [phase, setPhase] = useState('write')   // write | releasing | done
  const [affirmation, setAffirmation] = useState('')
  const [releaseType] = useState(() => RELEASE_ANIMATIONS[Math.floor(Math.random() * 3)])
  const textareaRef = useRef()

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  function pickPrompt() {
    const p = PROMPTS[Math.floor(Math.random() * PROMPTS.length)]
    setPrompt(p)
    setText(p + ' ')
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  function handleRelease() {
    if (!text.trim()) return
    const aff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]
    setAffirmation(aff)
    setPhase('releasing')
    setTimeout(() => setPhase('done'), 1800)
  }

  function handleAgain() {
    setText('')
    setPrompt(null)
    setPhase('write')
    setAffirmation('')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-medium" style={{ color: 'var(--text)' }}>
          I believe
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          When you write your emotions, they lose their weight. This page holds nothing — words vanish when released.
        </p>
      </div>

      {phase === 'write' && (
        <WritePhase
          text={text}
          setText={setText}
          prompt={prompt}
          pickPrompt={pickPrompt}
          wordCount={wordCount}
          onRelease={handleRelease}
          textareaRef={textareaRef}
        />
      )}

      {phase === 'releasing' && (
        <ReleasingPhase text={text} type={releaseType} />
      )}

      {phase === 'done' && (
        <DonePhase affirmation={affirmation} onAgain={handleAgain} />
      )}
    </div>
  )
}

function WritePhase({ text, setText, prompt, pickPrompt, wordCount, onRelease, textareaRef }) {
  return (
    <div className="animate-fade-in">
      {/* Prompt picker */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={pickPrompt} className="btn-ghost text-xs flex items-center gap-1.5">
          <SparkleIcon />
          {prompt ? 'Try another prompt' : 'Need a prompt?'}
        </button>
        {prompt && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            "{prompt}"
          </span>
        )}
      </div>

      {/* Main textarea */}
      <div className="card p-1 mb-4" style={{ background: 'var(--surface)' }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Start writing… there are no rules here. No one will see this. Let yourself be honest."
          rows={10}
          className="w-full px-5 py-4 resize-none leading-loose font-serif"
          style={{
            fontSize: 16,
            lineHeight: 2,
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent',
            color: 'var(--text)',
          }}
        />
        <div className="flex items-center justify-between px-5 pb-4">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {wordCount > 0 ? `${wordCount} words` : 'Only you can see this'}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
            Words disappear when released ✦
          </span>
        </div>
      </div>

      {/* Release button */}
      <button
        onClick={onRelease}
        disabled={!text.trim()}
        className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base"
        style={{ opacity: !text.trim() ? 0.45 : 1, borderRadius: 14 }}
      >
        <ReleaseIcon />
        Release these words
      </button>

      {/* Info */}
      <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
        Nothing is saved. Your words exist only for this moment.
      </p>

      {/* Affirmation cards */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        {['You are safe.', 'You are enough.', 'This will pass.', 'You are loved.'].map(a => (
          <div
            key={a}
            className="rounded-2xl p-4 text-center font-serif text-sm"
            style={{ background: 'var(--surface2)', color: 'var(--text-muted)', lineHeight: 1.6 }}
          >
            {a}
          </div>
        ))}
      </div>
    </div>
  )
}

function ReleasingPhase({ text, type }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div
        className="font-serif text-base leading-relaxed text-center max-w-md"
        style={{
          color: 'var(--text)',
          opacity: 0,
          animation: 'releaseOut 1.8s ease-in-out forwards',
        }}
      >
        {text.slice(0, 80)}{text.length > 80 ? '…' : ''}
      </div>
      <p className="text-xs mt-8" style={{ color: 'var(--text-muted)' }}>
        Letting go…
      </p>
      <style>{`
        @keyframes releaseOut {
          0%   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
          60%  { opacity: 0.4; transform: translateY(-20px) scale(0.97); filter: blur(2px); }
          100% { opacity: 0; transform: translateY(-40px) scale(0.94); filter: blur(6px); }
        }
      `}</style>
    </div>
  )
}

function DonePhase({ affirmation, onAgain }) {
  return (
    <div className="flex flex-col items-center text-center py-12 animate-slide-up">
      <div className="text-4xl mb-5">🌸</div>
      <h2 className="font-serif text-xl font-medium mb-3" style={{ color: 'var(--text)' }}>
        Released.
      </h2>
      <p
        className="font-serif text-base leading-relaxed max-w-sm mb-8"
        style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontStyle: 'italic' }}
      >
        "{affirmation}"
      </p>

      <div className="flex gap-3">
        <button onClick={onAgain} className="btn-primary flex items-center gap-2">
          <PenIcon />
          Write again
        </button>
      </div>

      {/* Small breathing nudge */}
      <div
        className="mt-8 rounded-2xl px-5 py-4 text-sm max-w-sm"
        style={{ background: 'var(--surface2)', color: 'var(--text-muted)', lineHeight: 1.7 }}
      >
        🌬️ Take three slow breaths now — in through the nose, out through the mouth. You've earned them.
      </div>
    </div>
  )
}

/* Icons */
function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  )
}
function ReleaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>
    </svg>
  )
}
function PenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  )
}
