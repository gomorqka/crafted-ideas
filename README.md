# craftedideasltd.co.uk

Primary domain since 25 Aug 2026. `craftedideas.co` (and both `www.` hosts) 308-redirect to it via `redirects` in `vercel.json` — the old domain was publicly advertised, so it must keep resolving, not be dropped.

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

## Handover

**Contact details went live 25 Aug 2026.** Phone, WhatsApp and email now work on the homepage
and on all six area pages. The quote form is the one thing still stubbed — see the table below.

Historical note, kept because both mistakes cost time:

- **`hello@craftedideas.co` was never a real mailbox.** It shipped in the launch commit and has been publicly advertised since. The domain's MX records point at Namecheap forwarding, but that only proves the *domain* accepts mail — it says nothing about whether an alias exists. Do not put any address back on the page without confirming it forwards somewhere a person reads.
- **`+447000000000` was not a harmless dummy.** UK `070x` is Ofcom's premium-rated personal numbering range, not a mobile. Anyone who tapped "Call Vasil" was billed for it. Never ship a `070` number.

The inbox question is settled: **info@craftedideasltd.co.uk** is the published address and is what the
site advertises. `hello@craftedideas.co` is deliberately *not* used — the Namecheap forward has never
been confirmed to land anywhere a person reads. If it ever is, swap it in three places together:
`index.html` `#contact`, the homepage JSON-LD, and `areas.mjs`.

What's left, in order of what unblocks the most:

| Needed | Where it goes | Why it matters |
|---|---|---|
| **Web3Forms access key** | `index.html` — replace `WEB3FORMS_ACCESS_KEY` | The last stub. ⚠️ The flow changed: it is now a real account at `app.web3forms.com`, not an anonymous key-by-email. Create it **from the destination inbox** (`craftedideasltd@gmail.com`) so the credentials belong to the business, then copy the key from the dashboard. Until replaced the form refuses to submit and points at the phone instead — it no longer dead-ends. |
| **Project photos** — 6+ finished kitchens | `media/work/` — see below | The `#work` tiles are placeholders. Worth more than everything else on this list combined. |
| **Public liability insurance** — Allianz; cover level still needed | new trust card in `#why` | Insurer confirmed, certificate PDFs pending. Don't publish a figure until the document is in the repo. |
| **Trade certifications** — Gas Safe / NICEIC / etc., if held | new trust card in `#why` | Only list what he actually holds. |
| **Google Business Profile** — is one claimed? | enables reviews + map pin | Local search is how this business gets found. Opening hours are already in the JSON-LD, so they'll match. |

### Settled 25 Aug 2026

| Detail | Value | Where it lives |
|---|---|---|
| Mobile / WhatsApp | `+447597231778` (`07597 231778`) | `index.html` `#contact` + JSON-LD, `areas.mjs` provider + CTAs, form fallbacks |
| Email | `info@craftedideasltd.co.uk` | same three places |
| Opening hours | Mon–Fri, 09:00–18:00 | `openingHoursSpecification` in the homepage JSON-LD |

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

### Before / after

The `#work` section leads with a wipe comparison, also on placeholders. Swap each `.plate` for an `<img>` exactly as above — but **the pair must be shot from the same spot**: same corner, same lens, same height, ideally the same time of day. If the framing shifts, the wipe reads as two different rooms rather than one room transformed, and the effect is worse than no slider at all. Trim the first sentence of its caption once real photos are in.

## Service-area pages

`areas.mjs` holds one entry per area; the build renders each to `/kitchens/<slug>/` and regenerates `sitemap.xml` from the real page list.

To add an area, add an entry and a matching footer link in `index.html`. **The build fails if those two drift apart** — an unlinked page ranks poorly, and a footer link to a page that doesn't exist is a 404.

Every entry needs genuine, area-specific copy about local housing stock. Near-duplicate location pages get demoted as doorway pages and drag the whole domain with them, so if you can't write something real about an area, leave it out. Nothing in these pages may claim a track record: the company was incorporated in Nov 2025, so copy describes what we do and what we find in these homes, never jobs we haven't done.

## Content Security Policy

`vercel.json` runs `script-src 'self'` plus a SHA-256 hash per inline `<script>` — no `'unsafe-inline'`.

**If you edit any inline script, the build will fail** with the new hashes printed. Paste them into the `script-src` directive in `vercel.json` and rebuild. This is deliberate: without the check, a hash mismatch would silently disable all JS in production while passing locally.

## Motion

The gate script in `<head>` decides **once** and writes the answer to `<html>` as a class. Everything else — CSS and JS — keys off that class, so the breakpoint exists in exactly one place.

| Class | Who gets it | What they get | First-load weight |
|---|---|---|---|
| `rm` | `prefers-reduced-motion: reduce` | Cross-fade reveals only. No Lenis, no cursor, no canvas, no rAF at all — the module never even loads. | ~166 KB |
| `fxd` | ≥1025px **and** a fine pointer | The 700vh pinned film, 50 frames @960px. | ~4 MB |
| `fxm` | everything else | The blueprint draws itself on scroll. Film is a second act, added only if the connection allows. | ~315 KB, or ~810 KB with the film |
| *(none)* | no IntersectionObserver / no modules | Static page, fully visible. | ~166 KB |

Notes that matter if you touch this:

- **Reduced motion is not "no motion".** WCAG 2.3.3 is about vestibular triggers — movement, parallax, scaling. Cross-fades are fine, so those users still get reveals. The `prefers-reduced-motion` block forces `transition-property: opacity` globally to enforce exactly that.
- **The mobile film is opt-out, not opt-in.** `saveData` or a 2g `effectiveType` skips it and shortens the pin to 170vh, because the second act would otherwise be blank scrolling. No Network Information API at all (all of iOS) counts as fine.
- **A landscape phone is 844px wide.** Any width-only gate hands it the desktop journey — that's why `fxd` also requires a fine pointer.
- **The 3s failsafe can beat a slow connection.** If it strips the classes before the module finishes downloading, the module aborts rather than pinning a page whose CSS has already reverted.
- `media/seq-m/` is generated from `media/seq/` — every 3rd frame, `sips -Z 560 --setProperty formatOptions 40`. Regenerate it if the film changes.

Other breakpoint: **`760px`**, where the nav collapses to the menu button and the services list stacks.
