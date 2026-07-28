import React from "react";
import { Link } from "react-router-dom";
import { addToCart, useCartProducts } from "@/hooks/useCart";
import {
  getLoggedWishList,
  getWishList,
  removeWishListProduct,
  useWishList,
  useWishListOperators,
} from "@/hooks/useWishList";

export default function Product({ product }) {
  let { mutate } = useCartProducts(addToCart);
  let { mutate: addWishList } = useWishList(getWishList);
  let { mutate: removeWishList } = useWishList(removeWishListProduct);
  let { data: wishListData } = useWishListOperators(
    "wishlist",
    getLoggedWishList
  );

  const wishListItems = wishListData?.data?.data || [];
  const isInWishList = wishListItems.some(
    (item) => item._id === product._id || item.id === product._id
  );

  function toggleWishList() {
    if (isInWishList) {
      removeWishList(product._id);
    } else {
      addWishList(product._id);
    }
  }

  return (
    <>
      <div key={product._id} className="col-md-4">
        <div className="product cursor-pointer p-3">
          <i
            className={`fa-heart fa-2x product-heart ${
              isInWishList
                ? "fa-solid is-active"
                : "fa-regular text-main"
            }`}
            onClick={toggleWishList}
            role="button"
            aria-label={isInWishList ? "Remove from wishlist" : "Add to wishlist"}
          ></i>
          <Link to={`/productDetails/${product._id}`}>
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-100 mb-3"
              height={300}
              loading="lazy"
            />
            <span className="text-main fw-bold">{product.category.name}</span>
            <h6 className="py-2 font-sm product-title">
              {product.title.split(" ").slice(0, 3).join(" ")}
            </h6>
            <h6 className="pb-2 font-md product-description text-main">
              {product.description.split(" ").slice(0, 5).join(" ")}
            </h6>
            <div className="d-flex justify-content-between mt-1">
              <span className="font-md fw-bold">{product.price} EGP</span>
              <span className="fas fa-star rating-color">
                {product.ratingsAverage}
              </span>
            </div>
          </Link>
          <button
            className="btn bg-main text-white w-100 btn-sm mt-2"
            onClick={() => {
              mutate(product._id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
