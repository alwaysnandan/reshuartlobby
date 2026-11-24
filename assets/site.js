/* Reshu Art Lobby — shared header, footer, generated artwork, interactions */
(function(){
const NAV=[
 {t:'Home',h:'index.html'},
 {t:'Classes',m:[['Class details & fees','classes.html'],['Art forms','art-forms.html'],['Adult classes','adults.html'],['Summer camp','summer-camp.html']]},
 {t:'Workshops',m:[['Madhubani & Lippan','madhubani-lippan.html'],['Mixed media','mixed-media.html'],['Mandala art','mandala.html'],['Diwali workshop','diwali.html'],['Ganesha idol making','ganesha.html']]},
 {t:'Events',m:[['Paint & sip night','paint-and-sip.html'],['Corporate team building paint event','corporate-team-building.html'],['Private paint party event','paint-parties.html'],['Past events','events.html']]},
 {t:'Gallery',m:[['Student gallery','student-gallery.html'],['Artist portfolio','portfolio.html'],['Achievements','achievements.html']]},
 {t:'Bio',h:'bio.html'},
 {t:'About',h:'about.html'},
 {t:'Contact',h:'contact.html'}
];
const page=(location.pathname.split('/').pop()||'index.html');
const on=h=>h===page?' on':'';
const hdr=`<div class="announce">Spring &rsquo;26 registration is open &mdash; online &amp; in person <a href="register.html">Enrol now</a></div>
<header class="site"><div class="wrap">
<a class="brand" href="index.html">Reshu Art Lobby<small>Artist &middot; Studio</small></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
<nav class="main">${NAV.map(n=>n.m?`<div class="dd${n.m.some(x=>x[1]===page)?' on':''}"><button>${n.t}</button><div class="menu">${n.m.map(x=>`<a class="${on(x[1]).trim()}" href="${x[1]}">${x[0]}</a>`).join('')}</div></div>`:`<a class="${on(n.h).trim()}" href="${n.h}">${n.t}</a>`).join('')}
<a class="btn solid sm" href="register.html">Register</a></nav></div></header>`;
const ftr=`<footer class="site"><div class="wrap"><div class="cols">
<div><div class="brand">Reshu Art Lobby</div><p style="max-width:22em;font-size:.95rem">Art classes for kids and adults across Northern Virginia &mdash; in the studio and online.</p></div>
<div><h5>Explore</h5><ul><li><a href="classes.html">Classes &amp; fees</a></li><li><a href="art-forms.html">Art forms</a></li><li><a href="summer-camp.html">Summer camp</a></li><li><a href="paint-parties.html">Paint parties</a></li><li><a href="student-gallery.html">Gallery</a></li></ul></div>
<div><h5>Studio</h5><ul><li><a href="bio.html">Bio</a></li><li><a href="about.html">About the studio</a></li><li><a href="achievements.html">Achievements</a></li><li><a href="events.html">Past events</a></li><li><a href="register.html">Register</a></li><li><a href="contact.html">Contact</a></li></ul></div>
<div><h5>Visit</h5><ul><li>14240 Sullyfield Cir, Unit U<br>Chantilly, VA 20151</li><li>42933 Thornblade Cir<br>Broadlands, VA 20148</li><li><a href="tel:5713257622">(571) 325-7622</a></li><li><a href="mailto:reshuartlobby@gmail.com">reshuartlobby@gmail.com</a></li></ul></div>
</div><div class="base"><span>&copy; 2026 Reshu Art Lobby. All rights reserved.</span><span><a href="https://www.instagram.com/reshuartlobby/" target="_blank" rel="noopener">Instagram</a> &nbsp;&middot;&nbsp; <a href="https://www.facebook.com/ReshuArtLobby" target="_blank" rel="noopener">Facebook</a></span></div></div></footer>`;
document.body.insertAdjacentHTML('afterbegin',hdr);
document.body.insertAdjacentHTML('beforeend',ftr);
const b=document.querySelector('.burger'),nv=document.querySelector('nav.main');
const setMenu=o=>{nv.classList.toggle('open',o);b.classList.toggle('x',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
b.onclick=()=>setMenu(!nv.classList.contains('open'));
nv.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
window.addEventListener('resize',()=>{if(innerWidth>1060)setMenu(false)});

/* ---------- generative artwork ---------- */
const P={wine:'#8c3550',rose:'#c98a9a',gold:'#b08d57',cream:'#f2e8da',night:'#231a24',navy:'#1d2740',sage:'#6b7a68',clay:'#b86f50',sand:'#e3cfb4',ink:'#2a1d24',blush:'#ead2cb',teal:'#3d6b6e'};
function rng(s){s=(s*9301+49297)%233280;return()=>(s=(s*9301+49297)%233280)/233280}
const W=400,H=500;
const wrap=(inner,defs='',bg)=>`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs>${bg?`<rect width="${W}" height="${H}" fill="${bg}"/>`:''}${inner}</svg>`;
const K={
 mandala(r){let s='';const cx=200,cy=250,col=[P.gold,P.rose,P.cream,P.sage,P.clay];
  for(let ring=1;ring<=8;ring++){const n=ring*6+6,rad=ring*22;for(let i=0;i<n;i++){const a=i/n*Math.PI*2,x=cx+Math.cos(a)*rad,y=cy+Math.sin(a)*rad;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6+ (ring%3)*1.1).toFixed(1)}" fill="${col[(ring+i)%col.length]}"/>`}}
  for(let i=0;i<16;i++){s+=`<ellipse cx="200" cy="${250-62}" rx="9" ry="26" fill="none" stroke="${P.gold}" stroke-width="1.2" transform="rotate(${i*22.5} 200 250)"/>`}
  s+=`<circle cx="200" cy="250" r="16" fill="${P.wine}"/><circle cx="200" cy="250" r="7" fill="${P.gold}"/>`;return wrap(s,'',P.night)},
 lippan(r){let s=`<circle cx="200" cy="250" r="185" fill="${P.clay}"/><circle cx="200" cy="250" r="185" fill="none" stroke="${P.sand}" stroke-width="4"/>`;
  for(let ring=1;ring<=5;ring++){const n=ring*7,rad=ring*32;s+=`<circle cx="200" cy="250" r="${rad}" fill="none" stroke="${P.sand}" stroke-width="3" opacity=".8"/>`;
   for(let i=0;i<n;i++){const a=i/n*Math.PI*2+ring,x=200+Math.cos(a)*rad,y=250+Math.sin(a)*rad;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="#d9e3e8" stroke="${P.sand}" stroke-width="2"/><circle cx="${(x-1.5).toFixed(1)}" cy="${(y-1.5).toFixed(1)}" r="1.5" fill="#fff"/>`}}
  s+=`<circle cx="200" cy="250" r="20" fill="#d9e3e8" stroke="${P.sand}" stroke-width="4"/>`;return wrap(s,'','#efe4d2')},
 landscape(r){let s=`<rect width="${W}" height="${H}" fill="url(#sk)"/><circle cx="270" cy="130" r="46" fill="#f6ecd2"/><circle cx="270" cy="130" r="70" fill="#f6ecd2" opacity=".12"/>`;
  for(let i=0;i<40;i++)s+=`<circle cx="${r()*W}" cy="${r()*220}" r="${r()*1.6+.3}" fill="#fff" opacity=".7"/>`;
  s+=`<path d="M0 330Q120 280 220 330T400 310V500H0Z" fill="#101a2c"/><path d="M150 500Q190 420 215 340Q240 420 270 500Z" fill="#6a4c58" opacity=".7"/>`;
  for(let i=0;i<9;i++){const x=r()*400,h=70+r()*110,y=380+r()*60;s+=`<path d="M${x} ${y}l-20 ${h*.5}h14l-22 ${h*.4}h56l-22-${h*.4}h14z" fill="#0a1220" transform="translate(0 ${-h*.6})"/>`}
  for(let i=0;i<26;i++){s+=`<circle cx="${r()*400}" cy="${330+r()*170}" r="${3+r()*7}" fill="${i%3?P.wine:'#d0485f'}" opacity=".9"/>`}
  return wrap(s,`<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1630"/><stop offset=".6" stop-color="#2c3a68"/><stop offset="1" stop-color="#6a5a86"/></linearGradient>`)},
 texture(r){let s='';for(let i=0;i<26;i++){const y=i*20+r()*10;s+=`<path d="M-10 ${y}C${80+r()*60} ${y-50+r()*100} ${200+r()*60} ${y+50-r()*100} 410 ${y+r()*40-20}" fill="none" stroke="${i%4?'url(#gd)':P.wine}" stroke-width="${3+r()*9}" stroke-linecap="round" opacity="${.55+r()*.45}"/>`}
  s+=`<circle cx="300" cy="150" r="60" fill="url(#gd)" opacity=".9"/>`;return wrap(s,`<linearGradient id="gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7d5a28"/><stop offset=".4" stop-color="#e8cd8a"/><stop offset=".7" stop-color="#b08d57"/><stop offset="1" stop-color="#f3dfaa"/></linearGradient>`,'#2a1a22')},
 diya(r){let s=`<defs></defs>`;for(let i=0;i<5;i++){const x=60+i*70,y=300+Math.sin(i*1.3)*40;s+=`<circle cx="${x}" cy="${y-24}" r="46" fill="url(#gl)"/><path d="M${x-30} ${y}Q${x} ${y+42} ${x+30} ${y}Z" fill="${P.clay}" stroke="${P.gold}" stroke-width="2"/><path d="M${x} ${y-4}q-12-20 0-38q12 18 0 38z" fill="#f7c85a"/><path d="M${x} ${y-4}q-5-10 0-20q5 10 0 20z" fill="#fff4cf"/>`}
  for(let i=0;i<30;i++)s+=`<circle cx="${r()*W}" cy="${r()*260}" r="${r()*2+.5}" fill="#f7c85a" opacity=".7"/>`;
  s+=`<path d="M0 420Q100 380 200 420T400 410V500H0Z" fill="${P.wine}"/><path d="M0 460Q100 430 200 460T400 450V500H0Z" fill="#5a2038"/>`;
  return wrap(s,`<radialGradient id="gl"><stop offset="0" stop-color="#f7c85a" stop-opacity=".55"/><stop offset="1" stop-color="#f7c85a" stop-opacity="0"/></radialGradient>`,'#1c1322')},
 madhubani(r){let s=`<rect x="14" y="14" width="372" height="472" fill="none" stroke="${P.wine}" stroke-width="3"/><rect x="26" y="26" width="348" height="448" fill="none" stroke="${P.ink}" stroke-width="1.5" stroke-dasharray="2 6"/>`;
  s+=`<path d="M70 250Q170 120 300 250Q170 380 70 250Z" fill="${P.clay}" stroke="${P.ink}" stroke-width="3"/><path d="M300 250l60-60v120z" fill="${P.wine}" stroke="${P.ink}" stroke-width="3"/>`;
  for(let row=0;row<4;row++)for(let c=0;c<6;c++){s+=`<path d="M${110+c*28-(row%2)*14} ${200+row*26}q14 14 28 0" fill="none" stroke="${P.cream}" stroke-width="2.4"/>`}
  s+=`<circle cx="110" cy="240" r="9" fill="${P.cream}" stroke="${P.ink}" stroke-width="2"/><circle cx="110" cy="240" r="3" fill="${P.ink}"/>`;
  for(let i=0;i<10;i++){s+=`<path d="M${40+i*32} 60q16 20 0 38q-16-18 0-38z" fill="${i%2?P.gold:P.sage}" stroke="${P.ink}" stroke-width="1.5"/><path d="M${40+i*32} 440q16-20 0-38q-16 18 0 38z" fill="${i%2?P.sage:P.gold}" stroke="${P.ink}" stroke-width="1.5"/>`}
  return wrap(s,'',P.cream)},
 watercolor(r){let s='';const c=[P.rose,P.teal,P.gold,P.wine,P.sage,'#8fa7c4'];for(let i=0;i<9;i++){s+=`<ellipse cx="${r()*W}" cy="${r()*H}" rx="${60+r()*110}" ry="${40+r()*90}" fill="${c[Math.floor(r()*c.length)]}" opacity=".5" filter="url(#bl)" transform="rotate(${r()*180} 200 250)"/>`}
  s+=`<path d="M0 400Q100 350 200 390T400 370V500H0Z" fill="${P.teal}" opacity=".55" filter="url(#bl2)"/>`;return wrap(s,`<filter id="bl"><feGaussianBlur stdDeviation="14"/></filter><filter id="bl2"><feGaussianBlur stdDeviation="4"/></filter>`,'#fbf6ee')},
 still(r){let s=`<rect y="360" width="400" height="140" fill="${P.clay}" opacity=".4"/><path d="M150 480Q130 400 160 340h80q30 60 10 140z" fill="${P.teal}"/><path d="M160 340h80" stroke="${P.gold}" stroke-width="4"/>`;
  const f=[P.wine,P.gold,P.rose,'#d0485f',P.cream];for(let i=0;i<12;i++){const x=120+r()*160,y=130+r()*170;s+=`<path d="M200 340Q${x} ${(y+340)/2} ${x} ${y}" fill="none" stroke="${P.sage}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${18+r()*16}" fill="${f[i%5]}" opacity=".95"/><circle cx="${x}" cy="${y}" r="6" fill="${P.gold}"/>`}
  return wrap(s,'',P.blush)},
 abstract(r){let s='';const c=[P.wine,P.gold,P.sage,P.navy,P.rose,P.clay];for(let i=0;i<8;i++){const t=r(),col=c[Math.floor(r()*c.length)],x=r()*W,y=r()*H;
   s+=t<.4?`<circle cx="${x}" cy="${y}" r="${30+r()*90}" fill="${col}" opacity=".85"/>`:t<.75?`<path d="M${x} ${y}q${60+r()*80} ${-80+r()*160} ${120+r()*100} ${-40+r()*80}" stroke="${col}" stroke-width="${10+r()*26}" fill="none" stroke-linecap="round"/>`:`<rect x="${x}" y="${y}" width="${60+r()*120}" height="${60+r()*120}" fill="${col}" opacity=".8" transform="rotate(${r()*50-25} ${x} ${y})"/>`}
  return wrap(s,'',P.cream)},
 ganesha(r){let s=`<circle cx="200" cy="260" r="220" fill="#9a4f3a" opacity=".35"/><ellipse cx="108" cy="240" rx="62" ry="80" fill="#c98664" stroke="${P.gold}" stroke-width="3"/><ellipse cx="292" cy="240" rx="62" ry="80" fill="#c98664" stroke="${P.gold}" stroke-width="3"/><circle cx="200" cy="230" r="86" fill="#d89b76" stroke="${P.gold}" stroke-width="3"/>
  <path d="M130 160Q200 60 270 160Q200 130 130 160Z" fill="${P.gold}"/><path d="M200 70v40M170 85l12 28M230 85l-12 28" stroke="${P.wine}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="172" cy="215" r="7" fill="${P.ink}"/><circle cx="228" cy="215" r="7" fill="${P.ink}"/><path d="M200 235Q200 330 170 380Q150 410 180 420" fill="none" stroke="#d89b76" stroke-width="34" stroke-linecap="round"/><path d="M200 235Q200 330 170 380Q150 410 180 420" fill="none" stroke="${P.gold}" stroke-width="3" opacity=".6"/>
  <path d="M158 290q-22 40 -8 62" stroke="${P.cream}" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="200" cy="170" r="6" fill="${P.wine}"/>`;
  return wrap(s,'','#f0e0c8')}
};
function art(kind,seed){return (K[kind]||K.abstract)(rng((seed||1)*77+13))}
window.RAL={art};
document.querySelectorAll('[data-art]').forEach(e=>{e.classList.add('art');e.innerHTML=art(e.dataset.art,+e.dataset.seed||1)});

/* ---------- reveal ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(x=>io.observe(x));

/* ---------- gallery: filter + lightbox ---------- */
const gal=document.querySelector('[data-gallery]');
if(gal){
 const items=JSON.parse(gal.dataset.gallery);
 gal.innerHTML=items.map((it,i)=>`<figure data-cat="${it[2]}"><div class="art" style="aspect-ratio:${[4/5,1,4/6,4/4.6][i%4]}">${art(it[1],i+3)}</div><figcaption><small>${it[2]}</small>${it[0]}</figcaption></figure>`).join('');
 gal.querySelectorAll('.art').forEach(a=>{const s=a.querySelector('svg');s.style.height='100%'});
 const lb=document.createElement('div');lb.className='lightbox';document.body.appendChild(lb);lb.onclick=()=>lb.classList.remove('open');
 document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});
 gal.addEventListener('click',e=>{const f=e.target.closest('figure');if(!f)return;lb.innerHTML=`<div class="box">${f.querySelector('svg').outerHTML}${f.querySelector('figcaption').lastChild.textContent}</div>`;lb.classList.add('open')});
 document.querySelectorAll('[data-filter]').forEach(c=>c.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('on'));c.classList.add('on');const v=c.dataset.filter;gal.querySelectorAll('figure').forEach(f=>f.classList.toggle('hide',v!=='All'&&f.dataset.cat!==v))});
}

/* ---------- forms: compose an email (static site, no server) ---------- */
document.querySelectorAll('form[data-mailto]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();
 const d=new FormData(f),subj=f.dataset.subject||'Enquiry';let body='';d.forEach((v,k)=>{if(v)body+=`${k}: ${v}\n`});
 location.href=`mailto:reshuartlobby@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
 const ok=f.querySelector('.ok');if(ok)ok.style.display='block'}));
})();
