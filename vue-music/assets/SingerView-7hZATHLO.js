import{p as x,q as _,v as G,a as g,x as L,o as p,c as v,i as e,y as I,d as u,w as b,z as O,b as s,t as r,A as P,e as R,s as J,r as B,B as H,h as K}from"./index-xpF7dIu9.js";import{_ as Q}from"./MusicList-57iRDOC5.js";const U=l=>x.get("artist/detail",{params:{id:l}}),W=l=>x.get("artist/follow/count",{params:{id:l}}),X=l=>x.get("artist/top/song",{params:{id:l}}),tt={class:"tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-z-10"},et={class:"tw-relative tw-h-full"},st={key:0,class:"tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover"},ot={class:""},at={class:"tw-bg-white tw-shadow-lg tw-border-solid tw-border-2 tw-border-black tw-border-opacity-15 tw-z-10 tw-flex tw-flex-nowrap tw-flex-col tw-items-center tw-rounded-xl tw-mx-3 tw-py-4 tw-mb-3 -tw-mt-10 tw-bg-opacity-90"},lt={class:"tw-text-2xl tw-font-medium"},nt={class:"tw-text-sm"},it={class:"tw-text-base"},ct=e("span",{class:"tw-text-sm"},"粉丝",-1),rt={class:"tw-max-w-72 tw-truncate"},wt={class:"tw-bg-white tw-pr-2 tw-pl-4 tw-rounded-2xl tw-pb-64"},dt="正在载入...",ut=48,_t={__name:"SingerView",setup(l){let w=0,m=0;const y=_(null),f=_(0),d=_(""),N=G(),{id:h}=N.params,{data:n,pending:$}=g(()=>U(h).then(t=>t.data.data),{}),{data:j}=g(()=>W(h).then(t=>t.data.data),{}),{data:E,pending:mt}=g(()=>X(h).then(t=>t.data.songs),[]);L(()=>{w=y.value.clientHeight,m=w-ut});const M=()=>{const t=f.value;let c="80%",i=0,a=0;t>m&&(a=1);let o=1;return t<0&&(o=1+Math.abs(t/w)),{paddingTop:c,height:i,transform:`scale(${o})translateZ(${a})`}},Y=()=>{var a,o;const t=f.value;let c="white",i="";return d.value="",t>m&&(d.value=(o=(a=n.value)==null?void 0:a.artist)==null?void 0:o.name,c="black",i="white"),{color:c,backgroundColor:i}},Z=()=>({top:`${w}px`}),q=()=>history.back(),F=t=>{f.value=-t.y+40};return(t,c)=>{var o,S;const i=B("lazy"),a=B("loading");return p(),v("div",tt,[e("div",et,[e("div",{class:"tw-flex tw-rounded-b-2xl tw-justify-between tw-items-center tw-absolute tw-z-50 tw-top-0 tw-left-0 tw-w-full tw-h-12 tw-text-white tw-transition-all tw-ease-in-out tw-duration-1000",style:I(Y())},[u(H,{size:"30",elevation:"0",icon:"mdi-chevron-left",onClick:q,class:"tw-text-xl tw-ml-2"}),b(e("span",{class:"tw-text-lg"},r(s(d)),513),[[O,s(d)]]),u(H,{size:"25",elevation:"0",icon:"mdi-dots-vertical",class:"tw-mr-3"})],4),e("div",{ref_key:"bgImg",ref:y,style:I(M()),class:"tw-relative tw-w-full tw-origin-top tw-bg-cover"},[(o=s(n).artist)!=null&&o.cover?b((p(),v("img",st,null,512)),[[i,(S=s(n).artist)==null?void 0:S.cover]]):P("",!0)],4),u(J,{class:"tw-absolute tw-botom-0 tw-w-full tw-z-0 tw-h-full",style:Z,"probe-type":3,onScroll:F},{default:R(()=>{var k,z,T,C,D,V,A;return[b((p(),v("div",ot,[e("div",at,[e("div",lt,r((z=(k=s(n))==null?void 0:k.artist)==null?void 0:z.name),1),e("div",nt,r((C=(T=s(n))==null?void 0:T.artist)==null?void 0:C.alias[0]),1),e("div",it,[K(r((D=s(j))==null?void 0:D.fansCnt)+" ",1),ct]),e("div",rt,r((A=(V=s(n))==null?void 0:V.identify)==null?void 0:A.imageDesc),1)]),e("div",wt,[u(Q,{songs:s(E)},null,8,["songs"])])])),[[a,s($),dt]])]}),_:1})])])}}};export{_t as default};