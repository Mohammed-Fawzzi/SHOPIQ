import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import ProfileIllustration from "@/components/Auth/ProfileIllustration";

export default function UserProfile() {
  const { userData } = useContext(UserContext);

  const initials =
    userData?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Profile</title>
      </Helmet>

      <section className="auth-page profile-page">
        <div className="container">
          <div className="row align-items-stretch justify-content-center g-4">
            <div className="col-lg-5 d-none d-lg-flex">
              <div className="auth-illustration-wrap">
                <ProfileIllustration />
              </div>
            </div>

            <div className="col-lg-7 col-md-10">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm auth-card profile-card w-100 h-100">
                <div className="text-center mb-4">
                  <div className="profile-avatar mx-auto mb-3">{initials}</div>
                  <h3 className="fw-bold text-dark mb-1">{userData?.name}</h3>
                  <p className="text-muted mb-0">{userData?.email}</p>
                </div>

                <div className="profile-meta">
                  <div className="profile-meta-row">
                    <span className="profile-meta-label">
                      <i className="fa-solid fa-user-tag me-2 text-main"></i>
                      Role
                    </span>
                    <span className="profile-meta-value text-capitalize">
                      {userData?.role || "User"}
                    </span>
                  </div>

                  <div className="profile-meta-row">
                    <span className="profile-meta-label">
                      <i className="fa-solid fa-circle-check me-2 text-main"></i>
                      Status
                    </span>
                    <span className="badge bg-main px-3 py-2">Active</span>
                  </div>

                  <div className="profile-meta-row">
                    <span className="profile-meta-label">
                      <i className="fa-solid fa-envelope me-2 text-main"></i>
                      Email
                    </span>
                    <span className="profile-meta-value profile-email">
                      {userData?.email}
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-between gap-2 mt-4">
                  <Link to="/allorders" className="btn bg-main text-white">
                    <i className="fa-solid fa-bag-shopping me-2"></i>
                    My Orders
                  </Link>
                  <Link to="/wishList" className="btn btn-outline-primary">
                    <i className="fa-solid fa-heart me-2"></i>
                    My Wishlist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
