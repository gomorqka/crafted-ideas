# craftedideas.co

Site for **Crafted Ideas Ltd** — kitchen construction, installation, fitting & repairs, Croydon / Greater London.

Static one-pager with a 700vh scroll-driven hero. `build.mjs` copies `index.html` + assets into `dist/` and pulls vendor files (anime.js v4, Lenis, Fraunces/Inter fonts) from npm at build time. No runtime dependencies, no third-party requests — everything is served from our own origin.

## Deploy (Vercel)
- Framework preset: **Other**
- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` auto-deploys once imported in Vercel.

## Local dev
```bash
npm install && npm run build
python3 -m http.server 8080 -d dist   # → http://localhost:8080
```

---

## Waiting on Vasil

The site is live but two things are stubbed. Until they land, **email is the only working contact route** (`hello@craftedideas.co`, forwarded via the registrar).

| Needed | Where it goes | Why it matters |
|---|---|---|
| **Mobile number** (full, e.g. `07XXX XXXXXX`) | `index.html` — the commented block above `.ctas`, plus `telephone` in the JSON-LD | Restores "Call Vasil" and WhatsApp. The old placeholder `+447000000000` was on the UK **070x premium personal-numbering** range and has been removed — never ship a `070` number. |
| **WhatsApp number** — confirm it's the same mobile | same block, `wa.me/44…` | "Send a photo" is the lowest-friction lead this site can capture. |
| **Working hours** | `openingHours` in the JSON-LD | Shows directly in Google local results. |
| **Project photos** — 6+ finished kitchens | `media/work/` — see below | The `#work` tiles are placeholders. This is the single biggest conversion lever on the page. |
| **Public liability insurance** — insurer + cover level | new trust card in `#why` | Standard proof for trades; customers look for it. |
| **Trade certifications** — Gas Safe / NICEIC / etc., if held | new trust card in `#why` | Only list what he actually holds. |
| **Google Business Profile** — is one claimed? | enables reviews + map pin | Local search is how this business gets found. |

## Adding real photography

The `#work` tiles ship a deliberate drawing-paper placeholder. Each one swaps to a real photo independently — no other change needed.

1. Drop the file in `media/work/` (e.g. `01.jpg`). The build copies the folder automatically.
2. In `index.html`, find that tile and replace this line:
   ```html
   <div class="plate"><span>Photography soon</span></div>
   ```
   with:
   ```html
   <img src="/media/work/01.jpg" alt="Describe what the photo shows" loading="lazy" decoding="async">
   ```
3. Once all six are real, delete the `.worknote` line below the grid.

**Export settings:** 1200px on the long edge, JPEG quality ~75 (or AVIF), landscape 4:3-ish. Tiles are `object-fit: cover`, so anything close crops cleanly. Write a real `alt` describing the kitchen — "Fitted kitchen" tells a screen-reader user nothing.

**Don't** put stock or AI-generated images here. This section represents completed work to prospective customers; anything else is misleading and a problem under the CAP Code.

## Content Security Policy

`vercel.json` runs `script-src 'self'` plus a SHA-256 hash per inline `<script>` — no `'unsafe-inline'`.

**If you edit any inline script, the build will fail** with the new hashes printed. Paste them into the `script-src` directive in `vercel.json` and rebuild. This is deliberate: without the check, a hash mismatch would silently disable all JS in production while passing locally.

## Breakpoints worth knowing

- **`1025px` + fine pointer** — gates the 700vh scrolled film sequence. Must stay identical in the `@media` block and in `JOURNEY_MQ` in the module script. A landscape phone is 844px wide, so a width-only gate hands phones 3.7MB of frames.
- **`760px`** — nav collapses to the menu button; the services list stacks.
