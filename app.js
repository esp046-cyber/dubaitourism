let data=[];const $=id=>document.getElementById(id);
const fmt=p=>`${p.name}${p.oldName?`\nFormer name: ${p.oldName} -> ${p.name}`:""}\nAddress: ${p.address}\nWebsite: ${p.website}\nStatus: ${p.status}`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
async function copy(t,b){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove()}
const o=b.textContent;b.textContent="Copied!";setTimeout(()=>b.textContent=o,1200)}
function render(){const q=$("q").value.trim().toLowerCase();const r=data.filter(p=>p.name.toLowerCase().includes(q)||(p.oldName||"").toLowerCase().includes(q));
$("n").textContent=r.length+" places";$("list").innerHTML=r.map((p,i)=>`<article class="c"><h2>${esc(p.name)}</h2>${p.oldName?`<p><b>Old &rarr; New:</b> ${esc(p.oldName)} &rarr; ${esc(p.name)}</p>`:""}<p>${esc(p.address)}</p><p><i>${p.status==="official"?"Source-checked (official)":p.status==="partial"?"Partly checked: address from listings, URL unconfirmed":"Unverified: confirm before use"}</i></p><a href="${esc(p.website)}" target="_blank" rel="noopener">${esc(p.website)}</a><button data-i="${data.indexOf(p)}">Copy Details</button></article>`).join("")}
$("list").addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(b)copy(fmt(data[b.dataset.i]),b)});
$("all").onclick=e=>copy(data.map(fmt).join("\n\n"),e.target);$("q").oninput=render;
fetch("./data.json").then(r=>r.json()).then(d=>{data=d;render()});
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js");