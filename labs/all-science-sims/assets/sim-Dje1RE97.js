import{a as e,i as t,n,t as r}from"./controls-LEl6-qCH.js";var i={UUU:`Phe`,UUC:`Phe`,UUA:`Leu`,UUG:`Leu`,CUU:`Leu`,CUC:`Leu`,CUA:`Leu`,CUG:`Leu`,AUU:`Ile`,AUC:`Ile`,AUA:`Ile`,AUG:`Met`,GUU:`Val`,GUC:`Val`,GUA:`Val`,GUG:`Val`,UCU:`Ser`,UCC:`Ser`,UCA:`Ser`,UCG:`Ser`,CCU:`Pro`,CCC:`Pro`,CCA:`Pro`,CCG:`Pro`,ACU:`Thr`,ACC:`Thr`,ACA:`Thr`,ACG:`Thr`,GCU:`Ala`,GCC:`Ala`,GCA:`Ala`,GCG:`Ala`,UAU:`Tyr`,UAC:`Tyr`,UAA:`STOP`,UAG:`STOP`,CAU:`His`,CAC:`His`,CAA:`Gln`,CAG:`Gln`,AAU:`Asn`,AAC:`Asn`,AAA:`Lys`,AAG:`Lys`,GAU:`Asp`,GAC:`Asp`,GAA:`Glu`,GAG:`Glu`,UGU:`Cys`,UGC:`Cys`,UGA:`STOP`,UGG:`Trp`,CGU:`Arg`,CGC:`Arg`,CGA:`Arg`,CGG:`Arg`,AGU:`Ser`,AGC:`Ser`,AGA:`Arg`,AGG:`Arg`,GGU:`Gly`,GGC:`Gly`,GGA:`Gly`,GGG:`Gly`},a={A:`#ef4444`,T:`#3b82f6`,U:`#06b6d4`,G:`#10b981`,C:`#f59e0b`},o={A:`T`,T:`A`,G:`C`,C:`G`};function s(e){return e.replace(/[ATGC]/g,e=>o[e]||e)}function c(e){return e.replace(/T/g,`U`)}function l(o){let l=document.createElement(`div`);l.style.padding=`var(--space-3)`,o.appendChild(l);let u=document.createElement(`div`);u.className=`sim-controls`,o.appendChild(u);let d={dna:`ATGGCATTGGCCGAATAA`,progress:0,autoplay:!0,speed:2.5},f=document.createElement(`input`);f.type=`text`,f.value=d.dna,f.spellcheck=!1,f.setAttribute(`aria-label`,`DNA coding strand (5' to 3')`),f.style.cssText=`
    width: 100%; font-family: var(--font-mono); font-size: 14px;
    padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 8px;
    background: var(--color-surface-2); color: var(--color-fg); letter-spacing: 2px;
    margin-bottom: var(--space-3);
  `,f.addEventListener(`input`,()=>{d.dna=f.value.toUpperCase().replace(/[^ATGC]/g,``),f.value=d.dna,d.progress=Math.min(d.progress,d.dna.length),h()}),l.appendChild(f);let p=document.createElement(`div`);p.style.cssText=`
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2);
    padding: var(--space-4);
    overflow-x: auto;
  `,l.appendChild(p);function m(e,t={}){let n=a[e]||`#94a3b8`,r=t.muted?`0.25`:`1`,i=t.ring?`box-shadow:0 0 0 2px #fbbf24;`:``;return`<span ${t.index==null?``:`data-base-index="${t.index}"`} style="
      display:inline-flex;align-items:center;justify-content:center;
      width:28px;height:32px;margin:1px;border-radius:6px;
      background:${n};color:white;font-family:var(--font-mono);font-weight:700;
      opacity:${r};cursor:pointer;${i}
    ">${e}</span>`}function h(){let e=d.dna,t=s(e),n=c(e),r=n.slice(0,d.progress),a=r.indexOf(`AUG`),o=[],l=-1;if(a>=0)for(let e=a;e+2<r.length;e+=3){let t=r.slice(e,e+3);if(o.push(t),i[t]===`STOP`){l=e+3;break}}let u=-1;a>=0&&d.progress>a&&(l<0||d.progress<=l)&&(u=a+Math.floor((d.progress-1-a)/3)*3);let f=e=>u>=0&&e>=u&&e<u+3&&e<d.progress,h=``,g=``;for(let n=0;n<e.length;n++)h+=m(e[n],{muted:n>=d.progress,ring:f(n),index:n}),g+=m(t[n],{muted:n>=d.progress,index:n});let _=``;for(let t=0;t<e.length;t++){let e=t<d.progress?n[t]:``;_+=e?m(e,{ring:f(t)}):`<span style="display:inline-flex;width:28px;height:32px;margin:1px;border-radius:6px;border:1px dashed var(--color-border)"></span>`}let v=``;for(let e of o){let t=i[e]||`?`;v+=`
        <div style="display:flex;flex-direction:column;align-items:center;margin:0 2px">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${e}</span>
          <span style="
            margin-top:4px;padding:6px 10px;border-radius:6px;
            background:${t===`STOP`?`#0b1220`:`#8b5cf6`};color:#fff;font-weight:700;font-size:12px;
          ">${t}</span>
        </div>
      `}let y=a<0?`Waiting for an AUG start codon in the mRNA`:`Start codon found — reading the first codon`,b=d.progress,x=`color:var(--color-muted);font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase`;p.innerHTML=`
      <div style="margin-bottom:6px;${x}">
        DNA coding strand (5' → 3') — typed above
      </div>
      <div style="position:relative">
        <div style="display:flex;flex-wrap:wrap">${h}</div>
        <div style="position:absolute;top:-2px;left:${b*30}px;height:36px;width:32px;border:2px solid #f59e0b;border-radius:8px;pointer-events:none;transition:left 0.18s ease"></div>
      </div>
      <div style="margin:10px 0 6px;${x}">
        DNA template strand (3' → 5') — read by RNA polymerase
      </div>
      <div style="display:flex;flex-wrap:wrap">${g}</div>
      <div style="margin:14px 0 6px;${x}">
        mRNA (5' → 3') — complement of the template, same as coding strand with U for T
      </div>
      <div style="display:flex;flex-wrap:wrap">${_}</div>
      <div style="margin:14px 0 6px;${x}">
        Polypeptide — from the first AUG to the first stop codon
      </div>
      <div style="display:flex;flex-wrap:wrap;align-items:flex-start">${v||`<span style="color:var(--color-muted);font-size:13px">${y}</span>`}</div>
    `}let g=t({label:`Scrub position`,min:0,max:1,step:1,value:0,onInput:e=>{d.progress=Math.max(0,Math.min(d.dna.length,e)),d.autoplay=!1,v.value=!1,h()}});function _(){g.el.querySelector(`input`).max=d.dna.length,g.value=d.progress}let v=e({label:`Auto-advance`,value:d.autoplay,onChange:e=>{d.autoplay=e}}),y=t({label:`Bases / second`,min:.5,max:10,step:.5,value:d.speed,onInput:e=>{d.speed=e}}),b=r({label:`Step`,onClick:()=>{d.progress=Math.min(d.dna.length,d.progress+1),h()}}),x=r({label:`◀ Step`,onClick:()=>{d.progress=Math.max(0,d.progress-1),h()}}),S=r({label:`Reset`,onClick:()=>{d.progress=0,h()}}),C=r({label:`Skip to end`,primary:!0,onClick:()=>{d.progress=d.dna.length,h()}}),w=r({label:`Example: insulin signal`,onClick:()=>{d.dna=`ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCC`,f.value=d.dna,d.progress=0,h()}});p.addEventListener(`click`,e=>{let t=e.target.closest(`[data-base-index]`);if(!t)return;let n=Number(t.getAttribute(`data-base-index`));Number.isFinite(n)&&(d.progress=n+1,d.autoplay=!1,v.value=!1,h())}),u.append(g.el,y.el,v.el,n(x,b,S,C),n(w));let T=0,E=0,D=0;function O(e){E||(E=e);let t=(e-E)/1e3;if(E=e,d.autoplay&&d.progress<d.dna.length){for(D+=t*d.speed;D>=1;)d.progress=Math.min(d.dna.length,d.progress+1),--D;h()}_(),T=requestAnimationFrame(O)}return T=requestAnimationFrame(O),h(),_(),()=>{cancelAnimationFrame(T)}}export{l as mount};