import axios from "axios";
import { useQuery } from "react-query";

// Get Featured Products with Pagination
export function getFeaturedProducts(page = 1, limit = 12) {
  const url = `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}&sort=-price`;
  return axios.get(url);
}

// Get Product Details
export function getProductDetails(productId) {
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );
}

// Re-Use Function With Any Products
export function useProducts(key, fetchFunction, page, limit, keyword) {
  return useQuery(
    [key, page, limit, keyword],
    () => fetchFunction(page, limit, keyword),
    {
      select: (data) => data.data.data,
      keepPreviousData: true,
    }
  );
}
