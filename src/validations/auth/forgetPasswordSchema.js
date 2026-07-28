import * as Yup from "yup";
import { emailSchema } from "./shared";

export const forgetPasswordSchema = Yup.object({
  email: emailSchema,
});
