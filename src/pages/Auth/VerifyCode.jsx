import React, { useState } from "react";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/axiosInstance";
import { verifyCodeSchema } from "@/validations/auth/verifyCodeSchema";
import VerifyCodeForm from "@/components/Auth/VerifyCodeForm";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function getResetCode(values) {
    setIsLoading(true);
    return api.post(`/auth/verifyResetCode`, values);
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

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: verifyCodeSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Code</title>
      </Helmet>

      <div className="container d-flex justify-content-center align-items-center py-5 my-5">
        <div
          className="bg-white p-4 rounded-4 shadow-lg mt-5 w-100"
          style={{ maxWidth: "500px" }}
        >
          <h3 className="text-main fw-bold mb-4 text-center">
            <i className="fa-solid fa-shield-check me-2"></i>Verify Code
          </h3>

          <VerifyCodeForm formik={formik} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
