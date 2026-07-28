import * as Yup from "yup";

export const shippingSchema = Yup.object({
  details: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address cannot exceed 100 characters")
    .required("Shipping address is required"),
  phone: Yup.string()
    .matches(
      /^01[0125][0-9]{8}$/,
      "Enter a valid Egyptian phone number (01XXXXXXXXX)"
    )
    .required("Phone number is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .max(40, "City cannot exceed 40 characters")
    .required("City is required"),
});
