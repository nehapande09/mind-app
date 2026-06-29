import { useReducer, useEffect } from 'react'

const STORAGE_KEY = 'mn-diary-entries'

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
  catch { return [] }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.entry, ...state]
    case 'DELETE':
      return state.filter(e => e.id !== action.id)
    case 'SET_MOOD':
      return state.map(e => e.id === action.id ? { ...e, mood: action.mood } : e)
    default:
      return state
  }
}

export function useDiary() {
  const [entries, dispatch] = useReducer(reducer, [], load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  function addEntry(text, title = '') {
    const entry = {
      id: Date.now().toString(),
      text,
      title: title || '',
      date: new Date().toISOString(),
      mood: null,
    }
    dispatch({ type: 'ADD', entry })
    return entry
  }

  function deleteEntry(id) {
    dispatch({ type: 'DELETE', id })
  }

  function setMood(id, mood) {
    dispatch({ type: 'SET_MOOD', id, mood })
  }

  return { entries, addEntry, deleteEntry, setMood }
}
