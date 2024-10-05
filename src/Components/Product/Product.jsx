import React from "react";
import { Link } from "react-router-dom";
import { addToCart, useCartProducts } from "../../UseCart";
import { getWishList, useWishList } from "../../useWishList";

export default function Product({ product }) {
  // Add To Cart
  let { mutate } = useCartProducts(addToCart);

  // Add To Wish List
  let { mutate: wishListMutate } = useWishList(getWishList);

  return (
    <>
      <div key={product._id} className="col-md-3">
        <div className="product cursor-pointer p-3">
          <i
            className="fa-regular fa-heart fa-2x product-heart text-main"
            onClick={() => {
              wishListMutate(product._id);
            }}
          ></i>
          <Link to={`/productDetails/${product._id}`}>
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-100 mb-3"
              height={250}
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
