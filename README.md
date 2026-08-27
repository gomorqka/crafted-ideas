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

The published address is **info@craftedideasltd.co.uk**, forwarding to Vasil's Gmail. Delivery was confirmed by a real test mail on 26 Aug — that test is the bar, not the existence of MX records, because this domain had MX records the whole time `hello@` was nothing. `hello@craftedideas.co` is deliberately *not* used — the Namecheap forward has never
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
| Email | `info@craftedideasltd.co.uk` — forwards to Vasil's Gmail, delivery confirmed 26 Aug | CTA, homepage JSON-LD, form-failure copy |
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

## Safe areas (the iPhone notch)

The viewport meta carries `viewport-fit=cover`, so the page reaches the physical edges of the screen and the nav's frosted band blurs the photography behind the status bar instead of ending in a flat opaque strip. The cost is that the notch, the rounded corners and the home indicator now sit *over* the page, so **anything that touches an edge has to pay the inset back**. They are read once into `--sat` / `--sar` / `--sab` / `--sal` on `:root` and spent from there — never call `env()` at the point of use, because a test can override a variable and see the notched layout on a machine that has no notch, which is the only way this is verifiable off-device.

Two traps, both of which have already been hit:

- **A parked offset must clear its own inset.** The skip link hid itself with a flat `translateY(-64px)`. Add 59px of notch to its `top` and it lands back on screen, permanently visible. It parks with `-100%` plus the inset now, so it cannot be outgrown.
- **The gallery caption clears the nav by top padding**, not by anchoring to it. The nav gets taller by exactly `--sat`, so the caption's padding has to as well or the title reads through the frosted bar. The 27px gap between them is the number to check.

The nav itself does **not** try to blur through that strip on mobile, because it cannot — see below.

Screenshots taken in headless Chrome cannot confirm any of this: `backdrop-filter` over the sticky gallery keeps a stale backdrop snapshot, so the top of the nav samples as opaque page background whether or not the fix is present. It clears on a forced repaint. Verify the **geometry** — nav box reaching y=0, contents starting below the inset, nothing clipped — and confirm the frost itself on a real device.

## The mobile nav

Below `760px` the bar is at the top and **fully transparent**. At rest you get the whole banner — logo, quote pill, menu. The moment the page moves (`.scrolled`, past 20px) the logo and the pill go and one floating control stays.

That shedding is what makes transparency possible at all. A transparent bar was tried with the banner intact and it failed on evidence: the copy scrolled straight *through* the logo and the quote button, and at 92% opacity it ghosted through. With nothing there but the menu button, there is nothing left to collide with.

**Both strips a phone browser puts over the page are Safari's own chrome** — the status bar at the top, the address bar at the bottom — painted from `<meta name="theme-color">` with no page beneath them to blur. Three attempts went into joining the top one seamlessly (frosting harder, dissolving into a gradient, then moving the whole bar to the bottom, which just met the same wall at the other edge). Neither edge can be joined. Nothing here tries.

**Colour-aware.** Measured behind the top of the nav down the whole page, everything is bright (204–240) except the gallery, whose panels carry a dark scrim across their top 56% (33–93). `#nav.on-dark` inverts to white across exactly that block, toggled in the classic layer from a plain box-overlap test between the gallery and the nav, so it holds with the fx module absent.

**The floating control still carries a chip** — `--bg` at 86%, or `rgba(16,13,11,.52)` inverted. Two reasons: the *last* gallery panel scrolls out from under its own scrim and reaches 155, where a bare white glyph is 2.8:1; and a dark heading can pass under the button anywhere else. Worst glyph-against-chip contrast across all nine photographs is 9.9:1.

**Get a quote moved into the menu.** The pill is gone the moment you scroll, and without it there would be no route to the form from anywhere but the bottom of the page.

Traps, all of which have already bitten:

- **`.menubtn` sets its own `color`**, so it does not inherit the inversion from `#nav`. It shipped black over the photographs once. Anything added to the bar needs checking against `on-dark` directly.
- **Hide with `visibility`, not opacity alone.** An invisible tab stop is worse than a visible one. Verified by a real Tab sweep: while scrolled, focus goes skip link → menu button → page.
- **Overrides must sit below the rules they override.** `footer` and `.gcap` are declared further down than the mobile nav block, and at equal specificity the later declaration wins — a clearance written up there is silently ignored.
- **`env()` inside a nested `calc()` is not safe in `transform`.** Safari resolves it to the `0px` fallback there while honouring it in `top`, so the skip link parked 59px short of hidden and sat on the clock on a real iPhone. Its offset is a flat `-160px` now.
- **A border sits outside the background's positioning area**, so `background-repeat` tiles the background into it — harmless with a flat colour, a visible hairline with a gradient.

`<noscript>` gives the bar a translucent backing, since without JS it can never learn where it is or that the page has moved.

### The menu is a full-screen sheet

A dropdown left page content showing under Safari's status strip, which is the seam again in a different place. Triggered, the menu is `position:fixed; inset:0` in flat `--bg` — under `viewport-fit=cover` that really is the whole screen, notch included, so the strip (`theme-color`, the same colour) has nothing to sit against.

Covering the viewport means the page behind has to stop being both scrollable and reachable:

- **`html{overflow:hidden}` is not enough on its own.** It stops the *user* scrolling but not Lenis, which sets the scroll position programmatically — measured, the page moved 550px behind an opaque sheet. Lenis is handed out as `window.__lenis` so the classic layer can `stop()` it, because the menu script cannot see the module's `const`.
- **`inert` on `#main` and `footer`**, or Tab walks into content nobody can see. It is a no-op on browsers that lack it, which leaves the old behaviour rather than breaking.
- `overscroll-behavior: contain` on the sheet stops the touch gesture chaining to the page.

### theme-color follows the content

Safari paints the strip above the page from `<meta name="theme-color">`, and **it repaints when the meta changes**. That is the actual answer to the whole notch thread: the strip cannot be blurred, but it can be told what colour to be.

Measured, the top 24px of the gallery averages `#554b40` across 27 samples and its lightest is `#b3916d` — against a strip at `#F6F3EE`. That gap *is* the band. `paintChrome()` in the classic layer sets the meta to `--ink` across the gallery and back to `--bg` everywhere else, off the same `on-dark` signal the nav uses.

- **Biased dark on purpose.** A strip darker than the photograph reads as a frame; a lighter one reads as a bar, which is the failure this started from. `--ink` is never lighter than any sample.
- **Narrow screens only.** On a desktop this tints the browser's own window furniture, and nobody asked for that to move while they scroll.
- **Cream again while the menu sheet is up**, since the sheet itself is cream.

### Why cakecv.work has no notch problem

cakecv sets **no `viewport-fit`** and one static `themeColor: '#050505'`, with no dynamic override anywhere in its source — so its page never goes under the status bar, and that strip is the same colour whatever theme is showing. It is stable browser chrome that nobody reads as part of the page. (It does *not* match its backgrounds; it has several.)

This site made the opposite choice deliberately — `viewport-fit=cover` is what lets the photographs run to the top of the screen — and therefore has to make the strip agree with the page instead of ignoring it. Dropping `viewport-fit=cover` would remove the whole class of problem and cost the full-bleed photography.
