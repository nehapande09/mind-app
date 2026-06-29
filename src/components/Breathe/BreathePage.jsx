import { useState, useEffect, useRef, useCallback } from 'react'

const PATTERNS = [
  {
    id: 'box',
    name: 'Box breathing',
    desc: 'Used by Navy SEALs to stay calm under pressure',
    emoji: '⬛',
    phases: [
      { label: 'Inhale',  duration: 4, scale: 1,    color: '#7C9A8E', hint: 'Breathe in slowly…' },
      { label: 'Hold',    duration: 4, scale: 1,    color: '#8B7EC8', hint: 'Hold steady…'       },
      { label: 'Exhale',  duration: 4, scale: 0.65, color: '#B5876A', hint: 'Let it go…'         },
      { label: 'Hold',    duration: 4, scale: 0.65, color: '#4A87A8', hint: 'Rest here…'         },
    ],
  },
  {
    id: '478',
    name: '4-7-8 breathing',
    desc: 'Dr Weil\'s technique to calm the nervous system fast',
    emoji: '🌙',
    phases: [
      { label: 'Inhale',  duration: 4, scale: 1,    color: '#7C9A8E', hint: 'Breathe in…'        },
      { label: 'Hold',    duration: 7, scale: 1,    color: '#8B7EC8', hint: 'Hold gently…'       },
      { label: 'Exhale',  duration: 8, scale: 0.65, color: '#B5876A', hint: 'Slow release…'      },
    ],
  },
  {
    id: 'calm',
    name: 'Simple calm',
    desc: 'Gentle breath for everyday moments',
    emoji: '🌿',
    phases: [
      { label: 'Inhale',  duration: 4, scale: 1,    color: '#7C9A8E', hint: 'Breathe in…'        },
      { label: 'Exhale',  duration: 6, scale: 0.65, color: '#4D8C6A', hint: 'Release slowly…'   },
    ],
  },
]

export default function BreathePage() {
  const [selected, setSelected] = useState(PATTERNS[0])
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [cycles, setCycles] = useState(0)
  const timerRef = useRef(null)
  const countRef = useRef(null)

  const phase = selected.phases[phaseIdx]

  const stop = useCallback(() => {
    clearTimeout(timerRef.current)
    clearInterval(countRef.current)
    setRunning(false)
    setPhaseIdx(0)
    setCountdown(0)
    setCycles(0)
  }, [])

  const nextPhase = useCallback((pattern, idx, cyc) => {
    const next = (idx + 1) % pattern.phases.length
    const newCycles = next === 0 ? cyc + 1 : cyc
    setPhaseIdx(next)
    setCycles(newCycles)
    const dur = pattern.phases[next].duration
    setCountdown(dur)

    clearInterval(countRef.current)
    countRef.current = setInterval(() => {
      setCountdown(c => c > 1 ? c - 1 : c)
    }, 1000)

    timerRef.current = setTimeout(() => nextPhase(pattern, next, newCycles), dur * 1000)
  }, [])

  const start = useCallback(() => {
    stop()
    const dur = selected.phases[0].duration
    setPhaseIdx(0)
    setCycles(0)
    setCountdown(dur)
    setRunning(true)

    countRef.current = setInterval(() => {
      setCountdown(c => c > 1 ? c - 1 : c)
    }, 1000)
    timerRef.current = setTimeout(() => nextPhase(selected, 0, 0), dur * 1000)
  }, [selected, stop, nextPhase])

  useEffect(() => () => { clearTimeout(timerRef.current); clearInterval(countRef.current) }, [])

  const handlePattern = (p) => { stop(); setSelected(p) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-medium" style={{ color: 'var(--text)' }}>
          Breathe
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Slow your breath, slow your mind.
        </p>
      </div>

      {/* Pattern selector */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {PATTERNS.map(p => (
          <button
            key={p.id}
            onClick={() => handlePattern(p)}
            className="card p-3 text-left transition-all"
            style={{
              borderColor: selected.id === p.id ? 'var(--accent)' : 'var(--border)',
              borderWidth: selected.id === p.id ? 2 : 1,
            }}
          >
            <span className="text-xl">{p.emoji}</span>
            <p className="text-xs font-medium mt-1" style={{ color: 'var(--text)' }}>{p.name}</p>
            <p className="text-xs mt-0.5 leading-tight" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
          </button>
        ))}
      </div>

      {/* Breathing circle */}
      <div className="flex flex-col items-center py-6">
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
          {/* Outer ring (ripple) */}
          {running && (
            <div
              className="absolute rounded-full"
              style={{
                width: 220, height: 220,
                border: `1.5px solid ${phase.color}40`,
                transform: `scale(${phase.scale + 0.1})`,
                transition: `transform ${phase.duration}s ease-in-out`,
              }}
            />
          )}
          {/* Main circle */}
          <div
            className="rounded-full flex flex-col items-center justify-center"
            style={{
              width: 180, height: 180,
              background: running ? `${phase.color}18` : 'var(--surface)',
              border: `2px solid ${running ? phase.color : 'var(--border)'}`,
              transform: running ? `scale(${phase.scale})` : 'scale(0.82)',
              transition: running ? `transform ${phase.duration}s ease-in-out, background ${phase.duration * 0.5}s ease, border-color 0.4s` : 'transform 0.6s ease, background 0.4s, border-color 0.4s',
            }}
          >
            {running ? (
              <>
                <span className="font-serif text-3xl font-medium" style={{ color: phase.color }}>
                  {countdown}
                </span>
                <span className="text-xs mt-1" style={{ color: phase.color, opacity: 0.8 }}>
                  {phase.label}
                </span>
              </>
            ) : (
              <span className="text-3xl">🌬️</span>
            )}
          </div>
        </div>

        {/* Hint text */}
        <p
          className="text-sm mt-4 text-center transition-all"
          style={{ color: running ? phase.color : 'var(--text-muted)', minHeight: 22 }}
        >
          {running ? phase.hint : 'Press start when you\'re ready'}
        </p>

        {/* Cycles count */}
        {running && cycles > 0 && (
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {cycles} {cycles === 1 ? 'cycle' : 'cycles'} completed
          </p>
        )}

        {/* Controls */}
        <div className="flex gap-3 mt-6">
          {!running ? (
            <button onClick={start} className="btn-primary px-8 flex items-center gap-2">
              <PlayIcon /> Start
            </button>
          ) : (
            <button onClick={stop} className="btn-ghost px-8 flex items-center gap-2">
              <StopIcon /> Stop
            </button>
          )}
        </div>
      </div>

      {/* Phase guide */}
      <div className="card p-4 mt-6">
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          THIS PATTERN
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {selected.phases.map((ph, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div
                  className="rounded-full w-2 h-2 transition-all"
                  style={{
                    background: running && phaseIdx === i ? phase.color : 'var(--border)',
                    transform: running && phaseIdx === i ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
                <span className="text-xs mt-1" style={{ color: running && phaseIdx === i ? ph.color : 'var(--text-muted)' }}>
                  {ph.label}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
                  {ph.duration}s
                </span>
              </div>
              {i < selected.phases.length - 1 && (
                <div style={{ width: 20, height: 1, background: 'var(--border)', marginBottom: 28 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Panic tip */}
      <div
        className="mt-4 rounded-2xl p-4 text-sm"
        style={{ background: 'var(--surface2)', color: 'var(--text-muted)', lineHeight: 1.6 }}
      >
        <span className="mr-1">💛</span>
        <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Feeling panicked?</strong>
        {' '}Try box breathing first — 4 counts for each phase. Even 2 full cycles can calm your nervous system significantly.
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  )
}
function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>
  )
}
