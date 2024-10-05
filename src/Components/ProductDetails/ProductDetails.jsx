import React from "react";
import { useParams } from "react-router-dom";
import { getProductDetails, useProducts } from "../../useProducts";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { addToCart, useCartProducts } from "../../UseCart";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  // Add To Cart
  let { mutate } = useCartProducts(addToCart);

  // Get Id for products
  let { id } = useParams();

  // Get Product Details
  let { data, isLoading, isError, error } = useProducts("productDetails", () =>
    getProductDetails(id)
  );

  // Check If Loading
  if (isLoading) {
    return <Loading></Loading>;
  }
  // Check If Error
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // Slider Message
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
      </Helmet>

      {/* Content */}
      <div className="container py-5">
        <div className="row align-items-center my-4 p-5">
          <div className="col-md-4">
            <Slider {...settings}>
              {data?.images.map((img) => (
                <img
                  src={img}
                  alt={data?.title}
                  className="w-100"
                  key={data._id}
                />
              ))}
            </Slider>
          </div>

          <div className="col-md-8 p-3">
            <h3 className="text-main">
              {data?.title.split(" ").slice(0, 3).join(" ")}
            </h3>
            <p className="py-3">{data?.description}</p>
            <div className="d-flex justify-content-between mt-1">
              <span className="text-main fw-bold">{data?.price} EGP</span>
              <span className="fas fa-star rating-color">
                {data?.ratingsAverage}
              </span>
            </div>
            <button
              className="btn bg-main text-white w-100 btn-sm mt-3"
              onClick={() => {
                mutate(data._id);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
