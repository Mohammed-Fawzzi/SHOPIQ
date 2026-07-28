import React from "react";
import { Bars } from "react-loader-spinner";
import FormikError from "@/components/common/ui/FormikError";

export default function ResetPasswordForm({
  formik,
  isLoading,
  showPassword,
  setShowPassword,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="fw-semibold">
          Email
        </label>
        <input
          type="email"
          className="form-control mt-2"
          id="email"
          name="email"
          placeholder="user@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikError formik={formik} name="email" />
      </div>

      <div className="mb-3">
        <label htmlFor="newPassword" className="fw-semibold">
          New Password
        </label>
        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control mt-2"
            id="newPassword"
            name="newPassword"
            placeholder="xxxxxxxx"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
        <FormikError formik={formik} name="newPassword" />
      </div>

      <div className="d-flex justify-content-center mb-3">
        <button
          type="submit"
          className="btn bg-main text-white px-4"
          disabled={!(formik.isValid && formik.dirty) || isLoading}
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
            "Reset Password"
          )}
        </button>
      </div>
    </form>
  );
}
