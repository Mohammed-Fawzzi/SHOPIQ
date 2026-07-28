import React from "react";
import { Bars } from "react-loader-spinner";
import FormikError from "@/components/common/ui/FormikError";

export default function VerifyCodeForm({ formik, isLoading }) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="resetCode" className="fw-semibold">
          Enter your verification code
        </label>
        <input
          type="text"
          className="form-control mt-2"
          id="resetCode"
          name="resetCode"
          placeholder="Verification Code"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikError formik={formik} name="resetCode" />
      </div>

      <div className="d-flex justify-content-center mb-3">
        <button
          type="submit"
          className="btn bg-main text-white px-4"
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
            "Verify"
          )}
        </button>
      </div>
    </form>
  );
}
