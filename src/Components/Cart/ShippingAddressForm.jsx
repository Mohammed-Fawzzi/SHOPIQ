import React from "react";
import { Bars } from "react-loader-spinner";
import FormikError from "@/components/common/ui/FormikError";

export default function ShippingAddressForm({ formik, isLoading }) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="details" className="mb-1 fw-semibold">
          Address Details :
        </label>
        <input
          type="text"
          id="details"
          name="details"
          placeholder="Street, building, floor..."
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control rounded-0"
        />
        <FormikError formik={formik} name="details" />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="mb-1 fw-semibold">
          Phone :
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="01XXXXXXXXX"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control rounded-0"
        />
        <FormikError formik={formik} name="phone" />
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="mb-1 fw-semibold">
          City :
        </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter your city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control rounded-0"
        />
        <FormikError formik={formik} name="city" />
      </div>

      <button
        className="btn bg-main text-white px-4 rounded-0 mt-2"
        type="submit"
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
          "Pay Now"
        )}
      </button>
    </form>
  );
}
