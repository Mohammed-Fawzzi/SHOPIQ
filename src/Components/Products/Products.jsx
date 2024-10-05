import React, { useState } from "react";
import Loading from "../Loading/Loading";
import { getFeaturedProducts, useProducts } from "../../useProducts";
import Product from "../Product/Product";
import { Helmet } from "react-helmet";
import { MagnifyingGlass } from "react-loader-spinner";

export default function Products() {
  // Array For Search
  const [searchedArray, setSearchedArray] = useState([]);
  //Search In Products
  function searchInProducts(evenInfo) {
    let term = evenInfo.target.value;
    let filteredArray = data?.filter((element) =>
      element?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchedArray(filteredArray);
  }

  // Display Product in Home
  let { data, isLoading, isError, error } = useProducts(
    "FeaturedProducts",
    getFeaturedProducts,
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          cacheTime: 10 * (60 * 1000),
          staleTime: 20000,
        },
      },
    }
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
        <title>Products</title>
      </Helmet>
      {/* Content */}
      <div className="container py-5">
        <div className="my-5 py-3">
          <div className="bg-main-light d-flex align-items-center mb-4 p-2 product-search shadow-sm">
            <MagnifyingGlass
              visible={true}
              height="40"
              width="50"
              ariaLabel="magnifying-glass-loading"
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#fff"
              color="#007bff"
            />
            <h5 className="ms-2 text-main">Search in products</h5>
          </div>
          <input
            type="text"
            className="form-control w-100"
            onChange={searchInProducts}
            placeholder="Search...."
          />
        </div>
        <div className="row gy-4 mb-5">
          {searchedArray.length
            ? searchedArray.map((product) => (
                <Product product={product} key={product._id}></Product>
              ))
            : data?.map((product) => (
                <Product product={product} key={product._id}></Product>
              ))}
        </div>
      </div>
    </>
  );
}
