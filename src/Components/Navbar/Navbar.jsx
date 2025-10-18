import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import { UserContext } from "../../Context/UserContext";
import { getLoggedUserCart, useCartOperators } from "../../hooks/UseCart";
import { getLoggedWishList, useWishListOperators } from "../../hooks/useWishList";

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
    localStorage.clear();
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
            {userToken && (
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" activeclassname="active">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/products"
                    activeclassname="active"
                  >
                    Products
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/categories"
                    activeclassname="active"
                  >
                    Categories
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/brands"
                    activeclassname="active"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">
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
              {userToken ? (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle d-flex align-items-center border rounded-3 px-3 py-2 bg-white"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      cursor: "pointer",
                      borderColor: "#dee2e6",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <i className="fa-regular fa-user fs-6 me-2 text-primary"></i>
                    Hi {isLogin}
                  </span>

                  <ul
                    className="dropdown-menu dropdown-menu-end shadow-sm rounded-2 mt-2 py-0"
                    aria-labelledby="userDropdown"
                    style={{ minWidth: "180px" }}
                  >
                    <li>
                      <NavLink
                        className="dropdown-item d-flex align-items-center text-primary fw-semibold py-2"
                        to="/userProfile"
                      >
                        <i className="fa-regular fa-user me-2 text-primary"></i>
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <span
                        className="dropdown-item d-flex align-items-center cursor-pointer text-danger fw-semibold py-2"
                        onClick={logOut}
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>{" "}
                        Log Out
                      </span>
                    </li>
                  </ul>
                </li>
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
  );
}
