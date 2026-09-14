/* Native MathML keeps textbook fractions, radicals and mathematical spacing offline. */
const LessonMath = (() => {
 const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 function expression(source) {
  const saved=[];
  const keep=markup=>{saved.push(markup);return `§${saved.length-1}§`;};
  let s=source.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  s=s.replace(/([A-Za-z])<tspan[^>]*>([^<]+)<\/tspan>/g,(_,base,label)=>keep(`<msub><mi>${base}</mi><mtext>${escape(label)}</mtext></msub>`));
  // These are the complete fraction terms used by these two authored lessons.
  for(const [term,numerator,denominator] of [
   ['γv²L₀/c²','γv²L₀','c²'],['γvL₀/c²','γvL₀','c²'],
   ['vΔx′/c²','vΔx′','c²'],['v²/c²','v²','c²'],['L₀/γ','L₀','γ']
  ])if(s.includes(term))s=s.replaceAll(term,keep(`<mfrac><mrow>${expression(numerator)}</mrow><mrow>${expression(denominator)}</mrow></mfrac>`));
  s=s.replace(/√\(([^()]*)\)/g,(_,inside)=>keep(`<msqrt><mrow>${tokens(inside)}</mrow></msqrt>`));
  function tokens(value) {
   return (value.match(/§\d+§|[A-Za-zΔγ][′₀²]*|\d+|[^\s]/g)||[]).map(token=>{
    if(token.startsWith('§'))return saved[Number(token.slice(1,-1))];
    if(/^\d+$/.test(token))return `<mn>${token}</mn>`;
    if(/^[A-Za-zΔγ]/.test(token)){
     let node=`<mi${token[0]==='Δ'?' mathvariant="normal"':''}>${token[0]}</mi>`;
     for(const mark of token.slice(1))node=mark==='₀'?`<msub>${node}<mn>0</mn></msub>`:`<msup>${node}${mark==='²'?'<mn>2</mn>':'<mo>′</mo>'}</msup>`;
     return node;
    }
    return `<mo>${escape(token)}</mo>`;
   }).join('');
  }
  return tokens(s);
 }
 function row(y,source,width=620){
  return `<foreignObject class="lesson-equation" x="0" y="${y-27}" width="${width}" height="72"><div xmlns="http://www.w3.org/1999/xhtml" class="lesson-equation-inner"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${expression(source)}</mrow></math></div></foreignObject>`;
 }
 function inline(source){
  const tokens=source.match(/[A-Za-zγΔ][′₀²]*(?:_[a-z]+)?|\d+(?:\.\d+)?|[^\s]/g)||[];
  const content=tokens.map(token=>{
   if(/^\d/.test(token))return `<mn>${token}</mn>`;
   if(/^[A-Za-zγΔ]/.test(token)){
    const [base,index]=token.split('_');
    const node=expression(base);
    return index?`<msub><mrow>${node}</mrow><mtext>${index}</mtext></msub>`:node;
   }
   return `<mo>${escape(token)}</mo>`;
  }).join('');
  return `<math class="lesson-inline" xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow>${content}</mrow></math>`;
 }
 function subtitle(html){
  // Recognize mathematical runs only; prose and existing emphasis stay intact.
  const atom='(?:[+−]?(?:\\d+(?:\\.\\d+)?c|v_[abc]{2})|[γΔ][a-z]?[′₀²]*(?:_[abc]{1,2})?|d[xt](?:_[abc])?|[TL]₀|v²|c²|1/γ²|(?<![A-Za-z])[vc](?![A-Za-z]))';
  const pattern=new RegExp(atom+'(?:\\s*(?:[=+−<>/]|≠)\\s*(?:'+atom+'|[01]))*','g');
  return html.split(/(<\/?[A-Za-z][^>]*>)/g).map(part=>part.startsWith('<')?part:part.replace(pattern,inline)).join('');
 }
 return {row,inline,subtitle};
})();
