import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";

export default function UserProfile() {
  let { userData } = useContext(UserContext);
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Profile</title>
      </Helmet>

      {/* Content */}
      <div className="container-fluid py-3 p-5">
        <h3 className="pb-3 pt-5 mt-5 ps-5 text-danger fw-bold">
          {" "}
          <i className="fa-regular fa-user fs-4 me-3"> </i>User Profile
        </h3>
        <div className="row ps-5">
          <p className="fw-bold fs-5">
            {" "}
            <span className="text-main"> Name : </span> {userData?.name}
          </p>
          <p className="fw-bold fs-5 py-3">
            {" "}
            <span className="text-main"> Email : </span> {userData?.email}
          </p>
          <p className="fw-bold fs-5">
            {" "}
            <span className="text-main"> Role : </span>
            {userData?.role}
          </p>
        </div>
      </div>
    </>
  );
}
