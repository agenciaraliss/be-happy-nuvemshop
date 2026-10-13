const fs=require('fs'),path=require('path'),postcss=require('postcss'),csso=require('csso'),{minify}=require('terser');
const R=p=>path.join(__dirname,p);
const enc=s=>'data:image/svg+xml,'+s.replace(/"/g,"'").replace(/%/g,'%25').replace(/#/g,'%23').replace(/\s+/g,' ').replace(/> </g,'><');
const lariSrc=fs.readFileSync(R('src/lari-watermark.txt'),'utf8');
const lari=lariSrc.match(/url\("(data:image\/svg\+xml,[^"]+)"\)/)[1].replace(/fill='%232b2b2b'/,"fill='%23F2DCC9'");
const A={
 __DOTS__:enc(`<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='3' cy='3' r='1.4' fill='#A6635D' fill-opacity='.13'/></svg>`),
 __ORN__:enc(`<svg xmlns='http://www.w3.org/2000/svg' width='150' height='16' viewBox='0 0 150 16'><defs><linearGradient id='l' gradientUnits='userSpaceOnUse' x1='2' x2='62' y1='0' y2='0'><stop offset='0' stop-color='#A6635D' stop-opacity='0'/><stop offset='1' stop-color='#A6635D'/></linearGradient><linearGradient id='r' gradientUnits='userSpaceOnUse' x1='148' x2='88' y1='0' y2='0'><stop offset='0' stop-color='#A6635D' stop-opacity='0'/><stop offset='1' stop-color='#A6635D'/></linearGradient></defs><path d='M2 9.6h60' stroke='url(#l)'/><path d='M88 9.6h60' stroke='url(#r)'/><g fill='none' stroke='#A6635D'><rect x='73.4' y='1' width='3.2' height='2.6'/><circle cx='75' cy='9.6' r='5'/></g></svg>`),
 __ORNSM__:enc(`<svg xmlns='http://www.w3.org/2000/svg' width='90' height='12' viewBox='0 0 90 12'><defs><linearGradient id='l' gradientUnits='userSpaceOnUse' x1='2' x2='38' y1='0' y2='0'><stop offset='0' stop-color='#A6635D' stop-opacity='0'/><stop offset='1' stop-color='#A6635D' stop-opacity='.8'/></linearGradient><linearGradient id='r' gradientUnits='userSpaceOnUse' x1='88' x2='52' y1='0' y2='0'><stop offset='0' stop-color='#A6635D' stop-opacity='0'/><stop offset='1' stop-color='#A6635D' stop-opacity='.8'/></linearGradient></defs><path d='M2 7.2h36' stroke='url(#l)'/><path d='M52 7.2h36' stroke='url(#r)'/><g fill='none' stroke='#A6635D' stroke-width='.9'><rect x='43.8' y='.8' width='2.4' height='2'/><circle cx='45' cy='7.2' r='3.7'/></g></svg>`),
 __BAG__:enc(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M5 8.4h14l-1 12.4H6z'/><path d='M9 10.6V6.6a3 3 0 0 1 6 0v4'/></svg>`),
 __LARI__:lari};
let css=fs.readFileSync(R('src/style.css'),'utf8');
const ICONS=require('./src/icons.js');
A.__ICONS__=Object.keys(ICONS).map(n=>'.bhi-'+n+'{mask-image:url("'+enc("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='red' stroke-width='1.3' stroke-linecap='round'>"+ICONS[n].replace(/"/g,"'").replace(/#000/g,'red')+'</svg>')+'")}').join('\n');
for(const k in A)css=css.split(k).join(A[k]);
// propriedades que o campo de CSS do painel Nuvemshop apaga (medido em outras lojas) ou que não foram medidas e são arriscadas
const BAD=p=>/^--/.test(p)||/^-webkit-/.test(p)||/^(fill|fill-opacity|stroke|stroke-width|stroke-linecap|stroke-linejoin|background-clip|aspect-ratio|inset|clip-path|filter|backdrop-filter|translate|container-type|font-stretch|font-variation-settings|overscroll-behavior|overscroll-behavior-x|overscroll-behavior-y|scroll-behavior)$/.test(p)||/^scroll-snap/.test(p)||/^scrollbar-/.test(p);
const BADVAL=(p,v)=>(/^background$/.test(p)&&/(padding-box|border-box)/.test(v))||/\b(min|max|clamp)\(|\d(cqw|cqh|cqi|cqb)\b|#[0-9a-fA-F]{4}\b|#[0-9a-fA-F]{8}\b|-webkit-box/.test(v);
const BADSEL=s=>/::-webkit-/.test(s)||/:has\(/.test(s)||/\[style/.test(s);
const MOVE=r=>/^\.bhi-[\w-]+$/.test(r.selector)||/lari/.test(r.selector)&&/data:image/.test(r.toString());
css=css.replace(/bh-/g,'h_');
const root=postcss.parse(csso.minify(css,{restructure:false}).css),fix=postcss.root();
// @supports inteiro vai pro rodapé (o painel apaga)
root.walkAtRules('supports',a=>{const c=a.clone();a.remove();fix.append(c)});
const moved=new Set();const key=(r,d)=>r.selector+'|'+d.prop;
root.walkRules(rule=>{
 if(BADSEL(rule.selector)||MOVE(rule)){const c=rule.clone();rule.remove();attach(c,rule);return}
 const bad=[];rule.walkDecls(d=>{if(BAD(d.prop)||BADVAL(d.prop,d.value)||moved.has(key(rule,d))){bad.push(d);moved.add(key(rule,d))}});
 if(!bad.length)return;
 const nr=postcss.rule({selector:rule.selector});bad.forEach(d=>{nr.append(d.clone());d.remove()});
 attach(nr,rule);if(!rule.nodes.length)rule.remove();
});
function attach(nr,orig){let p=orig.parent,chain=[];while(p&&p.type==='atrule'){chain.unshift(p);p=p.parent}
 let target=fix;for(const at of chain){let ex=target.nodes.find(n=>n.type==='atrule'&&n.name===at.name&&n.params===at.params&&n.__last);if(!ex||target.last!==ex){ex=postcss.atRule({name:at.name,params:at.params});ex.__last=1;target.append(ex)}target=ex}
 target.append(nr)}
const mainCss=root.toString().replace(/\s*\n\s*/g,'');
fix.walkDecls(d=>{if(/padding-box/.test(d.value))d.important=true});
// junta regras do rodapé com o mesmo conteúdo (na posição da última, para não mudar a ordem de prioridade)
{const by={};fix.each(r=>{if(r.type!=='rule')return;const k=r.nodes.map(String).join(';');(by[k]=by[k]||[]).push(r)});
 Object.values(by).forEach(a=>{if(a.length<2)return;const last=a[a.length-1];last.selector=a.map(r=>r.selector).join(',');a.slice(0,-1).forEach(r=>r.remove())})}
const fixCss=csso.minify(fix.toString(),{restructure:true}).css;
(async()=>{
 const js=(await minify(require('./src/tx.js')(fs.readFileSync(R('src/app.js'),'utf8').replace(/bh-/g,'h_')),{ecma:2020,toplevel:true,compress:{passes:3,arrows:true,unsafe_arrows:true,unsafe:true,unsafe_methods:true,ecma:2020},mangle:{toplevel:true},format:{comments:false,ecma:2020}})).code;
 // rodapé comprimido: CSS do rodapé + script vão compactados (deflate) e um descompactador pequeno (tiny-inflate) abre tudo no navegador
 const z0=require('zlib');const payload=Buffer.from(fixCss+'\u0000'+js,'utf8');const b64=z0.deflateRawSync(payload,{level:9}).toString('base64');
 const inf=fs.readFileSync(require.resolve('tiny-inflate'),'utf8').replace('module.exports = tinf_uncompress;','return tinf_uncompress;');
 const loader=(await minify('(function(){var U=(function(){'+inf+'})();var b=atob("'+b64+'"),a=new Uint8Array(b.length);for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);var t=new TextDecoder().decode(U(a,new Uint8Array('+payload.length+'))),k=t.indexOf("\u0000"),d=document,s=d.createElement("style");s.textContent=t.slice(0,k);d.head.appendChild(s);var e=d.createElement("script");e.textContent=t.slice(k+1);d.body.appendChild(e)})()',{ecma:2015,toplevel:true,compress:{passes:3},mangle:{toplevel:true},format:{comments:false}})).code;
 const html='<script>'+loader+'</script>';
 fs.writeFileSync(R('dist/be-happy-rodape-legivel.html'),'<style>'+fixCss+'</style><script>'+js+'</script>');
 fs.writeFileSync(R('dist/be-happy.min.css'),mainCss);
 fs.writeFileSync(R('dist/be-happy-rodape.html'),html);
 // versão para carregar por link (jsDelivr): injeta o CSS do rodapé e roda o script
 fs.writeFileSync(R('dist/be-happy.js'),'!function(){var s=document.createElement("style");s.textContent='+JSON.stringify(fixCss)+';document.head.appendChild(s)}();\n'+js);
 const z=require('zlib');
 console.log('CSS painel  :',mainCss.length,'bytes  gzip',z.gzipSync(mainCss).length);
 console.log('HTML rodapé :',html.length,'bytes  (style',fixCss.length,'+ script',js.length,')  gzip',z.gzipSync(html).length);
 // checagem: nada proibido sobrou no CSS do painel
 const left=[];postcss.parse(mainCss).walkDecls(d=>{if(BAD(d.prop)||BADVAL(d.prop,d.value))left.push(d.prop)});
 console.log('proibidas no CSS do painel:',left.length?left:'nenhuma');
 console.log('var( no CSS do painel:',(mainCss.match(/var\(/g)||[]).length);
})();
