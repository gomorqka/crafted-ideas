// Local preview that mirrors production: serves dist/ with the exact headers from vercel.json,
// so CSP is enforced and directory URLs resolve the way Vercel resolves them.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

// Re-read per request, deliberately. Reading it once at startup meant that any edit to an
// inline script — which changes its CSP hash, which `npm run build -- --fix-csp` then rewrites
// into vercel.json — left this server still sending the OLD policy. The browser silently
// blocked the whole classic script and the page looked broken in a way that had nothing to do
// with the change being tested. Cost a debugging cycle once; it cannot now.
const config = () => JSON.parse(readFileSync('vercel.json', 'utf8'));
const ROOT = 'dist';
const PORT = Number(process.argv[2]) || 4173;
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.mjs':'text/javascript',
  '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg',
  '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain', '.json':'application/json' };
const rx = s => new RegExp('^' + s.replace(/\//g, '\\/').replace(/\(\.\*\)/g, '.*') + '$');

createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  let f = join(ROOT, normalize(p).replace(/^(\.\.[/\\])+/, ''));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f) && existsSync(f + '.html')) f = f + '.html';   // cleanUrls
  for (const rule of config().headers) if (rx(rule.source).test(p)) for (const h of rule.headers) res.setHeader(h.key, h.value);
  if (!existsSync(f)) { res.statusCode = 404; res.setHeader('Content-Type','text/plain'); res.end('404 ' + p); return; }
  res.setHeader('Content-Type', TYPES[extname(f)] || 'application/octet-stream');
  res.end(readFileSync(f));
}).listen(PORT, () => {
  console.log(`\n  craftedideasltd.co.uk preview → http://localhost:${PORT}\n`);
  console.log('  Serving dist/ with production headers (CSP enforced).');
  console.log('  Pages:');
  console.log(`    http://localhost:${PORT}/`);
  for (const s of ['croydon','south-croydon','purley','bromley','sutton','beckenham'])
    console.log(`    http://localhost:${PORT}/kitchens/${s}/`);
  console.log('\n  Ctrl-C to stop.\n');
});
