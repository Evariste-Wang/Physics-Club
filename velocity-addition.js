const VelocityAddition=(()=>{
 let frame=0,complete=null;
 const steps=[['Two particles, one observer','两个粒子，一个观察者'],['Keep the signs when changing observers','更换观察者，保留速度符号'],['Follow two events on C’s trajectory','沿 C 的轨迹取两个事件'],['Transform displacement and time together','同时变换位移和时间'],['Divide displacement by elapsed time','位移除以时间间隔'],['Cancel γ, then divide by dtᵦ','约去 γ，再同除以 dtᵦ'],['The velocity addition law','得到速度合成公式'],['Two particles approaching at 0.8c','各以 0.8c 相向运动']].map(title=>({title}));
 const mi=s=>`<mi>${s}</mi>`,op=s=>`<mo>${s}</mo>`,num=s=>`<mn>${s}</mn>`;
 const idx=(s,i)=>`<msub>${mi(s)}<mtext>${i}</mtext></msub>`;
 const frac=(a,b)=>`<mfrac><mrow>${a}</mrow><mrow>${b}</mrow></mfrac>`;
 const par=s=>op('(')+s+op(')'),plus=op('+'),equal=op('='),c2=`<msup>${mi('c')}${num(2)}</msup>`;
 const ab=idx('v','bc'),bc=idx('v','ab'),cb=idx('v','ba'),ac=idx('v','ac'),g=idx('γ','ab');
 const dx=i=>mi('d')+idx('x',i),dt=i=>mi('d')+idx('t',i);
 const space=dx('b')+plus+bc+dt('b'),time=dt('b')+plus+frac(bc+dx('b'),c2);
 function math(x,y,s,cls='',w=400){return `<foreignObject class="lesson-equation ${cls}" x="${x}" y="${y}" width="${w}" height="120"><div xmlns="http://www.w3.org/1999/xhtml" class="lesson-equation-inner"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math></div></foreignObject>`;}
 const arrow=(x,y,to,color='#8ccaff')=>`<path d="M${x} ${y}H${to}l${to>x?-7:7} -5m${to>x?7:-7} 5l${to>x?-7:7} 5" stroke="${color}" stroke-width="2" fill="none"/>`;
 function markup(n,lang){
  const p=(en,zh)=>lang==='zh'?zh:en;
  const captions=[
   p('In B’s rest frame, C moves right and A moves left. v_bc is C’s velocity measured in B; v_ac is C’s velocity measured in A. The first subscript identifies the observer.','在 B 系中，C 向右、A 向左运动。v_bc 是 B 测得的 C 的速度，v_ac 是 A 测得的 C 的速度；第一个下标表示观察者。'),
   p('B measures A moving left: v_ba < 0. A measures B moving right: v_ab = −v_ba > 0. We will transform C’s velocity from B’s frame to A’s frame.','B 测得 A 向左运动：v_ba < 0；A 测得 B 向右运动：v_ab = −v_ba > 0。接下来把 C 的速度从 B 系变换到 A 系。'),
   p('Choose two infinitesimally separated events on C’s trajectory. B measures displacement dx_b and time dt_b, so v_bc = dx_b/dt_b.','沿 C 的轨迹取两个无限接近的事件。B 测得位移 dx_b 和时间 dt_b，因此 v_bc = dx_b/dt_b。'),
   p('Transform the same events from B to A. B moves at +v_ab relative to A, so the inverse Lorentz transformation has plus signs. Both dx and dt change.','把同一对事件从 B 系变换到 A 系。B 相对 A 以 +v_ab 运动，因此逆洛伦兹变换取加号；dx 和 dt 都要变换。'),
   p('In A’s frame, C’s velocity is v_ac = dx_a/dt_a. Divide the transformed displacement by the transformed time; both contain the same Lorentz factor.','在 A 系中，C 的速度是 v_ac = dx_a/dt_a。用变换后的位移除以时间，两者都含有相同的洛伦兹因子。'),
   p('Cancel γ_ab, then divide numerator and denominator by dt_b. Substitute the retained definition dx_b/dt_b = v_bc.','约去 γ_ab，再将分子分母同除以 dt_b。代入前面保留的定义 dx_b/dt_b = v_bc。'),
   p('We have transformed v_bc, measured in B, into v_ac, measured in A. The denominator is the correction from the time transformation.','这样就把 B 系测得的 v_bc 变成了 A 系测得的 v_ac。分母中的修正项来自时间变换。'),
   p('B measures C at +0.8c and A at −0.8c, so v_ab = +0.8c. A measures C at approximately 0.9756c. B’s 1.6c closing rate is a different quantity.','B 测得 C 为 +0.8c、A 为 −0.8c，所以 v_ab = +0.8c。A 测得 C 的速度约为 0.9756c；B 系中间距减小的速率 1.6c 是另一个量。')
  ];
  const gammaFactor=`<mrow class="va-factor" style="opacity:${n>=5?0:1}">${g}</mrow>`;
  return `<div class="td-continuous va-continuous"><div class="td-scene"><svg viewBox="0 0 1200 450" role="img" aria-label="${p('Approaching particles and the same trajectory events transformed from B to A','相向运动的粒子，以及从 B 系变换到 A 系的同一对轨迹事件')}">
  <text x="200" y="24">${p('B’s rest frame · right is positive','B 的静止系 · 向右为正')}</text>
  <g class="va-particle-a" transform="translate(${n>=1?95:60} 90)"><circle r="12" fill="#8ccaff"/><text y="42">C</text></g>
  <g class="va-particle-c" transform="translate(${n>=1?305:340} 90)"><circle r="12" fill="#efc784"/><text y="42">A</text></g>
  <g class="td-person" transform="translate(200 90)"><circle cy="-24" r="10"/><path d="M0 -14V23M0 -3L-16 12M0 -3L16 12M0 23L-15 48M0 23L15 48"/><text y="72">B</text></g>
  ${arrow(113,90,166)}${arrow(288,90,236,'#efc784')}
  ${math(54,120,n===7?ab+equal+num('0.8')+mi('c'):ab+op('&gt;')+num(0),'va-small',170)}
  ${math(267,120,n===7?cb+equal+op('−')+num('0.8')+mi('c'):cb+op('&lt;')+num(0),'va-small va-gold',170)}
  ${n>=1?math(62,177,bc+equal+op('−')+cb+op('&gt;')+num(0),'va-gold',350):''}
  <g class="va-events" opacity="${n>=2?1:0}"><circle cx="65" cy="277" r="4" fill="#8ccaff"/><circle class="va-event-b" cx="145" cy="277" r="4" fill="#8ccaff"/>${arrow(65,277,145)}<text x="65" y="260">E₁</text><text x="145" y="260">E₂</text>${math(80,285,dx('b'),'va-small',110)}${math(200,250,ab+equal+frac(dx('b'),dt('b')),'va-small',200)}</g>
  <g class="va-transformed" opacity="${n>=3&&n<7?1:0}"><path d="M105 322V343l-5 -7m5 7l5 -7" stroke="#91a9c4" fill="none"/><text x="225" y="337">${p('transform B → A','变换 B → A')}</text><circle cx="65" cy="363" r="4" fill="#aee6cf"/><circle class="va-event-c" cx="225" cy="363" r="4" fill="#aee6cf"/>${arrow(65,363,225,'#aee6cf')}${math(115,373,dx('a'),'va-small',120)}</g>
  ${n>=3?math(450,-15,g+equal+frac(num(1),`<msqrt><mrow>${num(1)+op('−')+frac(`<msup>${bc}${num(2)}</msup>`,c2)}</mrow></msqrt>`))+math(450,65,dx('a')+equal+g+par(space))+math(450,143,dt('a')+equal+g+par(time)):''}
  ${n>=4?math(835,15,ac+equal+frac(dx('a'),dt('a')))+math(835,106,equal+frac(gammaFactor+par(space),gammaFactor+par(time)),'va-ratio'):''}
  ${n>=5?math(450,282,op('⇒')+ac+equal+frac(frac(dx('b'),dt('b'))+plus+bc,num(1)+plus+frac(bc,c2)+frac(dx('b'),dt('b'))),'va-normalized'):''}
  ${n>=6?math(835,304,op('⇒')+ac+equal+frac(ab+plus+bc,num(1)+plus+frac(ab+bc,c2)),'va-result'):''}
  ${n===7?math(20,350,ac+equal+frac(num('0.8')+mi('c')+plus+num('0.8')+mi('c'),num(1)+plus+num('0.8')+op('×')+num('0.8'))+equal+frac(num(40),num(41))+mi('c')+op('≈')+num('0.9756')+mi('c'),'va-example',500):''}
  </svg></div><div class="td-reasoning" aria-live="polite">${LessonMath.subtitle(captions[n])}</div><p class="td-scale">${p('vᵢⱼ: j measured by i · c without a subscript denotes the speed of light · event arrows are schematic','vᵢⱼ：i 测得的 j 的速度 · 无下标的 c 表示光速 · 事件箭头为示意')}</p></div>`;
 }
 function cancel(){cancelAnimationFrame(frame);complete=null;}
 function finish(){if(complete)complete();cancel();}
 function animate(root,n,previous=n){
  cancel();if(n!==previous+1||previous<0||![1,2,3,5].includes(n))return;
  const update=e=>{
   if(n===1){root.querySelector('.va-particle-a').setAttribute('transform',`translate(${60+35*e} 90)`);root.querySelector('.va-particle-c').setAttribute('transform',`translate(${340-35*e} 90)`);}
   if(n===2){root.querySelector('.va-events').style.opacity=e;root.querySelector('.va-event-b').setAttribute('cx',65+80*e);}
   if(n===3){root.querySelector('.va-transformed').style.opacity=e;root.querySelector('.va-event-c').setAttribute('cx',145+80*e);}
   if(n===5)root.querySelectorAll('.va-factor').forEach(el=>el.style.opacity=1-e);
  };
  complete=()=>update(1);if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}update(0);let begin;
  function tick(time){if(!root.isConnected)return;if(begin===undefined)begin=time;const t=Math.min((time-begin)/1350,1);update(t*t*(3-2*t));if(t<1)frame=requestAnimationFrame(tick);}
  frame=requestAnimationFrame(tick);
 }
 return {steps,markup,animate,cancel,finish};
})();
