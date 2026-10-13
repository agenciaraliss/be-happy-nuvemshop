(function(){
if(window.__bhOn)return;window.__bhOn=1;
var D=document,W=window;
function K(n){return '<i class="bhi bhi-'+n+'"></i>'}
var I=new Proxy({},{get:function(t,n){return K(n)}}),S=I;
function $(s,r){return (r||D).querySelector(s)}
function $$(s,r){return [].slice.call((r||D).querySelectorAll(s))}
function esc(s){return (s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function norm(s){return (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
function hl(t,q){if(!q)return esc(t);var i=norm(t).indexOf(norm(q));return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length))}
function n2(i){return String(i+1).padStart(2,'0')}
function pimg(it){var im=it.querySelector('img');var ss=im&&(im.getAttribute('data-srcset')||im.getAttribute('srcset'))||'';var ps=ss.split(',').map(function(x){return x.trim().split(' ')});var f=function(w){return ps.filter(function(x){return x[1]===w})[0]};var u=((f('240w')||f('320w')||f('480w')||ps[ps.length-1]||[])[0])||'';return u.indexOf('//')===0?'https:'+u:u}
function parse(t){var d=new DOMParser().parseFromString(t,'text/html');var seen={};return $$('.js-item-product',d).map(function(it){var n=it.querySelector('.js-item-name'),p=it.querySelector('.js-price-display'),a=it.querySelector('a');return{name:n&&n.textContent.trim(),price:p?p.textContent.trim():'',href:a&&a.getAttribute('href'),img:pimg(it)}}).filter(function(p){if(!p.name||seen[p.href])return false;seen[p.href]=1;return true})}
function copyTxt(v){if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(v).catch(function(){fb(v)});fb(v);return Promise.resolve()
 function fb(v){var t=D.createElement('textarea');t.value=v;t.style.position='fixed';t.style.opacity='0';D.body.appendChild(t);t.select();try{D.execCommand('copy')}catch(e){}t.remove()}}
function obs(fn){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(fn,80)}).observe(D.body,{childList:true,subtree:true})}

/* ================= CABEÇALHO ================= */
function header(){
var nat=$('.js-head-main'),logoImg=$('.logo-img'),list=$('.js-nav-desktop-list');if(!nat||!logoImg||!list||$('#bh-head'))return;
function read(ul){return [].slice.call(ul.children).filter(function(li){return li.tagName==='LI'}).map(function(li){var a=li.querySelector('a'),sub=li.querySelector('ul');return{t:a.textContent.trim().replace(/\s+/g,' '),h:a.getAttribute('href'),k:sub?read(sub):[]}})}
var menu=read(list).filter(function(i){try{return new URL(i.h,location.origin).pathname!=='/'}catch(e){return true}});
var la=nat.querySelector('a[href*="/account/login"]')||nat.querySelector('a[href*="/account"]');var acc=la?la.getAttribute('href'):'/account/login/';
function isCur(h){try{var p=new URL(h,location.origin).pathname;return p!=='/'&&location.pathname.indexOf(p)===0}catch(e){return false}}
var logo=logoImg.currentSrc||logoImg.src;
var head=D.createElement('div');head.id='bh-head';
head.innerHTML='<div class="bh-bar"><div class="bh-ml"><button class="bh-burger" aria-label="Menu">'+I.burger+'</button><button class="bh-msbtn" aria-label="Buscar">'+I.search+'</button></div>'+
'<a class="bh-logo" href="/"><img src="'+logo+'" alt="'+esc(logoImg.alt)+'"></a>'+
'<div class="bh-mid"><div class="bh-cap"><span class="bh-pill"></span><div class="bh-items"><button class="bh-sbtn" aria-label="Buscar">'+I.search+'</button><span class="bh-sep"></span></div>'+
'<form class="bh-sform" action="/search/" method="get">'+I.search+'<input name="q" autocomplete="off" placeholder="Busque por perfume, marca ou nota"><button type="button" class="bh-sx" aria-label="Fechar busca">'+I.close+'</button></form></div></div>'+
'<div class="bh-ic"><a class="bh-uacc" href="'+acc+'" aria-label="Minha conta">'+I.user+'</a><span class="bh-cartwrap"><button class="bh-cart" aria-label="Sacola">'+I.bag+'<span class="bh-badge zero">0</span></button></span></div>'+
'<div class="bh-pop"><span class="bh-notch"></span><div class="bh-popin"></div></div></div>';
nat.parentElement.insertBefore(head,nat);
var tb=$('.js-topbar');if(tb)head.insertBefore(tb,head.firstChild);
var al=$('.js-alert-added-to-cart');if(al)head.querySelector('.bh-cartwrap').appendChild(al);
var cap=$('.bh-cap',head),items=$('.bh-items',head),pill=$('.bh-pill',head),pop=$('.bh-pop',head),popIn=$('.bh-popin',head),notch=$('.bh-notch',head),inp=$('.bh-sform input',head),mid=$('.bh-mid',head);
function mob(){return innerWidth<1024}
var tmo;
function movePill(el){var r=el.getBoundingClientRect(),c=cap.getBoundingClientRect();pill.style.left=(r.left-c.left-1)+'px';pill.style.width=r.width+'px';pill.style.opacity=1}
function placeNotch(el){var r=el.getBoundingClientRect(),p=pop.getBoundingClientRect();notch.style.left=Math.max(20,Math.min(p.width-30,r.left+r.width/2-p.left-6))+'px'}
function setSub(m,j){var c=m.k[j];$$('.bh-mlist a',popIn).forEach(function(a,k){a.classList.toggle('act',k===j)});
 $('.bh-mmid',popIn).innerHTML='<small>'+esc(m.h?m.t:'Categoria')+'</small><h4>'+esc(c.t)+'</h4><div class="bh-mcount">'+(c.k.length?c.k.length+(c.k.length>1?' opções':' opção'):'Coleção completa')+'</div>'+
 (c.k.length?'<div class="bh-mgk">'+c.k.map(function(g,i){return '<a href="'+g.h+'"><b>'+n2(i)+'</b>'+esc(g.t)+I.arrow+'</a>'}).join('')+'</div>':'<p>Toda a seleção de '+esc(c.t.toLowerCase())+' da Be Happy, em um só lugar.</p>')+
 '<a class="bh-mall" href="'+c.h+'">Ver tudo em '+esc(c.t)+' '+I.arrow+'</a>'}
function hover(el,m){if(mob()||cap.classList.contains('srch'))return;clearTimeout(tmo);movePill(el);
 if(!m.k.length){pop.classList.remove('open');return}
 var two=m.k.length>9;
 popIn.innerHTML='<div class="bh-mg'+(two?' wide':'')+'"><div class="bh-mlist'+(two?' two':'')+'"><small>'+(m.h?'Explorar':'Mais categorias')+'</small>'+m.k.map(function(c,j){return '<a href="'+c.h+'" data-j="'+j+'"><i></i>'+esc(c.t)+'</a>'}).join('')+'</div><div class="bh-mmid"></div></div>';
 var l=$('.bh-mlist',popIn);function fu(){l.classList.toggle('fade',l.scrollHeight>l.clientHeight+4);l.classList.toggle('end',l.scrollTop+l.clientHeight>=l.scrollHeight-4)}
 l.addEventListener('scroll',fu,{passive:true});
 $$('a',l).forEach(function(a){a.addEventListener('mouseenter',function(){setSub(m,+a.dataset.j)})});
 setSub(m,0);pop.classList.add('open');requestAnimationFrame(function(){placeNotch(el);fu()})}
function render(){$$('[data-i],.bh-more',items).forEach(function(e){e.remove()});if(mob())return;
 menu.forEach(function(m,i){var a=D.createElement('a');a.href=m.h;a.dataset.i=i;a.textContent=m.t;if(isCur(m.h))a.classList.add('cur');items.appendChild(a)});
 var max=mid.clientWidth,over=[],links=$$('[data-i]',items);
 if(cap.scrollWidth>max){var more=D.createElement('button');more.className='bh-more';more.innerHTML='Mais '+I.dots;items.appendChild(more);while(cap.scrollWidth>max&&links.length>1){var l=links.pop();over.unshift(menu[l.dataset.i]);l.remove()}}
 $$('[data-i],.bh-more',items).forEach(function(el){var m=el.classList.contains('bh-more')?{t:'Mais categorias',h:null,k:over}:menu[el.dataset.i];el.addEventListener('mouseenter',function(){hover(el,m)})})}
render();var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(render,150)});
D.addEventListener('pointermove',function(e){if(mob()||cap.classList.contains('srch'))return;var c=cap.getBoundingClientRect(),p=pop.getBoundingClientRect(),x=e.clientX,y=e.clientY;
 var inC=x>=c.left&&x<=c.right&&y>=c.top&&y<=c.bottom,inP=pop.classList.contains('open')&&x>=p.left&&x<=p.right&&y>=c.top&&y<=p.bottom;
 clearTimeout(tmo);if(!inC&&!inP)tmo=setTimeout(function(){pop.classList.remove('open');pill.style.opacity=0},140)},{passive:true});
/* busca */
var flat=[];menu.forEach(function(m){flat.push({t:m.t,p:'',h:m.h});m.k.forEach(function(c){flat.push({t:c.t,p:m.t,h:c.h});c.k.forEach(function(g){flat.push({t:g.t,p:m.t+' · '+c.t,h:g.h})})})});
var top=menu.map(function(m){return{t:m.t,p:'',h:m.h}});
var featP=null;function feat(){return featP||(featP=fetch('/').then(function(r){return r.text()}).then(function(t){return parse(t).slice(0,4)}).catch(function(){return[]}))}
function row(p,q){return '<a class="bh-srow" href="'+p.href+'"><span class="bh-th">'+(p.img?'<img src="'+p.img+'" alt="" loading="lazy">':'')+'</span><span class="bh-nm">'+hl(p.name,q)+'</span><span class="bh-pr">'+esc(p.price)+'</span></a>'}
var sk=new Array(5).join('<div class="bh-srow sk"><span class="bh-th"></span><span class="bh-nm">carregando</span><span></span></div>');
var sel=-1;
function R(q,prods,label){sel=-1;var cats=q?flat.filter(function(f){return norm(f.t+' '+f.p).indexOf(norm(q))>-1}).slice(0,6):top,ct=q?'Categorias':'Navegue por';if(!cats.length){cats=top;ct='Navegue por'}
 popIn.innerHTML='<div class="bh-s2"><div class="bh-s2l"><small>'+ct+'</small>'+cats.map(function(c){return '<a href="'+c.h+'">'+(c.p?'<em>'+esc(c.p)+'</em>':'')+hl(c.t,ct==='Categorias'?q:'')+'</a>'}).join('')+'</div>'+
 '<div class="bh-s2r"><small>'+label+'</small>'+(prods===null?sk:prods.length?prods.map(function(p){return row(p,q)}).join(''):'<div class="bh-shint">'+(q?'Nada encontrado para “'+esc(q)+'”. Tente o nome da marca.':'Digite o nome do perfume ou da marca.')+'</div>')+'</div>'+
 '<div class="bh-s2f"><span><kbd>↑</kbd><kbd>↓</kbd> navegar <kbd>Enter</kbd> abrir <kbd>Esc</kbd> fechar</span>'+(q?'<a href="/search/?q='+encodeURIComponent(q)+'">Ver todos os resultados '+I.arrow+'</a>':'')+'</div></div>'}
function openS(){clearTimeout(tmo);closeD();head.classList.add('msrch');cap.classList.add('srch');pop.classList.add('open');notch.style.left='50%';R('',null,'Em destaque');feat().then(function(p){if(!inp.value.trim()&&cap.classList.contains('srch'))R('',p,'Em destaque')});setTimeout(function(){inp.focus()},120)}
function closeS(){head.classList.remove('msrch');cap.classList.remove('srch','loading');pop.classList.remove('open');inp.value=''}
$('.bh-sbtn',head).onclick=openS;$('.bh-sx',head).onclick=closeS;
$('.bh-msbtn',head).onclick=function(){cap.classList.contains('srch')?closeS():openS()};
var stm,ctl;
inp.addEventListener('input',function(){var q=inp.value.trim();clearTimeout(stm);if(ctl)ctl.abort();
 if(q.length<2){cap.classList.remove('loading');if(!q)feat().then(function(p){if(!inp.value.trim())R('',p,'Em destaque')});else R(q,[],'Perfumes');return}
 R(q,null,'Perfumes');cap.classList.add('loading');
 stm=setTimeout(function(){ctl=new AbortController();fetch('/search/?q='+encodeURIComponent(q),{signal:ctl.signal}).then(function(r){return r.text()}).then(function(t){if(inp.value.trim()!==q)return;cap.classList.remove('loading');R(q,parse(t).slice(0,5),'Perfumes')}).catch(function(){})},260)});
inp.addEventListener('keydown',function(e){var els=$$('.bh-srow:not(.sk),.bh-s2l a',popIn);
 if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!els.length)return;sel=(sel+(e.key==='ArrowDown'?1:-1)+els.length)%els.length;els.forEach(function(x,i){x.classList.toggle('sel',i===sel)});els[sel].scrollIntoView({block:'nearest'})}
 else if(e.key==='Enter'&&sel>=0&&els[sel]){e.preventDefault();location.href=els[sel].href}else if(e.key==='Escape')closeS()});
D.addEventListener('click',function(e){if(cap.classList.contains('srch')&&!head.contains(e.target))closeS()});
/* sacola */
$('.bh-cart',head).onclick=function(){var t=$('.js-toggle-cart');if(t)t.click()};
var badge=$('.bh-badge',head);
function sync(){var n=Math.max.apply(null,[0].concat($$('.js-cart-widget-amount').map(function(e){return parseInt(e.textContent)||0})));badge.textContent=n;badge.classList.toggle('zero',!n)}sync();
$$('.js-cart-widget-amount').forEach(function(s){new MutationObserver(sync).observe(s,{childList:true,characterData:true,subtree:true})});
addEventListener('scroll',function(){var y=scrollY,m=head.classList.contains('mini');if(!m&&y>110)head.classList.add('mini');else if(m&&y<30)head.classList.remove('mini')},{passive:true});
/* gaveta */
var veil=D.createElement('div');veil.id='bh-veil';D.body.appendChild(veil);
var d=D.createElement('div');d.id='bh-drawer';
function accH(m,lvl){if(!m.k.length)return lvl?'<a class="bh-drow" href="'+m.h+'"><b>'+m._n+'</b>'+esc(m.t)+'</a>':'<div class="bh-acc"><a class="bh-ah" href="'+m.h+'">'+esc(m.t)+'</a></div>';
 var inner=lvl?'<div class="bh-gk">'+m.k.map(function(g){return '<a href="'+g.h+'">'+esc(g.t)+'</a>'}).join('')+'<a href="'+m.h+'">Ver tudo</a></div>':'<a class="bh-dall" href="'+m.h+'">Ver tudo em '+esc(m.t)+' '+I.arrow+'</a>'+m.k.map(function(c,i){c._n=n2(i);return accH(c,1)}).join('');
 return '<div class="bh-acc"><button class="bh-ah">'+(lvl?'<span class="t"><b>'+m._n+'</b>'+esc(m.t)+'</span>':esc(m.t))+'<span class="bh-pl">'+I.plus+'</span></button><div class="bh-ab"><div>'+inner+'</div></div></div>'}
d.innerHTML='<div class="bh-dh"><img src="'+logo+'" alt=""><button aria-label="Fechar">'+I.close+'</button></div><div class="bh-dbody"><small>Categorias</small>'+menu.map(function(m){return accH(m,0)}).join('')+'</div><div class="bh-df"><a href="'+acc+'">'+I.user+' Conta</a><a href="#" class="bh-dcart">'+I.bag+' Sacola</a></div>';
D.body.appendChild(d);
$$('button.bh-ah',d).forEach(function(b){b.onclick=function(){var a=b.parentElement,o=!a.classList.contains('open');[].slice.call(a.parentElement.children).forEach(function(s){if(s!==a)s.classList.remove('open')});a.classList.toggle('open',o)}});
function openD(){closeS();d.classList.add('open');veil.classList.add('open');D.documentElement.style.overflow='hidden'}
function closeD(){d.classList.remove('open');veil.classList.remove('open');D.documentElement.style.overflow=''}
$('.bh-burger',head).onclick=openD;$('.bh-dh button',d).onclick=closeD;veil.onclick=closeD;
$('.bh-dcart',d).onclick=function(e){e.preventDefault();closeD();$('.bh-cart',head).click()};
D.addEventListener('keydown',function(e){if(e.key==='Escape')closeD()});
}

/* ================= BARRA DE ANÚNCIO ================= */
function topbar(){
var tb=$('#bh-head .js-topbar');if(!tb||$('.bh-ad2',tb))return;
var soc=$$('a.social-icon',tb).map(function(a){var u=a.querySelector('use');var n=((u&&(u.getAttribute('xlink:href')||u.getAttribute('href'))||'')+a.href).toLowerCase();var k=['instagram','tiktok','facebook','youtube'].filter(function(x){return n.indexOf(x)>-1})[0];return k?{k:k,h:a.getAttribute('href')}:null}).filter(Boolean);
var msgs=[];$$('.adbar-message',tb).forEach(function(m){var v=m.textContent.replace(/\s+/g,' ').trim();if(v&&msgs.indexOf(v)<0)msgs.push(v)});
function fmt(t){var m=t.match(/cupom\s*:?\s*["“”']?([A-Za-z0-9_-]{4,})["“”']?/i)||t.match(/["“]([A-Z0-9_-]{4,})["”]/);if(!m)return esc(t);
 var code=m[1].toUpperCase(),i=t.indexOf(m[0]),pre=t.slice(0,i)+m[0].slice(0,m[0].toUpperCase().indexOf(code)).replace(/["“”']\s*$/,''),post=t.slice(i+m[0].length);
 return esc(pre.trim())+' <button type="button" class="bh-cpn" data-c="'+esc(code)+'" aria-label="Copiar cupom '+esc(code)+'"><b>'+esc(code)+'</b><span class="bh-cpi">'+I.copy+'</span></button> '+esc(post.trim())}
var box=D.createElement('div');box.className='bh-ad2';
box.innerHTML='<div class="soc">'+soc.map(function(s){return '<a href="'+s.h+'" target="_blank" rel="noopener" aria-label="'+s.k+'">'+S[s.k]+'</a>'}).join('')+'</div><div class="msgs">'+msgs.map(function(m,i){return '<div class="msg'+(i?' off':'')+'">'+fmt(m)+'</div>'}).join('')+'</div><div></div>';
tb.appendChild(box);
$$('.bh-cpn',box).forEach(function(b){b.addEventListener('click',function(){var c=b.dataset.c;copyTxt(c);var b0=b.innerHTML;b.classList.add('ok');b.innerHTML='<b>COPIADO ✓</b>';clearTimeout(b._t);b._t=setTimeout(function(){b.classList.remove('ok');b.innerHTML=b0},1800)})});
var ms=$$('.msg',box);if(ms.length>1){var k=0;setInterval(function(){ms[k].classList.add('off');k=(k+1)%ms.length;ms[k].classList.remove('off')},5000)}
}

/* ================= BANNER INFORMATIVO ================= */
function info(){
var sec=$('.js-informative-banners-container');if(!sec||$('.bh-info',sec))return;
var IC=I;
function pick(t){var s=norm(t);return /pix/.test(s)?'pix':/parcel|cartao|credito|vezes|juros/.test(s)?'card':/cupom|desconto|off\b|promo/.test(s)?'cupom':/frete|entrega|envio|enviamos|correios|transport/.test(s)?'frete':/original|autentic|garantia|qualidade/.test(s)?'original':/segur|protegid|ssl|confian/.test(s)?'seguro':/troca|devolu/.test(s)?'troca':/presente|brinde|mimo|embala/.test(s)?'presente':'frasco'}
var its=$$('.service-item',sec).map(function(s){var t=s.querySelector('[class*="informative-banner-title"]'),dd=s.querySelector('[class*="informative-banner-description"]'),a=s.closest('a')||s.querySelector('a');return{t:t?t.textContent.trim():'',d:dd?dd.textContent.trim():'',a:a?a.getAttribute('href'):''}}).filter(function(x){return x.t||x.d});
if(!its.length)return;
var box=D.createElement('div');box.className='bh-info';
box.innerHTML='<div class="bh-itrack">'+its.map(function(x){var tg=x.a?'a':'div';return '<'+tg+' class="bh-iitem"'+(x.a?' href="'+x.a+'"':'')+'><span class="bh-iring"><span class="bh-iin">'+IC[pick(x.t+' '+x.d)]+'</span></span><span class="bh-itxt">'+(x.t?'<span class="bh-it">'+esc(x.t)+'</span>':'')+(x.d?'<span class="bh-id">'+esc(x.d)+'</span>':'')+'</span></'+tg+'>'}).join('')+'</div><div class="bh-ipag"></div>';
sec.appendChild(box);
var tr=$('.bh-itrack',box),pg=$('.bh-ipag',box);
function cols(){tr.style.gridTemplateColumns=innerWidth>991?'repeat('+its.length+',minmax(0,1fr))':''}
function upd(){var i=Math.round(tr.scrollLeft/Math.max(1,tr.clientWidth));$$('button',pg).forEach(function(b,k){b.classList.toggle('on',k===i)})}
function drawPg(){cols();var n=innerWidth<768?Math.ceil((tr.scrollWidth-4)/tr.clientWidth):0;pg.innerHTML=n>1?new Array(n+1).join('<button aria-label="Página"></button>'):'';$$('button',pg).forEach(function(b,i){b.onclick=function(){tr.scrollTo({left:i*tr.clientWidth})}});upd()}
tr.addEventListener('scroll',upd,{passive:true});addEventListener('resize',drawPg);drawPg();
}

/* ================= CARDS E COMPRA ================= */
var BAG='<svg viewBox="0 0 24 24"><path d="M5 8.4h14l-1 12.4H6z"/><path d="M9 10.6V6.6a3 3 0 0 1 6 0v4"/></svg>';
var CL='<svg class="bh-chev" viewBox="0 0 24 24"><path d="M14.5 6l-6 6 6 6"/></svg>',CR='<svg class="bh-chev" viewBox="0 0 24 24"><path d="M9.5 6l6 6-6 6"/></svg>';
function ml(t){var m=(t||'').match(/([\d.,]+)\s*ml/i);return m?parseFloat(m[1].replace(',','.')):NaN}
function vial(v,max){var h=Math.round(16+Math.min(v,max)/max*10),b=h-6.5;return '<svg viewBox="0 0 12 '+h+'" style="height:'+h+'px"><rect x="4.3" y=".6" width="3.4" height="2.4" rx=".5"/><rect x="2.2" y="4" width="7.6" height="'+b+'" rx="1.9"/><rect class="liq" x="2.9" y="'+(4+b*.38)+'" width="6.2" height="'+(b*.62-.7)+'" rx="1.3"/></svg>'}
function cards(){
$$('.js-item-product .js-item-buy-open:not([data-bh])').forEach(function(b){b.dataset.bh=1;if(!b.querySelector('svg'))b.insertAdjacentHTML('afterbegin',BAG)});
$$('.js-item-product .label-accent:not([data-bh])').forEach(function(l){l.dataset.bh=1;if(/%/.test(l.textContent))l.textContent=l.textContent.replace(/\s+/g,' ').trim()});
$$('.svg-circle.swiper-button-prev:not(.js-swiper-home-control):not([data-bh])').forEach(function(b){b.dataset.bh=1;b.innerHTML=CL});
$$('.svg-circle.swiper-button-next:not(.js-swiper-home-control):not([data-bh])').forEach(function(b){b.dataset.bh=1;b.innerHTML=CR});
$$('.js-item-product .js-item-buy-close:not([data-bh])').forEach(function(b){b.dataset.bh=1;b.innerHTML=I.x});
$$('.js-item-product .item-buy-variants select.js-variation-option:not([data-bh])').forEach(function(s){
 var vals=[].map.call(s.options,function(o){return ml(o.textContent)});if(!vals.length||vals.some(isNaN))return;
 s.dataset.bh=1;var max=Math.max.apply(null,vals);
 var w=D.createElement('span');w.className='bh-vwrap';s.parentNode.insertBefore(w,s);w.appendChild(s);
 var ic=D.createElement('span');ic.className='bh-vi';w.appendChild(ic);s.classList.add('bh-hasvi');
 function u(){var o=s.options[s.selectedIndex];ic.innerHTML=vial(ml(o&&o.textContent)||max,max);if(s.offsetHeight)ic.style.top=(s.offsetTop+s.offsetHeight/2)+'px'}
 u();s.addEventListener('change',u);w._u=u});
$$('.bh-vwrap').forEach(function(w){var s=w.querySelector('select'),i=w.querySelector('.bh-vi');if(s&&i&&s.offsetHeight)i.style.top=(s.offsetTop+s.offsetHeight/2)+'px'});
if(!W.__bhVi){W.__bhVi=1;D.addEventListener('click',function(e){if(!(e.target.closest&&e.target.closest('.js-item-buy-open')))return;[60,350,800].forEach(function(t){setTimeout(function(){$$('.bh-vwrap').forEach(function(w){w._u&&w._u()})},t)})},true)}
}
function buyFlow(){
/* só fecha o painel quando o produto entrou no carrinho; se o tema mostrar um aviso (ex.: fora de estoque), o painel fica aberto com o aviso */
function amt(){var a=$('.js-cart-widget-amount');return a?a.textContent:''}
function settle(c,before){var n=0;(function chk(){
 var al=$$('.item-buy-variants .alert',c).some(function(x){return x.offsetParent&&x.textContent.trim()});
 if(amt()!==before){setTimeout(function(){var x=c.querySelector('.js-item-buy-close');if(x&&x.getBoundingClientRect().width)x.click();setTimeout(function(){c.classList.remove('bh-single')},400)},700);return}
 if((al&&n>2)||n>16){c.classList.remove('bh-single');return}
 n++;setTimeout(chk,250)})()}
D.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.js-item-product .item-buy-variants .js-addtocart:not(.js-addtocart-placeholder)');if(!a)return;var c=a.closest('.js-product-container');if(c)settle(c,amt())},true);
/* o tema às vezes deixa o botão marcado como aberto com o painel fechado */
setInterval(function(){$$('.js-item-product .js-item-buy-open.btn-secondary').forEach(function(b){var c=b.closest('.js-product-container'),v=c&&c.querySelector('.item-buy-variants');if(v&&getComputedStyle(v).display==='none'){b.classList.remove('btn-secondary');b.classList.add('btn-primary')}})},700);
}
function swipeHint(){
$$('.swiper-container').forEach(function(s){var w=s.swiper;if(!w||s.dataset.bhswp||!s.querySelector('.js-item-product'))return;s.dataset.bhswp=1;
 var n=s.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;if(n<2)return;
 var bar=D.createElement('div');bar.className='bh-swp';bar.innerHTML='<div class="bh-swp-track"><div class="bh-swp-thumb"></div></div><div class="bh-swp-txt">Deslize para ver mais '+I.arrow+'</div>';
 s.insertAdjacentElement('afterend',bar);var th=$('.bh-swp-thumb',bar);
 function up(){var spv=typeof w.params.slidesPerView==='number'?w.params.slidesPerView:1,wd=Math.max(12,Math.min(n,spv)/n*100);th.style.width=wd+'%';th.style.left=(w.realIndex/Math.max(1,n-1))*(100-wd)+'%'}
 w.on('slideChange',up);w.on('resize',up);up()})}

/* ================= MARCAS ================= */
function brands(){
var sec=$('.section-brands-home');if(!sec||$('.bh-bwin',sec))return;
function src(i){var ss=(i.getAttribute('data-srcset')||i.getAttribute('srcset')||'').split(',').map(function(x){return x.trim().split(' ')[0]}).filter(Boolean);var u=ss.pop()||i.getAttribute('data-src')||i.src||'';return u.indexOf('//')===0?'https:'+u:u}
var logos=$$('.swiper-slide:not(.swiper-slide-duplicate) img',sec).map(function(i){var a=i.closest('a');return{u:src(i),a:i.alt,h:a?a.getAttribute('href'):''}}).filter(function(l){return l.u&&l.u.indexOf('data:')!==0});
if(!logos.length)return;
/* a logo é desenhada por um filtro SVG que vira o branco em transparente (funciona igual no iPhone, sem depender de mix-blend) */
var one=logos.map(function(l){var t=l.h?'a':'span',u=esc(l.u);return '<'+t+' class="bh-blogo"'+(l.h?' href="'+l.h+'"':'')+' aria-label="'+esc(l.a)+'"><svg viewBox="0 0 100 56" preserveAspectRatio="xMidYMid meet"><image href="'+u+'" xlink:href="'+u+'" x="0" y="0" width="100" height="56" preserveAspectRatio="xMidYMid meet" filter="url(#bh-lf)"></image></svg></'+t+'>'}).join('');
var fx=D.createElement('div');fx.innerHTML='<svg width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><filter id="bh-lf" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .17 0 0 0 0 .17 0 0 0 0 .17 -.34 -1.144 -.1155 1.52 0"></feColorMatrix></filter></svg>';sec.appendChild(fx.firstChild);
var tt=D.createElement('h2');tt.className='bh-btitle';tt.textContent='Nossas marcas';sec.appendChild(tt);var win=D.createElement('div');win.className='bh-bwin';
win.innerHTML='<div class="bh-btrack">'+one+one.replace(/<(a|span) class="bh-blogo"/g,'<$1 aria-hidden="true" class="bh-blogo"')+'</div>';
sec.appendChild(win);$('.bh-btrack',win).style.animationDuration=Math.max(24,logos.length*3.2)+'s';
}

/* ================= RODAPÉ ================= */
function footer(){
var F=$('footer');if(!F||$('.bh-foot',F))return;F.classList.add('bh-ff');
function fmtPhone(s){var d=(s||'').replace(/\D/g,'');if(d.length>11&&d.indexOf('55')===0)d=d.slice(2);if(d.length===11)return '('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);if(d.length===10)return '('+d.slice(0,2)+') '+d.slice(2,6)+'-'+d.slice(6);return s}
function fmtCNPJ(d){return d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,'$1.$2.$3/$4-$5')}
var cols=$$('.element-footer .col, .element-footer [class*="col-"]',F).filter(function(c){return c.querySelector('.footer-menu')}).map(function(c){var h=c.querySelector('h4,h3');return{t:h?h.textContent.trim():'',l:$$('.footer-menu a',c).map(function(a){return{t:a.textContent.trim(),h:a.getAttribute('href')}})}});
var cont=$$('.contact-info .contact-item',F).map(function(li){var a=li.querySelector('a'),u=li.querySelector('use'),ic=u?(u.getAttribute('xlink:href')||u.getAttribute('href')||''):'',h=a?a.getAttribute('href'):'',t=(a||li).textContent.trim();
 var k=/wa\.me|whatsapp/.test(h+ic)?'whatsapp':/^tel:|phone/.test(h+ic)?'phone':/mailto:|email/.test(h+ic)?'email':'phone';
 return{k:k,h:h,t:k==='email'?t:fmtPhone(t),lab:{whatsapp:'WhatsApp',phone:'Telefone',email:'E-mail'}[k]}});
var ci=$('.contact-info',F),cc=ci&&ci.closest('[class*="col"]'),ch=cc&&cc.querySelector('h4,h3');var contT=ch?ch.textContent.trim():'Contato';
var soc=$$('.social-icon-rounded, .element-footer a[class*="social"]',F).map(function(a){var u=a.querySelector('use');var n=((u&&(u.getAttribute('xlink:href')||u.getAttribute('href'))||'')+a.getAttribute('href')).toLowerCase();var k=['instagram','tiktok','facebook','youtube','pinterest'].filter(function(x){return n.indexOf(x)>-1})[0];return k?{k:k,h:a.getAttribute('href')}:null}).filter(Boolean);
var grp=$$('.footer-payments-shipping-logos .row',F).map(function(r){var h=r.querySelector('h4,h3');return{t:h?h.textContent.trim():'',imgs:$$('img',r).map(function(i){return{u:i.getAttribute('data-src')||i.currentSrc||i.src,a:i.alt}})}}).filter(function(g){return g.imgs.length});
var legal=$('.js-footer-legal',F),lt=legal&&legal.querySelector('.d-inline-block');var ltxt=lt?lt.textContent.replace(/\s+/g,' ').trim():'';
var cnpj=((ltxt.match(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/)||[])[0]||'').replace(/\D/g,'');
var lg=$('.logo-img');var nome=(ltxt.match(/Copyright\s+(.+?)\s+-\s+/)||[])[1]||(lg?lg.alt:'');
var ano=(ltxt.match(/(20\d{2})/)||[])[1]||new Date().getFullYear();
var nuvem=legal&&legal.querySelector('a[href*="nuvemshop"], a[href*="tiendanube"]');
var acc=$('.js-head-main a[href*="/account"]');acc=acc?acc.getAttribute('href'):'/account/';if(acc.indexOf('login')>-1||acc.indexOf('register')>-1)acc='/account/';
var box=D.createElement('div');box.className='bh-foot';
box.innerHTML='<div class="bh-fline"></div>'+
'<div class="bh-track"><div class="bh-tcard"><span class="bh-tring"><span class="bh-tin">'+I.truck+'</span></span>'+
'<div class="bh-ttxt"><small>Acompanhe sua compra</small><h3>Rastreie seu pedido</h3><p>Digite o código de rastreio que enviamos por e-mail ou o seu CPF.</p></div>'+
'<form class="bh-tform" novalidate><div class="bh-trow"><input name="bhcode" autocomplete="off" placeholder="Ex.: AA123456789BR ou CPF" aria-label="Código de rastreio ou CPF"><button type="submit">Rastrear '+I.arrow+'</button></div><div class="bh-tmsg" aria-live="polite"></div><div class="bh-tfoot"><span>Envio pelo Nuvem Envio</span><a href="'+acc+'">Ver em Meus pedidos</a></div></form></div></div>'+
'<div class="bh-fmain"><div class="bh-fbrand">'+(lg?'<a href="/"><img src="'+(lg.currentSrc||lg.src)+'" alt="'+esc(lg.alt)+'"></a>':'')+(soc.length?'<div class="bh-fsoc">'+soc.map(function(s){return '<a href="'+s.h+'" target="_blank" rel="noopener" aria-label="'+s.k+'">'+S[s.k]+'</a>'}).join('')+'</div>':'')+'</div>'+
cols.map(function(c){return '<div class="bh-fcol"><h4>'+esc(c.t)+'</h4><ul>'+c.l.map(function(l){return '<li><a href="'+l.h+'">'+esc(l.t)+'</a></li>'}).join('')+'</ul></div>'}).join('')+
(cont.length?'<div class="bh-fcol bh-fct"><h4>'+esc(contT)+'</h4>'+cont.map(function(c){return '<a href="'+c.h+'"'+(c.k==='whatsapp'?' target="_blank" rel="noopener"':'')+'><span class="ic">'+S[c.k]+'</span><span><small>'+c.lab+'</small><b>'+esc(c.t)+'</b></span></a>'}).join('')+'</div>':'')+'</div>'+
(grp.length?'<div class="bh-fpay">'+grp.map(function(g){return '<div><small>'+esc(g.t)+'</small><span class="logos">'+g.imgs.map(function(i){return '<img src="'+i.u+'" alt="'+esc(i.a)+'" loading="lazy">'}).join('')+'</span></div>'}).join('')+'</div>':'')+
'<div class="bh-flegal"><div><div class="info"><span>© '+ano+' '+esc(nome)+'</span>'+(cnpj.length===14?'<i></i><span>CNPJ '+fmtCNPJ(cnpj)+'</span>':'')+'<i></i><span>Todos os direitos reservados</span></div>'+
'<div class="cred"><a class="bh-lari" href="https://wa.me/message/IGGSZJCTRU67K1" target="_blank" rel="noopener" aria-label="Criado por Sites com a Lari, falar no WhatsApp"><small>Criado por</small><span class="lw" aria-hidden="true"></span></a>'+(nuvem?'<a class="bh-nuvem" href="'+nuvem.getAttribute('href')+'" target="_blank" rel="noopener">'+nuvem.innerHTML+'</a>':'')+'</div></div></div>';
F.appendChild(box);
/* selos personalizados do painel (imagem ou código): o rodapé nativo fica escondido, então eles vêm para o nosso */
var seals=$$('.custom-seal',F).filter(function(x){return !x.closest('.bh-foot')&&[].some.call(x.children,function(n){return !/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.tagName)})});
if(seals.length){var pay=$('.bh-fpay',box);if(!pay){pay=D.createElement('div');pay.className='bh-fpay';box.insertBefore(pay,$('.bh-flegal',box))}var sg=D.createElement('div');sg.className='bh-fseal';sg.innerHTML='<small>Selos</small><span class="logos"></span>';pay.appendChild(sg);
 seals.forEach(function(x){$$('img',x).forEach(function(i){var d=i.getAttribute('data-src');if(d){i.src=d;i.classList.remove('lazyload')}});$('.logos',sg).appendChild(x)})}
var fm=$('.bh-fmain',box);function fcols(){fm.style.gridTemplateColumns=innerWidth>991?'1.25fr '+new Array(cols.length+1).join('1fr ')+'1.3fr':''}fcols();addEventListener('resize',fcols);
var f=$('.bh-tform',box),inp=$('input',f),msg=$('.bh-tmsg',f);
f.addEventListener('submit',function(e){e.preventDefault();var raw=inp.value.trim().toUpperCase().replace(/\s+/g,'');msg.className='bh-tmsg';
 if(!raw){msg.classList.add('err');msg.textContent='Digite o código de rastreio ou o CPF.';inp.focus();return}
 var correios=/^[A-Z]{2}\d{9}[A-Z]{2}$/.test(raw),dg=raw.replace(/\D/g,'');
 copyTxt(correios?raw:(dg.length===11?dg:raw));
 if(correios){msg.textContent='Código copiado. É só colar no rastreio dos Correios que abriu.';W.open('https://rastreamento.correios.com.br/app/index.php','_blank','noopener')}
 else{msg.textContent='Copiado. Cole no Rastreaê, o rastreio oficial do Nuvem Envio.';W.open('https://rastreae.com.br/','_blank','noopener')}});
}

/* ================= GUIA DO DECANT ================= */
function guide(){
var anchor=$('section[data-store="home-products-featured"]');if(!anchor||$('.bh-gwrap'))return;
var GI={drop:'<path d="M12 3c3 4 6 7.2 6 10.5A6 6 0 0 1 6 13.5C6 10.2 9 7 12 3z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5"/>',syr:'<path d="M14 4l6 6M17 7l-9.5 9.5-3 .5.5-3L14.5 4.5M10 9l2 2M8 11l2 2M4.5 19.5l2-2"/>',spr:'<rect x="7" y="9" width="10" height="12" rx="3"/><path d="M10 9V6h4v3M14 6h3M19 4.5h.01M20.5 6h.01M19 7.5h.01"/>',hrt:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'};
var steps=[['drop','Do frasco original','Retirado do próprio perfume, com o mesmo cheiro e a mesma fixação.'],['syr','Fracionado com cuidado','Transferido com seringa e materiais higienizados.'],['spr','Frasco com borrifador','Vidro com spray, prático pra bolsa, viagem e academia.'],['hrt','Teste antes de investir','Conheça na pele antes de comprar o frasco inteiro.']];
var faq=[['O decant é original?','Sim. É uma porção retirada do frasco original do perfume. Muda só o tamanho do frasco: cheiro, fixação e qualidade são os mesmos.'],['Quantas borrifadas tem cada tamanho?','Os borrifadores de decant liberam de 0,07 a 0,1 ml a cada borrifada, dependendo do modelo e da força do toque. Por isso o decant de 5 ml rende entre 50 e 70 borrifadas, e o de 10 ml entre 100 e 140. Veja acima quanto tempo dura cada tamanho.'],['Como conservar meu decant?','Guarde longe do sol, do calor e da umidade, de preferência fora do banheiro e com a tampa fechada. Assim o perfume mantém o cheiro por muito mais tempo.'],['Por que comprar decant?','Para conhecer perfumes caros pagando pouco, variar de perfume no dia a dia e ter certeza antes de comprar o frasco completo.'],['Posso levar na viagem?','Pode. Os tamanhos de 5 e 10 ml são menores que o limite de líquidos da bagagem de mão em voos.'],['Qual o prazo de entrega?','Depende do seu CEP. Calcule o frete na página do produto ou no carrinho e veja a nossa <a href="/politica-de-envio/">Política de Entrega</a>.']];
var w=D.createElement('div');w.className='bh-gwrap';
w.innerHTML='<h2 class="bh-gh">O que é um decant?</h2><p class="bh-gsub">Perfumes incríveis, sem precisar do frasco inteiro</p><div class="bh-ggrid"><div class="bh-gcard"><div class="bh-gtabs"></div>'+
'<div class="bh-gstage"><div class="bh-gvial"><svg viewBox="0 0 96 200"><defs><linearGradient id="bhgL" x1="0" x2="1"><stop offset="0" stop-color="#E8B4AC"/><stop offset=".5" stop-color="#F2C9BB"/><stop offset="1" stop-color="#E0A79D"/></linearGradient><linearGradient id="bhgC" x1="0" x2="1"><stop offset="0" stop-color="#C98F86"/><stop offset=".5" stop-color="#F2DCC9"/><stop offset="1" stop-color="#A6635D"/></linearGradient><clipPath id="bhgK"><rect x="20" y="52" width="56" height="140" rx="18"/></clipPath></defs><g class="bh-gmist" transform="translate(62,14)"><circle cx="4" cy="6" r="2.2"/><circle cx="10" cy="2" r="1.6"/><circle cx="12" cy="9" r="1.8"/><circle cx="17" cy="5" r="1.3"/><circle cx="20" cy="11" r="1.1"/></g><rect x="38" y="6" width="20" height="20" rx="4" fill="url(#bhgC)"/><rect x="45" y="26" width="6" height="12" fill="#C98F86"/><rect x="34" y="36" width="28" height="16" rx="4" fill="url(#bhgC)"/><g clip-path="url(#bhgK)"><rect class="bh-gliq" x="20" y="120" width="56" height="80" fill="url(#bhgL)"/></g><rect class="bh-gglass" x="20" y="52" width="56" height="140" rx="18"/><path d="M30 64v100" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/></svg></div>'+
'<div><div class="bh-gbig"><span class="bh-gn"></span><small>borrifadas</small></div><div class="bh-glab">em cada frasco</div><div class="bh-gdur"><span>Dura cerca de</span><b class="bh-gd"></b></div><div class="bh-gper">usando 3 borrifadas por dia</div></div></div>'+
'<div class="bh-gfoot">Borrifadores de decant liberam de 0,07 a 0,1 ml por borrifada.</div><div class="bh-gcta"><div class="bh-gfrom"><small>Decants a partir de</small><b></b></div><a class="bh-gbtn" href="/decants/">Escolher meu decant '+I.arrow+'</a></div></div>'+
'<div class="bh-gsteps">'+steps.map(function(s){return '<div class="bh-gst"><span class="bh-gic"><svg viewBox="0 0 24 24">'+GI[s[0]]+'</svg></span><div><b>'+s[1]+'</b><span>'+s[2]+'</span></div></div>'}).join('')+'</div></div>'+
'<div class="bh-gbest"><h4>Comece pelos mais pedidos</h4><div class="bh-gbl"></div></div><div class="bh-gfaq">'+faq.map(function(q){return '<div class="bh-gq"><button type="button">'+q[0]+'<i>+</i></button><div class="bh-ga"><div><p>'+q[1]+'</p></div></div></div>'}).join('')+'</div>';
anchor.parentNode.insertBefore(w,anchor.nextSibling);
var tabs=$('.bh-gtabs',w),liq=$('.bh-gliq',w),sizes=[5,10];
function r5(x){return Math.floor(x/5)*5}
function dur(ml){var d=Math.round(ml/0.08/3);return d<10?d+' dias':d<26?Math.round(d/7)+' semanas':d<38?'1 mês':d<52?'1 mês e meio':Math.round(d/30)+' meses'}
function pos(){var b=$('.on',tabs),p=$('.bh-gpill',tabs);if(b&&p){p.style.left=b.offsetLeft+'px';p.style.top=b.offsetTop+'px';p.style.bottom='auto';p.style.height=b.offsetHeight+'px';p.style.width=b.offsetWidth+'px'}}
function upd(){var b=$('.on',tabs);if(!b)return;var ml=+b.dataset.ml,max=Math.max(10,sizes[sizes.length-1]),h=Math.round(30+Math.min(ml,max)/max*95);
 $('.bh-gn',w).innerHTML=r5(ml/0.1)+'<i>a</i>'+r5(ml/0.07);
 $('.bh-gd',w).textContent=dur(ml);
 liq.setAttribute('y',192-h);liq.setAttribute('height',h+10)}
function draw(){tabs.innerHTML='<span class="bh-gpill"></span>'+sizes.map(function(s,i){return '<button type="button" class="'+(i?'':'on')+'" data-ml="'+s+'">'+String(s).replace('.',',')+' ML</button>'}).join('');
 $$('button',tabs).forEach(function(b){b.onclick=function(){$$('button',tabs).forEach(function(x){x.classList.toggle('on',x===b)});pos();upd()}});pos();upd()}
addEventListener('resize',pos);draw();
$$('.bh-gq button',w).forEach(function(b){b.onclick=function(){var q=b.parentNode,o=!q.classList.contains('open');$$('.bh-gq',w).forEach(function(x){x.classList.remove('open')});q.classList.toggle('open',o)}});
/* preço inicial e mais pedidos: dados reais da categoria Decants */
function items(t){return $$('.js-item-product',new DOMParser().parseFromString(t,'text/html')).map(function(it){var im=$('img',it),ss=(im&&(im.getAttribute('data-srcset')||im.getAttribute('srcset'))||'').split(',').map(function(x){return x.trim().split(' ')[0]}).filter(Boolean),u=ss[Math.min(1,ss.length-1)]||'',n=$('.item-name',it),p=$('.js-price-display',it),a=$('a',it);return{n:n?n.textContent.trim():'',p:p?p.textContent.trim():'',a:a?a.getAttribute('href'):'',u:u.indexOf('//')===0?'https:'+u:u}}).filter(function(x){return x.n&&x.p&&x.a})}
var from=$('.bh-gfrom',w),bl=$('.bh-gbl',w);
fetch('/decants/?sort_by=price-ascending').then(function(r){return r.text()}).then(function(t){var l=items(t);if(l[0])$('b',from).textContent=l[0].p;else $('.bh-gcta',w).classList.add('nop')}).catch(function(){$('.bh-gcta',w).classList.add('nop')});
fetch('/decants/?sort_by=best-selling').then(function(r){return r.text()}).then(function(t){var l=items(t).slice(0,4);if(l.length<2){$('.bh-gbest',w).remove();return}bl.innerHTML=l.map(function(x){return '<a class="bh-gbi" href="'+x.a+'"><img src="'+x.u+'" alt="" loading="lazy"><div><b>'+esc(x.n.replace(/\s*\(?fracionado\)?/i,''))+'</b><em>'+esc(x.p)+'</em></div></a>'}).join('')}).catch(function(){var b=$('.bh-gbest',w);if(b)b.remove()});
/* tamanhos sincronizados com os decants cadastrados na loja (categoria /decants/), guardados na visita */
function mls(doc){var o={};$$('.js-item-product select.js-variation-option option',doc).forEach(function(op){var m=op.textContent.match(/([\d.,]+)\s*ml/i);if(m){var v=parseFloat(m[1].replace(',','.'));if(v>0&&v<=30)o[v]=1}});return Object.keys(o).map(Number).sort(function(a,b){return a-b})}
function set(l){if(l&&l.length&&l.join()!==sizes.join()){sizes=l;draw()}}
var c;try{c=JSON.parse(sessionStorage.getItem('bhMl')||'null')}catch(e){}
if(c&&c.length)set(c);else{
 fetch('/decants/').then(function(r){return r.text()}).then(function(t){var l=mls(new DOMParser().parseFromString(t,'text/html'));if(l.length){try{sessionStorage.setItem('bhMl',JSON.stringify(l))}catch(e){}set(l)}}).catch(function(){})}
}

/* ================= NEWSLETTER ================= */
function newsletter(){
var S=$('section[data-store="home-newsletter"]');if(!S||S.classList.contains('bh-nl'))return;var f=$('form',S);if(!f)return;
S.classList.add('bh-nl');var h3=$('h3',S),h2=$('h2',S),p=$('p',S),btn=$('.newsletter-btn',f)||$('[type=submit]',f),em=$('input[type=email]',f);
if(h3)h3.textContent='Clube Be Happy';if(btn&&btn.tagName==='INPUT')btn.value='Assinar';
var row=D.createElement('div');row.className='bh-nrow';f.parentNode.insertBefore(row,f);
row.innerHTML='<span class="bh-nfl"><svg viewBox="0 0 40 52"><rect x="16" y="2" width="8" height="6" rx="1.5"/><rect x="13" y="8" width="14" height="6" rx="2"/><circle cx="20" cy="33" r="16"/><path class="sh" d="M11 30a10 10 0 0 1 6-7"/></svg></span>';
[h3,h2,p].forEach(function(e){if(e)row.appendChild(e)});row.appendChild(f);
var msg=D.createElement('p');msg.className='bh-nmsg';msg.setAttribute('aria-live','polite');row.appendChild(msg);
/* envio sem recarregar: o formulário nativo (com a verificação anti-robô da Nuvemshop) envia para um quadro escondido */
var fr=D.createElement('iframe');fr.name='bh-nlf';fr.title='newsletter';fr.setAttribute('aria-hidden','true');fr.tabIndex=-1;fr.style.cssText='position:absolute;width:0;height:0;border:0;visibility:hidden';D.body.appendChild(fr);f.target='bh-nlf';var sent=0;
function setB(v){if(btn&&btn.tagName==='INPUT')btn.value=v;else if(btn)btn.textContent=v}
f.addEventListener('submit',function(){sent=1;f.classList.add('sending');setB('Enviando...');msg.className='bh-nmsg'},true);
fr.addEventListener('load',function(){if(!sent)return;sent=0;f.classList.remove('sending');var ok=false;try{ok=/[?&]shc=1/.test(fr.contentWindow.location.search)}catch(e){}
 if(ok){f.classList.add('done');setB('Inscrita ✓');if(em)em.value='';msg.textContent='Pronto! Agora você faz parte do Clube Be Happy.';msg.classList.add('show','ok')}
 else{setB('Assinar');msg.textContent='Não conseguimos confirmar o envio. Tente de novo.';msg.classList.add('show','err')}});
}


/* ================= PÁGINA DE PRODUTO ================= */
function product(){
var P=$('#single-product');if(!P||P.classList.contains('bh-pp'))return;P.classList.add('bh-pp');if(P.parentElement)P.parentElement.classList.add('bh-ppw');
var V=[];try{V=JSON.parse(P.getAttribute('data-variants')||'[]')}catch(e){}
var form=$('.js-product-form',P);if(!form)return;var sel=$('select.js-variation-option',form),btn=$('input.js-addtocart:not(.js-addtocart-placeholder)',form),name=(($('.js-product-name')||{}).textContent||'').trim();
function opt(){var a=$('.js-insta-variant.selected',form);return a?a.getAttribute('data-option'):sel?sel.value:null}
function cur(){var o=opt();return V.filter(function(v){return o==null||v.option0===o})[0]||V[0]||{}}
function ml(s){var m=String(s||'').match(/([\d.,]+)\s*ml/i);return m?parseFloat(m[1].replace(',','.')):0}
/* Pix: usa o do tema quando ligado no painel; senão o valor com desconto que a própria loja calcula */
var pix;if(!$('.js-payment-discount-price-product-container',P)){pix=D.createElement('div');pix.className='bh-ppix';var pc=$('.js-price-container',P);if(pc)pc.parentNode.insertBefore(pix,pc.nextSibling)}
/* tamanhos: botões nativos do tema, só sem o zero na frente (05 ml → 5 ML) */
function tidy(){$$('.js-insta-variant',form).forEach(function(a){var v=V.filter(function(x){return x.option0===a.getAttribute('data-option')})[0]||{};a.classList.toggle('bh-off',v.available===false);var t=$('.btn-variant-content',a);if(t){var x=t.textContent.trim().replace(/^0(\d)/,'$1');if(t.textContent!==x)t.textContent=x}})}
/* borrifadas e duração (só decant): 0,07 a 0,1 ml por borrifada, 3 borrifadas por dia */
var spr;if(V.some(function(v){var m=ml(v.option0);return m>0&&m<=30})){spr=D.createElement('div');spr.className='bh-pspr';spr.innerHTML='<svg viewBox="0 0 26 44"><rect x="9" y="1" width="8" height="5" rx="1.5" fill="#C98F86"/><rect x="11" y="6" width="4" height="4" fill="#C98F86"/><rect x="4" y="10" width="18" height="32" rx="6" fill="#fff" stroke="#E0A79D" stroke-width="1.4"/><rect class="lq" x="5" y="26" width="16" height="15" rx="5" fill="#F2C9BB"/></svg><div><b></b><span></span></div>';var vr=$('.js-product-variants',form)||form.firstChild;vr.parentNode.insertBefore(spr,vr.nextSibling)}
function r5(x){return Math.floor(x/5)*5}
function dur(m){var d=Math.round(m/0.08/3);return d<10?d+' dias':d<26?Math.round(d/7)+' semanas':d<38?'1 mês':d<52?'1 mês e meio':Math.round(d/30)+' meses'}
/* esgotado: avisar pelo WhatsApp da loja */
var wa=$('a[href*="wa.me/"]'),warn;wa=wa&&wa.href.split('?')[0];if(wa&&btn){warn=D.createElement('a');warn.className='bh-pwa';warn.target='_blank';warn.rel='noopener';warn.textContent='Avise-me quando chegar';btn.parentNode.appendChild(warn)}
/* barra fixa de compra (celular) */
var bar=D.createElement('div'),im=$('.js-product-slide-img');bar.className='bh-pbar';bar.innerHTML='<img alt=""><div class="bh-pbt"><b></b><span></span></div><button type="button">Comprar</button>';$('b',bar).textContent=name.replace(/\s*\(fracionado\)/i,'');D.body.appendChild(bar);
$('button',bar).onclick=function(){if(!btn||btn.disabled){(btn||form).scrollIntoView({behavior:'smooth',block:'center'});return}btn.click()};
function upd(){var v=cur(),m=ml(v.option0),ok=v.available!==false;tidy();
 if(pix)pix.innerHTML=v.price_with_payment_discount_short&&v.price_with_payment_discount_short!==v.price_short?'<b>'+v.price_with_payment_discount_short+'</b> no Pix':'';
 if(spr){spr.style.display=m?'':'none';$('b',spr).innerHTML=r5(m/0.1)+'<i>a</i>'+r5(m/0.07)+' borrifadas';$('span',spr).textContent='Dura cerca de '+dur(m)+' usando 3 borrifadas por dia';var h=Math.round(6+Math.min(m,10)/10*24);$('.lq',spr).setAttribute('y',41-h);$('.lq',spr).setAttribute('height',h)}
 if(warn){warn.style.display=ok?'none':'';warn.href=wa+'?text='+encodeURIComponent('Oi! Me avisa quando chegar: '+name+(v.option0?' ('+v.option0+')':''))}
 var u=v.image_url||(im&&(im.currentSrc||im.src))||'';$('img',bar).src=u.indexOf('//')===0?'https:'+u:u;$('span',bar).textContent=(v.option0?v.option0.replace(/^0(\d)/,'$1')+' · ':'')+(v.price_short||'');$('button',bar).textContent=ok?'Comprar':'Esgotado';bar.classList.toggle('na',!ok)}
/* fotos: moldura na proporção da 1ª foto, todas do mesmo tamanho e sem cortar */
var l0=$('.js-swiper-product .js-product-slide-link'),pb=l0&&parseFloat(l0.style.paddingBottom);if(pb){var st=D.createElement('style');st.textContent='#single-product .js-swiper-product .js-product-slide-link,#single-product .js-product-thumb{padding-bottom:'+pb+'%!important}';D.head.appendChild(st)}
var n=0,t=setInterval(function(){var el=$('.js-swiper-product'),sw=el&&el.swiper;if(sw){clearInterval(t);if(innerWidth<768){sw.params.slidesPerView=1;sw.params.centeredSlides=false;sw.params.spaceBetween=0}sw.update();sw.slideTo(sw.activeIndex,0)}else if(++n>20)clearInterval(t)},150);
/* descrição em aba na coluna de compra */
var desc=$('.mt-4.mt-md-1',P);if(desc&&desc.textContent.trim()){var acc=D.createElement('div');acc.className='bh-pacc';acc.innerHTML='<div class="bh-pai open"><button type="button">Sobre o perfume<i></i></button><div class="bh-pab"></div></div>';form.parentNode.insertBefore(acc,form.nextSibling);$('.bh-pab',acc).appendChild(desc);$('.bh-pai>button',acc).onclick=function(){this.parentNode.classList.toggle('open')}}
form.addEventListener('click',function(e){if(e.target.closest('.js-insta-variant'))setTimeout(upd,60)});if(sel)sel.addEventListener('change',function(){setTimeout(upd,30)});upd();
if(btn&&window.IntersectionObserver)new IntersectionObserver(function(e){bar.classList.toggle('show',!e[0].isIntersecting&&e[0].boundingClientRect.top<0)}).observe(btn);
}

/* ================= INÍCIO ================= */
function run(){
try{header()}catch(e){}
try{topbar()}catch(e){}
try{info()}catch(e){}
try{brands()}catch(e){}
try{footer()}catch(e){}
try{guide()}catch(e){}
try{newsletter()}catch(e){}
try{product()}catch(e){}
try{cards();buyFlow();obs(cards)}catch(e){}
var t=0,iv=setInterval(function(){try{swipeHint();cards()}catch(e){}if(++t>20)clearInterval(iv)},500);
requestAnimationFrame(function(){D.documentElement.classList.add('bh-ok')});
}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',run);else run();
})();
