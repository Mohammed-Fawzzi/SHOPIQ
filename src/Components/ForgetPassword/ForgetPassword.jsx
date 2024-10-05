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
  // Navigate To go to Reset Code
  const navigate = useNavigate();
  // Check If is Loading
  const [isLoading, setIsLoading] = useState(false);
  // Forget Password
  function getForgetPassword(values) {
    setIsLoading(true);
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    );
  }

  // Send Email
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

  // Formik
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
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>

      {/* Content */}
      <div className="container mt-5 py-5">
        <h3 className="mt-3 text-main fw-bold">Forget Password :</h3>
        <form onSubmit={formik.handleSubmit} className="py-5">
          <label htmlFor="email" className="py-2">
            Enter your email address :
          </label>
          <input
            className="form-control mt-2"
            type="email"
            id="email"
            placeholder="Email"
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
          <button
            disabled={!(formik.isValid && formik.dirty) || isLoading}
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
              "Send Code"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
