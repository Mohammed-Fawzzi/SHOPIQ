import axios from "axios";
import { useQuery } from "react-query";

// Get Feature Products
export function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?sort=-price`)
}

// Get Product Details 
export function getProductDetails(productId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
}

// Re-Use Function With Any Products
export function useProducts(key, fetchFunction) {
    return useQuery(key, fetchFunction, {
        select: (data) => data.data.data,
    });
}
