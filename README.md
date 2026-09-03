# Wayfarer — Travel Explorer
![Uploading image.png…]()

A travel web app for exploring destinations, checking live weather, discovering
famous places, and planning a trip with an AI assistant. Built for the
Designesthetics front-end developer assignment.

> Screenshots: add 3–4 screenshots here before submitting (hero, explore grid,
> destination page with weather + chat, itinerary result). Save them into
> `docs/screenshots/` and reference them below, e.g.
> `![Explore page](docs/screenshots/explore.png)`

## Features

- **Landing page** with a looping hero video (falls back to a gradient if no
  video file is provided) and a preview of featured destinations.
- **Destination explorer** — search by name/tag and filter by region, with a
  proper empty state when nothing matches.
- **Destination detail page** for each place: overview, best time to visit,
  ideal stay length, and distance from the visitor (once located).
- **Famous places**, shown as a proper card grid with type, description and a
  fetched photo each — not a bare list.
- **Location awareness** — request the visitor's browser location, or search
  for a place by name (OpenWeather's geocoding endpoint). The app works either
  way.
- **Live weather** for both the destination and the visitor's own location,
  via OpenWeather.
- **Images fetched at runtime** from Pexels (or Unsplash Source as a
  key-free fallback) — nothing is hardcoded.
- **AI chatbot** for each destination (Google Gemini) — ask about trip
  length, timing, or highlights, with conversation history kept in context.
- **Itinerary planner** — set trip length, pace and interests, and the
  assistant returns a structured day-by-day plan rendered as real itinerary
  cards, not a wall of chat text.
- **Designed-for states**: loading skeletons, empty states, and explicit
  error messages for denied location permission, missing/invalid API keys,
  and failed requests — every one of these is handled, not left to chance.
- **Accessible & responsive**: semantic landmarks, labelled form fields,
  visible focus states, `aria-live` regions for async updates, and a layout
  that holds up from a phone to a large desktop screen.

## Tech stack

- React 18 + Vite
- React Router
- Tailwind CSS
- OpenWeather (current weather + geocoding)
- Pexels API (images), with Unsplash Source as a no-key fallback
- Google Gemini API (`gemini-2.0-flash`) for chat and itinerary generation

## APIs used

| Purpose            | API                                   | Docs |
|---------------------|----------------------------------------|------|
| Weather + geocoding | OpenWeather                            | https://openweathermap.org/api |
| Images              | Pexels (fallback: Unsplash Source)     | https://www.pexels.com/api/ |
| AI assistant        | Google Gemini (`generateContent`)      | https://ai.google.dev/gemini-api/docs |

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`). **It runs
immediately with zero setup** — every feature that needs an API key (weather,
images, chat, itinerary) falls back to clearly-labelled demo data if that key
isn't set, so you can click through the whole app right away.

### Switching on the real APIs

```bash
cp .env.example .env
```

Then fill in `.env`:

```
VITE_OPENWEATHER_API_KEY=...
VITE_PEXELS_API_KEY=...
VITE_GEMINI_API_KEY=...
```

Restart `npm run dev` after editing `.env`. Each key is independent — add one
at a time and that feature switches from demo data to live data immediately;
the others keep working in demo mode until you add theirs too.

**This demo fallback is for local development convenience only — the
assignment requires real live API integration, so add all three real keys
before you deploy and submit the live link.**

Optional: drop a looping mp4 at `public/hero.mp4` for the hero background —
see `public/README-video.txt`. Without one it uses a gradient instead.

### Getting API keys (all have free tiers)

- **OpenWeather**: sign up at openweathermap.org → API keys tab. New keys can
  take a few minutes to activate.
- **Pexels**: sign up at pexels.com/api → generate an API key instantly.
- **Gemini**: create a key at aistudio.google.com/app/apikey.

The app is designed to degrade gracefully without any of these keys — each
feature shows a clear message telling you which key is missing, instead of
crashing.

## Build for production

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploying

Any static host works (Vercel, Netlify, GitHub Pages). Remember to add the
same three environment variables in your host's dashboard/project settings —
`.env` itself is never committed (see `.gitignore`).

- **Vercel**: import the GitHub repo, framework preset "Vite", add the env
  vars, deploy.
- **Netlify**: `npm run build`, publish directory `dist`, add the env vars.

## Project structure

```
src/
  api/            # OpenWeather, Pexels/Unsplash, Gemini API wrappers
  components/     # Reusable UI: cards, weather widget, chat, itinerary planner...
  context/        # LocationContext — shared visitor-location state
  data/           # Curated destination dataset (content, not API-fetched)
  hooks/          # useAsync — generic loading/error/data hook
  pages/          # Landing, Explore, DestinationDetail, NotFound
```

## Notes

- Destination content (descriptions, famous places, best time to visit) is a
  curated local dataset — the assignment leaves data structuring up to the
  developer, and this keeps the app fast and independent of a content API.
  Everything visual (photos) is still fetched live, as required.
- All three third-party API calls happen client-side using `VITE_*` env
  vars. For a production app handling paid/rate-limited keys, these would
  normally sit behind a small server proxy — noted here as a known trade-off
  for this assignment's scope.
