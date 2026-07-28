import React from "react";
import Loading from "@/components/common/ui/Loading";
import ShippingAddressForm from "@/components/Cart/ShippingAddressForm";
import {
  checkOut,
  clearCart,
  getLoggedUserCart,
  removeFromCart,
  updateCart,
  useCartOperators,
  useCartProducts,
} from "@/hooks/useCart";
import { Helmet } from "react-helmet";
import Image1 from "@/assets/empty-cart.webp";
import { useFormik } from "formik";
import { shippingSchema } from "@/validations/cart/shippingSchema";

export default function Cart() {
  let { data, isLoading, isError } = useCartOperators(
    "LoggedProduct",
    getLoggedUserCart
  );

  let { mutate } = useCartProducts(removeFromCart);
  let { mutate: Clear } = useCartProducts(clearCart);
  let { mutate: updatedMutate } = useCartProducts(updateCart);

  let { mutate: checkOutMutate, isLoading: checkOutLoading } = useCartProducts(
    (payload) =>
      checkOut(payload).then((res) => {
        if (res.data.status === "success") {
          sessionStorage.setItem("showPaymentSuccess", "1");
          window.location.href = res.data.session.url;
        }
        return res;
      })
  );

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      checkOutMutate({
        productId: data?.data?.data?._id,
        shippingAddress: values,
      });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError)
    return (
      <div className="text-center my-4">
        <h4>Cart is empty</h4>
        <img src={Image1} height={400} alt="empty-cart" />
      </div>
    );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>

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
                    <ShippingAddressForm
                      formik={formik}
                      isLoading={checkOutLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-main pt-3 text-start fw-bold">
              Your cart is empty
            </h3>
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
