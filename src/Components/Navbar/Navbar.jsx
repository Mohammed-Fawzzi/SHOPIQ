import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import { UserContext } from "../../Context/UserContext";
import { getLoggedUserCart, useCartOperators } from "../../UseCart";
import { getLoggedWishList, useWishListOperators } from "../../useWishList";

export default function Navbar() {
  const navigate = useNavigate();

  // Call Context To Display Link
  const { userToken, setUserToken, isLogin } = useContext(UserContext);

  // Display Number Of Cart
  let { data } = useCartOperators("LoggedProduct", getLoggedUserCart);

  // Display In Wish List
  let { data: wishListData } = useWishListOperators(
    "wishlist",
    getLoggedWishList
  );

  // Log-Out
  function logOut() {
    setUserToken(null);
    localStorage.removeItem("userToken");
    navigate("/Login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light ps-1 fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={Logo} alt="nav-logo" className="nav-logo" />
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userToken ? (
              <>
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <NavLink
                      activeclassname="active"
                      className="nav-link home"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      activeclassname="active"
                      className="nav-link"
                      to="/products"
                    >
                      Products
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      activeclassname="active"
                      className="nav-link"
                      to="/categories"
                    >
                      Categories
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      activeclassname="active"
                      className="nav-link"
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item position-relative me-3">
                <Link className="nav-link toggle" to="/wishList">
                  <i className="fa-solid fa-heart cursor-pointer fs-4"></i>
                  <span className="heart text-center text-white d-flex justify-content-center align-items-center position-absolute rounded-1">
                    {wishListData?.data?.count}
                  </span>
                </Link>
              </li>

              <li
                className="nav-item position-relative me-3"
                data-bs-toggle={!userToken ? "modal" : ""}
                data-bs-target="#exampleModal"
              >
                <Link className="nav-link toggle" to="/cart">
                  <i className="fa-solid fa-cart-shopping cursor-pointer fs-4"></i>
                  <span className="cart text-center text-white d-flex justify-content-center align-items-center position-absolute rounded-1">
                    {data?.data?.numOfCartItems}
                  </span>
                </Link>
              </li>

              {userToken !== null ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <NavLink
                      className="nav-link d-flex align-items-center mb-2"
                      to="userProfile"
                    >
                      <i className="fa-regular fa-user fs-5 user me-2"></i>
                      <span className="fw-bold">Hi {isLogin}</span>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <span
                      className="nav-link log-out cursor-pointer me-2"
                      onClick={() => logOut()}
                    >
                      Log Out
                      <i className="fa-solid fa-right-from-bracket ms-2"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <>
        {/* Modal */}
        <div
          className="modal fade modal-fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Oops
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mt-2">Please login first</p>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
