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
      <div className="container py-5 my-5">
        <h3 className="text-main mt-3 fw-bold">Login</h3>
        <div className="row">
          <div className="col-md-12">
            {message ? (
              <p className="alert alert-danger p-2 my-2">{message}</p>
            ) : (
              ""
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="my-3">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  className="form-control w-100 my-2"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  className="form-control w-100 my-2"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="d-flex justify-content-between">
                <Link className="mt-1 fw-bold" to={`/forgetPassword`}>
                  Forget your password ?
                </Link>
                <button
                  className="btn bg-main d-block text-white ms-auto"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
