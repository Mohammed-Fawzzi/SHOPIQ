import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import Loading from "@/components/common/ui/Loading";
import PaymentSuccessModal from "@/components/common/ui/PaymentSuccessModal";

function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.id || payload?._id || null;
  } catch {
    return null;
  }
}

export default function AllOrders() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [showSuccessModal, setShowSuccessModal] = useState(
    () => sessionStorage.getItem("showPaymentSuccess") === "1"
  );

  useEffect(() => {
    if (showSuccessModal) {
      sessionStorage.removeItem("showPaymentSuccess");
    }
  }, [showSuccessModal]);

  // Unlock UI if an old Bootstrap modal left inert/backdrop behind
  useEffect(() => {
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
    document
      .querySelectorAll("[inert]")
      .forEach((el) => el.removeAttribute("inert"));
  }, []);

  function getUserOrders() {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return Promise.reject(new Error("Please login first"));
    }

    const userData = JSON.parse(localStorage.getItem("userData") || "null");
    const userId =
      userData?._id || userData?.id || getUserIdFromToken(token);

    if (!userId) {
      return Promise.reject(new Error("Please login first"));
    }

    return axios.get(`${baseUrl}/orders/user/${userId}`, {
      headers: { token },
    });
  }

  const { data, isLoading, isError, error } = useQuery(
    "AllOrders",
    getUserOrders,
    {
      select: (res) => res?.data,
    }
  );

  const orders = Array.isArray(data) ? data : data?.data || [];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Orders</title>
      </Helmet>

      <PaymentSuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="container pt-5 mt-5 text-center">
          <h4 className="text-danger">
            {error?.message || "Failed to load orders"}
          </h4>
        </div>
      ) : (
        <div className="container pt-5 mt-5">
          <h3 className="py-3 text-center text-main fw-bold">All Orders</h3>

          {orders.length === 0 ? (
            <p className="text-center text-muted">No orders found yet.</p>
          ) : (
            orders.map((order) => (
              <div className="mb-5" key={order._id || order.id}>
                <div className="row">
                  {(order.cartItems || []).map((item) => (
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
                    <p className="text-muted small mb-0">
                      Payment: {order.paymentMethodType} |{" "}
                      {order.isPaid ? "Paid" : "Not paid"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

const CartItem = ({ item }) => {
  const title = item?.product?.title || "Product";

  return (
    <div className="card shadow-sm border-light product">
      <img
        src={item?.product?.imageCover}
        alt={title}
        className="card-img-top w-100"
        height={250}
        loading="lazy"
      />
      <div className="card-body border-top">
        <p className="card-title text-main fw-bold">
          {title.split(" ").slice(0, 2).join(" ")}
        </p>
        <p className="card-text fw-bold">Count: {item.count}</p>
        <p className="card-text text-danger fw-bold">Price: {item.price} EGP</p>
      </div>
    </div>
  );
};
