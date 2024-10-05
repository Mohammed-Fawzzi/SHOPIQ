import React, { useState } from "react";
import Loading from "../Loading/Loading";
import {
  checkOut,
  clearCart,
  getLoggedUserCart,
  removeFromCart,
  updateCart,
  useCartOperators,
  useCartProducts,
} from "../../UseCart";
import { Helmet } from "react-helmet";
import Image1 from "../../assets/empty-cart.webp";

export default function Cart() {
  // Display Data In Cart
  let { data, isLoading, isError } = useCartOperators(
    "LoggedProduct",
    getLoggedUserCart
  );
  console.log(data);

  // Remove Product From Cart
  let { mutate } = useCartProducts(removeFromCart);

  // Clear Cart
  let { mutate: Clear } = useCartProducts(clearCart);

  // Update Cart Count
  let { mutate: updatedMutate } = useCartProducts(updateCart);

  //
  let { mutate: checkOutMutate, data: checkOutData } =
    useCartProducts(checkOut);

  // Shipping Address
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  // Get Shipping Address
  function getShippingAddress(eventInfo) {
    eventInfo.preventDefault();
    let shippingAddress = {
      details,
      phone,
      city,
    };
    checkOutMutate({ productId: data?.data?.data?._id, shippingAddress });
    if (checkOutData?.data?.status === "success") {
      window.location.href = checkOutData?.data?.session.url;
    }
  }

  // Check on Loading
  if (isLoading) {
    return <Loading />;
  }

  // Check on Error
  if (isError)
    return (
      <div className="text-center my-4">
        <h4>Cart is empty</h4>
        <img src={Image1} height={400} alt="empty-cart" />
      </div>
    );

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>

      {/* Content */}
      <div className="container my-5 pt-5">
        {data?.data?.numOfCartItems ? (
          <>
            <h4 className="text-main pt-2 fw-bold">Cart Shopping</h4>
            <div>
              <p className="text-main fw-bold mt-3">
                <span className="text-dark">Cart Items :</span>{" "}
                {data?.data?.numOfCartItems}
              </p>
              <p className="text-main fw-bold mb-3">
                <span className="text-dark">Total Cart Price :</span>{" "}
                {data?.data?.data.totalCartPrice} EGP
              </p>
              <div className="d-flex justify-content-between border-bottom pb-3">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    Clear();
                  }}
                >
                  Clear Cart
                </button>
                <button
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalId"
                >
                  Check Out
                </button>
              </div>
            </div>

            {data?.data?.data?.products.map((product) => (
              <div className="row py-4 border-bottom" key={product.product.id}>
                <div className="col-md-1">
                  <img
                    src={product.product.imageCover}
                    alt={product.title}
                    className="w-100"
                  />
                </div>

                <div className="col-md-11">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="fw-bold">
                        {product.product.title.split(" ").slice(0, 4).join(" ")}
                      </p>
                      <h6 className="text-main fw-bold">
                        Price : {product.price}EGP
                      </h6>
                    </div>

                    <div>
                      <button
                        className="btn brd-btn p-2"
                        onClick={() => {
                          updatedMutate({
                            productId: product.product._id,
                            count: product.count + 1,
                          });
                        }}
                      >
                        +
                      </button>
                      <span className="mx-3">{product.count}</span>
                      <button
                        className="btn brd-btn p-2"
                        onClick={() => {
                          product.count > 1 &&
                            updatedMutate({
                              productId: product.product._id,
                              count: product.count - 1,
                            });
                        }}
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </div>
                  <span
                    className=" cursor-pointer fw-bold"
                    onClick={() => {
                      mutate(product.product._id);
                    }}
                  >
                    <i className="text-danger fas fa-trash-can"></i> Remove
                  </span>
                </div>
              </div>
            ))}

            <div
              className="modal fade"
              id="modalId"
              tabIndex="-1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="modalTitleId"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title cart-heart-modal text-main fw-bold"
                      id="modalTitleId"
                    >
                      Shipping Address
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={getShippingAddress}>
                      <label htmlFor="name" className="mb-1">
                        Name :
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        onChange={(e) => setDetails(e.target.value)}
                        className="form-control rounded-0"
                      />

                      <label htmlFor="phone" className="mt-2 mb-1">
                        Phone :
                      </label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="Enter you phone number"
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control rounded-0"
                      />

                      <label htmlFor="city" className="mt-2 mb-1">
                        City :
                      </label>
                      <input
                        type="text"
                        id="city"
                        placeholder="Enter your city"
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control rounded-0"
                      />

                      <button
                        className="btn btn-outline-primary mt-3 px-5 py-1 rounded-0"
                        type="submit"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-main pt-3 text-start fw-bold">Your cart is empty</h3>
            <div className="d-flex flex-column align-items-center">
              <img
                src={Image1}
                alt="empty-cart"
                className="w-50"
                loading="lazy"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
