import React, { useState } from "react";
import { getFeaturedProducts, useProducts } from "@/hooks/useProducts";
import Loading from "@/components/common/ui/Loading";
import Product from "@/components/Product/Product";
import CategorySlider from "@/components/Sliders/CategorySlider";
import MainSlider from "@/components/Sliders/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalPages = 5;

  const { data, isLoading, isError, error, isFetching } = useProducts(
    "FeaturedProducts",
    getFeaturedProducts,
    page,
    limit
  );

  if (isLoading) return <Loading />;
  if (isError) return <h2>{error.message}</h2>;

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>

      <MainSlider />
      <CategorySlider />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary m-0 category-title">
            Explore <span className="text-primary">Top Products</span>
          </h3>
        </div>

        <div className="row gy-4">
          {data?.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>

        <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 mt-5">
          <button
            onClick={handlePrev}
            disabled={page === 1 || isFetching}
            className={`btn fw-bold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 ${
              page === 1 ? "btn-secondary disabled" : "btn-outline-primary"
            }`}
            style={{
              minWidth: "110px",
              transition: "0.3s ease",
              opacity: isFetching && page === 1 ? 0.6 : 1,
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              disabled={isFetching}
              className={`btn ${
                page === num
                  ? "btn-primary text-white shadow-sm"
                  : "btn-outline-primary"
              } rounded-circle`}
              style={{
                width: "42px",
                height: "42px",
                fontWeight: "bold",
                fontSize: "15px",
                transition: "0.3s ease",
                opacity: isFetching && page === num ? 0.6 : 1,
              }}
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={page === totalPages || isFetching}
            className={`btn fw-bold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 ${
              page === totalPages
                ? "btn-secondary disabled"
                : "btn-outline-primary"
            }`}
            style={{
              minWidth: "110px",
              transition: "0.3s ease",
              opacity: isFetching && page === totalPages ? 0.6 : 1,
            }}
          >
            Next
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
