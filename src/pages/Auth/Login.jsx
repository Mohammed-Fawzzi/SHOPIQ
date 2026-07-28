import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserContext } from "@/context/UserContext";
import { api } from "@/api/axiosInstance";
import { loginSchema } from "@/validations/auth/loginSchema";
import LoginForm from "@/components/Auth/LoginForm";
import LoginIllustration from "@/components/Auth/LoginIllustration";

export default function Login() {
  const { setUserToken, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submitLogin(values) {
    try {
      setIsLoading(true);
      let { data } = await api.post(`/auth/signin`, values);
      if (data.message === "success") {
        setUserToken(data.token);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userData", JSON.stringify(data.user));
        setUserData(data.user);
        setMessage("");
        setIsLoading(false);
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>

      <section className="auth-page">
        <div className="container">
          <div className="row align-items-stretch justify-content-center g-4">
            <div className="col-lg-6 d-none d-lg-flex">
              <div className="auth-illustration-wrap">
                <LoginIllustration />
              </div>
            </div>

            <div className="col-lg-5 col-md-8">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm auth-card w-100 h-100">
                <h3 className="text-main fw-bold mb-4 text-center">
                  <i className="fa-solid fa-right-to-bracket me-2"></i>Login
                </h3>

                {message && (
                  <p className="alert alert-danger text-center py-2">{message}</p>
                )}

                <LoginForm
                  formik={formik}
                  isLoading={isLoading}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
