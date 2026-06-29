export default function HowToUsePage({ setPage }) {
  const features = [
    {
      icon: '📖',
      nav: 'diary',
      title: 'Diary',
      color: '#7C9A8E',
      tagline: 'Your private space to pour it all out.',
      steps: [
        'Give your entry a title (or leave it blank — both are fine).',
        'Write freely. No rules, no grammar police, no judgment.',
        'Hit "Save entry" — your AI mood badge appears automatically.',
        'All entries are saved on your device. Only you can see them.',
        'Tap "Read more" on long entries, or delete ones you\'re done with.',
      ],
      tip: 'Even 2–3 sentences count. Consistency matters more than length.',
    },
    {
      icon: '🌬️',
      nav: 'breathe',
      title: 'Breathe',
      color: '#8B7EC8',
      tagline: 'Slow your breath, slow your mind.',
      steps: [
        'Choose a pattern — Box (equal 4s), 4-7-8 (deepest calm), or Simple Calm.',
        'Press Start and follow the circle — it grows on inhale, shrinks on exhale.',
        'The countdown number tells you exactly how many seconds are left.',
        'Watch the colour change as each phase shifts.',
        'Press Stop whenever you feel ready, or complete a few cycles.',
      ],
      tip: 'Box breathing is great for panic. 4-7-8 is best before sleep.',
    },
    {
      icon: '💛',
      nav: 'believe',
      title: 'I Believe',
      color: '#B5876A',
      tagline: 'Write it. Release it. Feel lighter.',
      steps: [
        'This page saves nothing. Your words exist only for this moment.',
        'Tap "Need a prompt?" for a starting sentence if you\'re stuck.',
        'Write honestly — what you\'re letting go of, what you\'re feeling, what you fear.',
        'Tap "Release these words" when you\'re ready.',
        'Watch them dissolve — and read the affirmation that appears.',
      ],
      tip: 'Use this when journaling feels too permanent. Sometimes you just need to say it and let it go.',
    },
    {
      icon: '🆘',
      nav: 'panic',
      title: 'Anchor yourself',
      color: '#4A87A8',
      tagline: 'For when everything feels too much.',
      steps: [
        'Open this page the moment you feel a panic attack starting.',
        'Read the grounding message at the top — your body is safe.',
        'Choose "Quick relief steps" for 5 fast actions (3 minutes).',
        'Choose "5-4-3-2-1 grounding" to use all 5 senses to return to the present.',
        'Work through the steps at your own pace — skip or go back freely.',
      ],
      tip: '5-4-3-2-1 grounding is clinically validated. It works by giving your brain real sensory data to process instead of anxious thoughts.',
    },
    {
      icon: '📚',
      nav: 'books',
      title: 'Your next read',
      color: '#4D8C6A',
      tagline: 'One book, chosen for exactly how you feel.',
      steps: [
        'Write a diary entry first — the app detects your mood from it.',
        'Come to this page and tap "Find my book".',
        'AI picks one book specifically matched to your current emotional state.',
        'Read why this book was chosen — it\'s personalised every time.',
        'Save books you want to read — they\'ll appear in your reading list.',
        'Tap "Try another" for a different recommendation.',
      ],
      tip: 'Your reading list saves up to 10 books with the mood you were in when it was recommended. A little emotional time capsule.',
    },
    {
      icon: '🎨',
      nav: 'diary',
      title: 'Themes',
      color: '#9A8E7C',
      tagline: 'Change the mood of the app to match yours.',
      steps: [
        'Tap the palette icon (🎨) in the top-right corner.',
        'Choose from Warm Sand, Ocean Calm, Lavender, or Forest.',
        'The entire app shifts instantly — colours, surfaces, accents, everything.',
        'Your theme choice is remembered across sessions.',
      ],
      tip: 'Try Lavender at night and Forest in the morning. Different energy for different parts of the day.',
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-medium" style={{ color: 'var(--text)' }}>
          How to use YouMatter
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Everything you need to know to make this app yours.
        </p>
      </div>

      {/* Quick nav */}
      <div className="flex gap-2 flex-wrap mb-8">
        {features.map(f => (
          <a
            key={f.title}
            href={`#${f.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-xs px-3 py-1.5 rounded-full transition-all"
            style={{ background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            {f.icon} {f.title}
          </a>
        ))}
      </div>

      <div className="space-y-5">
        {features.map(f => (
          <div
            key={f.title}
            id={f.title.toLowerCase().replace(/\s+/g, '-')}
            className="card p-6"
          >
            {/* Feature header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: f.color + '18' }}
              >
                {f.icon}
              </div>
              <div>
                <h2 className="font-medium text-base" style={{ color: 'var(--text)' }}>{f.title}</h2>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{f.tagline}</p>
              </div>
              {f.nav && f.nav !== 'diary' && (
                <button
                  onClick={() => setPage(f.nav)}
                  className="ml-auto shrink-0 btn-ghost text-xs flex items-center gap-1"
                  style={{ color: f.color }}
                >
                  Open <ArrowIcon />
                </button>
              )}
            </div>

            {/* Steps */}
            <ol className="space-y-2 mb-4">
              {f.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mt-0.5"
                    style={{ background: f.color + '20', color: f.color }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            {/* Pro tip */}
            <div
              className="rounded-xl px-4 py-3 text-xs leading-relaxed"
              style={{ background: 'var(--surface2)', color: 'var(--text-muted)', lineHeight: 1.7 }}
            >
              <span className="font-medium" style={{ color: 'var(--text)' }}>✦ Tip — </span>
              {f.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          This app stores everything on your device only.<br />
          No accounts, no tracking, no servers watching you.
        </p>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Just you and your thoughts.
        </p>
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}
