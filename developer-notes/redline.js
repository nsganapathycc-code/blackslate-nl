
(function(){
var L=document.getElementById('rl');
var ROLES=[['Brand',[53,74,64]],['Action',[181,211,52]],['Accent',[138,106,44]],['Light bg',[243,245,243]],['Text',[31,42,37]],['Body text',[59,72,66]],['Muted text',[74,87,81]],['White',[255,255,255]],['Text on brand',[228,234,230]],['Line',[220,224,221]]];
function role(c){var m=(c||'').match(/[\d.]+/g);if(!m)return '';var best='',d=1e9;ROLES.forEach(function(r){var x=Math.pow(r[1][0]-m[0],2)+Math.pow(r[1][1]-m[1],2)+Math.pow(r[1][2]-m[2],2);if(x<d){d=x;best=r[0]}});return d<900?best:''}
function R(e){var b=e.getBoundingClientRect();return {l:b.left+scrollX,t:b.top+scrollY,r:b.right+scrollX,b:b.bottom+scrollY,w:b.width,h:b.height}}
function el(cls,css,txt){var d=document.createElement('div');d.className=cls;for(var k in css)d.style[k]=css[k]+'px';if(txt!=null)d.textContent=txt;L.appendChild(d);return d}
function vdim(x,y1,y2,lab,side){if(y2-y1<6)return;el('v',{left:x,top:y1,height:y2-y1});var t=el('t',{left:x+(side?-4:6),top:(y1+y2)/2-8},lab);if(side)t.style.transform='translateX(-100%)'}
function hdim(y,x1,x2,lab){if(x2-x1<6)return;el('h',{left:x1,top:y,width:x2-x1});el('t o',{left:(x1+x2)/2-20,top:y-18},lab)}
function vis(e){var b=e.getBoundingClientRect();return b.width>3&&b.height>3&&getComputedStyle(e).visibility!=='hidden'&&(e.offsetParent||e.tagName==='svg')}
function px(v){return Math.round(parseFloat(v)||0)}
function draw(){
 L.innerHTML='';L.style.height=document.documentElement.scrollHeight+'px';
 document.getElementById('rl-w').textContent=document.title.replace('Redline \u00b7 ','')+' \u00b7 width '+innerWidth+'px ('+(innerWidth>1000?'Desktop':innerWidth>750?'Tablet':'Mobile')+')';
 var main=document.querySelector('main');var parts=main?[].slice.call(main.querySelectorAll(':scope > section')):[];
 if(parts.length<2&&main){parts=[].slice.call(main.children).filter(function(c){return c.getBoundingClientRect().height>40&&c.tagName!=='SCRIPT'})}
 if(!main){parts=[].slice.call(document.querySelectorAll('body > section, body > div > section'))}
 var secs=[].concat([document.querySelector('header')],parts,[document.querySelector('footer')]).filter(Boolean);
 secs.forEach(function(s,si){
  var r=R(s);
  if(s.tagName==='HEADER'){vdim(r.l+8,r.t,r.b,'header '+Math.round(r.h));return}
  if(s.tagName==='FOOTER'){}
  var items=[].slice.call(s.querySelectorAll('h1,h2,h3,p,a.btn,button,.ph,svg,img,input,figure,blockquote,.tile,.pl,.q,.sv,li')).filter(vis).map(R);
  if(!items.length)return;
  var top=Math.min.apply(null,items.map(function(i){return i.t})),bot=Math.max.apply(null,items.map(function(i){return i.b}));
  vdim(r.l+10,r.t,top,Math.round(top-r.t));vdim(r.l+10,bot,r.b,Math.round(r.b-bot));
  // section background role
  var bg=getComputedStyle(s).backgroundColor;var pn=s.querySelector('.panel');if(pn&&getComputedStyle(pn).backgroundColor!=='rgba(0, 0, 0, 0)')bg=getComputedStyle(pn).backgroundColor;
  var rn=role(bg)||(getComputedStyle(s).backgroundImage!=='none'?'gradient':'White');
  el('t o',{left:r.r-230,top:r.t+6},'section bg: '+rn+' · h '+Math.round(r.h));
  // container
  var w=s.querySelector('.wrap,.in');if(w){var wr=R(w),cs=getComputedStyle(w),pl=px(cs.paddingLeft);hdim(top-12,wr.l+pl,wr.r-px(cs.paddingRight),'content '+Math.round(wr.w-pl-px(cs.paddingRight))+' (side '+pl+')')}
  // gaps
  s.querySelectorAll('*').forEach(function(g){var c=getComputedStyle(g);if(!(c.display==='grid'||c.display==='flex'))return;var ch=[].slice.call(g.children).filter(vis);if(ch.length<2||!vis(g))return;
   var a=R(ch[0]),b=R(ch[1]);
   var cg=px(c.columnGap),rg=px(c.rowGap);
   if(Math.abs(a.t-b.t)<6&&b.l>a.r+2){var gx=Math.round(b.l-a.r);if(cg>0&&Math.abs(gx-cg)<=2)hdim(Math.min(a.b,b.b)-Math.min(a.h,b.h)/2,a.r,b.l,'gap '+gx)}
   else if(b.t>a.b+2&&Math.abs(a.l-b.l)<6){var gy=Math.round(b.t-a.b);if(rg>0&&Math.abs(gy-rg)<=2)vdim(a.l+Math.min(a.w,b.w)-12,a.b,b.t,'gap '+gy,1)}
  });
  // labels
  var seen={};
  s.querySelectorAll('h1,h2,h3,p,a.btn,button.btn,.go,.eyebrow,blockquote,figcaption,label,input').forEach(function(e){if(!vis(e))return;var c=getComputedStyle(e),b=R(e),tag=e.tagName.toLowerCase();
   var kind=/btn-line/.test(e.className)?'Button 2':(/btn/.test(e.className)?'Button 1':(tag==='p'?'Text':tag.toUpperCase()));
   if(/eyebrow/.test(e.className))kind='Label';if(/go/.test(e.className))kind='Link';
   var key=kind+c.fontSize+c.color;if(seen[key])return;seen[key]=1;
   var lab=kind+' · '+px(c.fontSize)+'/'+(c.lineHeight==='normal'?'auto':px(c.lineHeight))+' · '+(c.fontFamily.indexOf('Space')>-1?'Heading font':'Body font')+' '+c.fontWeight+' · '+(role(c.color)||'');
   if(/btn/.test(e.className))lab+=' · '+Math.round(b.w)+'×'+Math.round(b.h)+' · r'+px(c.borderTopLeftRadius)+(role(c.backgroundColor)?' · fill '+role(c.backgroundColor):'');
   var t=el('t',{left:b.l,top:b.t-16},lab);
  });
  s.querySelectorAll('.ph,svg,img').forEach(function(e){if(!vis(e))return;var b=R(e);if(b.w<60)return;el('box',{left:b.l,top:b.t,width:b.w,height:b.h});el('t o',{left:b.l+6,top:b.b-22},'image '+Math.round(b.w)+'×'+Math.round(b.h))});
  s.querySelectorAll('.tile,.pl,.q,.sv').forEach(function(e,i){if(i>0||!vis(e))return;var b=R(e),c=getComputedStyle(e);el('box',{left:b.l,top:b.t,width:b.w,height:b.h});el('t o',{left:b.r-170,top:b.t+4},'card '+Math.round(b.w)+'×'+Math.round(b.h)+' · pad '+px(c.paddingTop)+' · r'+px(c.borderTopLeftRadius))});
 });
 var f=document.querySelector('footer');if(f){var fr=R(f);el('t o',{left:fr.r-150,top:fr.t+6},'footer · bg Brand')}
}
document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')});
var to;window.addEventListener('resize',function(){clearTimeout(to);to=setTimeout(draw,150)});
window.addEventListener('load',function(){setTimeout(draw,300)});setTimeout(draw,600);
document.getElementById('rl-tog').onclick=function(){document.body.classList.toggle('rl-off');this.textContent=document.body.classList.contains('rl-off')?'Show redlines':'Hide redlines'};
})();

(function(){var b=document.getElementById('rl-back');if(b)b.href=document.body.dataset.src||'#'})();