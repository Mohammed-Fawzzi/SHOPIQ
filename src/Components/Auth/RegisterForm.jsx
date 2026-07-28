import React from "react";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import FormikError from "@/components/common/ui/FormikError";

export default function RegisterForm({
  formik,
  message,
  isLoading,
  showPassword,
  setShowPassword,
  showRePassword,
  setShowRePassword,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      {message ? (
        <p className="alert alert-danger p-2 my-2">{message}</p>
      ) : (
        ""
      )}

      <div className="my-3">
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          className="form-control w-100 my-2"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikError formik={formik} name="name" className="alert alert-danger p-2" />
      </div>

      <div className="mb-3">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          className="form-control w-100 my-2"
          id="email"
          name="email"
          placeholder="user@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikError formik={formik} name="email" className="alert alert-danger p-2" />
      </div>

      <div className="mb-3">
        <label htmlFor="password">Password :</label>
        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control w-100 my-2"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="xxxxxxxx"
            style={{ paddingRight: "2.5rem" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: "10px",
              margin: "auto",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              color: "#333",
              fontSize: "18px",
              height: "fit-content",
            }}
          >
            <i
              className={
                showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
              }
            ></i>
          </button>
        </div>
        <FormikError formik={formik} name="password" className="alert alert-danger p-2" />
      </div>

      <div className="mb-3">
        <label htmlFor="rePassword">Re-Password :</label>
        <div className="position-relative">
          <input
            type={showRePassword ? "text" : "password"}
            className="form-control w-100 my-2"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="xxxxxxxx"
            style={{ paddingRight: "2.5rem" }}
          />
          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: "10px",
              margin: "auto",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              color: "#333",
              fontSize: "18px",
              height: "fit-content",
            }}
          >
            <i
              className={
                showRePassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
              }
            ></i>
          </button>
        </div>
        <FormikError
          formik={formik}
          name="rePassword"
          className="alert alert-danger p-2"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tel">Phone :</label>
        <input
          type="text"
          className="form-control w-100 my-2"
          id="tel"
          name="phone"
          placeholder="+2 01 XXXXXXXXX"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikError formik={formik} name="phone" className="alert alert-danger p-2" />
      </div>

      <div className="mt-2">
        <p className="mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary fw-bold text-decoration-none"
          >
            Login
          </Link>
        </p>
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
  );
}
