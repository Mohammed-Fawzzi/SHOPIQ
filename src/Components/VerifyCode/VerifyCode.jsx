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
  // Navigate To go to Reset Code
  const navigate = useNavigate();
  // Check If is Loading
  const [isLoading, setIsLoading] = useState(false);
  // Forget Password
  function getResetCode(values) {
    setIsLoading(true);
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    );
  }

  // Send Email
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

  // Formik
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
      <div className="container my-5 py-5">
        <h3 className="mt-3 text-main fw-bold">Verify Code :</h3>
        <form onSubmit={formik.handleSubmit} className="py-5">
          <label className="py-2" htmlFor="resetCode">
            Enter your verification Code :
          </label>
          <input
            className="form-control mt-2"
            type="text"
            id="resetCode"
            placeholder="Verification Code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            name="resetCode"
          />
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className="alert alert-danger p-2 mt-3">
              {formik.errors.resetCode}
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
              "Verify"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
