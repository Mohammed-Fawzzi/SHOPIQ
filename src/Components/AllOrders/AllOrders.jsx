import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function AllOrders() {
  const baseUrl = `https://ecommerce.routemisr.com/api/v1`;

  function getAllOrders() {
    return axios.get(`${baseUrl}/orders/`);
  }

  const { data } = useQuery("AllOrders", getAllOrders, {
    select: (data) => data?.data?.data,
  });

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Orders</title>
      </Helmet>

      {/* Content */}
      <div className="container pt-5 mt-5">
        <h3 className="py-3 text-center text-main fw-bold">All Orders</h3>
        {data?.map((order) => (
          <div className="mb-5" key={order.id}>
            <div className="row">
              {order.cartItems.map((item) => (
                <div className="col-md-4 col-lg-3 mb-4" key={item._id}>
                  <CartItem item={item} />
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <p className="text-main fw-bold">
                  <span className="text-dark">Total Order Price:</span>{" "}
                  {order.totalOrderPrice} EGP
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const CartItem = ({ item }) => {
  return (
    <div className="card shadow-sm border-light product">
      <img
        src={item.product.imageCover}
        alt={item.product.title}
        className="card-img-top w-100"
        height={250}
        loading="lazy"
      />
      <div className="card-body border-top">
        <p className="card-title text-main fw-bold">
          {item.product.title.split(" ").slice(0, 2).join(" ")}
        </p>
        <p className="card-text fw-bold">Count: {item.count}</p>
        <p className="card-text text-danger fw-bold">Price: {item.price} EGP</p>
      </div>
    </div>
  );
};
