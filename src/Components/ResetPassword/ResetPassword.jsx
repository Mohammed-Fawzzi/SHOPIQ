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
  // Navigate To go to Reset Code
  const navigate = useNavigate();
  // Check If is Loading
  const [isLoading, setIsLoading] = useState(false);
  // Forget Password
  function getResetPassword(values) {
    setIsLoading(true);
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
  }

  // Send Email
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

  // Formik
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
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>

      {/* Content */}
      <div className="container my-5 py-5">
        <h3 className="mt-3 text-main fw-bold">Reset Password :</h3>
        <form onSubmit={formik.handleSubmit} className="py-3">
          <label className="py-2" htmlFor="resetCode">
            Email :
          </label>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2 mt-3">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label className="pb-2" htmlFor="resetCode">
            New password :
          </label>
          <input
            className="w-100 mb-3 form-control"
            type="password"
            placeholder="Enter new password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            name="newPassword"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger p-2">
              {formik.errors.newPassword}
            </div>
          ) : (
            ""
          )}

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-3"
          >
            {" "}
            {isLoading ? (
              <Bars
                height="25"
                width="50"
                color="#fff"
                ariaLabel="bars-loading"
                visible={true}
              />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
