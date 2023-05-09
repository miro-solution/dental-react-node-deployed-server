"use strict";(self.webpackChunkdentoconnect=self.webpackChunkdentoconnect||[]).push([[157],{35878:function(e,n,t){var s=t(72791);n.Z=()=>{const e=(0,s.useRef)(!0);return(0,s.useEffect)((()=>()=>{e.current=!1}),[]),e}},98393:function(e,n,t){var s=t(53767),r=t(4567),i=t(65469),o=t(80184);n.Z=()=>(0,o.jsxs)(s.Z,{direction:"row",justifyContent:"space-between",children:[(0,o.jsx)(r.Z,{variant:"subtitle2",component:i.Z,href:"https://dentoconect.io",target:"_blank",underline:"hover",children:"dentoconect.io"}),(0,o.jsx)(r.Z,{variant:"subtitle2",component:i.Z,href:"https://codemaster.com",target:"_blank",underline:"hover",children:"\xa9 codemaster.com"})]})},95256:function(e,n,t){t.d(n,{i:function(){return s}});const s=(e,n)=>{localStorage.setItem(e,n)}},37813:function(e,n,t){var s=t(64554),r=t(23735),i=t(80184);n.Z=e=>{let{children:n,...t}=e;return(0,i.jsx)(r.Z,{sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1,...t,children:(0,i.jsx)(s.Z,{sx:{p:{xs:2,sm:3,xl:5}},children:n})})}},92745:function(e,n,t){const s=(0,t(66934).ZP)("div")((e=>{let{theme:n}=e;return{backgroundColor:n.palette.primary.light,minHeight:"100vh"}}));n.Z=s},98157:function(e,n,t){t.r(n),t.d(n,{default:function(){return A}});var s=t(43504),r=t(13967),i=t(95193),o=t(81153),a=t(53767),l=t(4567),c=t(94721),d=t(92745),m=t(37813),u=t(72791),h=t(59434),x=t(16871),Z=t(75985),j=t(45363),p=t(62861),g=t(77196),f=t(30035),b=t(97808),v=t(90977),w=t(25801),y=t(13034),P=t(64554),C=t(5849),k=t(81724),I=t(76872),S=t(35878),z=t(50752),M=t(69673),B=t(3746),E=t(20165),_=t(30640),D=t(95256),W=t(80184);var q=e=>{let{...n}=e;const t=(0,h.I0)(),i=(0,r.Z)(),o=(0,x.s0)(),c=(0,S.Z)(),[d,m]=(0,u.useState)(!0),[q,U]=(0,u.useState)(!1),V=()=>{U(!q)},A=e=>{e.preventDefault()};return(0,W.jsx)(W.Fragment,{children:(0,W.jsx)(I.J9,{initialValues:{email:"dento@connect.com",password:"123456",submit:null},validationSchema:k.Ry().shape({email:k.Z_().email("Must be a valid email").max(255).required("Email is required"),password:k.Z_().max(255).required("Password is required")}),onSubmit:async(e,n)=>{let{setErrors:s,setStatus:r,setSubmitting:i}=n;try{c.current&&(r({success:!0}),i(!1),(e=>{(0,_.iL)(e).then((e=>{(0,D.i)("userId",e.data._id),(0,D.i)("fullName",e.data.fullName),(0,D.i)("dento-token",e.data.access_token),o("/main/calendar")})).catch((e=>Z.Am.error(e.response.data))),t({type:M.YY,id:"page-calendar"})})(e))}catch(a){console.error(a),c.current&&(r({success:!1}),s({submit:a.message}),i(!1))}},children:e=>{let{errors:t,handleBlur:r,handleChange:o,handleSubmit:c,isSubmitting:u,touched:h,values:x}=e;return(0,W.jsxs)("form",{noValidate:!0,onSubmit:c,...n,children:[(0,W.jsxs)(j.Z,{fullWidth:!0,error:Boolean(h.email&&t.email),sx:{...i.typography.customInput},children:[(0,W.jsx)(p.Z,{htmlFor:"outlined-adornment-email-login",children:"Email"}),(0,W.jsx)(g.Z,{id:"outlined-adornment-email-login",type:"email",value:x.email,name:"email",onBlur:r,onChange:o,label:"Email Address / Username",inputProps:{}}),h.email&&t.email&&(0,W.jsx)(f.Z,{error:!0,id:"standard-weight-helper-text-email-login",children:t.email})]}),(0,W.jsxs)(j.Z,{fullWidth:!0,error:Boolean(h.password&&t.password),sx:{...i.typography.customInput},children:[(0,W.jsx)(p.Z,{htmlFor:"outlined-adornment-password-login",children:"Passwort"}),(0,W.jsx)(g.Z,{id:"outlined-adornment-password-login",type:q?"text":"password",value:x.password,name:"password",onBlur:r,onChange:o,endAdornment:(0,W.jsx)(b.Z,{position:"end",children:(0,W.jsx)(v.Z,{"aria-label":"toggle password visibility",onClick:V,onMouseDown:A,edge:"end",size:"large",children:q?(0,W.jsx)(B.Z,{}):(0,W.jsx)(E.Z,{})})}),label:"Password",inputProps:{}}),h.password&&t.password&&(0,W.jsx)(f.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:t.password})]}),(0,W.jsxs)(a.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:[(0,W.jsx)(w.Z,{control:(0,W.jsx)(y.Z,{checked:d,onChange:e=>m(e.target.checked),name:"checked",color:"success"}),label:"Mich erinnern"}),(0,W.jsx)(l.Z,{component:s.rU,to:"/auth/forget-password",variant:"subtitle1",color:i.palette.success.green,sx:{textDecoration:"none",cursor:"pointer"},children:"Passwort vergessen?"})]}),t.submit&&(0,W.jsx)(P.Z,{sx:{mt:3},children:(0,W.jsx)(f.Z,{error:!0,children:t.submit})}),(0,W.jsx)(P.Z,{sx:{mt:2},children:(0,W.jsx)(z.Z,{children:(0,W.jsx)(C.Z,{disableElevation:!0,disabled:u,fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{backgroundColor:i.palette.success.green},children:"Login"})})})]})}})})},U=t(98393),V=t(74427);var A=()=>{const e=(0,r.Z)(),n=(0,i.Z)(e.breakpoints.down("md"));return(0,W.jsx)(d.Z,{children:(0,W.jsxs)(o.ZP,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:(0,W.jsx)(o.ZP,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:(0,W.jsx)(m.Z,{children:(0,W.jsxs)(o.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[(0,W.jsx)(o.ZP,{item:!0,sx:{mb:3},children:(0,W.jsx)(s.rU,{to:"#",children:(0,W.jsx)("img",{src:V,alt:"",style:{width:"20%"}})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:(0,W.jsx)(o.ZP,{item:!0,children:(0,W.jsx)(a.Z,{alignItems:"center",justifyContent:"center",spacing:1,children:(0,W.jsx)(l.Z,{color:e.palette.success.green,gutterBottom:!0,variant:n?"h3":"h2",children:"Willkommen bei Dentoconect"})})})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(q,{})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(c.Z,{})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,children:(0,W.jsx)(o.ZP,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:(0,W.jsx)(l.Z,{component:s.rU,to:"/auth/signup",variant:"subtitle1",sx:{textDecoration:"none"},children:"Sie haben kein Konto?"})})})]})})})})}),(0,W.jsx)(o.ZP,{item:!0,xs:12,sx:{m:3,mt:1},children:(0,W.jsx)(U.Z,{})})]})})}},3746:function(e,n,t){var s=t(91941);n.Z=void 0;var r=s(t(45649)),i=t(80184),o=(0,r.default)((0,i.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");n.Z=o},20165:function(e,n,t){var s=t(91941);n.Z=void 0;var r=s(t(45649)),i=t(80184),o=(0,r.default)((0,i.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");n.Z=o}}]);
//# sourceMappingURL=157.5458bd8d.chunk.js.map