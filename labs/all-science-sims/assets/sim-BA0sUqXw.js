import{i as e,n as t,t as n}from"./controls-LEl6-qCH.js";var r={shakespeare:`Shall I compare thee to a summer's day?
Thou art more lovely and more temperate.
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date.
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance, or nature's changing course, untrimm'd;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow'st;
Nor shall Death brag thou wand'rest in his shade,
When in eternal lines to time thou grow'st:
So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee.`,alice:`Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"
So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.`,pantun:`Berakit-rakit ke hulu, berenang-renang ke tepian.
Bersakit-sakit dahulu, bersenang-senang kemudian.
Asam di gunung, ikan di laut, dalam belanga bertemu jua.
Ada padang ada belalang, ada air ada pula ikannya.
Pisang emas dibawa berlayar, masak sebiji di atas peti.
Hutang emas dapat dibayar, hutang budi dibawa mati.`};function i(e,t){let n=new Map;for(let r=0;r+t<e.length;r++){let i=e.slice(r,r+t),a=e[r+t];n.has(i)||n.set(i,[]),n.get(i).push(a)}return n}function a(e,t,n){let r=i(e,t);if(r.size===0)return``;let a=[...r.keys()],o=a[Math.floor(Math.random()*a.length)],s=o;for(let e=0;e<n;e++){let e=r.get(o);if(!e||e.length===0){o=a[Math.floor(Math.random()*a.length)],s+=` `+o;continue}let n=e[Math.floor(Math.random()*e.length)];s+=n,o=(o+n).slice(-t)}return s}function o(i){let o=document.createElement(`div`);o.style.padding=`var(--space-4)`,i.appendChild(o);let s=document.createElement(`div`);s.className=`sim-controls`,i.appendChild(s);let c=document.createElement(`label`);c.textContent=`Source text`,c.style.cssText=`font-size:var(--type-sm);color:var(--color-muted);font-weight:600`,o.appendChild(c);let l=document.createElement(`textarea`);l.value=r.shakespeare,l.style.cssText=`width:100%;height:140px;font-family:var(--font-mono);font-size:13px;padding:10px 12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface-2);color:var(--color-fg);margin:6px 0 var(--space-3);resize:vertical`,o.appendChild(l);let u=document.createElement(`label`);u.textContent=`Generated text`,u.style.cssText=`font-size:var(--type-sm);color:var(--color-muted);font-weight:600`,o.appendChild(u);let d=document.createElement(`div`);d.style.cssText=`background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px;padding:var(--space-3);min-height:160px;font-family:var(--font-mono);font-size:13px;white-space:pre-wrap;margin-top:6px`,o.appendChild(d);let f={n:4,length:600};function p(){d.textContent=a(l.value,f.n,f.length)}p();let m=e({label:`n-gram size`,min:1,max:8,step:1,value:f.n,onInput:e=>{f.n=e,p()}}),h=e({label:`Output length (chars)`,min:100,max:2e3,step:50,value:f.length,onInput:e=>{f.length=e}}),g=n({label:`Generate`,primary:!0,onClick:p}),_=document.createElement(`div`);_.className=`ctrl-row`;for(let[e,t]of[[`Shakespeare`,`shakespeare`],[`Alice`,`alice`],[`Pantun (ID)`,`pantun`]]){let i=n({label:e,onClick:()=>{l.value=r[t],p()}});_.appendChild(i.el)}return s.append(m.el,h.el,t(g),_),()=>{}}export{o as mount};