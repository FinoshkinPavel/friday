import * as yup from "yup";

const email = yup.string().required("Required").email("Invalid email address");
const password = yup.string().required("Required").min(8, "Too Short!");
const confirmPassword = yup
  .string()
  .required("Required")
  .oneOf([yup.ref("password")], "Passwords do not match");
const name = yup.string().required("Required");
const question = yup.string().required("Required");
const answer = yup.string().required("Required");

export const validationSchemaLogin = yup.object({ email, password });
export const validationSchemaRegistration = yup.object({
  email,
  password,
  confirmPassword,
});
export const validationSchemaNewPassword = yup.object({ password });
export const validationSchemaPackListName = yup.object({ name });
export const validationSchemaCards = yup.object({ question, answer });
//zod
