import{a as r}from"./axios-C8DqakIB.js";import"./index-DWlfa0Ll.js";import{u as s}from"./useQuery-E7aE_l22.js";function i(){return r.get("https://ecommerce.routemisr.com/api/v1/products?sort=-price")}function m(t){return r.get(`https://ecommerce.routemisr.com/api/v1/products/${t}`)}function p(t,e){return s(t,e,{select:o=>o.data.data})}export{m as a,i as g,p as u};