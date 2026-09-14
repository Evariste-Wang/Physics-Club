const LengthContraction = (() => {
 let frame=0,busy=false,complete=null;
 const steps=[['Two observers, two rulers','两个观察者，两把尺子'],['Select simultaneous endpoints in B’s frame','在 B 系同时选取两端'],['Transform the events to A’s frame','把事件变换到 A 系'],['Subtract the distance travelled','扣除尺子移动的距离'],['Substitute the transformed intervals','代入变换后的间隔'],['The length measured by A','A 测得的长度']].map(title=>({title}));
 const sub='L<tspan baseline-shift="sub" font-size="65%">apparent</tspan>';
 const person=(x,name,d)=>`<g class="td-person" transform="translate(${x} 0)"><circle cy="-39" r="15"/><path d="M0 -24V50M0 -9L${d*36} 12L${d*43} 0M0 -9L${-d*22} 22M0 50L-24 94M0 50L24 94"/><text y="132">${name}</text></g>`;
 const ruler=(x,y,width,color)=>`<g transform="translate(${x} ${y})" stroke="${color}" fill="none"><rect y="-9" width="${width}" height="18" rx="1" fill="${color}" fill-opacity=".12" stroke-width="2"/>${Array.from({length:11},(_,i)=>`<path d="M${width*i/10} -9v${i%5===0?11:6}"/>`).join('')}</g>`;
 function markup(n,lang){
  const p=(en,zh)=>lang==='zh'?zh:en;
  const row=LessonMath.row;
  const captions=[
   p('A and B each hold a ruler of rest length L₀. B moves to the right at +v relative to A.','A 和 B 各拿一把固有长度为 L₀ 的尺子。B 相对 A 以 +v 向右运动。'),
   p('In B’s frame, record the left endpoint E₁ and the right endpoint E₂ at the same time. Their separation is the ruler’s rest length.','在 B 系同一时刻记录左端事件 E₁ 和右端事件 E₂。它们的位置差就是尺子的固有长度。'),
   p('Transform these same events to A’s frame. E₂ occurs later than E₁: the ruler has moved right between the two records. Their separation Δx is therefore not a simultaneous length measurement.','将同一对事件变换到 A 系。E₂ 比 E₁ 晚发生，两次记录之间尺子已经向右移动，因此 Δx 还不是同时测得的尺长。'),
   p('During Δt, the right endpoint moves right by vΔt. Shift its later position back by this distance to the time of E₁. The remaining separation is A’s measured length.','在 Δt 内，右端向右移动了 vΔt。把它后来的位置向左回推这段距离，就得到 E₁ 时刻的右端位置。剩下的间距才是 A 测得的长度。'),
   p('Keep the simultaneity correction and substitute both transformed intervals. The spatial separation contributes γL₀; the motion correction subtracts γv²L₀/c².','保留同时性修正，代入变换得到的两个间隔。位置差给出 γL₀，运动修正减去 γv²L₀/c²。'),
   p('Since 1 − v²/c² = 1/γ², A measures L₀/γ. A’s own ruler provides an L₀ reference: B’s moving ruler is shorter when its endpoints are measured at the same A-time.','利用 1 − v²/c² = 1/γ²，得到 A 测得的长度为 L₀/γ。以 A 自己的尺子 L₀ 作比较：在 A 系同时测量两端时，B 的运动尺更短。')
  ];
  return `<div class="td-continuous lc-continuous"><div class="td-scene lc-scene"><svg viewBox="0 0 1200 450" role="img" aria-label="${p('Two rulers and the correction from nonsimultaneous endpoint events to simultaneous length','两把尺子，以及从非同时端点事件到同时尺长的修正')}">
   <g class="lc-a" transform="translate(190 95)">${person(-70,'A',1)}${ruler(-27,0,120,'#efc784')}<text x="33" y="45">${p('A’s ruler','A 的尺子')}</text></g>
   <g class="lc-b" transform="translate(735 95)">${person(165,'B',-1)}${ruler(2,0,120,'#8ccaff')}<text x="62" y="45">${p('B’s ruler','B 的尺子')}</text><path d="M40 -58H92L84 -64M92 -58L84 -52" class="td-motion"/><text x="66" y="-70">+v</text>${n>=1?'<g fill="#8ccaff"><circle cx="2" r="4"/><circle cx="122" r="4"/><text x="2" y="-23">E₁</text><text x="122" y="-23">E₂</text></g>':''}</g>
   <g class="td-formulas lc-b-eq" transform="translate(745 175)">${n>=1?row(0,'Δt′ = 0')+row(34,'Δx′ = L₀'):''}</g>
   <g class="td-formulas lc-a-eq" transform="translate(280 190)">${n>=5?row(0,'L₀')+row(36,`${sub} = L₀/γ &lt; L₀`):''}</g>
   <g class="lc-events" transform="translate(80 330)" opacity="${n>=2?1:0}"><text x="110" y="-40">${p('B’s endpoints in A’s frame','B 的端点 · A 系')}</text><path d="M0 0H200" class="lc-event-span"/><circle r="4" fill="#8ccaff"/><g class="lc-later" transform="translate(200 0)"><circle r="4" fill="#8ccaff"/><text y="-16">E₂</text></g><text y="-16">E₁</text><g class="lc-math-label" transform="translate(80 12)">${row(0,"Δx",150)}</g>
    <g class="lc-correction" opacity="${n>=3?1:0}"><path d="M200 61H72L80 55M72 61L80 67" class="lc-return"/><g class="lc-math-label" transform="translate(100 69)">${row(0,"−vΔt",150)}</g><path d="M72 0V108" class="lc-guide"/><g class="lc-right-now" transform="translate(72 0)"><circle r="5" fill="#efc784"/></g>${ruler(0,120,72,'#8ccaff')}<g class="lc-math-label" transform="translate(8 145)">${row(0,sub,180)}</g></g>
   </g>
   <g class="td-formulas lc-transform-eq" transform="translate(365 295)"><g class="lc-transform-start">${n>=2?row(0,'Δx = γ(Δx′ + vΔt′) = γL₀')+row(48,'Δt = γ(Δt′ + vΔx′/c²)')+row(111,'= γvL₀/c² ≠ 0'):''}</g><g class="lc-transform-end" transform="translate(0 177)">${n>=3?row(0,`⇒ ${sub} = Δx − vΔt`):''}${n>=4?row(55,'= γL₀ − γv²L₀/c²')+row(124,'= γL₀(1 − v²/c²)'):''}${n>=5?row(201,'⇒ L₀/γ = L₀√(1 − v²/c²)'):''}</g></g>
   </svg></div><div class="td-reasoning" aria-live="polite">${LessonMath.subtitle(captions[n])}</div><p class="td-scale">${p('Same length scale · illustrated at v = 0.8c, γ = 5/3','长度刻度统一 · 图示取 v = 0.8c，γ = 5/3')}</p></div>`;
 }
 function cancel(){cancelAnimationFrame(frame);busy=false;complete=null;}
 function finish(){if(complete)complete();cancel();}
 function animate(root,n,previous=n){
  cancel();if(n!==previous+1||previous<0||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(n!==1&&n!==2&&n!==3)return;
  complete=()=>{
   if(n===1){root.querySelector('.lc-b-eq').style.opacity=1;root.querySelectorAll('.lc-b circle').forEach(el=>el.style.opacity=1);}
   if(n===2){root.querySelector('.lc-events').style.opacity=1;root.querySelector('.lc-later').setAttribute('transform','translate(200 0)');root.querySelector('.lc-event-span').setAttribute('d','M0 0H200');}
   if(n===3){root.querySelector('.lc-correction').style.opacity=1;root.querySelector('.lc-right-now').setAttribute('transform','translate(72 0)');root.querySelector('.lc-return').setAttribute('d','M200 61H72L80 55M72 61L80 67');}
  };
  let begin;busy=true;
  function tick(time){if(!root.isConnected){busy=false;return;}if(begin===undefined)begin=time;const t=Math.min((time-begin)/1350,1),e=t*t*(3-2*t);
   if(n===1){root.querySelector('.lc-b-eq').style.opacity=e;root.querySelectorAll('.lc-b circle').forEach(el=>{if(el.getAttribute('r')==='4')el.style.opacity=e;});}
   if(n===2){const x=120+80*e;root.querySelector('.lc-events').style.opacity=e;root.querySelector('.lc-later').setAttribute('transform',`translate(${x} 0)`);root.querySelector('.lc-event-span').setAttribute('d',`M0 0H${x}`);}
   if(n===3){const x=200-128*e;root.querySelector('.lc-correction').style.opacity=e;root.querySelector('.lc-right-now').setAttribute('transform',`translate(${x} 0)`);root.querySelector('.lc-return').setAttribute('d',`M200 61H${x}L${x+8} 55M${x} 61L${x+8} 67`);}
   if(t<1)frame=requestAnimationFrame(tick);else busy=false;
  }frame=requestAnimationFrame(tick);
 }
 return {steps,markup,animate,cancel,finish,get busy(){return busy;}};
})();
