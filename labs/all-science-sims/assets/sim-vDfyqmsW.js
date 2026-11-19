import{i as e,r as t}from"./controls-LEl6-qCH.js";function n(e,t){for(;t;)[e,t]=[t,e%t];return e}function r(e,t){let[n,r,i,a]=[t,e,0,1];for(;r>0;){let e=Math.floor(n/r);[n,r]=[r,n-e*r],[i,a]=[a,i-e*a]}return n===1?(i%t+t)%t:null}function i(e,t,n){e=BigInt(e)%BigInt(n);let r=1n,i=BigInt(t),a=BigInt(n);for(;i>0n;)i&1n&&(r=r*e%a),i>>=1n,e=e*e%a;return Number(r)}var a=[3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];function o(o){let s=document.createElement(`div`);s.style.padding=`var(--space-4)`,o.appendChild(s);let c=document.createElement(`div`);c.className=`sim-controls`,o.appendChild(c);let l=document.createElement(`div`);l.style.cssText=`background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-4);font-family:var(--font-mono);font-size:13px`,s.appendChild(l);let u={p:11,q:13,message:42,e:7},d=``;function f(e,t){let n=a.indexOf(e);for(let e=1;e<=a.length;e++){let r=a[(n+e)%a.length];if(r!==t)return r}return e}function p(e){for(let t=3;t<e;t+=2)if(n(t,e)===1)return t;return 3}function m(){let e=u.p,t=u.q,a=e*t,o=(e-1)*(t-1),s=u.e;n(s,o)!==1&&(s=p(o));let c=r(s,o),l=u.message>=a,d=u.message%a,f=i(d,s,a),m=c==null?null:i(f,c,a);return{p:e,q:t,n:a,phi:o,e:s,d:c,m:d,c:f,decrypted:m,tooBig:l,original:u.message}}function h(){let e=m(),t=e.decrypted===e.m,n=[];d&&n.push(d),e.tooBig&&n.push(`⚠ Message m = ${e.original} is not smaller than n = ${e.n}. RSA can only encrypt m &lt; n, so the sim encrypts m mod n = ${e.m} instead and that is what comes back — choose a smaller message or larger primes.`);let r=n.map(e=>`<div style="margin-top:var(--space-3);padding:8px 10px;border-radius:8px;background:rgba(245,158,11,0.15);border:1px solid #f59e0b;color:#f59e0b;font-size:12px;font-family:var(--font-sans)">${e}</div>`).join(``);l.innerHTML=`
      <h3 style="margin:0 0 var(--space-3);font-size:var(--type-md);font-family:var(--font-sans)">Step-by-step RSA</h3>
      <div style="display:grid;grid-template-columns:200px 1fr;gap:8px 16px;line-height:1.6">
        <div style="color:var(--color-muted)">p, q (primes)</div>
        <div style="color:#0ea5e9;font-weight:700">${e.p}, ${e.q}</div>
        <div style="color:var(--color-muted)">n = p × q</div>
        <div>${e.n}  <span style="color:var(--color-muted);font-size:11px">(public modulus)</span></div>
        <div style="color:var(--color-muted)">φ(n) = (p−1)(q−1)</div>
        <div>${e.phi}  <span style="color:var(--color-muted);font-size:11px">(secret — derived from p,q)</span></div>
        <div style="color:var(--color-muted)">e (public exponent)</div>
        <div style="color:#0ea5e9;font-weight:700">${e.e}  <span style="color:var(--color-muted);font-size:11px">(coprime with φ)</span></div>
        <div style="color:var(--color-muted)">d = e⁻¹ mod φ(n)</div>
        <div style="color:#ec4899;font-weight:700">${e.d??`(no inverse)`}  <span style="color:var(--color-muted);font-size:11px">(secret)</span></div>
      </div>

      <div style="background:#0b1220;border:1px solid var(--color-border);border-radius:8px;padding:var(--space-3);margin-top:var(--space-4)">
        <div style="margin-bottom:8px"><strong>Encrypt</strong>: c = m^e mod n</div>
        <div style="font-size:14px;color:var(--color-fg)">${e.m}<sup>${e.e}</sup> mod ${e.n} = <strong style="color:#0ea5e9">${e.c}</strong></div>
      </div>

      <div style="background:#0b1220;border:1px solid var(--color-border);border-radius:8px;padding:var(--space-3);margin-top:var(--space-3)">
        <div style="margin-bottom:8px"><strong>Decrypt</strong>: m = c^d mod n</div>
        <div style="font-size:14px;color:var(--color-fg)">${e.c}<sup>${e.d}</sup> mod ${e.n} = <strong style="color:${t?`#10b981`:`#ef4444`}">${e.decrypted??`?`}</strong></div>
        <div style="margin-top:8px;font-size:12px;color:${t?`#10b981`:`#ef4444`}">${t?e.tooBig?`✓ Recovered m mod n, not the original message`:`✓ Recovered original message`:`✗ Decryption failed (try a different e)`}</div>
      </div>
      ${r}
    `}h();let g=t({label:`Prime p`,options:a.map(e=>({value:String(e),label:String(e)})),value:String(u.p),onChange:e=>{u.p=Number(e),d=``,u.p===u.q&&(u.q=f(u.q,u.p),_.value=String(u.q),d=`⚠ p and q must be different primes (with p = q, φ(n) = (p−1)(q−1) no longer holds and decryption breaks). q was moved to ${u.q}.`),h()}}),_=t({label:`Prime q`,options:a.map(e=>({value:String(e),label:String(e)})),value:String(u.q),onChange:e=>{u.q=Number(e),d=``,u.q===u.p&&(u.p=f(u.p,u.q),g.value=String(u.p),d=`⚠ p and q must be different primes (with p = q, φ(n) = (p−1)(q−1) no longer holds and decryption breaks). p was moved to ${u.p}.`),h()}}),v=e({label:`Message m`,min:1,max:200,step:1,value:u.message,onInput:e=>{u.message=e,d=``,h()}}),y=e({label:`e (public exponent)`,min:3,max:50,step:2,value:u.e,onInput:e=>{u.e=e,d=``,h()}});return c.append(g.el,_.el,v.el,y.el),()=>{}}export{o as mount};