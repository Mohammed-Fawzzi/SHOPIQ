import React from "react";
import { getFeaturedProducts, useProducts } from "../../useProducts";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home() {
  // Display Product in Home
  let { data, isLoading, isError, error } = useProducts(
    "FeaturedProducts",
    getFeaturedProducts
  );

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
        <title>Home</title>
      </Helmet>

      {/* Content */}
      <MainSlider />
      <CategorySlider />
      <div className="container py-5">
        <div className="row gy-4">
          {data?.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      </div>
    </>
  );
}
