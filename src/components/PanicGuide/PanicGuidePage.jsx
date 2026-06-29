import { useState } from 'react'

const GROUNDING = [
  {
    count: 5,
    sense: 'see',
    color: '#7C9A8E',
    icon: '👁️',
    instruction: 'Name 5 things you can see right now.',
    hint: 'Look slowly around the room. A cup, a light, your hands…',
    placeholder: 'I can see…',
  },
  {
    count: 4,
    sense: 'touch',
    color: '#8B7EC8',
    icon: '🤲',
    instruction: 'Notice 4 things you can physically feel.',
    hint: 'Your feet on the floor, clothes on your skin, air on your face…',
    placeholder: 'I can feel…',
  },
  {
    count: 3,
    sense: 'hear',
    color: '#4A87A8',
    icon: '👂',
    instruction: 'Listen for 3 sounds around you.',
    hint: 'Wind, traffic, your own breathing, a fan humming…',
    placeholder: 'I can hear…',
  },
  {
    count: 2,
    sense: 'smell',
    color: '#4D8C6A',
    icon: '👃',
    instruction: 'Find 2 things you can smell.',
    hint: 'Coffee, rain, your own skin, fabric…',
    placeholder: 'I can smell…',
  },
  {
    count: 1,
    sense: 'taste',
    color: '#B5876A',
    icon: '👄',
    instruction: 'Notice 1 thing you can taste.',
    hint: 'Water, food, even just the taste inside your mouth…',
    placeholder: 'I can taste…',
  },
]

const QUICK_STEPS = [
  {
    emoji: '✋',
    title: 'Stop and name it',
    body: 'Say out loud or in your head: "I am having a panic attack. It is temporary. It will pass. I am safe."',
  },
  {
    emoji: '🌬️',
    title: 'Breathe with your belly',
    body: 'Put one hand on your stomach. Breathe in for 4 counts — feel your belly rise. Hold 1. Out for 6. Repeat.',
  },
  {
    emoji: '🦶',
    title: 'Feel the ground',
    body: 'Press your feet firmly into the floor. Feel the solid surface beneath you. You are physically safe right now.',
  },
  {
    emoji: '💧',
    title: 'Cold water',
    body: 'Splash cold water on your face or hold ice if you have it. Cold activates your body\'s natural calm response.',
  },
  {
    emoji: '📞',
    title: 'It\'s okay to reach out',
    body: 'Text or call someone you trust. You don\'t have to explain everything — just say "I need company right now."',
  },
]

export default function PanicGuidePage() {
  const [mode, setMode] = useState('home') // home | quick | grounding
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  function startGrounding() { setMode('grounding'); setStep(0); setAnswers({}) }
  function startQuick() { setMode('quick'); setStep(0) }
  function reset() { setMode('home'); setStep(0); setAnswers({}) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-medium" style={{ color: 'var(--text)' }}>
          Anchor yourself
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          For moments when everything feels too much.
        </p>
      </div>

      {mode === 'home' && <HomeMode onQuick={startQuick} onGrounding={startGrounding} />}
      {mode === 'quick' && <QuickMode step={step} setStep={setStep} onDone={reset} />}
      {mode === 'grounding' && (
        <GroundingMode
          step={step} setStep={setStep}
          answers={answers} setAnswers={setAnswers}
          onDone={reset}
        />
      )}
    </div>
  )
}

function HomeMode({ onQuick, onGrounding }) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Emergency banner */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'var(--surface2)', borderLeft: '3px solid var(--accent)', borderRadius: 16 }}
      >
        <p className="font-medium text-sm mb-1" style={{ color: 'var(--text)' }}>
          Right now, in this moment —
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          You are safe. Panic attacks feel dangerous but they are not. Your body is trying to protect you.
          The peak usually passes in 5–10 minutes. You have survived every single one before this.
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={onQuick}
          className="card p-5 text-left hover:scale-[1.01] transition-transform"
          style={{ cursor: 'pointer' }}
        >
          <span className="text-2xl">⚡</span>
          <p className="font-medium mt-2 mb-1" style={{ color: 'var(--text)', fontSize: 15 }}>
            Quick relief steps
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            5 fast steps to calm your nervous system right now. Takes 3–4 minutes.
          </p>
        </button>

        <button
          onClick={onGrounding}
          className="card p-5 text-left hover:scale-[1.01] transition-transform"
          style={{ cursor: 'pointer' }}
        >
          <span className="text-2xl">🌿</span>
          <p className="font-medium mt-2 mb-1" style={{ color: 'var(--text)', fontSize: 15 }}>
            5-4-3-2-1 grounding
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Use your senses to bring yourself back to the present moment.
          </p>
        </button>
      </div>

      {/* What is a panic attack */}
      <div className="card p-5 mt-2">
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          WHAT'S HAPPENING IN YOUR BODY
        </p>
        <div className="space-y-3">
          {[
            ['💓', 'Racing heart', 'Your body released adrenaline — a survival response, not danger.'],
            ['😤', 'Trouble breathing', 'You\'re breathing faster. Try breathing out longer than you breathe in.'],
            ['🌡️', 'Feeling hot or dizzy', 'Blood is rushing to your muscles. Find a cool surface to touch.'],
            ['🧠', 'Racing thoughts', 'Your brain is scanning for threats. Name what you physically see to interrupt this.'],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="flex gap-3">
              <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{title}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuickMode({ step, setStep, onDone }) {
  const current = QUICK_STEPS[step]
  const isLast = step === QUICK_STEPS.length - 1

  return (
    <div className="animate-slide-up">
      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {QUICK_STEPS.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full flex-1 transition-all"
            style={{ background: i <= step ? 'var(--accent)' : 'var(--border)' }}
          />
        ))}
      </div>

      <div className="card p-6">
        <span className="text-3xl">{current.emoji}</span>
        <h2 className="font-serif text-xl font-medium mt-3 mb-3" style={{ color: 'var(--text)' }}>
          {current.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {current.body}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="btn-ghost">
            Back
          </button>
        )}
        {!isLast ? (
          <button onClick={() => setStep(s => s + 1)} className="btn-primary flex-1 flex items-center justify-center gap-2">
            I did this <ArrowRight />
          </button>
        ) : (
          <button onClick={onDone} className="btn-primary flex-1">
            I'm feeling better ✓
          </button>
        )}
      </div>

      <button onClick={onDone} className="text-xs mt-4 block mx-auto" style={{ color: 'var(--text-muted)' }}>
        Exit guide
      </button>
    </div>
  )
}

function GroundingMode({ step, setStep, answers, setAnswers, onDone }) {
  const current = GROUNDING[step]
  const isLast = step === GROUNDING.length - 1
  const val = answers[step] || ''

  function next() {
    if (isLast) { onDone(); return }
    setStep(s => s + 1)
  }

  return (
    <div className="animate-slide-up">
      {/* Progress dots */}
      <div className="flex gap-2 items-center mb-6">
        {GROUNDING.map((g, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="rounded-full flex items-center justify-center text-xs font-medium transition-all"
              style={{
                width: i === step ? 32 : 24,
                height: i === step ? 32 : 24,
                background: i < step ? 'var(--accent)' : i === step ? current.color : 'var(--border)',
                color: i <= step ? '#fff' : 'var(--text-muted)',
                fontSize: i === step ? 13 : 11,
              }}
            >
              {i < step ? '✓' : g.count}
            </div>
            {i < GROUNDING.length - 1 && (
              <div className="h-px w-4" style={{ background: i < step ? 'var(--accent)' : 'var(--border)' }} />
            )}
          </div>
        ))}
        <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>
          {current.count} thing{current.count > 1 ? 's' : ''} to {current.sense}
        </span>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{current.icon}</span>
          <div>
            <p className="text-xs" style={{ color: current.color, fontWeight: 500 }}>
              STEP {step + 1} OF 5
            </p>
            <h2 className="font-serif text-lg font-medium" style={{ color: 'var(--text)' }}>
              {current.instruction}
            </h2>
          </div>
        </div>

        <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {current.hint}
        </p>

        <textarea
          value={val}
          onChange={e => setAnswers(a => ({ ...a, [step]: e.target.value }))}
          placeholder={current.placeholder}
          rows={3}
          className="w-full rounded-xl px-4 py-3 text-sm resize-none"
          style={{ lineHeight: 1.7 }}
        />
      </div>

      <div className="flex gap-3 mt-5">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="btn-ghost">
            Back
          </button>
        )}
        <button
          onClick={next}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
          style={{ background: current.color }}
        >
          {isLast ? 'I\'m grounded ✓' : <>Next sense <ArrowRight /></>}
        </button>
      </div>

      <button onClick={onDone} className="text-xs mt-4 block mx-auto" style={{ color: 'var(--text-muted)' }}>
        Exit guide
      </button>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}
