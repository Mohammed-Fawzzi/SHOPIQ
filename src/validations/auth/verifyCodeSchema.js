import * as Yup from "yup";

export const verifyCodeSchema = Yup.object({
  resetCode: Yup.string().required("Reset code is required"),
});
