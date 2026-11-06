// Screenshots every Vega screen and state at iPhone size (390x844 @2x, light mode) into ./out, plus out/manifest.json.
// Needs Google Chrome and the local server on port 4175 (preview "vega-main", or: python3 -m http.server 4175 --directory docs).
// Usage: npm install, then node shoot.mjs (all) or node shoot.mjs <id prefix> (one or a few, e.g. order).
import puppeteer from 'puppeteer-core';
import fs from 'fs';
const SRC = new URL('../../docs/index.html', import.meta.url).pathname;
const APP = 'http://localhost:4175/';
const OUT = new URL('./out/', import.meta.url).pathname;
fs.mkdirSync(OUT, {recursive: true});
const html = fs.readFileSync(SRC, 'utf8').replace('const sh = ui.sheet;', 'const sh = ui.sheet; window.__v = {act, setS, setUi, S, ui};');

const browser = await puppeteer.launch({executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars']});
const page = await browser.newPage();
await page.setViewport({width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: false});
await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: 'light'}]);
await page.setRequestInterception(true);
page.on('request', r => { const u = new URL(r.url());
  if (r.resourceType() === 'document' && u.host === 'localhost:4175') r.respond({status: 200, contentType: 'text/html', body: html}); else r.continue(); });
page.on('pageerror', e => console.log('PAGE ERROR', e.message));

const wait = ms => new Promise(r => setTimeout(r, ms));
const settle = async (ms = 500) => { await wait(ms); await page.evaluate(() => document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} })); await wait(120); };
const fresh = async () => { await page.goto(APP, {waitUntil: 'networkidle0'}); await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.goto(APP, {waitUntil: 'networkidle0'}); await page.waitForFunction(() => window.__v); await settle(300); };
const act = async (name, ...args) => { await page.evaluate((n, a) => window.__v.act[n](...a), name, args); await settle(); };
const ev = async (fn, ...args) => { const r = await page.evaluate(fn, ...args); await settle(); return r; };
// click the first visible element matching sel whose text includes txt
const click = async (txt, sel = 'button') => { const ok = await page.evaluate((t, s) => { const el = [...document.querySelectorAll(s)].filter(e => e.offsetParent || e.getClientRects().length).find(e => !t || e.textContent.replace(/\s+/g, ' ').includes(t));
  if (el) { el.scrollIntoView({block: 'center'}); el.click(); } return !!el; }, txt, sel); if (!ok) throw new Error('no element ' + sel + ' ' + txt); await settle(); };
const type = async (sel, text) => { await page.click(sel); await page.type(sel, text); await settle(); };
const sign = async () => { const c = await page.$('.sign-pad'); await c.evaluate(e => e.scrollIntoView({block: 'center'})); await wait(200); const b = await c.boundingBox();
  await page.mouse.move(b.x + 30, b.y + b.height * .6); await page.mouse.down();
  for (let i = 0; i <= 24; i++) await page.mouse.move(b.x + 30 + i * (b.width - 60) / 24, b.y + b.height * (.5 + .25 * Math.sin(i / 2.2)));
  await page.mouse.up(); await settle(); };
const keys = async s => { for (const k of s) { await page.keyboard.press(k); await wait(60); } await settle(500); };
const scrollIn = async (sel, to = 'bottom') => ev((s, t) => { const el = document.querySelector(s); if (el) el.scrollTop = t === 'bottom' ? el.scrollHeight : t; }, sel, to);
const checkIn = async bid => act('checkIn', bid);
const pastId = async (day, i = 0) => page.evaluate((d, i) => Object.values(BUYERS).filter(b => b.rep === 'roberto' && b.day === d)[i].id, day, i);

const S = []; const add = (flow, id, title, note, run) => S.push({flow, id, title, note, run});

// 1 Sign in
add('Sign in', 'signin-list', 'Who’s selling?', 'After Sign out: pick a seller', async () => { await act('signOut'); });
add('Sign in', 'signin-pin', 'Enter code', 'Tap Roberto D.: 4-digit code', async () => { await act('signOut'); await click('Roberto', 'button.row'); });
add('Sign in', 'signin-wrong', 'Wrong code', 'Passcode set, wrong digits', async () => { await ev(() => window.__v.setS(s => ({...s, pins: {roberto: '1234'}}))); await act('signOut'); await click('Roberto', 'button.row'); await keys('1111'); });

// 2 Home without a client
add('Home · no client', 'home', 'Home · today', 'Nobody checked in', async () => {});
add('Home · no client', 'home-past', 'Home · past day', 'Day 1: orders sent / confirmed', async () => { await ev(() => document.querySelectorAll('.day')[0].click()); });
add('Home · no client', 'home-future', 'Home · next day', 'Upcoming appointments', async () => { await ev(() => document.querySelectorAll('.day')[4].click()); });
add('Home · no client', 'appt-new', 'Appointment · before check-in', 'Linea Concept, no order yet: Check in', async () => { await act('sheet', {type: 'appt', bid: 'linea'}); });
add('Home · no client', 'appt-draft', 'Appointment · order in draft', 'Maison Dubois: order row + Check in', async () => { await act('sheet', {type: 'appt', bid: 'dubois'}); });
add('Home · no client', 'appt-out', 'Appointment · checked out', 'Past client: View order / Check in again', async () => { await act('sheet', {type: 'appt', bid: await pastId(-1)}); });
add('Home · no client', 'guide', 'Buying guidelines', 'From the appointment: budget per category', async () => { await act('sheet', {type: 'guide', bid: 'dubois'}); });
add('Home · no client', 'guide-pdf', 'Guidelines PDF', 'Open the Maison PDF', async () => { await act('sheet', {type: 'guide', bid: 'dubois'}); await act('set', {pdf: true}); });

// 3 Profile
add('Profile', 'profile', 'Profile', 'Tap the avatar on Home', async () => { await act('sheet', {type: 'profile'}); });
add('Profile', 'history', 'Order history', 'All orders of the seller', async () => { await act('sheet', {type: 'history'}); });
add('Profile', 'history-draft', 'Order history · Draft', 'Filter Draft', async () => { await act('sheet', {type: 'history'}); await click('Draft', '.sheet button'); });
add('Profile', 'passcode', 'Set passcode', 'Choose a 4-digit code', async () => { await act('sheet', {type: 'passcode'}); });
add('Profile', 'passcode-2', 'Set passcode · confirm', 'Enter it again', async () => { await act('sheet', {type: 'passcode'}); await keys('1234'); });
add('Profile', 'feedback', 'App feedback', 'Note + screenshots for the Vega team', async () => { await act('sheet', {type: 'feedback'}); });

// 4 Browsing without a client
add('Browse · no client', 'coll', 'Collection · Women SS27', 'No client: every style', async () => { await act('tab', 'catalogue'); });
add('Browse · no client', 'coll-men', 'Collection · Men', 'Tap Men in the title', async () => { await act('tab', 'catalogue'); await click('Men', '.div-title button'); await wait(500); await settle(); });
add('Browse · no client', 'coll-pre', 'Collection · Pre-SS27', 'Collection tab Pre-SS27', async () => { await act('tab', 'catalogue'); await click('Pre-SS27', '.coll-t'); await wait(500); await settle(); });
add('Browse · no client', 'coll-perm', 'Collection · Permanent', 'Collection tab Permanent', async () => { await act('tab', 'catalogue'); await click('Permanent', '.coll-t'); await wait(500); await settle(); });
add('Browse · no client', 'coll-cat', 'Collection · Bags', 'Category pill Bags', async () => { await act('tab', 'catalogue'); await click('Bags', '.cn-cat'); await wait(500); await settle(); });
add('Browse · no client', 'filters', 'Filters', 'Drop, Priority, Material', async () => { await act('tab', 'catalogue'); await act('sheet', {type: 'filter'}); });
add('Browse · no client', 'coll-filtered', 'Collection · filtered', 'Must have + Leather: chips, black filter icon', async () => { await act('tab', 'catalogue'); await act('set', {catTag: 'must', catMat: 'leather'}); });
add('Browse · no client', 'search', 'Search', 'Magnifying glass: recents + suggestions', async () => { await act('tab', 'catalogue'); await act('set', {search: true}); });
add('Browse · no client', 'search-res', 'Search · results', '“Puzzle”', async () => { await act('tab', 'catalogue'); await act('set', {search: true}); await type('.srch input', 'Puzzle'); await ev(() => document.activeElement.blur()); });
add('Browse · no client', 'product', 'Product page · no client', 'Add to order asks which client', async () => { await act('sheet', {type: 'product', pid: 'w-amazona-s', colour: 'Mocha'}); });
add('Browse · no client', 'zoom', 'Photo full screen', 'Tap the photo', async () => { await act('set', {zoom: {pid: 'w-amazona-s', colour: 'Mocha', i: 0}}); });
add('Browse · no client', 'pick', 'Add to an order', 'Choose the client', async () => { await act('sheet', {type: 'pick', item: {pid: 'w-amazona-s', colour: 'Mocha', via: 'search'}}); });
add('Browse · no client', 'newbuyer', 'New session', 'Client without an appointment', async () => { await act('sheet', {type: 'newbuyer', item: {pid: 'w-amazona-s', colour: 'Mocha', via: 'search'}}); });
add('Browse · no client', 'looks', 'Looks', 'Women first, then Men', async () => { await act('tab', 'today'); });
add('Browse · no client', 'look', 'Look · no client', 'Pieces of the look, no add button', async () => { await act('sheet', {type: 'look', id: 'L04'}); });

// 5 Scan
add('Scan', 'cam-aim', 'Scan · aim', 'No client: “Scan a sample”', async () => { await act('capture', true); });
add('Scan', 'cam-scan', 'Scan · finding the style', 'After the shutter', async () => { await act('capture', true); await page.evaluate(() => document.querySelector('.shutter').click()); await wait(350); await page.evaluate(() => document.getAnimations().forEach(a => a.pause())); });
add('Scan', 'cam-match', 'Scan · match, no client', 'View item / Add to order (asks the client)', async () => { await act('capture', true); await click('', '.shutter'); await wait(1500); await settle(); });
add('Scan', 'cam-match-client', 'Scan · match, client in session', 'Maison Dubois · Women’s', async () => { await checkIn('dubois'); await act('capture', true); await click('', '.shutter'); await wait(1500); await settle(); });
add('Scan', 'cam-match-locked', 'Scan · women’s part already sent', 'Maison Dubois, Women sent: can’t go on the order', async () => { await ev(() => window.__v.act.send('o-dubois', ['W'], 'client', 'Claire Dubois')); await checkIn('dubois'); await act('capture', true); await click('', '.shutter'); await wait(1500); await settle(); });

// 6 Client in session
add('Client checked in', 'in-coll', 'Collection · client in session', 'Check in → black band, ✓ on styles in the order', async () => { await checkIn('dubois'); });
add('Client checked in', 'in-home', 'Home · client ongoing', '“Now” section', async () => { await checkIn('dubois'); await act('tab', 'calendar'); });
add('Client checked in', 'in-appt', 'Appointment · ongoing', 'Check out / Add products', async () => { await checkIn('dubois'); await act('sheet', {type: 'appt', bid: 'dubois'}); });
add('Client checked in', 'in-product', 'Product page · in the order', 'Sizes and quantities save at once', async () => { await checkIn('dubois'); await act('sheet', {type: 'product', pid: 'w-shirt-dress', colour: 'Navy Blue'}); });
add('Client checked in', 'in-product-new', 'Product page · not in the order', 'First quantity adds the colour', async () => { await checkIn('dubois'); await act('sheet', {type: 'product', pid: 'w-cord', colour: null}); await ev(() => { const b = [...document.querySelectorAll('.colour')].find(x => !x.querySelector('.fl, [class*=flag]')); b && b.click(); }); });
add('Client checked in', 'in-product-one', 'Product page · one size', 'Stepper for one-size styles', async () => { await checkIn('dubois'); await act('sheet', {type: 'product', pid: 'w-amazona-s', colour: 'Mocha'}); });
add('Client checked in', 'in-locked', 'Collection · Men-only client', 'Harbour & Co.: opens on Men, only styles their profile can buy', async () => { await checkIn('harbour'); });
add('Client checked in', 'in-search', 'Search · client in session', '“Puzzle”: styles the client can buy', async () => { await checkIn('dubois'); await act('set', {search: true}); await type('.srch input', 'Puzzle'); await ev(() => document.activeElement.blur()); });
add('Client checked in', 'in-looks', 'Looks · client in session', 'Band on top', async () => { await checkIn('dubois'); await act('tab', 'today'); });
add('Client checked in', 'in-look', 'Look · client in session', 'Add look to basket', async () => { await checkIn('dubois'); await act('sheet', {type: 'look', id: 'L09'}); });

// 7 Order (draft)
add('Order · draft', 'order', 'Order · Women', 'Tap View order in the band', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); });
add('Order · draft', 'order-bottom', 'Order · Currently missing', 'Scrolled down: required look pieces', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); await scrollIn('.ov-body'); });
add('Order · draft', 'order-men', 'Order · Men', 'Men tab', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); await act('div', 'M'); });
add('Order · draft', 'kpis', 'Budgets & KPIs', 'Tap the budget card', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); await act('sheet', {type: 'kpis', orderId: 'o-dubois'}); });
add('Order · draft', 'order-empty', 'Order · empty', 'Just checked in, nothing added', async () => { await checkIn('linea'); await act('openOrder', 'linea'); });
add('Order · draft', 'order-novisit', 'Order · outside the visit', 'From Home / history: Check in to add products', async () => { await act('openOrder', 'dubois'); });

// 8 Finish and send
add('Finish & send', 'finish', 'Finish order', 'Women + Men, 2 styles without quantity', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); await act('sheet', {type: 'finish', orderId: 'o-dubois'}); });
add('Finish & send', 'finish-ready', 'Finish order · signed', 'Men only, name + signature', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); await act('sheet', {type: 'finish', orderId: 'o-dubois'});
  await click('Women', '.fpage button.row'); await type('.fpage input[placeholder="Name of the person signing"]', 'Claire Dubois'); await sign(); });
add('Finish & send', 'sent-team', 'Sent to the commercial team', 'Send to commercial team', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); await act('sheet', {type: 'finish', orderId: 'o-dubois'});
  await click('Women', '.fpage button.row'); await type('.fpage input[placeholder="Name of the person signing"]', 'Claire Dubois'); await sign(); await click('Send to commercial team'); });
add('Finish & send', 'sent-client', 'Sent to the client', 'Send to client to finish', async () => { await checkIn('dubois'); await act('openOrder', 'dubois'); await act('sheet', {type: 'finish', orderId: 'o-dubois'});
  await type('.fpage input[placeholder="Name of the person signing"]', 'Claire Dubois'); await sign(); await click('Send to client to finish'); });
add('Finish & send', 'all-sent-finish', 'Finish order · all sent', 'Everything is sent', async () => { await ev(() => window.__v.act.send('o-dubois', ['W', 'M'], 'client', 'Claire Dubois')); await act('openOrder', 'dubois'); await act('sheet', {type: 'finish', orderId: 'o-dubois'}); });

// 9 After sending
add('After sending', 'o-partial', 'Order · partly sent (Men sent)', 'Men tab: read-only', async () => { await ev(() => window.__v.act.send('o-dubois', ['M'], 'client', 'Claire Dubois')); await act('openOrder', 'dubois'); await act('div', 'M'); });
add('After sending', 'o-partial-w', 'Order · partly sent (Women draft)', 'Women tab still editable', async () => { await ev(() => window.__v.act.send('o-dubois', ['M'], 'client', 'Claire Dubois')); await act('openOrder', 'dubois'); });
add('After sending', 'o-sent', 'Order · sent', 'Both parts signed and sent', async () => { await ev(() => window.__v.act.send('o-dubois', ['W', 'M'], 'client', 'Claire Dubois')); await act('openOrder', 'dubois'); });
add('After sending', 'o-shared', 'Order · with the client', 'Link sent · 48h to finish', async () => { await ev(() => window.__v.act.share('o-dubois', ['W', 'M'], 'Claire Dubois', 'buying@maisondubois.com')); await act('openOrder', 'dubois'); });
add('After sending', 'o-confirmed', 'Order · confirmed', 'Past client: ready for production', async () => { await act('openOrder', await pastId(-3)); });
add('After sending', 'product-sent', 'Product page · part sent', 'Client in session, Men sent: locked', async () => { await ev(() => window.__v.act.send('o-dubois', ['M'], 'client', 'Claire Dubois')); await checkIn('dubois'); await act('sheet', {type: 'product', pid: 'm-pogo', colour: 'Brown Green'}); });

// 10 Client view (shared link)
const share = async () => { await ev(() => window.__v.act.share('o-dubois', ['W', 'M'], 'Claire Dubois', 'buying@maisondubois.com')); await act('role', 'buyer', 'o-dubois'); };
add('Client view (link)', 'bv', 'Client view · Women', 'Opened from the email link (demo)', share);
add('Client view (link)', 'bv-men', 'Client view · Men', 'Men tab', async () => { await share(); await act('div', 'M'); });
add('Client view (link)', 'bv-size', 'Client · change quantities', 'Tap a style', async () => { await share(); await click('', '.ov-lines .list .row'); });
add('Client view (link)', 'bv-picker', 'Client · Find a style', 'Add from the collection', async () => { await share(); await click('Add from the collection'); });
add('Client view (link)', 'bv-sign', 'Client · Sign the order', 'Review and sign', async () => { await share(); await click('Review and sign'); await type('.fpage input', 'Claire Dubois'); await sign(); });
add('Client view (link)', 'bv-done', 'Client view · sent', 'After signing: thank you', async () => { await share(); await click('Review and sign'); await type('.fpage input', 'Claire Dubois'); await sign(); await click('Confirm and send'); await wait(2400); await settle(); });

const only = process.argv[2];
const man = [];
for (const s of S) {
  if (only && !s.id.startsWith(only)) continue;
  try { await fresh(); await s.run(); await settle(300);
    await page.screenshot({path: OUT + s.id + '.png'}); man.push({flow: s.flow, id: s.id, title: s.title, note: s.note}); console.log('ok', s.id);
  } catch (e) { console.log('FAIL', s.id, e.message); }
}
if (!only) fs.writeFileSync(OUT + 'manifest.json', JSON.stringify(man, null, 1));
await browser.close();
