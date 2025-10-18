import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  // Save Token
  const { setUserToken, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Loading And Error
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submitLogin(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
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

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters long, contain at least one letter, one number and one special character."
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>

      {/* Content */}
      <div className="container d-flex justify-content-center align-items-center py-5 my-5">
        <div
          className="bg-white p-4 rounded-4 shadow-lg mt-5 w-100"
          style={{ maxWidth: "500px" }}
        >
          <h3 className="text-main fw-bold mb-4 text-center">
            <i className="fa-solid fa-right-to-bracket me-2"></i>Login
          </h3>

          {message && (
            <p className="alert alert-danger text-center py-2">{message}</p>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control mt-2"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control mt-2"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link
                className="fw-bold text-decoration-none"
                to="/forgetPassword"
              >
                Forgot Password?
              </Link>
              <button
                className="btn bg-main text-white px-4"
                type="submit"
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
                  "Login"
                )}
              </button>
            </div>

            {/* Register Link */}
            <div className="mt-2 text-center">
              <p className="mb-0">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary fw-bold text-decoration-none"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
