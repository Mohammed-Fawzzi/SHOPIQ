import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function getForgetPassword(values) {
    setIsLoading(true);
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    );
  }

  let { mutate } = useMutation(getForgetPassword, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      navigate("/verifyCode");
      setIsLoading(false);
    },
    onError: (data) => {
      toast.error(data?.message);
      setIsLoading(false);
    },
  });

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
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
        <title>Forget Password</title>
      </Helmet>

      <div className="container d-flex justify-content-center align-items-center py-5 my-5">
        <div
          className="bg-white p-4 rounded-4 shadow-lg mt-5 w-100"
          style={{ maxWidth: "500px" }}
        >
          <h3 className="text-main fw-bold mb-4 text-center">
            <i className="fa-solid fa-envelope me-2"></i>Forget Password
          </h3>

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="fw-semibold">
                Enter your email address
              </label>
              <input
                type="email"
                className="form-control mt-2"
                id="email"
                name="email"
                placeholder="Email"
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
                  "Send Code"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
