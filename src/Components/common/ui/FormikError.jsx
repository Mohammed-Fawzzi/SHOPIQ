import React from "react";

export default function FormikError({ formik, name, className = "alert alert-danger p-2 mt-2" }) {
  if (!(formik.errors[name] && formik.touched[name])) {
    return null;
  }

  return <div className={className}>{formik.errors[name]}</div>;
}
