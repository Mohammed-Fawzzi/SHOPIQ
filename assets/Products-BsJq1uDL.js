import{r as h,j as r,a as f,$ as u}from"./index-DCph1kaS.js";import{u as x,g}from"./useProducts-DRqCXBXY.js";import{P as i}from"./Product-Cq_DoLIW.js";import{H as j}from"./Helmet-CarTsjNy.js";import"./axios-C8DqakIB.js";import"./useQuery-Dnss0eGy.js";import"./utils-Dji2qSVF.js";import"./UseCart-Br2M5CY1.js";import"./useMutation-BlpPpatx.js";import"./useWishList-CZZn6KYe.js";function $(){const[a,o]=h.useState([]);function c(s){let n=s.target.value,p=e==null?void 0:e.filter(t=>t==null?void 0:t.title.toLowerCase().trim().includes(n.toLowerCase().trim()));o(p)}let{data:e,isLoading:l,isError:m,error:d}=x("FeaturedProducts",g);return l?r.jsx(f,{}):m?r.jsx("h2",{children:d.message}):r.jsxs(r.Fragment,{children:[r.jsxs(j,{children:[r.jsx("meta",{charSet:"utf-8"}),r.jsx("title",{children:"Products"})]}),r.jsxs("div",{className:"container py-5",children:[r.jsxs("div",{className:"my-5 py-3",children:[r.jsxs("div",{className:"bg-main-light d-flex align-items-center mb-4 p-2 product-search shadow-sm",children:[r.jsx(u,{visible:!0,height:"40",width:"50",ariaLabel:"magnifying-glass-loading",wrapperClass:"magnifying-glass-wrapper",glassColor:"#fff",color:"#007bff"}),r.jsx("h5",{className:"ms-2 text-main",children:"Search in products"})]}),r.jsx("input",{type:"text",className:"form-control w-100",onChange:c,placeholder:"Search...."})]}),r.jsx("div",{className:"row gy-4 mb-5",children:a.length?a.map(s=>r.jsx(i,{product:s},s._id)):e==null?void 0:e.map(s=>r.jsx(i,{product:s},s._id))})]})]})}export{$ as default};