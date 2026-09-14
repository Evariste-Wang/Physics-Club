/* One continuous scene; each click completes one physical or algebraic beat. */
const TimeDilation = (() => {
  let frame = 0, busy = false, complete = null;
  const steps = [
    ['Two observers, two clocks', '两个观察者，两只钟'],
    ['Let B’s clock tick', '让 B 的钟走一段'],
    ['Transform to A’s frame', '变换到 A 的参考系'],
    ['The same two ticks, a longer interval', '同样两次滴答，更长的时间间隔'],
    ['Give A’s own clock the same interval T₀', '让 A 自己的钟也走过 T₀'],
    ['Compare the intervals', '比较两个时间间隔']
  ].map(title => ({ title }));
  const choose = (en, zh, language) => language === 'zh' ? zh : en;
  const texts = (n, lang) => {
    const p = (en, zh) => choose(en, zh, lang);
    return [
      p('A and B each hold a clock. B moves at +v relative to A. Follow two ticks of <em>B’s clock</em>.', 'A 和 B 各拿一只钟，B 相对 A 以 +v 运动。接下来始终跟踪 <em>B 钟的两次滴答</em>。'),
      p('The blue sector records the interval on B’s own clock. Both ticks occur at the same place in B’s frame:', '蓝色扇形记录 B 自己的钟走过的时间。两次滴答在 B 系中发生于同一位置：'),
      p('Describe those same two ticks in A’s frame. The extra dial below A represents their <em>A-frame time interval</em>.', '把同样两次滴答变换到 A 系。A 下方新增的表盘表示这对事件的 <em>A 系时间间隔</em>。'),
      p('Since B’s clock stays at one position in its own frame, substitute Δx′ = 0 and Δt′ = T₀:', 'B 钟在自身参考系的位置不变，代入 Δx′ = 0 和 Δt′ = T₀：'),
      p('Now let A’s own clock advance by T₀, shown in gold. Its sector equals the blue sector on B’s own clock.', '现在让 A 自己的钟走过 T₀，用金色标出。它与 B 手上时钟的蓝色扇形一样大。'),
      p('The gold sector is T₀; the transformed blue sector is γT₀. A assigns a longer interval to B’s two ticks: B’s ticking period is dilated.', '金色扇形是 T₀，变换后的蓝色扇形是 γT₀。A 为 B 的两次滴答记录了更长的间隔：B 的滴答周期在 A 系中被延长了。') + '<small>' + p('The gold sector is a duration reference. Over the full blue interval on A’s clocks, B’s own clock advances by only T₀. “Apparent” here means coordinate time, excluding light-travel delay.', '金色扇形用于比较时长。在 A 系经历整个蓝色间隔时，B 自己的钟只走过 T₀。这里 apparent 指坐标时间，不包含光传播延迟。') + '</small>'
    ][n];
  };
  function dial(id, label, color) {
    return `<g class="td-dial" data-clock="${id}"><g transform="scale(0.6981132075)"><circle r="53" class="td-rim"/><path class="td-sector" fill="${color}" fill-opacity=".28"/><g class="td-ticks">${Array.from({length:12},(_,i)=>`<path d="M0 -46v5" transform="rotate(${i*30})"/>`).join('')}</g><path d="M0 0V-48" class="td-start"/><path class="td-hand" d="M0 8V-44" stroke="${color}"/><circle r="4" fill="${color}"/></g><text y="65" class="td-dial-label">${label}</text><text y="94" class="td-clock-value" fill="${color}"></text></g>`;
  }
  function person(x, name, direction) {
    return `<g transform="translate(${x} 0)" class="td-person"><circle cy="-39" r="15"/><path d="M0 -24V50M0 -9L${direction*35} 13L${direction*51} 0M0 -9L${-direction*22} 22M0 50L-24 94M0 50L24 94"/><text y="132">${name}</text></g>`;
  }
  function formulas(n) {
    const row=LessonMath.row;
    const apparent='T<tspan baseline-shift="sub" font-size="65%">apparent</tspan>';
    return `<g class="td-formulas td-formulas-b" transform="translate(680 225)">${n>=1?row(0,'Δx′ = 0')+row(34,'Δt′ = T₀'):''}</g>
      <g class="td-formulas td-formulas-transform" transform="translate(355 305)">${n>=2?row(0,'Δt = γ(Δt′ + vΔx′/c²)'):''}${n>=3?row(65,'⇒ Δt = γ(T₀ + 0) = γT₀')+row(110,`Δt = ${apparent} = γT₀`):''}</g>
      <g class="td-formulas td-formulas-a" transform="translate(305 100)">${n>=4?row(0,'Δt<tspan baseline-shift="sub" font-size="65%">A, comparison</tspan> = T₀'):''}${n>=5?row(42,`${apparent} = γT₀ &gt; T₀`):''}</g>`;
  }
  function markup(n, lang) {
    const p = (en,zh) => choose(en,zh,lang);
    return `<div class="td-continuous"><div class="td-scene"><svg viewBox="0 0 1200 450" role="img" aria-label="${p('A and B holding clocks, and a separate dial for the transformed interval','A、B 各持一只钟，另一个表盘表示变换后的时间间隔')}"><g class="td-a" transform="translate(225 105)">${person(-88,'A',1)}${dial('a',p('A’s own clock','A 自己的钟'),'#efc784')}</g><g class="td-b" transform="translate(765 105)">${person(88,'B',-1)}${dial('b',p('B’s own clock','B 自己的钟'),'#8ccaff')}<path d="M-28 -76H28L20 -82M28 -76L20 -70" class="td-motion"/><text y="-90" class="td-speed">+v</text></g><g class="td-transformed" transform="translate(225 325)" opacity="${n>=2?1:0}">${dial('transformed',p('B’s interval in A’s frame','B 的间隔 · A 系'),'#8ccaff')}<text y="-57" class="td-transform-label">${p('Transformed interval','变换后的间隔')}</text></g>${formulas(n)}</svg></div><div class="td-reasoning" aria-live="polite">${LessonMath.subtitle(texts(n,lang))}</div><p class="td-scale">${p('Same angular scale on all dials · illustrated at v = 0.8c, γ = 5/3','所有表盘采用相同角度刻度 · 图示取 v = 0.8c，γ = 5/3')}</p></div>`;
  }
  const angles = n => ({ a:n>=4?72:0, b:n>=1?72:0, transformed:n>=3?120:0 });
  function setDial(root, id, angle) {
    const node = root.querySelector(`[data-clock="${id}"]`);
    const rad = angle*Math.PI/180, x = 49*Math.sin(rad), y = -49*Math.cos(rad);
    node.querySelector('.td-sector').setAttribute('d',angle>0?`M0 0L0 -49A49 49 0 ${angle>180?1:0} 1 ${x} ${y}Z`:'M0 0');
    node.querySelector('.td-hand').setAttribute('transform',`rotate(${angle})`);
  }
  function cancel() { cancelAnimationFrame(frame); busy=false; complete=null; }
  function finish(){if(complete)complete();cancel();}
  function animate(root, n, previous = n) {
    cancel();
    const end = angles(n), forward = previous >= 0 && n === previous+1;
    const start = forward ? angles(previous) : end;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const values = {a:'', b:'', transformed:''};
    Object.keys(end).forEach(id=>{
      setDial(root,id,start[id]);
      const label=root.querySelector(`[data-clock="${id}"] .td-clock-value`);
      label.textContent = values[id];
    });
    if(!forward || reduced || n===5) { Object.keys(end).forEach(id=>setDial(root,id,end[id])); return; }
    const copy=root.querySelector('.td-transformed');
    complete=()=>{Object.keys(end).forEach(id=>setDial(root,id,end[id]));copy.style.opacity=n>=2?1:0;copy.style.translate="0px 0px";};
    let begin;
    busy=true;
    function tick(time) {
      if(!root.isConnected){busy=false;return;}
      if(begin===undefined)begin=time;
      const t=Math.min((time-begin)/(n===2?950:1450),1);
      const ease=t*t*(3-2*t);
      Object.keys(end).forEach(id=>setDial(root,id,start[id]+(end[id]-start[id])*ease));
      if(n===2){copy.style.opacity=ease;copy.style.translate=`${(1-ease)*120}px ${(1-ease)*-100}px`;}
      if(t<1)frame=requestAnimationFrame(tick);else busy=false;
    }
    frame=requestAnimationFrame(tick);
  }
  return {steps,markup,animate,cancel,finish,get busy(){return busy;}};
})();
