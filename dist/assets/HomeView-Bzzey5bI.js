import{r as I,o as W,n as $,a as Q,w as X,b as Y,c as Z,u as ee,d as r,e as O,f as y,g as te,t as x,h as E,i as b,j as ne,k as oe,l as ae,m as D,p as se,B as T,q as le,s as ce,v as re,x as ie,y as ue,z as de,A as fe,C as U,D as me,E as he,P as ge,F as j,G as Be,H as pe,I as we,J as ve,K as be,L as A,M as Ce,N as _e,O as m,Q as ye,R as ke,S as N,T as Se,U as xe,V as Te,W as Pe,X as Ie,_ as Oe}from"./index-BZ8vh948.js";import{m as Ee,u as Re,s as S}from"./function-call-DhZZEI5G.js";const $e=(e,n)=>{const t=I(),o=()=>{t.value=ee(e).height};return W(()=>{if($(o),n)for(let l=1;l<=3;l++)setTimeout(o,100*l)}),Q(()=>$(o)),X([Y,Z],o),t};function De(e,n){const t=$e(e,!0);return o=>r("div",{class:n("placeholder"),style:{height:t.value?`${t.value}px`:void 0}},[o()])}const[K,H]=O("action-bar"),L=Symbol(K),je={placeholder:Boolean,safeAreaInsetBottom:x};var Ae=y({name:K,props:je,setup(e,{slots:n}){const t=I(),o=De(t,H),{linkChildren:l}=te(L);l();const d=()=>{var u;return r("div",{ref:t,class:[H(),{"van-safe-area-bottom":e.safeAreaInsetBottom}]},[(u=n.default)==null?void 0:u.call(n)])};return()=>e.placeholder?o(d):d()}});const Ne=E(Ae),[He,Fe]=O("action-bar-button"),qe=b({},ne,{type:String,text:String,icon:String,color:String,loading:Boolean,disabled:Boolean});var Ue=y({name:He,props:qe,setup(e,{slots:n}){const t=oe(),{parent:o,index:l}=ae(L),d=D(()=>{if(o){const c=o.children[l.value-1];return!(c&&"isButton"in c)}}),u=D(()=>{if(o){const c=o.children[l.value+1];return!(c&&"isButton"in c)}});return se({isButton:!0}),()=>{const{type:c,icon:i,text:B,color:s,loading:h,disabled:v}=e;return r(T,{class:Fe([c,{last:u.value,first:d.value}]),size:"large",type:c,icon:i,color:s,loading:h,disabled:v,onClick:t},{default:()=>[n.default?n.default():B]})}}});const F=E(Ue),[Ke,g,_]=O("dialog"),Le=b({},le,{title:String,theme:String,width:ce,message:[String,Function],callback:Function,allowHtml:Boolean,className:re,transition:ie("van-dialog-bounce"),messageAlign:String,closeOnPopstate:x,showCancelButton:Boolean,cancelButtonText:String,cancelButtonColor:String,cancelButtonDisabled:Boolean,confirmButtonText:String,confirmButtonColor:String,confirmButtonDisabled:Boolean,showConfirmButton:x,closeOnClickOverlay:Boolean}),Ve=[...ue,"transition","closeOnPopstate"];var V=y({name:Ke,props:Le,emits:["confirm","cancel","keydown","update:show"],setup(e,{emit:n,slots:t}){const o=I(),l=de({confirm:!1,cancel:!1}),d=a=>n("update:show",a),u=a=>{var f;d(!1),(f=e.callback)==null||f.call(e,a)},c=a=>()=>{e.show&&(n(a),e.beforeClose?(l[a]=!0,ve(e.beforeClose,{args:[a],done(){u(a),l[a]=!1},canceled(){l[a]=!1}})):u(a))},i=c("cancel"),B=c("confirm"),s=fe(a=>{var f,p;if(a.target!==((p=(f=o.value)==null?void 0:f.popupRef)==null?void 0:p.value))return;({Enter:e.showConfirmButton?B:j,Escape:e.showCancelButton?i:j})[a.key](),n("keydown",a)},["enter","esc"]),h=()=>{const a=t.title?t.title():e.title;if(a)return r("div",{class:g("header",{isolated:!e.message&&!t.default})},[a])},v=a=>{const{message:f,allowHtml:p,messageAlign:w}=e,C=g("message",{"has-title":a,[w]:w}),k=Be(f)?f():f;return p&&typeof k=="string"?r("div",{class:C,innerHTML:k},null):r("div",{class:C},[k])},J=()=>{if(t.default)return r("div",{class:g("content")},[t.default()]);const{title:a,message:f,allowHtml:p}=e;if(f){const w=!!(a||t.title);return r("div",{key:p?1:0,class:g("content",{isolated:!w})},[v(w)])}},z=()=>r("div",{class:[we,g("footer")]},[e.showCancelButton&&r(T,{size:"large",text:e.cancelButtonText||_("cancel"),class:g("cancel"),style:{color:e.cancelButtonColor},loading:l.cancel,disabled:e.cancelButtonDisabled,onClick:i},null),e.showConfirmButton&&r(T,{size:"large",text:e.confirmButtonText||_("confirm"),class:[g("confirm"),{[pe]:e.showCancelButton}],style:{color:e.confirmButtonColor},loading:l.confirm,disabled:e.confirmButtonDisabled,onClick:B},null)]),M=()=>r(Ne,{class:g("footer")},{default:()=>[e.showCancelButton&&r(F,{type:"warning",text:e.cancelButtonText||_("cancel"),class:g("cancel"),color:e.cancelButtonColor,loading:l.cancel,disabled:e.cancelButtonDisabled,onClick:i},null),e.showConfirmButton&&r(F,{type:"danger",text:e.confirmButtonText||_("confirm"),class:g("confirm"),color:e.confirmButtonColor,loading:l.confirm,disabled:e.confirmButtonDisabled,onClick:B},null)]}),G=()=>t.footer?t.footer():e.theme==="round-button"?M():z();return()=>{const{width:a,title:f,theme:p,message:w,className:C}=e;return r(ge,U({ref:o,role:"dialog",class:[g([p]),C],style:{width:he(a)},tabindex:0,"aria-labelledby":f||w,onKeydown:s,"onUpdate:show":d},me(e,Ve)),{default:()=>[h(),J(),G()]})}}});let P;const Je={title:"",width:"",theme:null,message:"",overlay:!0,callback:null,teleport:"body",className:"",allowHtml:!1,lockScroll:!0,transition:void 0,beforeClose:null,overlayClass:"",overlayStyle:void 0,messageAlign:"",cancelButtonText:"",cancelButtonColor:null,cancelButtonDisabled:!1,confirmButtonText:"",confirmButtonColor:null,confirmButtonDisabled:!1,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!0,closeOnClickOverlay:!1};let ze=b({},Je);function Me(){({instance:P}=Ee({setup(){const{state:n,toggle:t}=Re();return()=>r(V,U(n,{"onUpdate:show":t}),null)}}))}function Ge(e){return be?new Promise((n,t)=>{P||Me(),P.open(b({},ze,e,{callback:o=>{(o==="confirm"?n:t)(o)}}))}):Promise.resolve(void 0)}const We=e=>Ge(b({showCancelButton:!0},e));E(V);const Qe="https://api.movecoding.cn";async function q(e,n,t,o={},l=!1,d="application/json",u={}){n=Qe+n;const c={...u};let i={method:"GET",headers:{"Content-Type":"application/json"}},B=n;if(e==="GET"){if(o){const s=Object.entries(o).map(([h,v])=>`${encodeURIComponent(h)}=${encodeURIComponent(v)}`).join("&");B=`${n}?${s}`}i={method:e,...c}}else e==="POST"&&(i={method:e,headers:{"Content-Type":d,...c.headers},body:d==="application/json"?JSON.stringify(t):t,...c});if(l){if(!i||typeof i!="object")throw new Error("Invalid request object");i.headers||(i.headers={});const s=[["Content-Type","application/json"],["Authorization","Bearer "+localStorage.getItem("token")]];i.headers=s}try{const s=await fetch(B,i);if(console.log("response",s),!s.ok){s.status===404&&S("服务器连接失败!"),s.status===500&&S("服务器内部错误!");const h=await s.json();throw S(h),new Error(`请求失败: ${s.status} ${s.statusText}. 错误详情: ${h}`)}if(s.ok){const h=d==="application/json"?await s.json():await s.text();return h.status==-1&&We({title:"提示",message:"登录失效",confirmButtonText:"重新登录",cancelButtonText:"退出"}).then(()=>{localStorage.clear(),A.replace("/")}).catch(()=>{A.replace("/")}),h}return s}catch(s){throw console.error("请求发生错误:",s),s}}const Xe={post(e,n,t=!1){return q("POST",e,n,{},t)},get(e,n,t=!1){return q("GET",e,"",n,t)}},Ye=e=>Xe.post("/api/logout",e,!0),Ze=""+new URL("head-BJcNVnE9.png",import.meta.url).href,R=e=>(Pe("data-v-53f27c56"),e=e(),Ie(),e),et={class:"header"},tt={class:"name"},nt=["src"],ot={class:"card_box"},at=R(()=>m("div",{class:"title"},"工具",-1)),st={class:"item-box"},lt=R(()=>m("div",{class:"name"},"解密",-1)),ct=R(()=>m("div",{class:"name"},"二维码",-1)),rt=y({__name:"HomeView",setup(e){const{push:n,replace:t}=xe(),o=localStorage.getItem("userId"),l=u=>{switch(u){case"jiemiJson":window.open("/jiemiJson","_blank");break;case"qrcode":window.open("/qrcode","_blank");break}},d=()=>{Ye({userId:o}).then(u=>{console.log("res",u),u.status==200&&(localStorage.removeItem("token"),localStorage.removeItem("userId"),t("/"))})};return(u,c)=>{const i=Te("van-icon");return Ce(),_e(Se,null,[m("div",et,[m("div",tt,[ye(ke(N(o))+" ",1),m("img",{class:"img",src:N(Ze),alt:""},null,8,nt),m("ul",{class:"op_box"},[m("li",{class:"op_item",onClick:d},"退出登录")])])]),m("main",null,[m("div",ot,[at,m("div",st,[m("div",{class:"item",onClick:c[0]||(c[0]=B=>l("jiemiJson"))},[r(i,{name:"gift"}),lt]),m("div",{class:"item",onClick:c[1]||(c[1]=B=>l("qrcode"))},[r(i,{name:"qr"}),ct])])])])],64)}}}),dt=Oe(rt,[["__scopeId","data-v-53f27c56"]]);export{dt as default};
