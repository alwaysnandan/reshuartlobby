// Builds the static site from content/*.yml into dist/.
// Usage: npm run build
const fs = require('fs'), path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'dist');
const read = f => yaml.load(fs.readFileSync(path.join(ROOT, f), 'utf8')) || {};

/* ---------- helpers ---------- */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const md = s => s ? marked.parse(String(s).trim()) : '';
const mdi = s => s ? marked.parseInline(String(s).trim()) : '';
const arr = v => Array.isArray(v) ? v : (v ? [v] : []);
const isExt = u => /^(https?:|mailto:|tel:)/.test(u || '');
const href = u => {
  u = String(u || '#').trim();
  if (isExt(u) || u.startsWith('#')) return u;
  u = u.replace(/^\/+/, '').replace(/^reshuartlobby\//, '');
  if (!u) return 'index.html';
  return /\.|\?/.test(u) ? u : u + '.html';            // "classes" -> "classes.html"
};
// the studio's own registration app opens in the same tab; other web addresses open a new one
const ext = u => /^https?:/.test(u || '') && !/brightpanda.app/.test(u) ? ' target="_blank" rel="noopener"' : '';
const src = u => String(u).trim().replace(/^\/+/, '').replace(/^reshuartlobby\//, '');

const site = read('content/site.yml');
const pageFiles = fs.readdirSync(path.join(ROOT, 'content/pages')).filter(f => /\.ya?ml$/.test(f));
const pages = {};
for (const f of pageFiles) pages[f.replace(/\.ya?ml$/, '')] = read('content/pages/' + f);

/* ---------- media: photo if provided, otherwise generated illustration ---------- */
const media = (o, extraStyle = '') => {
  o = o || {};
  if (o.image) return `<img src="${esc(src(o.image))}" alt="${esc(o.caption || o.title || '')}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;${extraStyle}">`;
  return `<div data-art="${esc(o.art || 'abstract')}" data-seed="${esc(o.art_seed || 1)}" style="height:100%"></div>`;
};
const frame = (o, cls = 'frame pad rv') => `<div class="${cls}">${media(o)}</div>`;
const hasMedia = o => !!(o && (o.image || o.art));

/* ---------- small components ---------- */
const button = (b, kind) => {
  if (!b || !b.label) return '';
  const style = b.style || kind || 'solid';
  const cls = style === 'link' ? 'link' : style === 'outline' ? 'btn' : 'btn solid';
  return `<a class="${cls}" href="${esc(href(b.link))}"${ext(b.link)}>${esc(b.label)}</a>`;
};
const buttons = (list, wrapStyle = '') => {
  const h = arr(list).map(b => button(b)).join(' ');
  return h ? `<div class="cta" style="${wrapStyle}">${h}</div>` : '';
};
const prices = list => !arr(list).length ? '' : `<div class="prices rv">${arr(list).map(r => `<div class="row"><div><h4>${mdi(r.title)}</h4>${r.note ? `<small>${mdi(r.note).replace(/\n/g, '<br>')}</small>` : ''}</div>${
  r.link_label ? `<a class="link"${ext(r.link)} href="${esc(href(r.link))}">${esc(r.link_label)}</a>`
  : r.amount ? `<div class="amt">${esc(r.amount)}${r.unit ? `<small>${esc(r.unit)}</small>` : ''}</div>` : ''}</div>`).join('')}</div>`;
const facts = list => !arr(list).length ? '' : `<dl class="facts">${arr(list).map(x => `<div><dt>${esc(x.label)}</dt><dd>${mdi(x.value)}</dd></div>`).join('')}</dl>`;
const schedule = list => !arr(list).length ? '' : `<div class="sched">${arr(list).map(x => `<div class="s"><b>${esc(x.label)}</b><span>${mdi(x.text)}</span></div>`).join('')}</div>`;
const checklist = list => !arr(list).length ? '' : `<ul>${arr(list).map(x => `<li>${x.title ? `<b>${mdi(x.title)}</b> ` : ''}${mdi(x.text || '')}</li>`).join('')}</ul>`;
const chips = list => !arr(list).length ? '' : `<div class="chips">${arr(list).map(c => `<span class="chip">${esc(c)}</span>`).join('')}</div>`;
const sechead = (s, center = false) => (s.eyebrow || s.heading || s.intro) ? `<div class="sec-head rv${center ? ' center' : ''}">${s.eyebrow ? `<div class="eyebrow">${esc(s.eyebrow)}</div>` : ''}${s.heading ? `<h2>${mdi(s.heading)}</h2>` : ''}${s.intro ? `<p class="lede">${mdi(s.intro)}</p>` : ''}</div>` : '';
const sectionOpen = (s, extra = '') => `<section${s.tint === 'tint' ? ' class="tint"' : s.tint === 'dark' ? ' class="dark"' : ''}${extra}>`;
const notice = text => `<div class="notice rv">${md(text).replace(/^<p>|<\/p>\s*$/g, '')}</div>`;

const forms = {
  contact: `<form class="f rv" data-mailto data-to="${esc(site.email)}" data-subject="Enquiry from website"><div class="two"><div><label>Name</label><input name="Name" required></div><div><label>Email</label><input name="Email" type="email" required></div></div><div><label>Message</label><textarea name="Message" rows="5" required></textarea></div><div><button class="btn solid" type="submit">Send message</button></div><div class="ok">Your email app should open with the message ready to send.</div></form>`,
  register: `<form class="f rv" data-mailto data-to="${esc(site.email)}" data-subject="Registration request"><div class="two"><div><label>Your name</label><input name="Name" required></div><div><label>Email</label><input name="Email" type="email" required></div></div>
<div class="two"><div><label>Student’s name</label><input name="Student"></div><div><label>Student’s age</label><input name="Age" type="number" min="3"></div></div>
<div class="two"><div><label>Location</label><select name="Location">${arr(site.locations).map(l => `<option>${esc(l.name)}</option>`).join('')}<option>Online</option></select></div><div><label>I would like</label><select name="Interest"><option>Free trial class</option><option>Enrol in a session</option><option>Adult class</option><option>Workshop</option><option>Summer camp</option></select></div></div>
<div><label>Anything we should know?</label><textarea name="Notes" rows="3"></textarea></div><div><button class="btn solid" type="submit">Send request</button></div><div class="ok">Your email app should open with the request ready to send.</div></form>`
};

/* ---------- blocks (a column of content) ---------- */
function block(b) {
  if (b.form && b.form !== 'none') {
    const head = (b.eyebrow || b.heading) ? `<div class="sec-head rv" style="margin-bottom:34px">${b.eyebrow ? `<div class="eyebrow">${esc(b.eyebrow)}</div>` : ''}${b.heading ? `<h2 style="font-size:2.4rem">${mdi(b.heading)}</h2>` : ''}</div>` : '';
    return `<div>${head}${forms[b.form] || ''}</div>`;
  }
  const textual = b.eyebrow || b.heading || b.body || arr(b.list).length || arr(b.prices).length || arr(b.schedule).length || arr(b.chips).length || b.button_label;
  if (!textual && hasMedia(b)) return frame(b);
  const btn = b.button_label ? `<div style="margin-top:30px">${button({ label: b.button_label, link: b.button_link, style: b.button_style || 'solid' })}</div>` : '';
  return `<div class="prose rv">${b.eyebrow ? `<div class="eyebrow">${esc(b.eyebrow)}</div>` : ''}${b.heading ? `<h2>${mdi(b.heading)}</h2>` : ''}${md(b.body)}${checklist(b.list)}${schedule(b.schedule)}${chips(b.chips)}${prices(b.prices)}${b.footnote ? `<p class="muted" style="margin-top:20px;font-size:.93rem">${mdi(b.footnote)}</p>` : ''}${btn}${b.media_below && hasMedia(b) ? '' : ''}</div>`;
}

/* ---------- section layouts ---------- */
const L = {
  columns(s) {
    const bs = arr(s.blocks);
    const hasImg = bs.some(b => !(b.eyebrow || b.heading || b.body || arr(b.list).length || arr(b.prices).length || arr(b.schedule).length || arr(b.chips).length || b.form && b.form !== 'none') && hasMedia(b));
    const cls = bs.length === 1 ? '' : `split${hasImg ? '' : ' top'}`;
    if (bs.length === 1) return `${sectionOpen(s)}<div class="narrow">${block(bs[0])}</div></section>`;
    return `${sectionOpen(s)}<div class="wrap ${cls}">${bs.map(block).join('')}</div></section>`;
  },
  facts: s => `${sectionOpen(s, ' style="padding:60px 0"')}<div class="wrap"><div class="rv">${facts(s.facts)}</div></div></section>`,
  cards(s) {
    const n = +s.columns === 4 ? 'g4' : 'g3';
    const cards = arr(s.cards).map(c => {
      const thumb = hasMedia(c) ? `<div class="thumb">${media(c)}</div>` : '';
      const inner = `${thumb}<div class="body">${c.kicker ? `<div class="kicker">${esc(c.kicker)}</div>` : ''}<h3>${mdi(c.title)}</h3>${c.text ? `<p>${mdi(c.text)}</p>` : ''}${c.link ? `<div class="more">Discover →</div>` : ''}</div>`;
      return c.link ? `<a class="card rv" href="${esc(href(c.link))}"${ext(c.link)}>${inner}</a>` : `<div class="card rv">${inner}</div>`;
    }).join('');
    const stats = arr(s.stats).length ? `<div class="stats">${arr(s.stats).map(x => `<div><b>${esc(x.number)}</b><span>${esc(x.label)}</span></div>`).join('')}</div>` : '';
    const more = s.button_label ? `<div style="text-align:center;margin-top:50px">${button({ label: s.button_label, link: s.button_link, style: 'link' })}</div>` : '';
    return `${sectionOpen(s)}<div class="wrap">${sechead(s)}<div class="grid ${n}">${cards}</div>${stats}${more}</div></section>`;
  },
  numbers: s => `${sectionOpen(s)}<div class="wrap">${sechead(s)}<div class="grid g4">${arr(s.numbers).map(i => `<div class="rv"><div class="num">${esc(i.number)}</div><h3>${mdi(i.title)}</h3><p class="muted">${mdi(i.text)}</p></div>`).join('')}</div></div></section>`,
  features: s => `${sectionOpen(s)}<div class="wrap">${sechead(s)}<div class="grid g4">${arr(s.features).map(i => `<div class="rv"><div class="num" style="font-size:1.8rem">◆</div><h3 style="font-size:1.45rem">${mdi(i.title)}</h3><p class="muted" style="font-size:.95rem">${mdi(i.text)}</p></div>`).join('')}</div></div></section>`,
  prices: s => `${sectionOpen(s)}<div class="narrow">${sechead(s)}${prices(s.prices)}${s.footnote ? `<p class="muted rv" style="margin-top:24px">${mdi(s.footnote)}</p>` : ''}${s.notice ? notice(s.notice) : ''}</div></section>`,
  timeline: s => `${sectionOpen(s)}<div class="narrow">${sechead(s)}<div class="tl">${arr(s.timeline).map(t => `<div class="t rv"><small>${esc(t.date)}</small><h3>${mdi(t.title)}</h3><p>${mdi(t.text)}</p></div>`).join('')}</div></div></section>`,
  awards: s => `${sectionOpen(s)}<div class="narrow">${sechead(s)}${arr(s.awards).map(a => `<div class="award rv"><div class="yr">${esc(a.year)}</div><div>${a.badge ? `<span class="medal">${esc(a.badge)}</span>` : ''}<h3>${mdi(a.title)}</h3><p>${mdi(a.text)}</p></div></div>`).join('')}</div></section>`,
  gallery(s) {
    const items = arr(s.gallery).map(i => ({ t: i.title || '', a: i.art || 'abstract', c: i.category || 'Gallery', i: i.image ? src(i.image) : '' }));
    const cats = ['All', ...new Set(items.map(i => i.c))];
    return `${sectionOpen(s)}<div class="wrap">${sechead(s)}<div class="chips" style="justify-content:center;margin:0 0 50px">${cats.map((c, k) => `<button class="chip${k ? '' : ' on'}" data-filter="${esc(c)}">${esc(c)}</button>`).join('')}</div><div class="masonry" data-gallery="${esc(JSON.stringify(items.map(i => [i.t, i.a, i.c, i.i])))}"></div>${s.footnote ? `<p class="muted" style="text-align:center;margin-top:40px;font-size:.9rem">${mdi(s.footnote)}</p>` : ''}</div></section>`;
  },
  quote: s => `<section class="dark"><div class="wrap rv"><blockquote>${mdi(s.text)}${s.cite ? `<cite>${esc(s.cite)}</cite>` : ''}</blockquote></div></section>`,
  cta: s => `<section class="tint"><div class="wrap band rv"><div class="ornament" style="margin-bottom:30px"><i></i></div><h2>${mdi(s.heading)}</h2>${s.body ? `<p class="lede">${mdi(s.body)}</p>` : ''}${buttons(s.buttons, 'justify-content:center')}</div></section>`,
  notice: s => `<section style="padding:0 0 60px"><div class="narrow">${notice(s.text)}</div></section>`,
  marquee(s) { const w = arr(s.words).map(x => `${esc(x)} <i>◆</i> `).join(''); return `<div class="marquee"><div>${w}${w}</div></div>`; }
};

/* ---------- page chrome ---------- */
function header(slug) {
  const on = h => href(h) === slug + '.html' ? ' on' : '';
  const a = site.announcement || {};
  const nav = arr(site.nav).map(n => n.items
    ? `<div class="dd${arr(n.items).some(i => on(i.link)) ? ' on' : ''}"><button>${esc(n.label)}</button><div class="menu">${arr(n.items).map(i => `<a class="${on(i.link).trim()}" href="${esc(href(i.link))}">${esc(i.label)}</a>`).join('')}</div></div>`
    : `<a class="${on(n.link).trim()}" href="${esc(href(n.link))}">${esc(n.label)}</a>`).join('');
  const reg = site.register_button || {};
  return `${a.text ? `<div class="announce">${esc(a.text)}${a.link_label ? ` <a href="${esc(href(a.link))}">${esc(a.link_label)}</a>` : ''}</div>` : ''}
<header class="site"><div class="wrap">
<a class="brand" href="index.html">${esc(site.name)}<small>${esc(site.tagline)}</small></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
<nav class="main">${nav}${reg.label ? `<a class="btn solid sm" href="${esc(href(reg.link))}">${esc(reg.label)}</a>` : ''}</nav></div></header>`;
}
function footer() {
  const cols = arr(site.footer_columns).map(c => `<div><h5>${esc(c.title)}</h5><ul>${arr(c.links).map(l => `<li><a href="${esc(href(l.link))}"${ext(l.link)}>${esc(l.label)}</a></li>`).join('')}</ul></div>`).join('');
  const visit = `<div><h5>Visit</h5><ul>${arr(site.locations).map(l => `<li>${esc(l.address).replace(/\n/g, '<br>')}</li>`).join('')}<li><a href="tel:${esc(site.phone)}">${esc(site.phone_display)}</a></li><li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li></ul></div>`;
  const soc = arr(site.social).map(s => `<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join(' &nbsp;&middot;&nbsp; ');
  return `<footer class="site"><div class="wrap"><div class="cols"><div><div class="brand">${esc(site.name)}</div><p style="max-width:22em;font-size:.95rem">${mdi(site.footer_text)}</p></div>${cols}${visit}</div><div class="base"><span>${esc(site.copyright)}</span><span>${soc}</span></div></div></footer>`;
}

function hero(h, slug) {
  h = h || {};
  if (h.style === 'home') {
    return `<section class="hero"><div class="wrap">
<div>${h.eyebrow ? `<div class="eyebrow">${esc(h.eyebrow)}</div>` : ''}<h1>${mdi(h.title)}</h1><p class="lede">${mdi(h.lede)}</p>${buttons(h.buttons)}</div>
<div class="arch-wrap"><div class="arch"><div class="inner">${media(h)}</div></div>${h.seal_text ? `<div class="seal"><div><b>${esc(h.seal_label)}</b>${esc(h.seal_text)}</div></div>` : ''}</div></div></section>`;
  }
  const crumbs = h.crumbs ? ` &nbsp;/&nbsp; ${esc(h.crumbs)}` : '';
  return `<section class="page-hero${hasMedia(h) ? '' : ' solo'}"><div class="wrap"><div>
<div class="crumbs"><a href="index.html">Home</a>${crumbs}</div><h1>${mdi(h.title)}</h1><p class="lede">${mdi(h.lede)}</p>${buttons(h.buttons, 'margin-top:34px')}</div>
${hasMedia(h) ? frame(h, 'frame pad') : ''}</div></section>`;
}

function render(slug, p) {
  const body = arr(p.sections).map(s => (L[s.layout] ? L[s.layout](s) : `<!-- unknown layout ${esc(s.layout)} -->`)).join('\n');
  const title = slug === 'index' ? p.title : `${p.title} — ${site.name}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(p.description || site.description || '')}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css"></head><body>
${header(slug)}
${hero(p.hero, slug)}
${body}
${footer()}
<script src="assets/site.js"></script></body></html>
`;
}

/* ---------- build ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const copyDir = (a, b) => { if (!fs.existsSync(a)) return; fs.cpSync(a, b, { recursive: true }); };
copyDir(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));
copyDir(path.join(ROOT, 'uploads'), path.join(OUT, 'uploads'));
let count = 0;
for (const [slug, p] of Object.entries(pages)) { fs.writeFileSync(path.join(OUT, slug + '.html'), render(slug, p)); count++; }
console.log(`Built ${count} pages into dist/`);
