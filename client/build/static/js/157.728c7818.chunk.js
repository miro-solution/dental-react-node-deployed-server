"use strict";(self.webpackChunkdentoconnect=self.webpackChunkdentoconnect||[]).push([[157],{5177:function(e,n,t){var s=t(2791);n.Z=()=>{const e=(0,s.useRef)(!0);return(0,s.useEffect)((()=>()=>{e.current=!1}),[]),e}},8393:function(e,n,t){var s=t(3767),r=t(890),i=t(43),o=t(184);n.Z=()=>(0,o.jsxs)(s.Z,{direction:"row",justifyContent:"space-between",children:[(0,o.jsx)(r.Z,{variant:"subtitle2",component:i.Z,href:"https://dentoconect.io",target:"_blank",underline:"hover",children:"dentoconect.io"}),(0,o.jsx)(r.Z,{variant:"subtitle2",component:i.Z,href:"https://codemaster.com",target:"_blank",underline:"hover",children:"\xa9 codemaster.com"})]})},5256:function(e,n,t){t.d(n,{i:function(){return s}});const s=(e,n)=>{localStorage.setItem(e,n)}},7813:function(e,n,t){var s=t(4554),r=t(6999),i=t(184);n.Z=e=>{let{children:n,...t}=e;return(0,i.jsx)(r.Z,{sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1,...t,children:(0,i.jsx)(s.Z,{sx:{p:{xs:2,sm:3,xl:5}},children:n})})}},2745:function(e,n,t){const s=(0,t(6934).ZP)("div")((e=>{let{theme:n}=e;return{backgroundColor:n.palette.primary.light,minHeight:"100vh"}}));n.Z=s},8157:function(e,n,t){t.r(n),t.d(n,{default:function(){return H}});var s=t(3504),r=t(3967),i=t(5193),o=t(1889),a=t(3767),l=t(890),c=t(4721),d=t(2745),m=t(7813),u=t(2791),h=t(6871),x=t(5985),j=t(8096),Z=t(4925),p=t(8029),g=t(7071),b=t(3466),f=t(3400),w=t(5523),v=t(9174),P=t(4554),y=t(6151),k=t(1724),C=t(6872),S=t(5177),I=t(752),B=t(3746),E=t(165),_=t(640),D=t(5256),W=t(184);var q=e=>{let{...n}=e;const t=(0,r.Z)(),s=(0,h.s0)(),i=(0,S.Z)(),[o,c]=(0,u.useState)(!0),[d,m]=(0,u.useState)(!1),q=()=>{m(!d)},A=e=>{e.preventDefault()};return(0,W.jsx)(W.Fragment,{children:(0,W.jsx)(C.J9,{initialValues:{email:"dento@connect.com",password:"123456",submit:null},validationSchema:k.Ry().shape({email:k.Z_().email("Must be a valid email").max(255).required("Email is required"),password:k.Z_().max(255).required("Password is required")}),onSubmit:async(e,n)=>{let{setErrors:t,setStatus:r,setSubmitting:o}=n;try{i.current&&(r({success:!0}),o(!1),(e=>{(0,_.iL)(e).then((e=>{(0,D.i)("userId",e.data._id),(0,D.i)("fullName",e.data.fullName),(0,D.i)("token",e.data.access_token),s("/main/calendar")})).catch((e=>x.Am.error(e.response.data)))})(e))}catch(a){console.error(a),i.current&&(r({success:!1}),t({submit:a.message}),o(!1))}},children:e=>{let{errors:s,handleBlur:r,handleChange:i,handleSubmit:m,isSubmitting:u,touched:h,values:x}=e;return(0,W.jsxs)("form",{noValidate:!0,onSubmit:m,...n,children:[(0,W.jsxs)(j.Z,{fullWidth:!0,error:Boolean(h.email&&s.email),sx:{...t.typography.customInput},children:[(0,W.jsx)(Z.Z,{htmlFor:"outlined-adornment-email-login",children:"Email"}),(0,W.jsx)(p.Z,{id:"outlined-adornment-email-login",type:"email",value:x.email,name:"email",onBlur:r,onChange:i,label:"Email Address / Username",inputProps:{}}),h.email&&s.email&&(0,W.jsx)(g.Z,{error:!0,id:"standard-weight-helper-text-email-login",children:s.email})]}),(0,W.jsxs)(j.Z,{fullWidth:!0,error:Boolean(h.password&&s.password),sx:{...t.typography.customInput},children:[(0,W.jsx)(Z.Z,{htmlFor:"outlined-adornment-password-login",children:"Passwort"}),(0,W.jsx)(p.Z,{id:"outlined-adornment-password-login",type:d?"text":"password",value:x.password,name:"password",onBlur:r,onChange:i,endAdornment:(0,W.jsx)(b.Z,{position:"end",children:(0,W.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:q,onMouseDown:A,edge:"end",size:"large",children:d?(0,W.jsx)(B.Z,{}):(0,W.jsx)(E.Z,{})})}),label:"Password",inputProps:{}}),h.password&&s.password&&(0,W.jsx)(g.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:s.password})]}),(0,W.jsxs)(a.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:[(0,W.jsx)(w.Z,{control:(0,W.jsx)(v.Z,{checked:o,onChange:e=>c(e.target.checked),name:"checked",color:"success"}),label:"Mich erinnern"}),(0,W.jsx)(l.Z,{variant:"subtitle1",color:t.palette.success.green,sx:{textDecoration:"none",cursor:"pointer"},children:"Passwort vergessen?"})]}),s.submit&&(0,W.jsx)(P.Z,{sx:{mt:3},children:(0,W.jsx)(g.Z,{error:!0,children:s.submit})}),(0,W.jsx)(P.Z,{sx:{mt:2},children:(0,W.jsx)(I.Z,{children:(0,W.jsx)(y.Z,{disableElevation:!0,disabled:u,fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{backgroundColor:t.palette.success.green},children:"Login"})})})]})}})})},A=t(8393),F=t(4427);var H=()=>{const e=(0,r.Z)(),n=(0,i.Z)(e.breakpoints.down("md"));return(0,W.jsx)(d.Z,{children:(0,W.jsxs)(o.ZP,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:(0,W.jsx)(o.ZP,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:(0,W.jsx)(m.Z,{children:(0,W.jsxs)(o.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[(0,W.jsx)(o.ZP,{item:!0,sx:{mb:3},children:(0,W.jsx)(s.rU,{to:"#",children:(0,W.jsx)("img",{src:F,alt:"",style:{width:"20%"}})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:(0,W.jsx)(o.ZP,{item:!0,children:(0,W.jsx)(a.Z,{alignItems:"center",justifyContent:"center",spacing:1,children:(0,W.jsx)(l.Z,{color:e.palette.success.green,gutterBottom:!0,variant:n?"h3":"h2",children:"Willkommen bei Dentoconect"})})})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(q,{})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(c.Z,{})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:(0,W.jsx)(l.Z,{component:s.rU,to:"/auth/signup",variant:"subtitle1",sx:{textDecoration:"none"},children:"Sie haben kein Konto?"})})})]})})})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,sx:{m:3,mt:1},children:(0,W.jsx)(A.Z,{})})]})})}}}]);
//# sourceMappingURL=157.728c7818.chunk.js.map