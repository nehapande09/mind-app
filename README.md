# 🌿 YouMatter

> *"You are not alone. You never were."*

A calm, minimal app built for overthinkers. Write what you feel, breathe through it, release it, and find your next book.

---

## ✨ Features

| Feature | What it does |
|---|---|
| 📖 **Daily Diary** | Write freely. AI detects your mood. Entries saved locally. |
| 🌬️ **Breathe** | Box / 4-7-8 / Simple Calm — animated breathing circle with countdown |
| 💛 **I Believe** | Write your emotions and release them. Words vanish on release. Saves nothing. |
| 🆘 **Anchor yourself** | Panic attack guide — Quick steps + 5-4-3-2-1 grounding technique |
| 📚 **Book Rec** | AI recommends one book based on your current mood |
| 🎨 **4 Themes** | Warm Sand · Ocean Calm · Lavender · Forest |
| ✦ **How to use** | Full walkthrough of every feature |

---

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Context API** — global theme state
- **useReducer** — diary entries state management
- **Custom hooks** — `useDiary` (localStorage), `useMood` (Claude API)
- **localStorage** — diary entries + theme + book list persist across sessions
- **Claude API** — mood detection + book recommendation

## ⚛️ React Concepts Covered

`useState` · `useEffect` · `useRef` · `useReducer` · `useContext` · `useCallback` · `useMemo` · Custom hooks · Context API · Conditional rendering · Component composition · CSS variables theming · Async/await + API calls · localStorage persistence

---

## 🚀 Run locally

```bash
npm install
npm run dev
```

For AI features (mood detection + book recs), add your Anthropic API key.
Create a `.env` file:
```
VITE_ANTHROPIC_KEY=sk-ant-your-key-here
```

Then update the fetch headers in `DiaryPage.jsx` and `BookRecPage.jsx`:
```js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY,
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true',
}
```

---

## 🌐 Deploy to GitHub Pages

```bash
npm run build
# Then push the /dist folder to GitHub Pages
# Or use gh-pages package:
npm install -D gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run deploy
```

---

## 👩‍💻 Built by

**Neha Pande** — Full Stack Developer, Pune 🇮🇳  
React · TypeScript · Python · GenAI  
[GitHub](https://github.com/nehapande) · [LinkedIn](https://linkedin.com/in/nehapande)

---

*Built because I needed it. Shared because you might too.*
