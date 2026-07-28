import * as Yup from "yup";
import { emailSchema, passwordSchema } from "./shared";

export const loginSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema,
});
