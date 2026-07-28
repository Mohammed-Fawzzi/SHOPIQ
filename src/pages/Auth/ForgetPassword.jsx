import React, { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { api } from "@/api/axiosInstance";
import { forgetPasswordSchema } from "@/validations/auth/forgetPasswordSchema";
import ForgetPasswordForm from "@/components/Auth/ForgetPasswordForm";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function getForgetPassword(values) {
    setIsLoading(true);
    return api.post(`/auth/forgotPasswords`, values);
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

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
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

          <ForgetPasswordForm formik={formik} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
