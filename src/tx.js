module.exports=function(s){
 const id='[A-Za-z_$][\\w$]*';
 s=s.replace(new RegExp('('+id+'(?:\\.'+id+')*)\\.classList\\.','g'),'__C($1).');
 s=s.replace(new RegExp('('+id+')\\.getAttribute\\(','g'),'__G($1,');
 s=s.replace(new RegExp('('+id+')\\.querySelector\\((\'[^\']*\'|"[^"]*")\\)','g'),'$($2,$1)');
 s=s.replace(new RegExp('('+id+')\\.textContent\\.trim\\(\\)','g'),'__T($1)');
 s=s.replace(new RegExp('('+id+')\\.addEventListener\\(','g'),'__O($1,');
 s=s.replace(/(^|[;{}\s(])addEventListener\(/gm,'$1__O(W,');
 s=s.replace(/D\.createElement\(/g,'__E(');
 s=s.replace("var D=document,W=window;","var D=document,W=window;function __C(e){return e.classList}function __G(e,a){return e.getAttribute(a)}function __T(e){return e.textContent.trim()}function __O(e,t,f,o){e.addEventListener(t,f,o)}function __E(t){return D.createElement(t)}");
 return s};
