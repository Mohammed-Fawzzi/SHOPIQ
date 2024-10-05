import React from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import {
  getLoggedWishList,
  removeWishListProduct,
  useWishList,
  useWishListOperators,
} from "../../useWishList";
import { addToCart, useCartProducts } from "../../UseCart";
import image from "../../assets/empty_wishlist.webp";

export default function WishList() {
  // Display In Wish List
  let { data, isLoading, isError, error } = useWishListOperators(
    "wishlist",
    getLoggedWishList
  );

  // Add Wish List Product To Cart
  let { mutate: cartMutate } = useCartProducts(addToCart);

  // Remove From Wish List
  let { mutate } = useWishList(removeWishListProduct);

  // Check on Loading
  if (isLoading) {
    return <Loading />;
  }
  // Check on Error
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish List</title>
      </Helmet>

      {/* Content */}
      <div className="container my-5 py-5">
        {data?.data?.data.length > 0 ? (
          <>
            <h3 className="py-2 text-main fw-bold">My Wish List</h3>
            <p className="fw-bold">Wish List items : {data?.data?.count}</p>
            {data?.data?.data?.map((product) => (
              <div className="row border-bottom border-top" key={product.id}>
                <div className="col-md-2 py-4">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-100"
                    height={150}
                    loading="lazy"
                  />
                </div>

                <div className="col-md-10 py-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="fw-bold">{product.category.name}</p>
                      <p className="text-main fw-bold">{product.price} EGP</p>
                    </div>
                    <div className="py-3">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => cartMutate(product.id)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>

                  <span
                    className="fw-bold cursor-pointer"
                    onClick={() => mutate(product.id)}
                  >
                    <i className="text-danger fas fa-trash-can"></i> Remove
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="row d-flex justify-content-center align-items-center my-5">
            <img
              src={image}
              alt="empty"
              className="empty-wishlist"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </>
  );
}
