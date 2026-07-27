# craftedideas.co

Site for **Crafted Ideas Ltd** — kitchen construction, installation, fitting & repairs, Croydon / Greater London.

Static one-pager with a 700vh scroll-driven hero. `build.mjs` copies `index.html` + assets into `dist/` and pulls vendor files (anime.js v4, Lenis, Fraunces/Inter fonts) from npm at build time.

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
