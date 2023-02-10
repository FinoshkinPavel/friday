import React from "react";
import { Box, Button, Card, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app-hooks/hooks";
import s from "./registration.module.scss";
import { CustomInputPass } from "../../common/CustomInputPass/CustomInputPass";
import { validationSchemaRegistration } from "../../utils/validate-utils";
import { PATH } from "../../enums/enum-route";
import { registering } from "../../store/reducers/auth-login-reduscer";

export const RegistrationPage = React.memo(() => {
  const registered = useAppSelector<boolean>(
    (state) => state.authLogin.registered
  );
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaRegistration,

    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(registering({ email: values.email, password: values.password }));
    },
  });

  if (registered) return <Navigate to={"/login"} />;
  return (
    <Box
      sx={{
        width: 413,
      }}
    >
      <Card variant="outlined">
        <form onSubmit={formik.handleSubmit} className={s.cardWrap}>
          <h1>Sign Up</h1>
          <TextField
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <CustomInputPass
            name={"password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            errorText={formik.errors.password}
            touched={formik.touched}
          />
          <CustomInputPass
            label={"Confirm Password"}
            name={"confirmPassword"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            touched={formik.touched}
            errorText={formik.errors.confirmPassword}
          />
          <Button variant="outlined" type={"submit"} color="inherit">
            Sign up
          </Button>
          <p style={{ color: "gray" }}>Already have an account?</p>
          <Button href={PATH.LOGIN}>Sing in</Button>
        </form>
      </Card>
    </Box>
  );
});
