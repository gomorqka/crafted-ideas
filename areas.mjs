// Service-area landing pages. One entry per area; build.mjs renders each to /kitchens/<slug>/.
//
// These are NOT doorway pages. Every entry carries copy specific to that area's housing stock
// and what it means for kitchen work — if you add an area, write it real content or leave it out.
// Google demotes near-duplicate location pages, and thin ones would drag the whole domain.
//
// Nothing here may claim a track record. Crafted Ideas Ltd was incorporated in Nov 2025; copy
// describes what we do and what we find in these homes, never jobs we haven't done.

export const SITE = 'https://craftedideasltd.co.uk';

export const AREAS = [
  {
    slug: 'croydon',
    name: 'Croydon',
    postcodes: 'CR0, CR2, CR7',
    lede: 'Kitchen construction, installation, fitting and repairs across Croydon — from the terraces off London Road to the new flats around the town centre.',
    stock: 'Croydon is three housing stocks in one borough. Victorian and Edwardian terraces north of the centre, interwar semis spreading south and east, and a decade of new-build flats around East Croydon.',
    implication: 'Each wants a different approach. Terraces usually mean a narrow galley and a solid rear wall — the gains come from the side return and from moving services, not from cramming in more units. Interwar semis often have a through-lounge already knocked about, so we check what previous work left behind before we price anything. New-build flats are the opposite problem: everything is stud, boxed risers move nowhere, and the fit has to be exact because there is no slack anywhere.',
    jobs: ['Full kitchen replacement in Victorian terraces', 'Flat refits where the layout is fixed by risers', 'Repairs to builder-grade kitchens in newer developments'],
  },
  {
    slug: 'south-croydon',
    name: 'South Croydon',
    postcodes: 'CR2',
    lede: 'Our own postcode. Kitchen building, fitting and repairs in South Croydon, Sanderstead and Selsdon.',
    stock: 'South Croydon runs from Edwardian terraces near the station up to substantial interwar semis and detached houses toward Sanderstead and Selsdon.',
    implication: 'The larger houses tend to have kitchens that were extended once already, often in the 80s or 90s, and the join is where the trouble is — sloping floors, a step nobody wants, plumbing routed the long way round. That is worth fixing properly at the same time as the units. It costs more on the day and less over ten years.',
    jobs: ['Reworking a previous extension so the floor runs level', 'Full replacement in interwar semis', 'Utility and boot room fit-outs'],
  },
  {
    slug: 'purley',
    name: 'Purley',
    postcodes: 'CR8',
    lede: 'Kitchen construction, installation and fitting in Purley, Kenley and Riddlesdown.',
    stock: 'Purley is dominated by 1930s semis and detached houses on generous plots, many still holding their original room proportions.',
    implication: 'Bigger plots mean the kitchen can usually go where it should rather than where it fits, so the honest conversation is about whether you need an extension at all. Plenty of these houses have a separate dining room doing nothing — opening that up is cheaper than building, and it keeps the garden. Where the house sits on a slope, which is common up toward Riddlesdown, we check the floor levels before promising anything about an island.',
    jobs: ['Opening a kitchen into an unused dining room', 'Full builds in 1930s semis', 'Island installs where floor level allows'],
  },
  {
    slug: 'bromley',
    name: 'Bromley',
    postcodes: 'BR1, BR2',
    lede: 'Kitchen building, installation, fitting and repairs across Bromley, Bickley and Shortlands.',
    stock: 'Bromley holds a lot of Victorian and Edwardian villas alongside 1930s semis, with the larger period houses concentrated around Bickley and Shortlands.',
    implication: 'Period villas bring high ceilings and original features that a standard-height run of units simply ignores. Fitting to the room rather than to the catalogue matters here — cornice lines, tall larders that respect the ceiling, worktops set to the people using them. Several of these streets are in conservation areas, so anything touching a rear elevation needs checking with the council before it is designed, not after.',
    jobs: ['Kitchens fitted to period proportions', 'Rear-elevation work in conservation areas', 'Repairs and refacing where the carcasses are sound'],
  },
  {
    slug: 'sutton',
    name: 'Sutton',
    postcodes: 'SM1, SM2, SM5',
    lede: 'Kitchen construction, fitting and repairs in Sutton, Carshalton and Cheam.',
    stock: 'Sutton is largely interwar suburban housing, with older period stock around Carshalton and Cheam villages and a growing number of town-centre flats.',
    implication: 'Interwar semis here often still have the original kitchen footprint: a small room, a larder, and a back door in the wrong place. The cheapest real gain is usually taking out the larder wall and moving the door, which is a day of building work rather than a whole extension. In the town-centre flats, the constraint is access — we plan how units get up the stairs before we plan the layout.',
    jobs: ['Removing larder walls to widen the run', 'Full installs in interwar semis', 'Flat refits with tight access'],
  },
  {
    slug: 'beckenham',
    name: 'Beckenham',
    postcodes: 'BR3',
    lede: 'Kitchen building, installation and fitting in Beckenham, Elmers End and Park Langley.',
    stock: 'Beckenham runs from Edwardian villas near the high street to 1930s semis in Park Langley and Elmers End, with several conservation areas across the borough.',
    implication: 'The Edwardian houses usually have a rear addition — the narrow back extension almost every one of them was built with. Whether to keep it, open it, or take it out is the single decision that sets the budget, and it is worth settling before anyone talks about door finishes. We will tell you when leaving it alone is the better answer.',
    jobs: ['Deciding what to do with an Edwardian rear addition', 'Full kitchen builds and fits', 'Repairs, door and worktop replacement'],
  },
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Deliberately JS-free: no inline scripts means no CSP hashes to keep in sync per page.
export function renderArea(area, all) {
  const others = all.filter(a => a.slug !== area.slug);
  const title = `Kitchen fitting in ${area.name} — Crafted Ideas Ltd`;
  const desc = `Kitchen construction, installation, fitting and repairs in ${area.name} (${area.postcodes}). One company from first measure to final wipe-down. Free measured visit.`;
  const url = `${SITE}/kitchens/${area.slug}/`;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Kitchen construction, installation, fitting and repairs',
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE}/#business`,
      name: 'Crafted Ideas Ltd',
      url: SITE,
      telephone: '+447597231778',
      // HANDOVER: email withheld until the info@ forward is proven — see index.html #contact
      address: {
        '@type': 'PostalAddress', streetAddress: '23 Sandpiper Road', addressLocality: 'South Croydon',
        addressRegion: 'Greater London', postalCode: 'CR2 8PQ', addressCountry: 'GB',
      },
    },
    areaServed: { '@type': 'Place', name: `${area.name}, Greater London`, identifier: area.postcodes },
    url,
    description: desc,
  };

  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#F6F3EE">
<link rel="preload" href="/vendor/fraunces-latin-full-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/vendor/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">${JSON.stringify(ld, null, 2)}</script>
<style>
@font-face{font-family:'Fraunces';src:url('/vendor/fraunces-latin-full-normal.woff2') format('woff2-variations');
  font-weight:100 900;font-style:normal;font-display:swap}
@font-face{font-family:'InterV';src:url('/vendor/inter-latin-wght-normal.woff2') format('woff2-variations');
  font-weight:100 900;font-style:normal;font-display:swap}
:root{--bg:#F6F3EE;--bg2:#EFEAE2;--card:#FBF9F5;--ink:#1E1B17;--muted:#70695F;--line:#DFD7CA;--edge:#8A857D;
  --accent:#A87B3F;--accent-ink:#866232;--ease:cubic-bezier(.22,.61,.36,1);
  --fd:'Fraunces',Georgia,serif;--fb:'InterV',system-ui,-apple-system,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font-family:var(--fb);font-size:17px;line-height:1.65;
  -webkit-font-smoothing:antialiased;overflow-x:hidden}
.wrap{max-width:900px;margin:0 auto;padding:0 28px}
a{color:inherit}
:focus-visible{outline:2px solid var(--accent-ink);outline-offset:3px;border-radius:2px}
.mono{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:11px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted)}
nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 28px;
  border-bottom:1px solid var(--line);flex-wrap:wrap}
.brand{font-family:var(--fd);font-weight:600;font-size:20px;text-decoration:none;
  display:inline-flex;align-items:center;min-height:44px}
.brand .dot{color:var(--accent)}
.navr{display:flex;align-items:center;gap:20px;font-size:14px}
.navr a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;color:var(--muted)}
.navr a:hover{color:var(--ink)}
.navr .cta{color:var(--ink);border:1px solid var(--edge);border-radius:99px;padding:0 18px}
header.hero{padding:clamp(48px,8vw,96px) 0 clamp(32px,5vw,56px)}
.eyebrow{display:inline-flex;align-items:center;gap:12px;color:var(--accent-ink)}
.eyebrow i{display:block;width:34px;height:1px;background:var(--accent)}
h1{font-family:var(--fd);font-weight:560;letter-spacing:-.015em;line-height:1.05;
  font-size:clamp(38px,6vw,64px);margin:20px 0 22px}
.lede{color:var(--muted);font-size:clamp(16px,1.6vw,19px);max-width:56ch}
section{padding:clamp(36px,5vw,60px) 0;border-top:1px solid var(--line)}
h2{font-family:var(--fd);font-weight:520;letter-spacing:-.012em;line-height:1.12;
  font-size:clamp(26px,3.4vw,38px);margin:14px 0 18px;max-width:24ch}
p+p{margin-top:16px}
section p{color:var(--muted);max-width:64ch}
ul{list-style:none;margin-top:22px}
li{padding:14px 0;border-top:1px solid var(--line);display:flex;gap:14px;align-items:baseline}
li:first-child{border-top:0}
li::before{content:"";flex:0 0 7px;height:7px;border-radius:50%;background:var(--accent);transform:translateY(-2px)}
.btn{display:inline-flex;align-items:center;border-radius:99px;padding:15px 30px;font-size:15.5px;
  font-weight:560;text-decoration:none;min-height:48px}
.btn.pri{background:var(--ink);color:var(--bg)}
.btn.sec{border:1px solid var(--edge);color:var(--ink)}
.ctas{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}
.areas{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
.areas a{border:1px solid var(--line);border-radius:99px;padding:9px 16px;font-size:14px;
  text-decoration:none;color:var(--muted);display:inline-flex;align-items:center;min-height:40px}
.areas a:hover{border-color:var(--accent);color:var(--ink)}
footer{border-top:1px solid var(--line);padding:40px 0 60px;color:var(--muted);font-size:13.5px;margin-top:20px}
footer .fb{font-family:var(--fd);font-weight:600;font-size:18px;color:var(--ink);margin-bottom:10px}
footer .fb .dot{color:var(--accent)}
@media (prefers-reduced-motion:reduce){*{animation-duration:.001s!important;transition-duration:.001s!important}}
</style>
</head>
<body>
<nav aria-label="Main">
  <a class="brand" href="/">ci<span class="dot">.</span></a>
  <div class="navr">
    <a href="/#services">What we do</a>
    <a href="/#process">Process</a>
    <a class="cta" href="/#contact">Get a quote</a>
  </div>
</nav>

<main>
  <header class="hero">
    <div class="wrap">
      <span class="eyebrow mono"><i></i>${esc(area.name)} · ${esc(area.postcodes)}</span>
      <h1>Kitchens, built properly — in ${esc(area.name)}.</h1>
      <p class="lede">${esc(area.lede)}</p>
      <div class="ctas">
        <a class="btn pri" href="/#contact">Get a quote</a>
        <a class="btn sec" href="/">See the whole site</a>
      </div>
    </div>
  </header>

  <section aria-labelledby="h-stock">
    <div class="wrap">
      <span class="mono">The housing</span>
      <h2 id="h-stock">What we usually find in ${esc(area.name)} homes</h2>
      <p>${esc(area.stock)}</p>
      <p>${esc(area.implication)}</p>
    </div>
  </section>

  <section aria-labelledby="h-jobs">
    <div class="wrap">
      <span class="mono">Typical work</span>
      <h2 id="h-jobs">What that usually means</h2>
      <ul>${area.jobs.map(j => `\n        <li>${esc(j)}</li>`).join('')}
      </ul>
    </div>
  </section>

  <section aria-labelledby="h-how">
    <div class="wrap">
      <span class="mono">How it runs</span>
      <h2 id="h-how">Measured twice. Crafted once.</h2>
      <p>We come to you, look at the space properly, and listen to what you actually need. Then a clear plan and a clear price — no surprises held back for later. We build, we fit, we hand it back tidy, and we come back if anything needs us.</p>
      <p>The visit costs nothing, and we cover ${esc(area.name)} along with the rest of Croydon and Greater London.</p>
      <!-- Call and WhatsApp sit alongside the form link so an area page never forces a
           second hop. Same details as index.html — change both together. -->
      <div class="ctas">
        <a class="btn pri" href="tel:+447597231778">Call Vasil</a>
        <a class="btn sec" href="https://wa.me/447597231778" rel="noopener">WhatsApp a photo</a>
        <a class="btn sec" href="/#contact">Tell us about your kitchen</a>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-areas">
    <div class="wrap">
      <span class="mono">Also covering</span>
      <h2 id="h-areas">Other areas we work in</h2>
      <div class="areas">${others.map(a => `\n        <a href="/kitchens/${a.slug}/">${esc(a.name)}</a>`).join('')}
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    <div class="fb">ci<span class="dot">.</span> Crafted Ideas Ltd</div>
    <div>Company No. 16881417 · Registered in England<br>23 Sandpiper Road, South Croydon, CR2 8PQ</div>
  </div>
</footer>
</body>
</html>
`;
}
