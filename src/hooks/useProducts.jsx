import axios from "axios";
import { useQuery } from "react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Get Featured Products with Pagination
export function getFeaturedProducts(page = 1, limit = 12) {
  const url = `${baseUrl}/products?limit=${limit}&page=${page}&sort=-price`;
  return axios.get(url);
}

// Get Product Details
export function getProductDetails(productId) {
  return axios.get(`${baseUrl}/products/${productId}`);
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
