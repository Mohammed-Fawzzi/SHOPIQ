import axios from "axios"
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Base url And Token 
const baseUrl = `https://ecommerce.routemisr.com/api/v1`
const token = localStorage.getItem('userToken');

// Add Cart Data
export function addToCart(productId) {
    return axios.post(`${baseUrl}/cart` , {
        productId : productId
    },{
        headers : {
            token : token
        }
    })
}

// Display Cart Data
export function getLoggedUserCart() {
    return axios.get(`${baseUrl}/cart` , {
        headers : {
            token : token
        }
    })
}

// Remove Data From Cart
export function removeFromCart(productId) {
    return axios.delete(`${baseUrl}/cart/${productId}` , {
        headers : {
            token : token
        }
    })
}
// Clear Cart From Cart
export function clearCart() {
    return axios.delete(`${baseUrl}/cart` , {
        headers : {
            token : token
        }
    })
}


// Update Data From Cart
export function updateCart({productId , count}) {
    return axios.put(`${baseUrl}/cart/${productId}` , {
        count : count
        },{
        headers : {
            token : token
        }
    })
}

//checkout
export function checkOut({productId , shippingAddress}) {
    return axios.post(`${baseUrl}/orders/checkout-session/${productId}?url=http://localhost:3000`, { shippingAddress }, {
        headers: {
            token : token
        }
    })
}


// Use Cart Data With Mutate
export function useCartProducts(Function) {
    // Access the client
    const queryClient = useQueryClient();
    return useMutation(Function , {
        onSuccess : (data) => {
            toast.success(data?.data?.message);
            // Invalidate and refetch - [Follow Query Key]
            if (Function !== clearCart) {
                queryClient.invalidateQueries('LoggedProduct');
            } else {
                // Clear cart data in cache if clearing the cart
                queryClient.setQueryData('LoggedProduct', null);
            }
        }
    },{
        onError : (data) => {
            toast.error(data.message);
        }
    }
    );
}

// Use Cart Data With Query
export function useCartOperators(key , Function) {
    return useQuery(key , Function)
}
