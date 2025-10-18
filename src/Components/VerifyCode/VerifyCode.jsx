import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function getResetCode(values) {
    setIsLoading(true);
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    );
  }

  let { mutate } = useMutation(getResetCode, {
    onSuccess: (data) => {
      toast.success(data?.data?.status);
      navigate("/resetPassword");
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Reset code is invalid or has expired");
      setIsLoading(false);
    },
  });

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
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
        <title>Verify Code</title>
      </Helmet>

      {/* Content */}
      <div className="container d-flex justify-content-center align-items-center py-5 my-5">
        <div
          className="bg-white p-4 rounded-4 shadow-lg mt-5 w-100"
          style={{ maxWidth: "500px" }}
        >
          <h3 className="text-main fw-bold mb-4 text-center">
            <i className="fa-solid fa-shield-check me-2"></i>Verify Code
          </h3>

          <form onSubmit={formik.handleSubmit}>
            {/* Reset Code */}
            <div className="mb-3">
              <label htmlFor="resetCode" className="fw-semibold">
                Enter your verification code
              </label>
              <input
                type="text"
                className="form-control mt-2"
                id="resetCode"
                name="resetCode"
                placeholder="Verification Code"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.resetCode}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn bg-main text-white px-4"
                disabled={!(formik.isValid && formik.dirty)}
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
                  "Verify"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
