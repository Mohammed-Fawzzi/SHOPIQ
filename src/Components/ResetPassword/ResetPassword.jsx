import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function getResetPassword(values) {
    setIsLoading(true);
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
  }

  let { mutate } = useMutation(getResetPassword, {
    onSuccess: () => {
      toast.success("Success , login and enjoy");
      navigate("/Login");
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Error , please try again");
      setIsLoading(false);
    },
  });

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters long, contain at least one letter, one number and one special character."
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>

      <div className="container d-flex justify-content-center align-items-center py-5 my-5">
        <div
          className="bg-white p-4 rounded-4 shadow-lg mt-5 w-100"
          style={{ maxWidth: "500px" }}
        >
          <h3 className="text-main fw-bold mb-4 text-center">
            <i className="fa-solid fa-lock me-2"></i>Reset Password
          </h3>

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control mt-2"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* New Password */}
            <div className="mb-3">
              <label htmlFor="newPassword" className="fw-semibold">
                New Password
              </label>
              <input
                type="password"
                className="form-control mt-2"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.newPassword}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn bg-main text-white px-4"
                disabled={!(formik.isValid && formik.dirty) || isLoading}
              >
                {isLoading ? (
                  <Bars
                    height="20"
                    width="50"
                    color="#fff"
                    ariaLabel="bars-loading"
                    visible={true}
                  />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
