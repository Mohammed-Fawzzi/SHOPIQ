import{b as c,j as e,a as m}from"./index-DWlfa0Ll.js";import{u as d,a as p}from"./useProducts-B69Ih1qv.js";import{S as x}from"./index-DjYYOHfU.js";import{a as u,b as j}from"./UseCart-C9gejBoq.js";import{H as h}from"./Helmet-DDM1bIVb.js";import"./axios-C8DqakIB.js";import"./useQuery-E7aE_l22.js";import"./utils-Dji2qSVF.js";import"./useMutation-XAyMZQ25.js";function C(){let{mutate:r}=u(j),{id:i}=c(),{data:s,isLoading:t,isError:l,error:a}=d("productDetails",()=>p(i));if(t)return e.jsx(m,{});if(l)return e.jsx("h2",{children:a.message});const o={dots:!0,infinite:!0,autoplay:!0,arrows:!1,speed:300,slidesToShow:1,slidesToScroll:1};return e.jsxs(e.Fragment,{children:[e.jsxs(h,{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("title",{children:"Product Details"})]}),e.jsx("div",{className:"container py-5",children:e.jsxs("div",{className:"row align-items-center my-4 p-5",children:[e.jsx("div",{className:"col-md-4",children:e.jsx(x,{...o,children:s==null?void 0:s.images.map(n=>e.jsx("img",{src:n,alt:s==null?void 0:s.title,className:"w-100"},s._id))})}),e.jsxs("div",{className:"col-md-8 p-3",children:[e.jsx("h3",{className:"text-main",children:s==null?void 0:s.title.split(" ").slice(0,3).join(" ")}),e.jsx("p",{className:"py-3",children:s==null?void 0:s.description}),e.jsxs("div",{className:"d-flex justify-content-between mt-1",children:[e.jsxs("span",{className:"text-main fw-bold",children:[s==null?void 0:s.price," EGP"]}),e.jsx("span",{className:"fas fa-star rating-color",children:s==null?void 0:s.ratingsAverage})]}),e.jsx("button",{className:"btn bg-main text-white w-100 btn-sm mt-3",onClick:()=>{r(s._id)},children:"Add to Cart"})]})]})})]})}export{C as default};
