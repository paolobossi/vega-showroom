// Renders the app icon: a white four-pointed sparkle (concave sides) on black, at 512, 192 and 180 px
import puppeteer from '../screens/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
// usage: node tools/icon/make.mjs docs 0.08  (output folder; how far the sides curve in, 0 = thinnest)
const out = process.argv[2], a = +(process.argv[3] || 0.08);
const c = 256, R = 165, k = a * R;
const d = `M${c} ${c - R} Q${c + k} ${c - k} ${c + R} ${c} Q${c + k} ${c + k} ${c} ${c + R} Q${c - k} ${c + k} ${c - R} ${c} Q${c - k} ${c - k} ${c} ${c - R}Z`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#000"/><path d="${d}" fill="#fff"/></svg>`;
const b = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true});
const p = await b.newPage();
for (const [s, name] of [[512, 'icon-512.png'], [192, 'icon-192.png'], [180, 'apple-touch-icon.png']]) {
  await p.setViewport({width:s, height:s, deviceScaleFactor:1});
  await p.setContent(`<html><body style="margin:0">${svg.replace('width="512" height="512"', `width="${s}" height="${s}"`)}</body></html>`);
  await p.screenshot({path:`${out}/${name}`, clip:{x:0, y:0, width:s, height:s}});
}
await b.close();
console.log(d);
