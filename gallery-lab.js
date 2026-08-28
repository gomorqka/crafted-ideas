/* Gallery lab — three treatments over the same nine projects.
   External file on purpose: the CSP is `script-src 'self'` plus a hash per inline script in
   index.html, and the build only hashes index.html. An inline script here would be blocked. */
(function () {
  'use strict';

  var P = [
    { f: '01-soft-matt-schmidt-kitchen-epsom',       t: 'Seamless & Sophisticated',    l: 'Soft Matt Schmidt Kitchen · Epsom',
      p: 'A refined soft-matt kitchen with concealed pocket doors, integrated appliances and a discreet downdraft extractor.',
      a: 'Open-plan kitchen with matt black handleless cabinetry, a white marble-topped island with three stools, an integrated downdraft extractor and two skylights overhead.' },
    { f: '02-stone-island-handleless-fulham',        t: 'Sculptural Simplicity',       l: 'Handleless Kitchen & Stone Island · Fulham',
      p: 'A striking stone island with push-to-open cabinetry, creating a beautifully clean and uninterrupted aesthetic.',
      a: 'Handleless taupe kitchen with a heavily veined white and purple marble island and matching splashback, beside a run of integrated ovens.' },
    { f: '03-alno-kitchen-clapham-common',           t: 'Contemporary Meets Character', l: 'Alno Kitchen · Clapham Common',
      p: 'An elegant Alno kitchen that balances contemporary design with the warmth and character of a period home.',
      a: 'White handleless kitchen in a rear extension, seen through open bifold doors from the garden, with exposed brick, pendant lights and a dining table.' },
    { f: '04-bespoke-pantry-cabinetry-dulwich',      t: 'Made for the Space',          l: 'Bespoke Pantry & Kitchen Cabinetry · Dulwich',
      p: 'Bespoke navy blue kitchen and pantry units, crafted in Brixton for a new contemporary Dulwich home, combining rich colour, natural timber and considered storage.',
      a: 'Navy blue kitchen with oak open shelving, a grey chevron-tiled splashback, white worktops and an integrated oven, with a boot room visible beyond.' },
    { f: '05-hand-painted-kitchen-caterham',         t: 'Colour, Your Way',            l: 'Hand-Painted Kitchen and Island · Caterham',
      p: 'Hand-painted furniture finished in your choice of RAL colour, bringing individuality and personality to every interior.',
      a: 'Hand-painted grey shaker kitchen with a marble splashback, a stainless range cooker and a dark grey island with three chrome stools.' },
    { f: '06-zone-lighting-control-guildford',       t: 'Light by Design',             l: 'Tailor-Made Zone Lighting Control · Guildford',
      p: 'Flexible lighting controls create the perfect balance of task, ambient and architectural illumination.',
      a: 'White and grey handleless kitchen with under-cabinet and plinth lighting, a large island with induction hob, and full-height windows onto a garden.' },
    { f: '07-interior-solutions-south-croydon',      t: 'Beyond the Kitchen',          l: 'Complete Made-to-Measure Interior Solutions · South Croydon',
      p: 'A fully considered approach to fitted furniture, creating a seamless design language throughout the home.',
      a: 'Dark green handleless kitchen with oak open shelving, a concrete-topped island with three wooden stools, and an American fridge freezer.' },
    { f: '08-renovation-remodelling',                t: 'Reimagining the Home',        l: 'Complete Renovation & Remodelling Projects',
      p: 'Idea, design, completion. Thoughtful renovation service and bespoke design transform existing spaces into sophisticated, highly functional interiors.',
      a: 'Compact white handleless kitchen, newly finished and unfurnished, with a marble-effect island, brass tap and integrated ovens.' },
    { f: '09-showroom-schmidt-epsom',                t: 'Design in Detail',            l: 'Showroom Installations · Schmidt Epsom',
      p: 'A contemporary Schmidt installation showcasing architectural cabinetry, integrated appliances and a statement central island.',
      a: 'Schmidt showroom display: gloss white kitchen with an oak-clad island, marble splashback and a laid dining setting alongside.' }
  ];

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var big = function (f) { return '/media/work-1200/' + f + '.jpg'; };
  var mid = function (f) { return '/media/work-800/' + f + '.jpg'; };
  var el = function (tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  var reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------------- treatment switcher ---------------- */
  (function () {
    var bar = document.querySelector('.labbar .sw');
    if (!bar) return;
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-t]');
      if (!b) return;
      [].forEach.call(bar.querySelectorAll('button'), function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
      ['hs', 'gr', 'st'].forEach(function (k) {
        document.getElementById('t-' + k).classList.toggle('on', k === b.dataset.t);
      });
      window.scrollTo(0, 0);
    });
  })();

  /* ---------------- A · swipe ---------------- */
  (function () {
    var track = document.getElementById('hs-track');
    if (!track) return;
    var dots = document.getElementById('hs-dots');

    P.forEach(function (o, i) {
      var it = el('div', 'hs-item');
      /* Only the first two are eager. The rest arrive as they are swiped to, which is the whole
         point of this treatment: two frames in memory instead of nine. */
      it.innerHTML =
        '<img src="' + big(o.f) + '" srcset="' + mid(o.f) + ' 800w, ' + big(o.f) + ' 1200w" sizes="100vw"' +
        ' alt="' + o.a.replace(/"/g, '&quot;') + '"' + (i < 2 ? '' : ' loading="lazy"') + ' decoding="async">' +
        '<div class="hs-cap"><span class="mono n">' + pad(i + 1) + ' / ' + pad(P.length) + '</span>' +
        '<h3>' + o.t + '</h3><p>' + o.p + '</p>' +
        '<span class="mono loc">' + o.l + '</span></div>';
      track.appendChild(it);
      var d = el('button', null, String(i + 1));
      d.type = 'button';
      d.setAttribute('aria-label', 'Show project ' + (i + 1) + ': ' + o.t);
      if (i === 0) d.setAttribute('aria-current', 'true');
      d.addEventListener('click', function () { go(i); });
      dots.appendChild(d);
    });

    var prev = document.getElementById('hs-prev'), next = document.getElementById('hs-next');
    var at = 0;
    var go = function (n) {
      n = Math.max(0, Math.min(P.length - 1, n));
      track.scrollTo({ left: n * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
    };
    var sync = function () {
      var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      if (i === at) return;
      at = i;
      [].forEach.call(dots.children, function (d, k) {
        if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      prev.disabled = (i === 0);
      next.disabled = (i === P.length - 1);
    };
    var raf = false;
    track.addEventListener('scroll', function () {
      if (raf) return; raf = true;
      requestAnimationFrame(function () { raf = false; sync(); });
    }, { passive: true });
    prev.addEventListener('click', function () { go(at - 1); });
    next.addEventListener('click', function () { go(at + 1); });
    prev.disabled = true;
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(at + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(at - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(P.length - 1); }
    });
  })();

  /* ---------------- B · grid, then expand ---------------- */
  (function () {
    var grid = document.getElementById('gr-grid'), full = document.getElementById('gr-full');
    if (!grid || !full) return;
    var fi = document.getElementById('gr-full-img'), fn = document.getElementById('gr-full-n'),
        ft = document.getElementById('gr-full-t'), fp = document.getElementById('gr-full-p'),
        fl = document.getElementById('gr-full-l');
    var at = 0, opener = null;

    P.forEach(function (o, i) {
      var b = el('button', 'gr-cell');
      b.type = 'button';
      b.setAttribute('aria-label', 'Open: ' + o.t + ', ' + o.l);
      /* thumbnails only — the 800 set, about a tenth of the bytes of nine full frames */
      b.innerHTML = '<img src="' + mid(o.f) + '" alt="" loading="lazy" decoding="async">' +
        '<span class="gr-meta"><span class="mono n">' + pad(i + 1) + ' / ' + pad(P.length) + '</span>' +
        '<h3>' + o.t + '</h3><span class="mono loc">' + o.l + '</span></span>';
      b.addEventListener('click', function () { opener = b; open(i); });
      grid.appendChild(b);
    });

    function open(i) {
      at = ((i % P.length) + P.length) % P.length;
      var o = P[at];
      fi.src = big(o.f); fi.alt = o.a;
      fn.textContent = pad(at + 1) + ' / ' + pad(P.length);
      ft.textContent = o.t; fp.textContent = o.p; fl.textContent = o.l;
      full.classList.add('on');
      document.documentElement.style.overflow = 'hidden';
      document.getElementById('gr-close').focus();
    }
    function close() {
      full.classList.remove('on');
      document.documentElement.style.overflow = '';
      if (opener) opener.focus();
    }
    document.getElementById('gr-close').addEventListener('click', close);
    document.getElementById('gr-prev').addEventListener('click', function () { open(at - 1); });
    document.getElementById('gr-next').addEventListener('click', function () { open(at + 1); });

    /* Swipe, because on a phone this is a full-screen image viewer and nobody reaches for a
       48px arrow when the whole frame is under their thumb. */
    var x0 = null, y0 = null;
    full.addEventListener('touchstart', function (e) {
      x0 = e.changedTouches[0].clientX; y0 = e.changedTouches[0].clientY;
    }, { passive: true });
    full.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) open(at + (dx < 0 ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();   /* swipe down to dismiss */
    }, { passive: true });

    addEventListener('keydown', function (e) {
      if (!full.classList.contains('on')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowRight') { open(at + 1); return; }
      if (e.key === 'ArrowLeft') { open(at - 1); return; }
      /* Focus trap: a modal that lets Tab wander out into the page behind it is worse than no
         modal, because the page behind is inert to the eye but not to the keyboard. */
      if (e.key === 'Tab') {
        var f = full.querySelectorAll('button');
        if (!f.length) return;
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
  })();

  /* ---------------- C · one per screen, sides alternate ---------------- */
  (function () {
    var list = document.getElementById('st-list');
    if (!list) return;
    P.forEach(function (o, i) {
      var it = el('div', 'st-item');
      it.innerHTML =
        '<img src="' + big(o.f) + '" srcset="' + mid(o.f) + ' 800w, ' + big(o.f) + ' 1200w" sizes="100vw"' +
        ' alt="' + o.a.replace(/"/g, '&quot;') + '"' + (i === 0 ? '' : ' loading="lazy"') + ' decoding="async">' +
        '<div class="st-cap"><span class="mono n">' + pad(i + 1) + ' / ' + pad(P.length) + '</span>' +
        '<h3>' + o.t + '</h3><p>' + o.p + '</p>' +
        '<span class="mono loc">' + o.l + '</span></div>';
      list.appendChild(it);
    });
    /* Reveal on entry, and then stop watching. No scroll handler, nothing recomputed per frame,
       and no element left permanently promoted to its own layer. */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -18% 0px' });
      [].forEach.call(list.children, function (c) { io.observe(c); });
    } else {
      [].forEach.call(list.children, function (c) { c.classList.add('seen'); });
    }
  })();
})();
