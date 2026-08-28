# craftedideasltd.co.uk

Primary domain since 25 Aug 2026. `craftedideas.co` (and both `www.` hosts) 308-redirect to it via `redirects` in `vercel.json` — the old domain was publicly advertised, so it must keep resolving, not be dropped.

Site for **Crafted Ideas Ltd** — kitchen construction, installation, fitting & repairs, Croydon / Greater London.

Static one-pager. The hero is five real project photographs on a slow cross-fade with a deep push-in, driven by the classic script so it survives the fx module never loading. `build.mjs` copies `index.html` + assets into `dist/` and pulls vendor files (anime.js v4, Lenis, Fraunces/Inter fonts) from npm at build time. No runtime dependencies, no third-party requests — everything is served from our own origin.

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

**Contact details went live 25 Aug 2026.** Phone, WhatsApp and email work on the homepage — the
only page there is. The quote form is the one thing still stubbed — see the table below.

Historical note, kept because both mistakes cost time:

- **`hello@craftedideas.co` was never a real mailbox.** It shipped in the launch commit and has been publicly advertised since. The domain's MX records point at Namecheap forwarding, but that only proves the *domain* accepts mail — it says nothing about whether an alias exists. Do not put any address back on the page without confirming it forwards somewhere a person reads.
- **`+447000000000` was not a harmless dummy.** UK `070x` is Ofcom's premium-rated personal numbering range, not a mobile. Anyone who tapped "Call Vasil" was billed for it. Never ship a `070` number.

The published address is **info@craftedideasltd.co.uk**, forwarding to Vasil's Gmail. Delivery was confirmed by a real test mail on 26 Aug — that test is the bar, not the existence of MX records, because this domain had MX records the whole time `hello@` was nothing. `hello@craftedideas.co` is deliberately *not* used — the Namecheap forward has never
been confirmed to land anywhere a person reads. If it ever is, swap it in three places together:
`index.html` `#contact`, the homepage JSON-LD, and the form-failure copy in the classic script.

What's left, in order of what unblocks the most:

| Needed | Where it goes | Why it matters |
|---|---|---|
| **Web3Forms access key** | `index.html` — replace `WEB3FORMS_ACCESS_KEY` | The last stub. ⚠️ The flow changed: it is now a real account at `app.web3forms.com`, not an anonymous key-by-email. Create it **from the destination inbox** (`craftedideasltd@gmail.com`) so the credentials belong to the business, then copy the key from the dashboard. Until replaced the form refuses to submit and points at the phone instead — it no longer dead-ends. |
| **Camera originals of the nine photos** | `media/work/` | Six of the nine are upscales of 1024–1280px sources, so the full-bleed hero is soft at 2× DPR. See "Adding real photography". |
| **Google Business Profile** — none exists | enables reviews | Vasil confirmed 26 Aug that no profile exists and he is happy for one to be created. Local search is how this business gets found. Opening hours are already in the JSON-LD, so they'll match. |
| **Written consent for customer names** | a testimonial block, not yet built | Three names were offered on 26 Aug flagged *"provisional without their written consent yet"*. Nothing gets published until each has agreed in writing. |

**Closed — do not re-open these as "needed":**

- ~~Project photos~~ — nine arrived 26 Aug and are live in `#work`. Manifest: `com/plans/work-photos.md`.
- ~~Public liability insurance~~ — £5m public & products, £10m employers', read off the Allianz schedule in `com/docs`. Both figures now ship in the `#why` band **and** the footer strip. ⚠️ **Renewal 05/02/2027** — re-read the schedule then; a stale cover figure is a misrepresentation, not a typo.
- ~~Trade certifications~~ — settled 26 Aug: Crafted Ideas Ltd is **not** itself Gas Safe or NICEIC registered. Gas and electrical work goes to subcontractors who are. The page says exactly that, in `#why` and in the footer, and must keep saying exactly that.

### Settled 25 Aug 2026

| Detail | Value | Where it lives |
|---|---|---|
| Mobile / WhatsApp | `+447597231778` (`07597 231778`) | `index.html` `#contact` rows + `#menu` sheet + the "What we do" repairs card + JSON-LD + form fallbacks |
| Email | `info@craftedideasltd.co.uk` — forwards to Vasil's Gmail, delivery confirmed 26 Aug | CTA, homepage JSON-LD, form-failure copy |
| Opening hours | Mon–Fri, 09:00–18:00 | `openingHoursSpecification` in the homepage JSON-LD |

## Adding real photography

Nine real projects are in. Manifest — Vasil's order, titles and captions — is `com/plans/work-photos.md`.

**Every photograph ships in three sizes**, and the build copies all three folders:

| Folder | Size | Shipped? | Used by |
|---|---|---|---|
| `media/work/` | original, 1024–1600px | **no** | source only — the other three are generated from it |
| `media/work-1200/` | 1200px long edge, q76 | yes | the large `srcset` candidate, and every `src` fallback |
| `media/work-800/` | 800px long edge, q72 | yes | the 800w candidate, and the "What we do" cards |
| `media/work-thumb/` | 240px long edge, q65 | yes | the hero filmstrip |

⚠️ **Do not put the 1600px originals back in the page.** Six of the nine are upscales of
1024–1280px sources, so those pixels carry no detail — but they cost 53MB of decoded bitmap
against 34MB for the 1200 set. On an iPad, where each composited surface is roughly twice a
phone's, that was enough for Safari to start evicting and re-decoding: the gallery flickered from
the fifth photograph on and the eighth never painted at all. Desktop and phone were both fine,
which is exactly why it took a real device to find.

Regenerate the two derived sets after adding or replacing anything in `media/work/`:

```bash
mkdir -p media/work-1200 media/work-800 media/work-thumb
for f in media/work/*.jpg; do b=$(basename "$f")
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  # -Z enlarges as well as shrinks, and three of these are native 1024 — only ever shrink
  cp "$f" "media/work-1200/$b"; [ "$w" -gt 1200 ] && sips -Z 1200 --setProperty formatOptions 76 "media/work-1200/$b" >/dev/null
  cp "$f" "media/work-800/$b";   sips -Z 800  --setProperty formatOptions 72 "media/work-800/$b"  >/dev/null
  cp "$f" "media/work-thumb/$b"; sips -Z 240  --setProperty formatOptions 65 "media/work-thumb/$b" >/dev/null
done
```

`sips` is macOS-only, which is why this is a hand step and not part of `build.mjs` — **Vercel builds on Linux**, so a `sips` call in the build would fail the deploy. Commit the generated files.

Then add the `<figure class="gpanel">` block in `#work`, matching the `srcset` widths to the **work-1200** file's real pixel width (1200 for the six that were larger, 1024 for the three that were already smaller — do not claim 1200 for a 1024 file). Write a real `alt` describing what is in the frame — "Fitted kitchen" tells a screen-reader user nothing, and the `alt` is not the marketing line printed beside it.

**Don't** put stock or AI-generated images here. This section represents completed work to prospective customers; anything else is misleading and a problem under the CAP Code. (The retired `media/seq/` frames *are* AI-generated — see Motion.)

⚠️ **Six of the nine are upscales.** 01/02/03/06/07/08 are 1.25–1.56× enlargements of 1024–1280px originals; 04/05/09 are native 1024×832. True optical detail is ≤1280px anywhere, so the full-bleed hero is soft at 2× DPR. Worth asking Vasil for the camera originals.

### Before / after

The wipe comparison was removed in the v3 redesign along with the film. Vasil's matching "after" shot never arrived, and an empty slider advertises the gap. If it comes back, **the pair must be shot from the same spot** — same corner, same lens, same height, ideally the same time of day. If the framing shifts, the wipe reads as two different rooms rather than one room transformed, which is worse than no slider at all.

## Service-area pages — removed

**There are no area pages, and `areas.mjs` no longer exists.** The six `/kitchens/<slug>/` pages were deleted on 26 Aug 2026: the areas were a guess nobody had confirmed, the local-expertise copy was written rather than earned, and they narrowed Vasil, who works across Greater London. `/kitchens/*` now 301s to `#work` via `vercel.json`, and the sitemap is a single URL.

The real project locations in `#work` carry the local signal instead — Epsom, Fulham, Clapham, Dulwich, Caterham, Guildford, South Croydon.

If area pages are ever rebuilt: near-duplicate location pages get demoted as doorway pages and drag the whole domain down, so if you cannot write something real about an area, leave it out. And nothing in them may claim a track record — the company was incorporated Nov 2025, so copy describes what we do and what we find in these homes, never jobs we have not done.

## Content Security Policy

`vercel.json` runs `script-src 'self'` plus a SHA-256 hash per inline `<script>` — no `'unsafe-inline'`.

**If you edit any inline script, the build will fail** with the new hashes printed. Paste them into the `script-src` directive in `vercel.json` and rebuild. This is deliberate: without the check, a hash mismatch would silently disable all JS in production while passing locally.

## Motion

The gate script in `<head>` decides **once** and writes the answer to `<html>` as a class. Everything else — CSS and JS — keys off that class, so the breakpoint exists in exactly one place.

| Class | Who gets it | What they get |
|---|---|---|
| `rm` | `prefers-reduced-motion: reduce` | Cross-fade reveals only, and **the hero does not auto-advance**. No Lenis, no rAF at all — the module never loads. The filmstrip still works, because that change is user-initiated. |
| `fx` | everyone else | Reveals, Lenis, hero parallax, gallery pan. The same at every width. |
| *(none)* | no IntersectionObserver / no modules | Static page, fully visible, hero on its first frame. |

`fxd` and `fxm` are **gone**. They selected between the 700vh desktop film and the mobile blueprint; both were deleted, the motion path no longer differs by width, and the classes were being written and read by nobody.

Notes that matter if you touch this:

- **Reduced motion is not "no motion".** WCAG 2.3.3 is about vestibular triggers — movement, parallax, scaling. Cross-fades are fine, so those users still get reveals. The `prefers-reduced-motion` block forces `transition-property: opacity` globally and collapses `animation-duration` to `.001s`, which is also what neutralises the hero's aperture and Ken Burns push-in without special-casing them in JS.
- **A landscape phone is 844px wide.** Any width-only gate hands it the desktop journey — that's why `fxd` also requires a fine pointer.
- **The 3s failsafe can beat a slow connection.** If it strips the classes before the module finishes downloading, the module aborts rather than animating a page whose CSS has already reverted.
- **The hero rotator lives in the classic layer, not the module**, so it works when the module never loads. Auto-advance is skipped under `rm`. A thumbnail click or arrow key buys 22s of grace and then it resumes — it does **not** stop for good, or one early keypress would leave the rest of the work unseen.
- **The pause button is not decoration.** The hero moves by itself every 10s, which is a WCAG 2.2.2 (Level A) obligation to provide a way to stop it. Hover- or focus-only pausing does not satisfy that on a touch screen. Do not remove it.

### The 700vh film is gone

The pinned canvas scrub, the blueprint, the ambient hatching canvas and the custom cursor were all removed in the v3 redesign — see `com/plans/redesign-v3-preview.md`. `media/seq/` and `media/seq-m/` **are no longer copied into `dist/`** (4.2 MB off the deploy) but the files stay in the repo.

⚠️ **Those frames are AI-generated** — 50 frames assembled from two ezgif dumps of `media/Wan_Image_Generate_…png`. That is why they must not drift back onto a page about real finished work without someone deciding to do it deliberately. The old `alt` text said the kitchen was "built for real", which was already further than the asset could honestly go.

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
