import * as Yup from "yup";
import {
  emailSchema,
  passwordSchema,
  phoneRegExp,
} from "./shared";

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "You must enter at least 3 letters")
    .max(15, "Cannot add over 15 letters")
    .required("Name is required"),
  email: emailSchema,
  password: passwordSchema,
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
