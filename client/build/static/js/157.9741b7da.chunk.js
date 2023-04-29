"use strict";(self.webpackChunkdentoconnect=self.webpackChunkdentoconnect||[]).push([[157],{35878:function(e,n,t){var s=t(72791);n.Z=()=>{const e=(0,s.useRef)(!0);return(0,s.useEffect)((()=>()=>{e.current=!1}),[]),e}},98393:function(e,n,t){var s=t(53767),r=t(4567),i=t(65469),o=t(80184);n.Z=()=>(0,o.jsxs)(s.Z,{direction:"row",justifyContent:"space-between",children:[(0,o.jsx)(r.Z,{variant:"subtitle2",component:i.Z,href:"https://dentoconect.io",target:"_blank",underline:"hover",children:"dentoconect.io"}),(0,o.jsx)(r.Z,{variant:"subtitle2",component:i.Z,href:"https://codemaster.com",target:"_blank",underline:"hover",children:"\xa9 codemaster.com"})]})},95256:function(e,n,t){t.d(n,{i:function(){return s}});const s=(e,n)=>{localStorage.setItem(e,n)}},37813:function(e,n,t){var s=t(64554),r=t(23735),i=t(80184);n.Z=e=>{let{children:n,...t}=e;return(0,i.jsx)(r.Z,{sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1,...t,children:(0,i.jsx)(s.Z,{sx:{p:{xs:2,sm:3,xl:5}},children:n})})}},92745:function(e,n,t){const s=(0,t(66934).ZP)("div")((e=>{let{theme:n}=e;return{backgroundColor:n.palette.primary.light,minHeight:"100vh"}}));n.Z=s},98157:function(e,n,t){t.r(n),t.d(n,{default:function(){return H}});var s=t(43504),r=t(13967),i=t(95193),o=t(81153),a=t(53767),l=t(4567),c=t(94721),d=t(92745),m=t(37813),u=t(72791),h=t(16871),x=t(75985),j=t(45363),Z=t(62861),p=t(77196),g=t(30035),b=t(97808),f=t(90977),w=t(25801),v=t(13034),P=t(64554),y=t(5849),k=t(81724),C=t(76872),S=t(35878),I=t(50752),B=t(3746),E=t(20165),_=t(30640),D=t(95256),W=t(80184);var q=e=>{let{...n}=e;const t=(0,r.Z)(),s=(0,h.s0)(),i=(0,S.Z)(),[o,c]=(0,u.useState)(!0),[d,m]=(0,u.useState)(!1),q=()=>{m(!d)},A=e=>{e.preventDefault()};return(0,W.jsx)(W.Fragment,{children:(0,W.jsx)(C.J9,{initialValues:{email:"dento@connect.com",password:"123456",submit:null},validationSchema:k.Ry().shape({email:k.Z_().email("Must be a valid email").max(255).required("Email is required"),password:k.Z_().max(255).required("Password is required")}),onSubmit:async(e,n)=>{let{setErrors:t,setStatus:r,setSubmitting:o}=n;try{i.current&&(r({success:!0}),o(!1),(e=>{(0,_.iL)(e).then((e=>{(0,D.i)("userId",e.data._id),(0,D.i)("fullName",e.data.fullName),(0,D.i)("dento-token",e.data.access_token),s("/main/calendar")})).catch((e=>x.Am.error(e.response.data)))})(e))}catch(a){console.error(a),i.current&&(r({success:!1}),t({submit:a.message}),o(!1))}},children:e=>{let{errors:s,handleBlur:r,handleChange:i,handleSubmit:m,isSubmitting:u,touched:h,values:x}=e;return(0,W.jsxs)("form",{noValidate:!0,onSubmit:m,...n,children:[(0,W.jsxs)(j.Z,{fullWidth:!0,error:Boolean(h.email&&s.email),sx:{...t.typography.customInput},children:[(0,W.jsx)(Z.Z,{htmlFor:"outlined-adornment-email-login",children:"Email"}),(0,W.jsx)(p.Z,{id:"outlined-adornment-email-login",type:"email",value:x.email,name:"email",onBlur:r,onChange:i,label:"Email Address / Username",inputProps:{}}),h.email&&s.email&&(0,W.jsx)(g.Z,{error:!0,id:"standard-weight-helper-text-email-login",children:s.email})]}),(0,W.jsxs)(j.Z,{fullWidth:!0,error:Boolean(h.password&&s.password),sx:{...t.typography.customInput},children:[(0,W.jsx)(Z.Z,{htmlFor:"outlined-adornment-password-login",children:"Passwort"}),(0,W.jsx)(p.Z,{id:"outlined-adornment-password-login",type:d?"text":"password",value:x.password,name:"password",onBlur:r,onChange:i,endAdornment:(0,W.jsx)(b.Z,{position:"end",children:(0,W.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:q,onMouseDown:A,edge:"end",size:"large",children:d?(0,W.jsx)(B.Z,{}):(0,W.jsx)(E.Z,{})})}),label:"Password",inputProps:{}}),h.password&&s.password&&(0,W.jsx)(g.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:s.password})]}),(0,W.jsxs)(a.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:[(0,W.jsx)(w.Z,{control:(0,W.jsx)(v.Z,{checked:o,onChange:e=>c(e.target.checked),name:"checked",color:"success"}),label:"Mich erinnern"}),(0,W.jsx)(l.Z,{variant:"subtitle1",color:t.palette.success.green,sx:{textDecoration:"none",cursor:"pointer"},children:"Passwort vergessen?"})]}),s.submit&&(0,W.jsx)(P.Z,{sx:{mt:3},children:(0,W.jsx)(g.Z,{error:!0,children:s.submit})}),(0,W.jsx)(P.Z,{sx:{mt:2},children:(0,W.jsx)(I.Z,{children:(0,W.jsx)(y.Z,{disableElevation:!0,disabled:u,fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{backgroundColor:t.palette.success.green},children:"Login"})})})]})}})})},A=t(98393),F=t(74427);var H=()=>{const e=(0,r.Z)(),n=(0,i.Z)(e.breakpoints.down("md"));return(0,W.jsx)(d.Z,{children:(0,W.jsxs)(o.ZP,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:(0,W.jsx)(o.ZP,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:(0,W.jsx)(m.Z,{children:(0,W.jsxs)(o.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[(0,W.jsx)(o.ZP,{item:!0,sx:{mb:3},children:(0,W.jsx)(s.rU,{to:"#",children:(0,W.jsx)("img",{src:F,alt:"",style:{width:"20%"}})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:(0,W.jsx)(o.ZP,{item:!0,children:(0,W.jsx)(a.Z,{alignItems:"center",justifyContent:"center",spacing:1,children:(0,W.jsx)(l.Z,{color:e.palette.success.green,gutterBottom:!0,variant:n?"h3":"h2",children:"Willkommen bei Dentoconect"})})})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(q,{})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(c.Z,{})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:(0,W.jsx)(l.Z,{component:s.rU,to:"/auth/signup",variant:"subtitle1",sx:{textDecoration:"none"},children:"Sie haben kein Konto?"})})})]})})})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,sx:{m:3,mt:1},children:(0,W.jsx)(A.Z,{})})]})})}}}]);
//# sourceMappingURL=157.9741b7da.chunk.js.map