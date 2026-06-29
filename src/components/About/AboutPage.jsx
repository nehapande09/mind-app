export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">

      {/* Hero */}
      <div className="text-center py-10 mb-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{ background: 'var(--surface2)' }}>
          <span className="text-3xl">🌿</span>
        </div>
        <h1 className="font-serif text-3xl font-medium mb-2" style={{ color: 'var(--text)' }}>
          YouMatter
        </h1>
        <p className="font-serif text-base" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
          "You are not alone. You never were."
        </p>
      </div>

      {/* Why I built this */}
      <div className="card p-6 mb-4">
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          WHY THIS EXISTS
        </p>
        <p className="font-serif text-base leading-relaxed mb-3" style={{ color: 'var(--text)', lineHeight: 1.85 }}>
          I built YouMatter because I needed it.
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
          I'm an overthinker. My brain doesn't have an "off" switch — it loops, replays conversations, worries about things that haven't happened yet, and sometimes convinces me at 2am that everything is falling apart.
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
          What helped me: writing it down. Breathing through it. Knowing that other people feel this way too, and that it passes. Every single time, it passes.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
          This app is my small way of giving that back. It's not a therapy app. It's not a quick fix. It's just a quiet place for you to feel your feelings, catch your breath, and remember — you are not alone in this.
        </p>
      </div>

      {/* Meet Neha */}
      <div className="card p-6 mb-4">
        <p className="text-xs font-medium mb-4" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          THE HUMAN BEHIND THIS
        </p>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl font-medium"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            N
          </div>
          <div>
            <p className="font-medium" style={{ color: 'var(--text)', fontSize: 15 }}>Neha Pande</p>
            <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--text-muted)' }}>
              Full Stack Developer · Pune, India
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.85 }}>
              I'm a developer who believes technology should feel human. I work with React, TypeScript, Python, and GenAI — but what drives me is building things that actually make people's lives a little softer.
            </p>
            <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-muted)', lineHeight: 1.85 }}>
              When I'm not coding, I'm either overthinking something, at the gym trying to undo the overthinking, or hunting for the perfect chai. I'm also an overthinker who genuinely believes in writing your feelings down — which is exactly why I made this.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <a
            href="https://github.com/nehapande"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <GithubIcon /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/nehapande"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <LinkedinIcon /> LinkedIn
          </a>
        </div>
      </div>

      {/* Tech stack */}
      <div className="card p-6 mb-4">
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          BUILT WITH
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'React 18', 'Vite', 'Tailwind CSS', 'Context API',
            'useReducer', 'Custom Hooks', 'localStorage',
            'Claude API', 'GitHub Pages',
          ].map(t => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Closing note */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: 'var(--surface2)' }}
      >
        <p className="font-serif text-base leading-relaxed" style={{ color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.85 }}>
          "If you're here, it means you're taking care of yourself.<br />
          That takes courage. I see you."
        </p>
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>— Neha</p>
      </div>

      <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
        v1.0 · Made with care in Pune 🇮🇳
      </p>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
