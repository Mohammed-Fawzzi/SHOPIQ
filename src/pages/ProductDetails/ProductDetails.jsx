import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails, useProducts } from "@/hooks/useProducts";
import Loading from "@/components/common/ui/Loading";
import Slider from "react-slick";
import { addToCart, useCartProducts } from "@/hooks/useCart";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { mutate } = useCartProducts(addToCart);
  const { id } = useParams();

  const { data, isLoading, isError, error } = useProducts(
    "productDetails",
    () => getProductDetails(id)
  );

  if (isLoading) return <Loading />;
  if (isError) return <h2>{error.message}</h2>;

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
                  className="w-100 rounded-3"
                  key={data._id}
                />
              ))}
            </Slider>
          </div>

          <div className="col-md-8 p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h4 className="text-main mb-0">
                {data?.title.split(" ").slice(0, 3).join(" ")}
              </h4>

              <button
                className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                style={{ fontSize: "0.8rem", padding: "6px 10px" }}
                onClick={() => navigate(-1)}
              >
                Back <i className="fa-solid fa-arrow-right ms-1 mt-1"></i>
              </button>
            </div>

            <p className="py-2">{data?.description}</p>
            <div className="d-flex justify-content-between mt-1">
              <span className="text-main fw-bold">{data?.price} EGP</span>
              <span className="fas fa-star rating-color">
                {data?.ratingsAverage}
              </span>
            </div>

            <button
              className="btn bg-main text-white w-100 btn-sm mt-3"
              onClick={() => mutate(data._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
