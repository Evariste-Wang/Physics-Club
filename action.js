const ActionLesson=(()=>{
 let page=0,step=0,host,lang='en';
 const tr=(a,b)=>lang==='zh'?b:a;
 const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
 const equation=e=>`<img class="action-equation" src="${e.src}" alt="${esc(e.alt)}">`;
 function move(dir){
  if(dir>0){if(step<ActionPages[page].blocks.length-1)step++;else if(page<ActionPages.length-1){page++;step=0;}else return;}
  else{if(step>0)step--;else if(page>0){page--;step=ActionPages[page].blocks.length-1;}else return;}
  paint();
 }
 function paint(){
  const p=ActionPages[page],z=lang==='zh'?1:0;
  host.innerHTML=`<section class="action-lesson"><div class="action-top"><a class="back" href="#special-relativity">${tr('← Special Relativity','← 狭义相对论')}</a><a href="assets/stationary-action.pdf" target="_blank" rel="noopener">${tr('Lecture notes · PDF ↗','推导笔记 · PDF ↗')}</a></div><div class="action-heading"><div><h1 tabindex="-1">${tr('Proof of p = γmv by the Stationary-action Principle','利用驻作用量原理证明 p = γmv')}</h1></div></div><div class="action-workspace" tabindex="0" aria-label="${tr('Click to reveal the next proof block; right click to go back','点击展开下一段证明；右键返回上一段')}" data-page="${page}" data-step="${step}"><article class="action-paper">${p.title[z]?`<div class="action-paper-head"><h2>${p.title[z]}</h2></div>`:''}<div class="action-blocks">${p.blocks.slice(0,step+1).map((b,i)=>`<section class="action-block ${i===step?'latest':''}"><div class="action-prose">${b.text[z]}</div><div class="action-equations">${b.eq.map(equation).join('')}</div></section>`).join('')}</div></article></div><div class="action-controls"><span class="action-progress" aria-live="polite">${page+1} / ${ActionPages.length}</span><button id="action-restart">${tr('Restart','重播')}</button><button id="action-prev" ${page===0&&step===0?'disabled':''}>${tr('← Back','← 上一步')}</button><button id="action-next" ${page===ActionPages.length-1&&step===p.blocks.length-1?'disabled':''}>${page===ActionPages.length-1&&step===p.blocks.length-1?tr('Complete ✓','完成 ✓'):tr('Continue →','继续 →')}</button></div></section>`;
  host.querySelector('.action-workspace').onclick=()=>move(1);
  host.querySelector('.action-workspace').oncontextmenu=e=>{e.preventDefault();move(-1)};
  host.querySelector('#action-next').onclick=()=>move(1);
  host.querySelector('#action-prev').onclick=()=>move(-1);
  host.querySelector('#action-restart').onclick=()=>{page=0;step=0;paint()};
 }
 window.addEventListener('keydown',e=>{if(location.hash!=='#action'||e.altKey||e.ctrlKey||e.metaKey)return;if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
 return {render(main,language){host=main;lang=language;KinematicsLesson.mountCanvas();paint()}};
})();
