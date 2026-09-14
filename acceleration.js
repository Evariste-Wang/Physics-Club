/* Offline, manuscript-scoped acceleration lesson; one click commits and advances. */
const AccelerationLesson=(()=>{
 let host,lang='en',branch='shared',step=0,raf=0,complete=null;
 const I=s=>`<mi>${s}</mi>`,N=s=>`<mn>${s}</mn>`,O=s=>`<mo>${s}</mo>`,R=s=>`<mrow>${s}</mrow>`;
 const F=(a,b)=>`<mfrac>${R(a)}${R(b)}</mfrac>`,P=(a,b)=>`<msup>${R(a)}${R(b)}</msup>`,S=(a,b)=>`<msub>${R(a)}${R(b)}</msub>`;
 const par=s=>O('(')+s+O(')'),sqrt=s=>`<msqrt>${R(s)}</msqrt>`,fn=s=>`<mi mathvariant="normal">${s}</mi>`;
 const v=I('v'),c=I('c'),a=I('a'),t=I('t'),tau=I('τ'),d=I('d'),dv=d+v,du=d+I('u'),dt=d+t,dtau=d+tau;
 const vp=P(v,O('′')),tp=P(t,O('′')),qp=P(tau,O('′')),two=N(2),one=N(1),zero=N(0),eq=O('='),plus=O('+'),minus=O('−'),to=O('⇒');
 const c2=P(c,two),v2=P(v,two),k=one+minus+F(v2,c2),kp=one+minus+F(P(vp,two),c2),gamma=I('γ'),q=F(a+tau,c);
 const integral=(top,body)=>`<msubsup><mo>∫</mo>${zero}${R(top)}</msubsup>`+body;
 const at=a+t,exp=x=>P(I('e'),x),E=exp(F(two+a+tau,c));
 const math=(s,block=true)=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="${block?'block':'inline'}">${R(s)}</math>`;
 function inline(s){return s.split(/(\$[^$]+\$)/g).map(p=>p[0]==='$'?math((p.slice(1,-1).match(/cos|sin|tanh|[a-zA-Zτγθ]|[₀₁′²]|\d+|[^\s]/g)||[]).reduce((arr,z)=>{if(['′','²','₀','₁'].includes(z)&&arr.length){const old=arr.pop();arr.push(z==='′'?P(old,O(z)):z==='²'?P(old,two):S(old,N(z==='₀'?0:1)));}else arr.push(['cos','sin','tanh'].includes(z)?fn(z):/[a-zA-Zτγθ]/.test(z)?I(z):/^\d/.test(z)?N(z):O(z.replace(/</g,'&lt;')));return arr;},[]).join(''),false):p).join('');}
 const tr=(en,zh)=>lang==='zh'?zh:en;
 const stages={shared:[
 ['A ship with a constant accelerometer reading','加速度计读数恒定的飞船','The ship starts from rest beside Earth. Its accelerometer reads a constant proper acceleration $a$. Earth uses $t$; the ship clock reads $τ$.','飞船从地球旁静止出发，加速度计保持恒定读数 $a$。地球使用时间 $t$，飞船时钟记录 $τ$。'],
 ['Three frames within one small step','一个微小时间段中的三个参考系','During Earth time $dt$, keep the initial instantaneous rest frame $S₀$ fixed. The ship ends at rest in a different inertial frame $S₁$. Earth remains in frame $S$.','在地球时间 $dt$ 内，保持起初的瞬时静止系 $S₀$ 不动。加速后，飞船在另一个惯性系 $S₁$ 中静止；地球始终在 $S$ 系中。'],
 ['The local increment is du','局部速度增量 du','In $S₀$, the ship velocity increases from zero to $du$. This is also the velocity of $S₁$ relative to $S₀$. The accelerometer gives $du = a dτ$.','在 $S₀$ 中，飞船速度从零增至 $du$；这也是 $S₁$ 相对 $S₀$ 的速度。加速度计给出 $du = a dτ$。'],
 ['Compose the two boosts','合成两次速度变换','Frame $S₀$ moves at $v$ relative to Earth, and $S₁$ moves at $du$ relative to $S₀$. Velocity addition gives the final Earth-frame velocity $v + dv$.','$S₀$ 相对地球以 $v$ 运动，$S₁$ 相对 $S₀$ 以 $du$ 运动。用速度合成得到地球系中的最终速度 $v + dv$。'],
 ['Keep the first-order change','保留一阶变化','Expand the reciprocal denominator, multiply out, and discard terms quadratic in $du$. Subtract the initial velocity $v$.','将分母的倒数展开，乘开后舍去 $du$ 的二阶项，再减去初始速度 $v$。'],
 ['The common differential equation','共同的微分方程','Substitute $du = a dτ$. From here choose the ship clock or Earth clock. In both branches, $v$ remains the ship velocity relative to Earth.','代入 $du = a dτ$。从这里选择飞船时钟或地球时钟；两条分支中的 $v$ 都表示飞船相对地球的速度。']
 ],ship:[
 ['Separate variables using the ship clock','使用飞船时钟分离变量','Start from the shared equation and integrate from rest. Primed symbols inside the integrals distinguish the integration variables from their upper limits.','从共同方程出发，由静止初态积分。积分内部变量统一加撇，与积分上限区分。'],
 ['Factor and decompose','因式分解与部分分式','Factor the quadratic denominator. Split it into two simple fractions whose integrals are logarithms.','将二次分母因式分解，再拆成两个简单分式；它们的积分都是对数。'],
 ['Evaluate the logarithms','求出对数积分','Integrate both terms. The lower limit contributes zero; combine the two logarithms into one logarithm of a ratio.','分别积分两项，下限的贡献为零；两个对数合并为比值的对数。'],
 ['Exponentiate','两边取指数','Multiply by $2/c$ and exponentiate. The logarithm is removed, leaving an algebraic equation for $v$.','两边乘以 $2/c$ 后取指数，消去对数，得到关于 $v$ 的代数方程。'],
 ['Collect the velocity terms','合并速度项','Multiply by the denominator and move every term containing $v$ to the same side.','乘去分母，再把所有含 $v$ 的项移到同一边。'],
 ['Velocity as a function of ship time','速度随飞船时间的关系','Divide to isolate $v$. Rewrite the ratio using opposite exponents in the numerator and denominator to identify the hyperbolic tangent.','相除求出 $v$，再将分子分母同乘指数因子，即得到双曲正切的标准形式。']
 ],earth:[
 ['Use time dilation','使用时间膨胀关系','The two nearby events lie on the ship trajectory. Its clock records proper time, so $dt = γ dτ$. Apply the chain rule to the shared equation.','两个相邻事件位于飞船轨迹上，飞船时钟记录固有时，因此 $dt = γ dτ$。对共同方程使用链式法则。'],
 ['Separate the Earth-time equation','分离地球时间方程','Separate variables and integrate from $v = 0$ at $t = 0$. The integration variables are $v′$ and $t′$.','分离变量，从 $t = 0$、$v = 0$ 的初态积分，内部变量使用 $v′$ 和 $t′$。'],
 ['Read the cosine substitution from a triangle','从三角形读出余弦换元','Set $v/c = cos θ$. The hypotenuse is one and the adjacent side is $v/c$; the opposite side supplies the square root in the denominator.','令 $v/c = cos θ$。斜边为 1，邻边为 $v/c$；对边正好给出分母中的平方根。'],
 ['Transform the integral','变换积分','Differentiate the substitution. The sine in the numerator cancels one of the three sine factors below, leaving the squared cosecant.','对换元式求微分。分子的正弦约去分母三个正弦因子中的一个，剩下余割的平方。'],
 ['Integrate and return to velocity','积分后换回速度','The antiderivative of negative squared cosecant is cotangent. Read cosine and sine from the triangle to return to $v$.','负的余割平方积分为余切。根据三角形读出余弦和正弦，换回 $v$。'],
 ['Apply the integration limits','代入积分上下限','Evaluate the antiderivative from zero to $v$. The lower endpoint vanishes, giving an equation that can be squared.','把原函数从零代入到 $v$。下限为零，得到可以平方求解的关系式。'],
 ['Velocity as a function of Earth time','速度随地球时间的关系','Square, collect the terms in $v²$, and take the positive root because the ship moves along the positive direction.','两边平方并合并 $v²$ 项；飞船沿正方向运动，所以取正根。']
 ]};
 stages.shared.push(['Choose your viewpoint','选择你的视角','','']);
 function box(x,y,w,s,born,color=''){return `<div class="acc-eq ${color}" data-born="${born}" style="left:${x}px;top:${y}px;width:${w}px">${math(s)}</div>`;}
 function formulas(){let out='';const add=(n,x,y,w,s,color)=>{if(branch!=='shared'){if(x===450){x=0;}else if(x===1000){x=1030;}else{x=546;w=420;}}if(step>=n)out+=box(x,y,w,s,n,color)};
 if(branch==='shared'){
 add(0,546,0,420,t+eq+tau+eq+zero+O(',')+I('x')+eq+zero+O(',')+v+eq+zero);
 add(2,1030,65,450,du+eq+a+dtau,'acc-gold');
 add(3,1030,185,450,v+plus+dv+eq+F(v+plus+du,one+plus+F(v+du,c2)));
 add(4,0,65,500,P(par(one+plus+F(v+du,c2)),minus+one)+O('≃')+one+minus+F(v+du,c2));
 add(4,0,210,500,v+plus+dv+O('≃')+par(v+plus+du)+par(one+minus+F(v+du,c2)));
 add(4,0,320,500,O('≃')+v+plus+du+minus+F(v2,c2)+du);
 add(5,180,425,1150,dv+eq+par(k)+a+dtau+to+F(dv,dtau)+eq+a+par(k),'acc-result');
 }else if(branch==='ship'){
 add(0,30,282,365,F(dv,dtau)+eq+a+par(k));
 add(0,450,28,500,integral(v,F(d+vp,kp))+eq+a+integral(tau,d+qp)+eq+a+tau);
 add(1,450,132,500,F(one,kp)+eq+F(c,two)+par(F(one,c+minus+vp)+plus+F(one,c+plus+vp)));
 add(2,450,245,500,F(c,two)+`<msubsup>${R(O('[')+fn('ln')+par(F(c+plus+vp,c+minus+vp))+O(']'))}${zero}${v}</msubsup>`+eq+a+tau);
 add(2,450,351,500,F(c,two)+fn('ln')+par(F(c+plus+v,c+minus+v))+eq+a+tau);
 add(3,1000,28,450,F(c+plus+v,c+minus+v)+eq+E);
 add(4,1000,132,450,par(one+plus+E)+v+eq+c+par(E+minus+one));
 add(5,1000,235,450,v+eq+c+F(E+minus+one,E+plus+one));
 add(5,1000,325,450,eq+c+F(exp(q)+minus+exp(minus+q),exp(q)+plus+exp(minus+q)));
 add(5,1000,425,450,eq+c+fn('tanh')+par(q),'acc-result');
 }else{
 const theta=I('θ'),cos=fn('cos')+theta,sin=fn('sin')+theta;
 add(0,30,20,365,dt+eq+gamma+dtau);
 add(0,30,100,365,gamma+eq+F(one,sqrt(k)));
 add(0,450,0,500,F(dv,dt)+eq+F(dv,dtau)+F(dtau,dt)+eq+a+par(k)+F(one,gamma)+eq+a+P(par(k),F(N(3),two)));
 add(1,450,110,500,integral(v,F(d+vp,P(par(kp),F(N(3),two))))+eq+a+integral(t,d+tp)+eq+at);
 add(2,35,450,360,F(v,c)+eq+cos+O(',')+dv+eq+minus+c+sin+d+theta);
 add(3,450,235,500,O('∫')+F(dv,P(par(k),F(N(3),two)))+eq+minus+c+O('∫')+F(sin,P(fn('sin'),N(3))+theta)+d+theta);
 add(4,450,335,500,eq+minus+c+O('∫')+P(fn('csc'),two)+theta+d+theta+eq+c+fn('cot')+theta+plus+I('C'));
 add(4,450,425,500,eq+c+F(cos,sin)+plus+I('C')+eq+F(v,sqrt(k))+plus+I('C'));
 add(5,1000,105,450,`<msubsup>${R(O('[')+F(vp,sqrt(kp))+O(']'))}${zero}${v}</msubsup>`+eq+at);
 add(5,1000,252,450,F(v,sqrt(k))+eq+at);
 add(6,1000,330,450,par(one+plus+F(P(a,two)+P(t,two),c2))+v2+eq+P(a,two)+P(t,two));
 add(6,1000,411,450,v+eq+F(at,sqrt(one+plus+P(par(F(at,c)),two))),'acc-result');
 }
 return out;
 }
 function diagram(){const shared=branch==='shared',earth=branch==='earth',three=shared&&step>=1;
 const label=(x,y,s,col='#b8cde6')=>`<text x="${x}" y="${y}" fill="${col}" text-anchor="middle">${s}</text>`;
 const ship=(x,y,cls='',ghost=false)=>`<g class="${cls}" transform="translate(${x} ${y})" ${ghost?'opacity=".3"':''}><path d="M0 -15H48L75 0L48 15H0Z" fill="#1b3e5d" stroke="#8ccaff" stroke-width="2"/><circle cx="47" r="5" fill="#8ccaff"/><path d="M-8 -8H-25M-8 8H-25" stroke="#efc784" stroke-width="2"/></g>`;
 let s='';
 if(!earth){s=`<circle cx="85" cy="120" r="36" fill="#30516e" stroke="#8ccaff"/>${label(85,184,tr('Earth · S','地球 · S'))}<path d="M137 120H383l-9 -6m9 6l-9 6" stroke="#6587a7" fill="none"/>${ship(245,120,'acc-ship')}${label(286,184,tr('Ship · τ','飞船 · τ'))}${label(342,84,'+v','#8ccaff')}`;
 if(three)s+=`<path d="M65 300H366" stroke="#66849e" stroke-dasharray="5 6"/>${ship(135,300,'',true)}${ship(265,300,'acc-final')}${label(171,346,'S₀ · v')}${label(304,346,'S₁ · v + dv','#aee6cf')}<path class="acc-boost" d="M211 287H263l-7 -5m7 5l-7 5" fill="none" stroke="#efc784"/>${label(237,274,'du','#efc784')}`;
 }else if(step>=2){s=`<g class="acc-triangle"><path d="M62 407H329V240Z" fill="#1b3e5d33" stroke="#8ccaff" stroke-width="2"/><path d="M315 407V393H329M87 407A25 25 0 0 0 83 394" fill="none" stroke="#8ccaff"/>${label(101,392,'θ')}${label(183,302,'1')}${label(202,433,'v/c = cos θ')}${label(350,326,'sin θ')}</g>`;}
 return `<svg class="acc-diagram" viewBox="0 0 420 510" aria-label="${tr('Earth, ship and instantaneous rest frames; substitution triangle','地球、飞船与瞬时静止系；换元三角形')}">${s}</svg>`;
 }
 function selection(){return `<div class="acc-pick-scene"><p class="acc-pick-prompt" role="status">${tr('Choose the reference frame','选择参考系')}</p><div class="acc-pick-orbit" aria-hidden="true"></div><button class="acc-pick-object acc-pick-earth" data-choose="earth" aria-label="${tr('Earth: use the Earth clock','地球：选择地球时钟')}"><svg viewBox="0 0 240 200" aria-hidden="true"><circle class="acc-pick-halo" cx="120" cy="100" r="77"/><circle cx="120" cy="100" r="54" fill="#30516e" stroke="#8ce6ff" stroke-width="3"/><path d="M97 53l-10 27 24 18-6 28 22 26 13-25 22-14-8-24-21-9-7-27" fill="#69bbbd" opacity=".8"/></svg><span>${tr('Earth','地球')}</span></button><button class="acc-pick-object acc-pick-ship" data-choose="ship" aria-label="${tr('Spacecraft: use the ship clock','飞船：选择飞船时钟')}"><svg viewBox="0 0 240 200" aria-hidden="true"><circle class="acc-pick-halo" cx="120" cy="100" r="77"/><g stroke="#a8f7d1" stroke-width="3"><path d="M60 74H143L195 100L143 126H60Z" fill="#254a61"/><circle cx="139" cy="100" r="9" fill="#b2f9e1"/><path d="M47 86H24M47 114H24" stroke="#ffe384"/></g></svg><span>${tr('Spacecraft','飞船')}</span></button></div>`;}
 function finish(){if(complete)complete();cancelAnimationFrame(raf);complete=null;}
 function animate(){const fresh=[...host.querySelectorAll(`[data-born="${step}"]`)];const rocket=host.querySelector('.acc-ship'),triangle=host.querySelector('.acc-triangle'),finalShip=host.querySelector('.acc-final'),boost=host.querySelector('.acc-boost');
 const update=p=>{fresh.forEach(el=>{el.style.opacity=p;el.style.translate=`0 ${(1-p)*12}px`;});if(rocket&&branch==='shared'&&step===0)rocket.setAttribute('transform',`translate(${205+40*p} 120)`);if(finalShip&&branch==='shared'&&step===1)finalShip.setAttribute('transform',`translate(${135+130*p} 300)`);if(boost&&branch==='shared'&&step===2){boost.style.strokeDasharray='70';boost.style.strokeDashoffset=70*(1-p);}if(triangle&&step===2){triangle.style.opacity=p;triangle.style.strokeDasharray='900';triangle.style.strokeDashoffset=900*(1-p);}};
 complete=()=>update(1);if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}let start;update(0);const tick=now=>{if(!host.isConnected)return;if(start===undefined)start=now;const p=Math.min((now-start)/1300,1);update(p*p*(3-2*p));if(p<1)raf=requestAnimationFrame(tick);else complete=null;};raf=requestAnimationFrame(tick);
 }
 function select(b){finish();branch=b;step=0;paint();}
 function move(dir){finish();if(dir<0&&step===0&&branch!=='shared'){branch='shared';step=6;}else if(step+dir>=0&&step+dir<stages[branch].length)step+=dir;else return;paint();}
 function paint(){finish();const item=stages[branch][step],fork=branch==='shared'&&step===6,done=branch!=='shared'&&step===stages[branch].length-1;
 host.innerHTML=`<section class="kinematics acc-lesson acc-${branch}${fork?' acc-picking':''}"><div class="kin-top"><a class="back" href="#special-relativity">${tr('← Special Relativity','← 狭义相对论')}</a><a href="assets/linear-acceleration.pdf" target="_blank" rel="noopener">${tr('Lecture Notes ↗','讲义 Notes ↗')}</a></div><div class="kin-heading"><h1 tabindex="-1">${tr('Linear Acceleration','直线加速运动')}</h1></div><div class="kin-stage acc-stage" tabindex="0" role="group" aria-label="${item[lang==='zh'?1:0]}" data-branch="${branch}" data-step="${step}"><h2 class="kin-step-title">${item[lang==='zh'?1:0]}</h2><div class="acc-composition">${fork?selection():diagram()+formulas()}</div><div class="acc-subtitle" aria-live="polite">${inline(item[lang==='zh'?3:2])}</div></div><div class="kin-foot"><button data-back>${tr('← Back','← 上一步')}</button><span>${tr('Left click forward · Right click back · ← →','左键前进 · 右键后退 · ← →')}</span><div class="kin-progress">${stages[branch].map((_,i)=>`<i class="${i<=step?'done':''}"></i>`).join('')}<span>${step+1} / ${stages[branch].length}</span></div>${done?`<button data-choice>${tr('Choose another branch','重新选择分支')}</button>`:''}<button data-replay>${tr('Replay section','重看本节')}</button></div></section>`;
 host.querySelectorAll('[data-branch]').forEach(b=>{if(b.tagName==='BUTTON')b.onclick=()=>select(b.dataset.branch)});
 host.querySelectorAll('[data-choose]').forEach(b=>b.onclick=e=>{e.stopPropagation();select(b.dataset.choose)});
 const stage=host.querySelector('.acc-stage');stage.onclick=e=>{if(!e.target.closest('button'))move(1)};stage.oncontextmenu=e=>{e.preventDefault();move(-1)};stage.onkeydown=e=>{if(e.target.closest('button'))return;if(['ArrowRight','ArrowLeft',' '].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);host.querySelector('.acc-stage').focus({preventScroll:true})}};
 host.querySelector('[data-back]').onclick=()=>move(-1);host.querySelector('[data-replay]').onclick=()=>select(branch);const choice=host.querySelector('[data-choice]');if(choice)choice.onclick=()=>{finish();branch='shared';step=6;paint()};animate();
 }
 window.addEventListener('hashchange',()=>{if(location.hash!=='#acceleration')finish()});
 return {render(main,language){host=main;lang=language;KinematicsLesson.mountCanvas();paint()}};
})();
