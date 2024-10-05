import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function submitRegister(values) {
    try {
      setisLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        setMessage("");
        setisLoading(false);
        navigate("/Login");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setisLoading(false);
    }
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "You must enter at least 3 letters")
      .max(15, "Cannot add over 15 letters")
      .required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters long, contain at least one letter, one number and one special character."
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "The re-entered password must match the original password."
      )
      .required("rePassword is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>

      {/* Content */}
      <div className="container py-5 my-5">
        <h3 className="text-main mt-3 fw-bold">Register</h3>
        <div className="row">
          <div className="col-md-12">
            {message ? (
              <p className="alert alert-danger p-2 my-2">{message}</p>
            ) : (
              ""
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="my-3">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  className="form-control w-100 my-2"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
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

              <div className="mb-3">
                <label htmlFor="rePassword">re-Password :</label>
                <input
                  type="password"
                  className="form-control w-100 my-2"
                  id="rePassword"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.rePassword}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="tel">Phone :</label>
                <input
                  type="text"
                  className="form-control w-100 my-2"
                  id="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.phone}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                className="btn bg-main d-block text-white mt-3 ms-auto"
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
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
