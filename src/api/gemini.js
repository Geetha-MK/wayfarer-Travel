// Wrapper around the Google Gemini generative language API.
// Docs: https://ai.google.dev/gemini-api/docs

const KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = 'gemini-2.0-flash'
const BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

export class GeminiError extends Error {}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function callGemini({ systemInstruction, contents, responseMimeType }) {
  if (!KEY) throw new GeminiError('missing_key')
  const res = await fetch(`${BASE}?key=${KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
      contents,
      generationConfig: responseMimeType ? { responseMimeType } : undefined,
    }),
  })
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) throw new GeminiError('invalid_key')
    throw new GeminiError('request_failed')
  }
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? ''
  if (!text) throw new GeminiError('empty_response')
  return text
}

// Conversational Q&A about a destination, keeping prior turns for context.
export async function askAboutDestination(destination, history, question) {
  if (!KEY) return mockAnswer(destination, question)

  const systemInstruction = `You are a knowledgeable, concise travel assistant for the Wayfarer app. \
The visitor is asking about ${destination.name}, ${destination.country}. \
Known facts you can use: best time to visit is ${destination.bestTime}; ideal stay is ${destination.idealStay}; \
notable places include ${destination.famousPlaces.map((p) => p.name).join(', ')}. \
Answer in 2-4 short sentences, friendly and specific, no markdown headers.`

  const contents = [
    ...history.map((turn) => ({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.text }],
    })),
    { role: 'user', parts: [{ text: question }] },
  ]

  return callGemini({ systemInstruction, contents })
}

// Demo-mode reply: uses the same destination facts a real call would, just
// without hitting the network. Clearly labelled so it's never mistaken for
// a live model response.
async function mockAnswer(destination, question) {
  await wait(500)
  const q = question.toLowerCase()
  let body
  if (q.includes('day') || q.includes('long') || q.includes('stay')) {
    body = `Most visitors spend ${destination.idealStay} in ${destination.name} — enough time to see the main sights without rushing.`
  } else if (q.includes('when') || q.includes('time') || q.includes('season')) {
    body = `${destination.bestTime} is generally the best window to visit ${destination.name}, weather-wise.`
  } else {
    const pick = destination.famousPlaces[0]
    body = `In ${destination.name}, don't miss ${pick.name} — ${pick.note.toLowerCase()}`
  }
  return `[Demo answer — add VITE_GEMINI_API_KEY for real responses] ${body}`
}

// Structured itinerary generation, returned as parsed JSON.
export async function generateItinerary(destination, { days, interests, pace }) {
  if (!KEY) return mockItinerary(destination, { days, interests, pace })

  const systemInstruction = `You are a travel planner. Respond ONLY with valid JSON, no markdown fences, \
matching exactly this shape: {"title": string, "summary": string, "days": [{"day": number, "theme": string, \
"items": [{"time": string, "activity": string, "detail": string}]}]}. \
Keep each day to 3-5 items. Be specific to the destination's real places where possible.`

  const prompt = `Plan a ${days}-day trip to ${destination.name}, ${destination.country}. \
Traveller pace preference: ${pace}. Interests: ${interests || 'general sightseeing, food, culture'}. \
Notable places to consider weaving in: ${destination.famousPlaces.map((p) => p.name).join(', ')}.`

  const text = await callGemini({
    systemInstruction,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    responseMimeType: 'application/json',
  })

  try {
    const cleaned = text.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)
  } catch (err) {
    throw new GeminiError('bad_json')
  }
}

// Demo-mode itinerary: cycles through the destination's real famous places
// across the requested number of days, so the layout and flow are fully
// testable before a Gemini key is added.
async function mockItinerary(destination, { days, interests, pace }) {
  await wait(700)
  const places = destination.famousPlaces
  const slots = pace === 'packed' ? ['9:00 AM', '12:30 PM', '3:30 PM', '7:00 PM'] : pace === 'relaxed' ? ['10:00 AM', '3:00 PM'] : ['9:30 AM', '1:00 PM', '5:00 PM']

  const dayPlans = Array.from({ length: days }, (_, i) => {
    const items = slots.map((time, si) => {
      const place = places[(i + si) % places.length]
      return { time, activity: place.name, detail: place.note }
    })
    return { day: i + 1, theme: i === 0 ? `Arrival & first impressions` : `Exploring ${destination.name}`, items }
  })

  return {
    title: `[Demo itinerary — add VITE_GEMINI_API_KEY for a real plan] ${days}-day ${destination.name} trip`,
    summary: `A ${pace}-paced plan built from ${destination.name}'s known highlights${interests ? `, leaning toward ${interests}` : ''}. This is placeholder data — connect a Gemini key for a plan generated specifically for your interests.`,
    days: dayPlans,
  }
}
