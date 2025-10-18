import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";

export default function UserProfile() {
  const { userData } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Profile</title>
      </Helmet>

      <div className="container d-flex justify-content-center align-items-center py-5 mt-5">
        <div className="card shadow-sm border-0 rounded-4 p-4 pt-5 mt-4 w-100" style={{ maxWidth: "500px" }}>
          <div className="text-center mb-2">
            <div
              className="rounded-circle bg-light d-flex justify-content-center align-items-center mx-auto mb-3"
              style={{ width: "90px", height: "90px" }}
            >
              <i className="fa-regular fa-user text-primary fs-1"></i>
            </div>
            <h4 className="fw-bold text-dark mb-3">{userData?.name}</h4>
            <p className="text-muted small mb-0">{userData?.email}</p>
          </div>

          <hr />

          <div className="px-2">
            <div className="d-flex justify-content-between py-2">
              <span className="fw-semibold text-secondary">Role:</span>
              <span className="text-dark text-capitalize fw-bold">
                {userData?.role}
              </span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span className="fw-semibold text-secondary">Status:</span>
              <span className="badge bg-success px-3 py-2">Active</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
