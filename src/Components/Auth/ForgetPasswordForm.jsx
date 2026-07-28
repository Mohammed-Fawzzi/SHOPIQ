import React from "react";
import { Bars } from "react-loader-spinner";
import FormikError from "@/components/common/ui/FormikError";

export default function ForgetPasswordForm({ formik, isLoading }) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="fw-semibold">
          Enter your email address
        </label>
        <input
          type="email"
          className="form-control mt-2"
          id="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikError formik={formik} name="email" />
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
            "Send Code"
          )}
        </button>
      </div>
    </form>
  );
}
