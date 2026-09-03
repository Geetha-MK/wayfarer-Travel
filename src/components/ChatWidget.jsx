import { useState, useRef, useEffect } from 'react'
import { askAboutDestination, GeminiError } from '../api/gemini.js'

const STARTERS = (name) => [
  `How many days should I spend in ${name}?`,
  `When's the best time to visit?`,
  `What shouldn't I miss?`,
]

export default function ChatWidget({ destination }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [errorKind, setErrorKind] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  async function send(text) {
    const question = text.trim()
    if (!question || status === 'sending') return
    const nextMessages = [...messages, { role: 'user', text: question }]
    setMessages(nextMessages)
    setInput('')
    setStatus('sending')
    setErrorKind(null)
    try {
      const reply = await askAboutDestination(destination, messages, question)
      setMessages([...nextMessages, { role: 'assistant', text: reply }])
      setStatus('idle')
    } catch (err) {
      setErrorKind(err instanceof GeminiError ? err.message : 'request_failed')
      setStatus('error')
    }
  }

  const errorText = {
    missing_key: 'Add a Gemini API key to your .env file to enable the assistant.',
    invalid_key: 'The Gemini API key looks invalid — check your .env file.',
    empty_response: 'The assistant had nothing to say — try rephrasing your question.',
    request_failed: "Couldn't reach the assistant. Check your connection and try again.",
  }[errorKind] || "Couldn't reach the assistant. Check your connection and try again."

  return (
    <div className="flex h-full flex-col rounded-sm border border-stone/20 bg-paper">
      <div className="border-b border-stone/15 px-5 py-4">
        <h3 className="font-display text-lg text-ink">Ask about {destination.name}</h3>
        <p className="text-xs text-stone">Powered by Gemini</p>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4" style={{ maxHeight: 360 }}>
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-stone">Try asking:</p>
            {STARTERS(destination.name).map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="block w-full rounded-sm border border-stone/20 px-3 py-2 text-left text-sm text-ink hover:border-pine hover:bg-pine/5"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-sm px-3.5 py-2.5 text-sm ${
              m.role === 'user' ? 'ml-auto bg-ink text-paper' : 'bg-paper-dim text-ink'
            }`}
          >
            {m.text}
          </div>
        ))}

        {status === 'sending' && (
          <div className="max-w-[70%] rounded-sm bg-paper-dim px-3.5 py-2.5 text-sm text-stone" aria-live="polite">
            <span className="animate-pulseSoft">Thinking…</span>
          </div>
        )}

        {status === 'error' && (
          <p className="rounded-sm border border-gold/40 bg-gold/10 px-3.5 py-2.5 text-sm text-ink" role="alert">
            {errorText}
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex gap-2 border-t border-stone/15 p-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask a question about {destination.name}
        </label>
        <input
          id="chat-input"
          className="field"
          placeholder="Ask a question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary shrink-0 !px-4" disabled={status === 'sending'}>
          Send
        </button>
      </form>
    </div>
  )
}
