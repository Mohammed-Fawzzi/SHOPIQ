import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Categories() {
  // Get All Categories
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  // Display Categories
  let { data, isLoading, isError, error } = useQuery(
    "Categories",
    getCategories,
    {
      select: (data) => data.data.data,
      refetchOnWindowFocus: false,
      cacheTime: 10 * (60 * 1000),
      staleTime: 20000,
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
        <title>Categories</title>
      </Helmet>

      {/* Content */}
      <h3 className="pt-5 mt-5 text-center text-main fw-bold">
        All Categories
      </h3>
      <div className="container py-3">
        <div className="row gx-5 d-flex justify-content-center">
          {data?.map((Category) => (
            <div className="col-md-2 border p-0 m-3" key={Category._id}>
              <img
                src={Category.image}
                alt={Category.name}
                className="w-100 border-bottom"
                height={250}
                loading="lazy"
              />
              <div className="py-2 text-center">
                <p className="text-main h6 pt-2 text-center fw-bold">
                  {Category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
