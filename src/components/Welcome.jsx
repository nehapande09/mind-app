import { useState, useEffect } from 'react'

export default function Welcome({ onEnter }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 80)
  }, [])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 z-50"
      style={{
        background: 'var(--bg)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Soft glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 320, height: 320,
          background: 'var(--accent)',
          opacity: 0.07,
          filter: 'blur(80px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
        }}
      />

      <div className="relative text-center max-w-sm">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            🌿
          </div>
        </div>

        <h1 className="font-serif text-4xl font-medium mb-3" style={{ color: 'var(--text)' }}>
          YouMatter
        </h1>

        <p
          className="font-serif text-lg mb-2"
          style={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.7 }}
        >
          "You are not alone.
          <br />You never were."
        </p>

        <p className="text-sm mt-4 mb-10 leading-relaxed" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
          A calm space for overthinkers.<br />
          Write. Breathe. Release. Repeat.
        </p>

        <button
          onClick={onEnter}
          className="btn-primary px-10 py-3 text-base"
          style={{ borderRadius: 16 }}
        >
          Enter your space
        </button>

        <p className="text-xs mt-6" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Everything stays on your device. Just you.
        </p>
      </div>
    </div>
  )
}
