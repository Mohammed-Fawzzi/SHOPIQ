import * as Yup from "yup";
import { emailSchema, passwordSchema } from "./shared";

export const resetPasswordSchema = Yup.object({
  email: emailSchema,
  newPassword: passwordSchema,
});
