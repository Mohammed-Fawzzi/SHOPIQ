import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function getToken() {
  return localStorage.getItem("userToken");
}

// Add product to wishlist
export function getWishList(productId) {
  return axios.post(
    `${baseUrl}/wishlist`,
    {
      productId: productId,
    },
    {
      headers: {
        token: getToken(),
      },
    }
  );
}

// Get logged user wishlist
export function getLoggedWishList() {
  const token = getToken();
  if (!token) {
    return Promise.resolve([]);
  }
  return axios.get(`${baseUrl}/wishlist`, {
    headers: {
      token,
    },
  });
}

// Remove product from wishlist
export function removeWishListProduct(productId) {
  return axios.delete(`${baseUrl}/wishlist/${productId}`, {
    headers: {
      token: getToken(),
    },
  });
}

// Use Wish List
export function useWishList(Function) {
  const queryClient = useQueryClient();
  return useMutation(
    Function,
    {
      onSuccess: (data) => {
        toast.success(data?.data?.message);
        queryClient.invalidateQueries("wishlist");
      },
    },
    {
      onError: (data) => {
        toast.error(data.message);
      },
    }
  );
}

// Use Wish List
export function useWishListOperators(Key, Function) {
  return useQuery(Key, Function, {
    refetchOnWindowFocus: false,
    cacheTime: 10 * (60 * 1000),
    staleTime: 20000,
  });
}
