import{u as d,r as u,j as e,f as h,_ as o}from"./index-DCph1kaS.js";import{a as f}from"./axios-C8DqakIB.js";import{c as p,a as x,u as g}from"./index.esm-wpmMS6xZ.js";import{u as b}from"./useMutation-BlpPpatx.js";import{H as j}from"./Helmet-CarTsjNy.js";import"./utils-Dji2qSVF.js";function F(){const l=d(),[t,r]=u.useState(!1);function m(s){return r(!0),f.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",s)}let{mutate:n}=b(m,{onSuccess:s=>{var i;o.success((i=s==null?void 0:s.data)==null?void 0:i.message),l("/verifyCode"),r(!1)},onError:s=>{o.error(s==null?void 0:s.message),r(!1)}});const c=p({email:x().email().required("Email is required")});let a=g({initialValues:{email:""},validationSchema:c,onSubmit:s=>{n(s)}});return e.jsxs(e.Fragment,{children:[e.jsxs(j,{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("title",{children:"Forget Password"})]}),e.jsxs("div",{className:"container mt-5 py-5",children:[e.jsx("h3",{className:"mt-3 text-main fw-bold",children:"Forget Password :"}),e.jsxs("form",{onSubmit:a.handleSubmit,className:"py-5",children:[e.jsx("label",{htmlFor:"email",className:"py-2",children:"Enter your email address :"}),e.jsx("input",{className:"form-control mt-2",type:"email",id:"email",placeholder:"Email",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.email,name:"email"}),a.errors.email&&a.touched.email?e.jsx("div",{className:"alert alert-danger p-2 mt-3",children:a.errors.email}):"",e.jsxs("button",{disabled:!(a.isValid&&a.dirty)||t,type:"submit",className:"btn bg-main text-white mt-3",children:[" ",t?e.jsx(h,{height:"25",width:"50",color:"#fff",ariaLabel:"bars-loading",visible:!0}):"Send Code"]})]})]})]})}export{F as default};