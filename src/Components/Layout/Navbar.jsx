import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.webp";
import { UserContext } from "@/context/UserContext";
import { getLoggedUserCart, useCartOperators } from "@/hooks/useCart";
import { getLoggedWishList, useWishListOperators } from "@/hooks/useWishList";
import { navLinks, authLinks, userMenuLinks } from "@/constants/navbar";

function clearBootstrapLocks() {
  document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
  document.querySelectorAll("[inert]").forEach((el) => el.removeAttribute("inert"));
}

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { userToken, setUserToken, isLogin } = useContext(UserContext);

  let { data } = useCartOperators("LoggedProduct", getLoggedUserCart);

  let { data: wishListData } = useWishListOperators(
    "wishlist",
    getLoggedWishList
  );

  useEffect(() => {
    clearBootstrapLocks();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function logOut() {
    setMenuOpen(false);
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
                {navLinks.map((link) => (
                  <li className="nav-item" key={link.path}>
                    <NavLink
                      className="nav-link"
                      to={link.path}
                      activeclassname="active"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">
              <li className="nav-item position-relative me-3">
                <Link className="nav-link toggle" to="/wishList">
                  <i className="fa-solid fa-heart cursor-pointer fs-4"></i>
                  <span className="heart text-center text-white d-flex justify-content-center align-items-center position-absolute rounded-1">
                    {wishListData?.data?.count ?? 0}
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
                    {data?.data?.numOfCartItems ?? 0}
                  </span>
                </Link>
              </li>
              {userToken ? (
                <li className="nav-item dropdown" ref={menuRef}>
                  <button
                    type="button"
                    className="nav-link dropdown-toggle d-flex align-items-center border rounded-3 px-3 py-2 bg-white"
                    id="userDropdown"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    style={{
                      cursor: "pointer",
                      borderColor: "#dee2e6",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <i className="fa-regular fa-user fs-6 me-2 text-primary"></i>
                    Hi {isLogin}
                  </button>

                  <ul
                    className={`dropdown-menu dropdown-menu-end shadow-sm rounded-2 mt-2 py-0${
                      menuOpen ? " show" : ""
                    }`}
                    aria-labelledby="userDropdown"
                    style={{ minWidth: "180px" }}
                  >
                    {userMenuLinks.map((link) => (
                      <li key={link.path}>
                        <NavLink
                          className={link.className}
                          to={link.path}
                          onClick={() => setMenuOpen(false)}
                        >
                          <i className={link.icon}></i>
                          {link.label}
                        </NavLink>
                      </li>
                    ))}

                    <li>
                      <button
                        type="button"
                        className="dropdown-item d-flex align-items-center cursor-pointer text-danger fw-semibold py-2"
                        onClick={logOut}
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal me-2"></i>{" "}
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  {authLinks.map((link) => (
                    <li className="nav-item" key={link.path}>
                      <NavLink className="nav-link" to={link.path}>
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

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
                Notice
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mt-2 mb-0">Please login first</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
