import React from "react";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import FormikError from "@/components/common/ui/FormikError";

export default function LoginForm({
  formik,
  isLoading,
  showPassword,
  setShowPassword,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
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
        <FormikError formik={formik} name="email" />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="fw-semibold">
          Password
        </label>
        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
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
              top: "0",
              bottom: "0",
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
        <FormikError formik={formik} name="password" />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link className="fw-bold text-decoration-none" to="/forgetPassword">
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
  );
}
