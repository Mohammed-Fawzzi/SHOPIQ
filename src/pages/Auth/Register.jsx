import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { api } from "@/api/axiosInstance";
import { registerSchema } from "@/validations/auth/registerSchema";
import RegisterForm from "@/components/Auth/RegisterForm";
import RegisterIllustration from "@/components/Auth/RegisterIllustration";

export default function Register() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  async function submitRegister(values) {
    try {
      setisLoading(true);
      let { data } = await api.post(`/auth/signup`, values);
      if (data.message === "success") {
        setMessage("");
        setisLoading(false);
        navigate("/ConfirmAccount");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setisLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: registerSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>

      <section className="auth-page">
        <div className="container">
          <div className="row align-items-stretch justify-content-center g-4">
            <div className="col-lg-6 d-none d-lg-flex">
              <div className="auth-illustration-wrap">
                <RegisterIllustration />
              </div>
            </div>

            <div className="col-lg-5 col-md-8">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm auth-card w-100 h-100">
                <h3 className="text-main fw-bold mb-4 text-center">
                  <i className="fa-solid fa-user-plus me-2"></i>Register
                </h3>

                <RegisterForm
                  formik={formik}
                  message={message}
                  isLoading={isLoading}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showRePassword={showRePassword}
                  setShowRePassword={setShowRePassword}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
