import React, { useState } from "react";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/axiosInstance";
import { resetPasswordSchema } from "@/validations/auth/resetPasswordSchema";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function getResetPassword(values) {
    setIsLoading(true);
    return api.put(`/auth/resetPassword`, values);
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

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: resetPasswordSchema,
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

          <ResetPasswordForm
            formik={formik}
            isLoading={isLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
      </div>
    </>
  );
}
