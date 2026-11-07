// Builds the review page from the screenshots: out/review/index.html plus out/review/shots/<id>.webp (600px wide).
// Run after `node shoot.mjs` (needs out/manifest.json and ImageMagick's `magick`). The folder is what gets published as the Claude page.
import fs from 'fs';
import {execFileSync} from 'child_process';

const OUT = new URL('./out/', import.meta.url).pathname, DIR = OUT + 'review/';
const man = JSON.parse(fs.readFileSync(OUT + 'manifest.json', 'utf8'));
fs.rmSync(DIR, {recursive: true, force: true}); fs.mkdirSync(DIR + 'shots', {recursive: true});
for (const s of man) execFileSync('magick', [OUT + s.id + '.png', '-resize', '600x', '-quality', '82', DIR + 'shots/' + s.id + '.webp']);

const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const flows = [...new Set(man.map(s => s.flow))].map((name, i) => ({name, letter: String.fromCharCode(65 + i), shots: man.filter(s => s.flow === name)}));
const L = Object.fromEntries(flows.map(f => [f.name, f.letter]));
const day = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
const chip = n => { const f = flows.find(x => x.name.startsWith(n)); return f ? `<a class="fl" href="#flow-${f.letter}"><b>${f.letter}</b> ${esc(f.name)}</a>` : ''; };

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vega Screen Flows</title>
<style>
:root{--bg:#EFF0EC;--surface:#FFFFFF;--ink:#16181A;--muted:#6B6F73;--line:#DCDDD8;--accent:#1F3FBF;--shade:rgba(10,12,14,.92);color-scheme:light}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#0F1113;--surface:#181A1E;--ink:#ECEDEE;--muted:#9A9EA3;--line:#2A2D33;--accent:#8EA2FF;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0F1113;--surface:#181A1E;--ink:#ECEDEE;--muted:#9A9EA3;--line:#2A2D33;--accent:#8EA2FF;color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 -apple-system,BlinkMacSystemFont,"Inter","Segoe UI",sans-serif;-webkit-text-size-adjust:100%}
.wrap{max-width:1240px;margin:0 auto;padding:28px 16px 80px}
h1{font-size:28px;line-height:1.15;margin:0 0 6px;letter-spacing:-.01em}
.sub{color:var(--muted);margin:0 0 18px}
.map{display:flex;flex-wrap:wrap;align-items:center;gap:6px 4px;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px;margin-bottom:8px}
.map .arr{color:var(--muted);padding:0 2px}
.map .br{flex-basis:100%;height:0}
.map .note{color:var(--muted);font-size:13px;margin-right:4px}
.fl{display:inline-flex;gap:5px;align-items:baseline;padding:5px 10px;border-radius:999px;background:var(--bg);color:var(--ink);text-decoration:none;font-size:13px;white-space:nowrap}
.fl b{color:var(--accent)}
nav{position:sticky;top:0;z-index:5;background:var(--bg);margin:0 -16px;padding:10px 16px;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(--line)}
nav::-webkit-scrollbar{display:none}
nav a{flex:none;font-size:13px;font-weight:600;text-decoration:none;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:6px 12px}
nav a b{color:var(--accent);margin-right:4px}
section{scroll-margin-top:60px;padding-top:30px}
h2{font-size:20px;margin:0 0 2px}h2 b{color:var(--accent);margin-right:6px}
.count{color:var(--muted);font-size:13px;margin:0 0 14px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:18px 14px}
@media (max-width:420px){.grid{grid-template-columns:1fr 1fr;gap:16px 10px}}
figure{margin:0;scroll-margin-top:70px}
figure button{display:block;width:100%;padding:0;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--surface);cursor:zoom-in}
figure img{display:block;width:100%;height:auto;aspect-ratio:390/844}
figcaption{padding:8px 2px 0;font-size:13px}
.code{display:inline-block;font-weight:700;color:var(--accent);margin-right:5px}
.t{font-weight:600}
.n{display:block;color:var(--muted);font-size:12px;margin-top:2px}
.lb{position:fixed;inset:0;z-index:20;background:var(--shade);display:none;flex-direction:column;align-items:center;justify-content:center;padding:16px}
.lb.on{display:flex}
.lb img{max-width:100%;max-height:calc(100vh - 120px);border-radius:18px;background:#fff}
.lb p{color:#fff;margin:12px 0 0;text-align:center;font-size:14px}.lb p span{color:#B9BDC2;display:block;font-size:12px}
.lb .x,.lb .pv,.lb .nx{position:absolute;border:0;background:rgba(255,255,255,.14);color:#fff;width:44px;height:44px;border-radius:50%;font-size:22px;cursor:pointer}
.lb .x{top:14px;right:14px}.lb .pv{left:14px;top:50%}.lb .nx{right:14px;top:50%}
@media (max-width:600px){.lb .pv,.lb .nx{top:auto;bottom:18px}.lb .pv{left:calc(50% - 56px)}.lb .nx{right:calc(50% - 56px)}.lb img{max-height:calc(100vh - 190px)}}
</style></head><body><div class="wrap">
<h1>Vega · Screen flows</h1>
<p class="sub">Every screen and state of the showroom app, ${man.length} screens in ${flows.length} flows, taken ${day} in Chrome at iPhone size (390 × 844). Tap a screen to see it large. Leave comments on any screen: Claude reads them.</p>
<div class="map">${chip('Sign in')}<span class="arr">→</span>${chip('Home')}<span class="arr">→</span>${chip('Client checked in')}<span class="arr">→</span>${chip('Order')}<span class="arr">→</span>${chip('Finish')}<span class="arr">→</span>${chip('After sending')}<span class="arr">→</span>${chip('Client view')}
<span class="br"></span><span class="note">From Home:</span>${chip('Profile')}${chip('Browse')}<span class="note">&nbsp;With a client:</span>${chip('Scan')}</div>
<nav>${flows.map(f => `<a href="#flow-${f.letter}"><b>${f.letter}</b>${esc(f.name)}</a>`).join('')}</nav>
${flows.map(f => `<section id="flow-${f.letter}"><h2><b>${f.letter}</b>${esc(f.name)}</h2><p class="count">${f.shots.length} screens</p><div class="grid">
${f.shots.map((s, i) => `<figure id="${esc(s.id)}"><button data-i="${man.indexOf(s)}" aria-label="${esc(`${f.letter}${i + 1} ${s.title}, open large`)}"><img src="shots/${esc(s.id)}.webp" alt="${esc(s.title)}" loading="lazy" decoding="async" width="390" height="844"></button>
<figcaption><span class="code">${f.letter}${i + 1}</span><span class="t">${esc(s.title)}</span><span class="n">${esc(s.note)}</span></figcaption></figure>`).join('\n')}
</div></section>`).join('\n')}
</div>
<div class="lb" role="dialog" aria-modal="true" aria-label="Screen"><button class="x" aria-label="Close">×</button><button class="pv" aria-label="Previous">‹</button><button class="nx" aria-label="Next">›</button><img alt=""><p></p></div>
<script>
const S = ${JSON.stringify(man.map(s => { const f = flows.find(x => x.name === s.flow); return {id: s.id, code: f.letter + (f.shots.indexOf(s) + 1), title: s.title, note: s.note}; }))};
const lb = document.querySelector('.lb'), im = lb.querySelector('img'), cap = lb.querySelector('p'); let cur = 0, x0 = null;
const show = i => { cur = (i + S.length) % S.length; const s = S[cur]; im.src = 'shots/' + s.id + '.webp'; im.alt = s.title;
  cap.textContent = s.code + ' · ' + s.title; const n = document.createElement('span'); n.textContent = s.note; cap.appendChild(n); lb.classList.add('on'); };
const close = () => lb.classList.remove('on');
document.querySelectorAll('figure button').forEach(b => b.addEventListener('click', () => show(+b.dataset.i)));
lb.querySelector('.x').onclick = close; lb.querySelector('.pv').onclick = () => show(cur - 1); lb.querySelector('.nx').onclick = () => show(cur + 1);
lb.addEventListener('click', e => { if (e.target === lb) close(); });
document.addEventListener('keydown', e => { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, {passive: true});
lb.addEventListener('touchend', e => { if (x0 == null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1)); x0 = null; });
</script>
</body></html>`;
fs.writeFileSync(DIR + 'index.html', html);
console.log(`review page: ${DIR}index.html · ${man.length} screens in ${flows.length} flows`);
