import axios from "axios"
import toast from "react-hot-toast";
import {useMutation, useQuery, useQueryClient } from "react-query";

// Base url And Token 
const baseUrl = `https://ecommerce.routemisr.com/api/v1`
const token = localStorage.getItem('userToken');

// Post Wish List Data
export function getWishList(productId) {
    return axios.post(`${baseUrl}/wishlist` , {
        productId : productId
    }, {
        headers : {
            token : token
        }
    }
    )
}

// Get logged user wishlist 
export function getLoggedWishList() {
    return axios.get(`${baseUrl}/wishlist` , {
        headers : {
            token : token
        }
    })
}

// Remove product from wishlist
export function removeWishListProduct(productId) {
    return axios.delete(`${baseUrl}/wishlist/${productId}` , {
        headers : {
            token : token
        }
    })
}

// Use Wish List
export function useWishList(Function) {
    const queryClient = useQueryClient();
    return useMutation(Function , {
        onSuccess : (data) => {
            toast.success(data?.data?.message);
            // Invalidate and refetch - [Follow Query Key]
            queryClient.invalidateQueries('wishlist')
        }
    } , {
        onError : (data) => {
            toast.error(data.message);
        }
    }
)
}

// Use Wish List
export function useWishListOperators(Key , Function) {
    return useQuery(Key , Function , {
        refetchOnWindowFocus:false,
        cacheTime:10*(60*1000),
        staleTime:20000
    })
}
