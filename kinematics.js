/* Self-contained offline lesson. Each state is one connected derivation step. */
const KinematicsLesson=(()=>{
 let topic=0,step=0,host=null,language='en';
 const tr=a=>a[language==='zh'?1:0].replace(/([vγxt])_([abc]{1,2})/g,'$1<sub>$2</sub>');
 const F=(a,b)=>`<span class="kin-frac"><span>${a}</span><span>${b}</span></span>`;
 const g='γ = '+F('1','√(1 − v²/c²)');
 const ab='v<sub>ab</sub>',bc='v<sub>bc</sub>',cb='v<sub>cb</sub>',ac='v<sub>ac</sub>';
 const xb='x<sub>b</sub>',xc='x<sub>c</sub>',tb='t<sub>b</sub>',tc='t<sub>c</sub>',gb='γ<sub>bc</sub>';
 const titles=[['Time dilation','时间膨胀'],['Length contraction','长度收缩'],['Velocity addition','速度合成']];
 const lessons=[[
  {title:['One clock, two ticks','一只钟，两次滴答'],body:['B carries a clock at rest in S′. Label two successive ticks E₁ and E₂. In B’s frame, they occur at the same position.','B 携带一只在 S′ 中静止的钟。把相邻两次滴答记作 E₁、E₂；在 B 系中，两次滴答发生在同一位置。'],eq:['Δx′ = 0'],note:['Follow the same two events in both frames—not two different clocks.','始终比较同一对事件在两个参考系中的描述，而不是两只不同的钟。']},
  {title:['The clock measures proper time','随钟测得的是固有时'],body:['The interval on B’s clock is the proper time Δτ: it is measured by a clock present at both events.','B 的钟亲历这两个事件，钟上记录的间隔就是固有时 Δτ。'],eq:['Δx′ = 0','Δτ = Δt′'],note:['In A’s frame the clock moves, so the ticks occur at different positions.','在 A 系中，这只钟在运动，两次滴答的位置不同。']},
  {title:['Transform the time interval','变换时间间隔'],body:['Use the inverse Lorentz transformation, from B’s coordinates to A’s. Coordinate differences transform in the same way as coordinates.','使用从 B 系到 A 系的逆洛伦兹变换。两个事件的坐标差满足同样的变换关系。'],eq:['Δt = γ(Δt′ + '+F('vΔx′','c²')+')'],note:['The spatial term depends on the separation in B’s frame. Here it is zero.','空间项取决于 B 系中的位置差；这里恰好为零。']},
  {title:['The spatial term vanishes','空间项消失'],body:['Substitute Δx′ = 0. Replace Δt′ with the proper time recorded by B’s clock.','代入 Δx′ = 0，再把 Δt′ 换成 B 钟记录的固有时。'],eq:['Δt = γ(Δt′ + 0)','Δt = γΔt′'],result:'Δt = γΔτ',note:['For 0 < |v| < c, γ > 1; at v = 0, γ = 1.','当 0 < |v| < c 时，γ > 1；当 v = 0 时，γ = 1。']},
  {title:['What “a moving clock runs slow” means','“运动的钟变慢”是什么意思'],body:['A assigns a longer interval between the ticks. Over an interval Δt in A’s frame, B’s moving clock advances by only Δt/γ.','A 给这两次滴答分配的时间间隔更长。在 A 系经过 Δt 时，运动的 B 钟只走过 Δt/γ。'],eq:[g],result:'Δτ = '+F('Δt','γ'),note:['A determines Δt using synchronized clocks at the two tick locations. This is a coordinate-time comparison, not a light-travel-time delay.','A 使用滴答地点处已同步的时钟确定 Δt。这是坐标时间的比较，不是光传播延迟造成的视觉效果。']}
 ],[
  {title:['Start with the rod at rest','从杆的静止系出发'],body:['B holds a rod at rest along x′. Its endpoints have fixed coordinates x′₁ and x′₂. Its rest-frame length is the proper length L₀.','B 持有一根沿 x′ 方向静止的杆，两端坐标 x′₁、x′₂ 固定。静止系中的长度叫固有长度 L₀。'],eq:['L₀ = x′₂ − x′₁'],note:['We are measuring a length parallel to the relative motion.','这里测量的是平行于相对运动方向的长度。']},
  {title:['Measure both ends at the same A-time','在 A 系同一时刻测两端'],body:['A records the two endpoint positions simultaneously in S. These two measurement events define A’s measured length L.','A 在 S 系中同时记录杆两端的位置。这两个测量事件的位置差，才是 A 测得的杆长 L。'],eq:['Δt = 0','L = Δx'],note:['“Simultaneously” refers to the measuring frame, S.','“同时”指测量者所在的 S 系中的同时。']},
  {title:['Apply the spatial transformation','代入空间变换'],body:['Transform the difference between the endpoint events. Because A measures simultaneously, the vΔt term vanishes.','对两端测量事件的位置差作洛伦兹变换。由于 A 同时测量，vΔt 项为零。'],eq:['Δx′ = γ(Δx − vΔt)','Δx′ = γΔx'],note:['The rod’s endpoints remain fixed in S′, even if sampled at different S′-times.','杆端点在 S′ 中始终固定，所以即使在不同的 S′ 时刻取样，端点坐标也不变。']},
  {title:['Identify the proper length','识别固有长度'],body:['Since the endpoints are stationary in B’s frame, Δx′ = L₀. With Δx = L, the transformation becomes L₀ = γL.','两端点在 B 系中静止，因此 Δx′ = L₀。再用 Δx = L，变换式就成为 L₀ = γL。'],eq:['L₀ = γL'],result:'L = '+F('L₀','γ'),note:['For nonzero relative speed, A measures a shorter length along the direction of motion.','相对速度非零时，A 沿运动方向测得的长度更短。']},
  {title:['Length contraction','得到长度收缩'],body:['Substitute the Lorentz factor. The rest length L₀ is unchanged; different frames use different simultaneous endpoint events to measure length.','代入洛伦兹因子。固有长度 L₀ 不变；不同参考系测长度时，选取的同时端点事件不同。'],eq:[g],result:'L = L₀ √(1 − v²/c²)',note:['This is a measurement between simultaneous endpoint positions, not a photograph of the moving rod.','这里比较的是同时测得的端点位置，不是运动杆的照片。']},
  {title:['Do not impose two simultaneities','不能同时要求两系都“同时”'],body:['For the same events, the time transformation gives a nonzero time difference in S′. We used Δt = 0, not Δt′ = 0.','对同一对事件，时间变换给出 S′ 中非零的时间差。我们使用的是 Δt = 0，不是 Δt′ = 0。'],eq:['Δt′ = γ(Δt − '+F('vΔx','c²')+')','Δt′ = −'+F('γvL','c²')],note:['For v > 0 and L > 0, the right-end measurement occurs earlier in S′. The endpoints’ fixed coordinates still differ by L₀.','当 v > 0、L > 0 时，右端测量在 S′ 中更早发生，但固定端点的坐标差仍为 L₀。']}
 ],[
  {title:['Three labels, one sign convention','三个对象，同一正方向'],body:['In b’s rest frame, particle a is on the left and particle c on the right. Both move toward observer b. Take rightwards as positive.','在 b 的静止系中，粒子 a 在左、粒子 c 在右，两者都朝观察者 b 运动。统一取向右为正。'],eq:[ab+' > 0',cb+' < 0'],note:['vᵢⱼ means the signed velocity of i measured by j. The unsubscripted c in formulas is the speed of light.','vᵢⱼ 表示 j 测得的 i 的有符号速度；公式中不作下标的 c 表示光速。']},
  {title:['Reverse the observer—not the convention','交换观察者，不改正方向'],body:['The left-pointing arrow is v_cb: c as seen by b. The addition formula uses v_bc: b as seen by c. These have opposite signs.','向左的箭头表示 v_cb，即 b 测得的 c 的速度；合成公式使用 v_bc，即 c 测得的 b 的速度。两者符号相反。'],eq:[bc+' = −'+cb+' > 0'],note:['We seek v_ac: the velocity of particle a in c’s rest frame.','目标是 v_ac：粒子 c 的静止系中，粒子 a 的速度。']},
  {title:['Transform from b’s frame to c’s','从 b 系变换到 c 系'],body:['b’s frame moves at +v_bc relative to c’s frame. Choose coincident origins at one common event and use the inverse-form Lorentz transformation.','b 系相对 c 系以 +v_bc 运动。选择一个共同事件作为重合原点，使用带加号的逆变换形式。'],eq:[xc+' = '+gb+'('+xb+' + '+bc+tb+')',tc+' = '+gb+'('+tb+' + '+F(bc+xb,'c²')+')'],note:['γ_bc = 1/√(1 − v_bc²/c²). The same factor multiplies both coordinate transformations.','γ_bc = 1/√(1 − v_bc²/c²)，两条变换式乘以同一个因子。']},
  {title:['Follow particle a’s trajectory','沿粒子 a 的轨迹取事件'],body:['Take two infinitesimally separated events on a’s trajectory. Transform both the displacement and the elapsed time.','在 a 的轨迹上取两个无限接近的事件，同时变换位移与时间间隔。'],eq:['d'+xc+' = '+gb+'(d'+xb+' + '+bc+'d'+tb+')','d'+tc+' = '+gb+'(d'+tb+' + '+F(bc+'d'+xb,'c²')+')'],note:['Both differentials refer to the same pair of events on a—not events on b or c.','两个微分都对应 a 轨迹上的同一对事件，不是 b 或 c 轨迹上的事件。']},
  {title:['Divide displacement by time','位移除以时间'],body:['Use v_ab = dx_b/dt_b and v_ac = dx_c/dt_c. Dividing the transformed intervals cancels γ_bc.','使用 v_ab = dx_b/dt_b、v_ac = dx_c/dt_c。变换后的位移除以时间时，γ_bc 消去。'],eq:[ac+' = '+F('d'+xb+' + '+bc+'d'+tb,'d'+tb+' + '+bc+'d'+xb+'/c²')],note:['Time also transforms. Keeping only the transformed displacement would miss the denominator correction.','时间也会变换。只变换位移、不变换时间，就会漏掉分母中的修正项。']},
  {title:['Divide numerator and denominator by dt_b','分子分母同除以 dt_b'],body:['Replace dx_b/dt_b with v_ab. This gives the one-dimensional velocity addition law.','将 dx_b/dt_b 换成 v_ab，就得到一维速度合成公式。'],eq:[ac+' = '+F('d'+xb+'/d'+tb+' + '+bc,'1 + ('+bc+'/c²)(d'+xb+'/d'+tb+')')],result:ac+' = '+F(ab+' + '+bc,'1 + '+ab+bc+'/c²'),note:['The velocities are signed. With v_cb given instead, substitute v_bc = −v_cb.','各速度都带符号。如果已知的是 v_cb，应先代入 v_bc = −v_cb。']},
  {title:['Two particles approaching at 0.8c','各以 0.8c 相向运动'],body:['In b’s frame, v_ab = +0.8c and v_cb = −0.8c. Therefore v_bc = +0.8c. Substitute into the derived equation.','在 b 系中，v_ab = +0.8c、v_cb = −0.8c，所以 v_bc = +0.8c。代入刚得到的公式。'],eq:[ac+' = '+F('0.8c + 0.8c','1 + 0.8 × 0.8')],result:ac+' = '+F('40','41')+'c ≈ 0.9756c',note:['The closing rate in b’s coordinates is 1.6c, but that is not the velocity measured in either particle’s rest frame.','b 系中两粒子的间距以 1.6c 的速率减小，但这不等于任一粒子静止系中测得的另一粒子的速度。']}
 ]];
 lessons[0]=TimeDilation.steps;
 lessons[1]=LengthContraction.steps;
 lessons[2]=VelocityAddition.steps;
 const text=(x,y,s,color='#b8cde6',size=17)=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="middle">${s.replace(/v_([abc]{2})/g,'v<tspan baseline-shift="sub" font-size="70%">$1</tspan>')}</text>`;
 const line=(x,y,X,Y,color='#7495b6',dash='')=>`<path d="M${x} ${y}L${X} ${Y}" stroke="${color}" stroke-width="2" fill="none" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
 const arrow=(x,y,X,color='#a6cfff')=>line(x,y,X,y,color)+`<path d="M${X+(X>x?-8:8)} ${y-5}L${X} ${y}L${X+(X>x?-8:8)} ${y+5}" stroke="${color}" stroke-width="2" fill="none"/>`;
 const clock=(x,y,label,angle=0,color='#a6cfff')=>`<g stroke="${color}" stroke-width="2" fill="none"><circle cx="${x}" cy="${y}" r="25"/><path d="M${x} ${y-20}v3M${x+20} ${y}h-3M${x} ${y+20}v-3M${x-20} ${y}h3"/><g transform="rotate(${angle} ${x} ${y})"><path d="M${x} ${y}v-16M${x} ${y}l10 6"/></g></g>`+text(x,y+48,label,color,16);
 function figure(){let s='';const zh=language==='zh';
  if(topic===0){
   s=text(240,25,zh?'B 系 · 钟静止':'B frame · clock at rest','#aee6cf')+clock(240,83,'E₁ → E₂',step>0?60:0,'#aee6cf')+text(240,157,'Δx′ = 0','#aee6cf',20)+line(60,180,420,180,'#2c435e')+text(240,211,zh?'A 系 · 同一只钟的两个位置':'A frame · two positions of the same clock')+clock(105,265,'E₁',0)+clock(375,265,'E₂',step>0?60:0)+arrow(161,261,317)+text(240,245,'+v');
   if(step>=2)s+=text(240,334,'Δx = vΔt', '#a6cfff',18);
  }else if(topic===1){
   const shorter=step>=3;
   s=text(240,24,zh?'B 系 · 杆静止':'B frame · rod at rest','#aee6cf')+`<path d="M70 85H410" stroke="#aee6cf" stroke-width="9" stroke-linecap="round"/>`+line(70,68,70,102,'#aee6cf')+line(410,68,410,102,'#aee6cf')+text(70,125,'x′₁')+text(410,125,'x′₂')+text(240,67,'L₀','#aee6cf',24)+line(60,158,420,158,'#2c435e')+text(240,191,zh?'A 系 · 同时测两端':'A frame · simultaneous endpoints');
   const l=shorter?138:70,r=shorter?342:410;
   s+=`<path d="M${l} 261H${r}" stroke="#a6cfff" stroke-width="9" stroke-linecap="round"/>`+line(l,242,l,279)+line(r,242,r,279)+text(l,301,'E₁')+text(r,301,'E₂')+arrow(197,219,282)+text(240,206,'+v', '#a6cfff',15)+text(240,288,shorter?'L = L₀/γ':'L = Δx','#a6cfff',22);
   if(step>=1)s+=text(240,337,'Δt = 0', '#a6cfff',20);
   if(step===5)s+=text(240,145,'Δt′ ≠ 0','#f0ce9b',18);
  }else{
   const example=step===6;
   s=text(240,36,zh?'b 的静止系 · 向右为正':'b rest frame · right is positive')+arrow(355,62,413,'#6984a4')+`<circle cx="65" cy="164" r="14" fill="#a6cfff"/><circle cx="415" cy="164" r="14" fill="#e8c38f"/><g stroke="#d6e1f0" fill="none" stroke-width="2.5" stroke-linecap="round"><circle cx="240" cy="129" r="10"/><path d="M240 139V175M240 149L223 163M240 149L257 163M240 175L225 196M240 175L255 196"/></g>`+arrow(90,164,183)+arrow(390,164,297,'#e8c38f')+text(137,137,example?'+0.8c':'v_ab > 0','#a6cfff',20)+text(344,137,example?'−0.8c':'v_cb < 0','#e8c38f',20)+text(65,213,'a','#a6cfff',22)+text(240,229,'b','#d6e1f0',22)+text(415,213,'c','#e8c38f',22);
   if(step>=1)s+=text(240,277,example?'v_bc = +0.8c':'v_bc = −v_cb > 0','#e8c38f',22);
   if(step>=3&&step<=5)s+=`<circle cx="85" cy="164" r="4" fill="#aee6cf"/><circle class="kin-pulse" cx="112" cy="164" r="4" fill="#aee6cf"/>`+text(240,316,zh?'微分事件取自 a 的轨迹':'Differential events lie on a’s trajectory','#aee6cf',16);
   if(example)s+=text(240,324,'v_ac ≈ 0.9756c','#aee6cf',26);
  }
  return `<svg viewBox="0 0 480 355" role="img" aria-label="${tr(lessons[topic][step].title)}" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Microsoft YaHei, sans-serif">${s}</svg>`;
 }
 function move(d){if(d>0){if(topic===0)TimeDilation.finish();if(topic===1)LengthContraction.finish();if(topic===2)VelocityAddition.finish();}const previous=step,previousTopic=topic;TimeDilation.cancel();LengthContraction.cancel();VelocityAddition.cancel();if(d>0){if(step<lessons[topic].length-1)step++;else if(topic<2){topic++;step=0}else return}else{if(step>0)step--;else if(topic>0){topic--;step=lessons[topic].length-1}else return}paint(topic===previousTopic?previous:-1)}
 function paint(previous=-1){TimeDilation.cancel();LengthContraction.cancel();VelocityAddition.cancel();const item=lessons[topic][step],zh=language==='zh';
  host.innerHTML=`<section class="kinematics"><div class="kin-top"><a class="back" href="#special-relativity">${zh?'← 狭义相对论':'← Special Relativity'}</a><a href="assets/relativistic-kinematics.pdf" target="_blank" rel="noopener">${zh?'讲义 Notes ↗':'Lecture Notes ↗'}</a></div><div class="kin-heading"><h1 tabindex="-1">${zh?'相对论运动学':'Relativistic Kinematics'}</h1><nav class="kin-tabs" aria-label="${zh?'运动学主题':'Kinematics topics'}">${titles.map((t,i)=>`<button type="button" data-topic="${i}" aria-pressed="${i===topic}"><span>0${i+1}</span>${tr(t)}</button>`).join('')}</nav></div><div class="kin-stage kin-time-stage" tabindex="0" role="group" aria-label="${tr(titles[topic])}" aria-describedby="kin-help" data-step="${step}" data-topic="${topic}"><h2 class="kin-step-title">${tr(item.title)}</h2><p class="kin-context" hidden>${topic<2?(zh?'S′ 相对 S 沿 +x 以 v 运动；空间轴平行，t = t′ = 0 时原点重合。':'S′ moves at +v along x relative to S; parallel axes, coincident origins at t = t′ = 0.'):(zh?'vᵢⱼ：j 测得的 i 的速度；下标标记粒子或参考系。':'vᵢⱼ: velocity of i measured by j; subscripts identify particles or frames.')}</p>${topic===0?TimeDilation.markup(step,language):topic===1?LengthContraction.markup(step,language):VelocityAddition.markup(step,language)}</div><div class="kin-foot"><span id="kin-help"><span class="kin-desktop-hint">${zh?'左键前进 · 右键后退 · ← →':'Left click forward · Right click back · ← →'}</span><span class="kin-touch-back">${zh?'轻触画面前进':'Tap the scene to advance'}</span></span><button class="kin-touch-back" id="kin-prev" ${topic===0&&step===0?'disabled':''}>${zh?'← 上一步':'← Back'}</button><div class="kin-progress" aria-label="${step+1} / ${lessons[topic].length}">${lessons[topic].map((_,i)=>`<i class="${i<=step?'done':''}"></i>`).join('')}<span>${step+1} / ${lessons[topic].length}</span></div><button id="kin-restart">${zh?'重看本节':'Replay section'}</button></div><div class="kin-sr-only" role="status" aria-live="polite">${tr(titles[topic])}: ${tr(item.title)}, ${step+1}/${lessons[topic].length}</div></section>`;
  if(topic===0)TimeDilation.animate(host.querySelector('.td-continuous'),step,previous);
  if(topic===1)LengthContraction.animate(host.querySelector('.lc-continuous'),step,previous);
  if(topic===2)VelocityAddition.animate(host.querySelector('.va-continuous'),step,previous);
  host.querySelectorAll('.kin-tabs button').forEach(b=>b.onclick=()=>{topic=Number(b.dataset.topic);step=0;paint()});
  const stage=host.querySelector('.kin-stage');stage.onclick=()=>move(1);stage.oncontextmenu=e=>{e.preventDefault();move(-1)};stage.onkeydown=e=>{if(['ArrowRight','ArrowLeft',' '].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);host.querySelector('.kin-stage').focus({preventScroll:true})}};
  host.querySelector('#kin-prev').onclick=()=>move(-1);host.querySelector('#kin-restart').onclick=()=>{step=0;paint()};
 }
 function fitCanvas(){
  const canvas=document.getElementById('kin-screen');if(!canvas)return;
  canvas.style.transform=`scale(${Math.min(window.innerWidth/1600,window.innerHeight/900)})`;
 }
 function mountCanvas(){
  if(document.getElementById('kin-screen'))return;
  const viewport=document.createElement('div');viewport.id='kin-viewport';
  const canvas=document.createElement('div');canvas.id='kin-screen';viewport.append(canvas);
  document.body.append(viewport);
  canvas.append(document.querySelector('body > header'),document.querySelector('main'),document.querySelector('body > footer'));
  fitCanvas();
 }
 window.addEventListener('resize',fitCanvas);
 window.addEventListener('hashchange',()=>{
  if(['#kinematics','#acceleration','#action'].includes(location.hash))return;
  TimeDilation.cancel();LengthContraction.cancel();VelocityAddition.cancel();
  const viewport=document.getElementById('kin-viewport');if(!viewport)return;
  const canvas=document.getElementById('kin-screen');
  document.body.prepend(...canvas.children);viewport.remove();
 });
 return {mountCanvas,render(main,lang){host=main;language=lang;mountCanvas();paint()}};
})();
