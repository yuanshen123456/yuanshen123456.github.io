import{d as p,o as u,c as v,a as e,b as g,t as h,u as l,e as d,F as f,f as I,L as k,r as b,p as w,g as x,_ as S}from"./index-DGuuekQQ.js";const V="/assets/head-BJcNVnE9.png",a=o=>(w("data-v-53f27c56"),o=o(),x(),o),C={class:"header"},q={class:"name"},B=["src"],J={class:"card_box"},N=a(()=>e("div",{class:"title"},"工具",-1)),j={class:"item-box"},F=a(()=>e("div",{class:"name"},"解密",-1)),E=a(()=>e("div",{class:"name"},"二维码",-1)),H=p({__name:"HomeView",setup(o){const{push:L,replace:r}=I(),n=localStorage.getItem("userId"),c=s=>{switch(s){case"jiemiJson":window.open("/jiemiJson","_blank");break;case"qrcode":window.open("/qrcode","_blank");break}},_=()=>{k({userId:n}).then(s=>{console.log("res",s),s.status==200&&(localStorage.removeItem("token"),localStorage.removeItem("userId"),r("/"))})};return(s,t)=>{const i=b("van-icon");return u(),v(f,null,[e("div",C,[e("div",q,[g(h(l(n))+" ",1),e("img",{class:"img",src:l(V),alt:""},null,8,B),e("ul",{class:"op_box"},[e("li",{class:"op_item",onClick:_},"退出登录")])])]),e("main",null,[e("div",J,[N,e("div",j,[e("div",{class:"item",onClick:t[0]||(t[0]=m=>c("jiemiJson"))},[d(i,{name:"gift"}),F]),e("div",{class:"item",onClick:t[1]||(t[1]=m=>c("qrcode"))},[d(i,{name:"qr"}),E])])])])],64)}}}),y=S(H,[["__scopeId","data-v-53f27c56"]]);export{y as default};
