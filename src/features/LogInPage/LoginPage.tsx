import React from "react";
import { useFormik } from "formik";
import { Box, Button, Card, Checkbox, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app-hooks/hooks";
import { CustomInputPass } from "../../common/CustomInputPass/CustomInputPass";
import s from "./login-page.module.scss";
import { validationSchemaLogin } from "../../utils/validate-utils";
import { logIn } from "../../store/reducers/auth-login-reduscer";
import { PATH } from "../../enums/enum-route";

export const LoginPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.authLogin.loggedIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchemaLogin,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(
        logIn({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        })
      );
    },
  });

  if (loggedIn) return <Navigate to={"/"} />;

  return (
    <Box
      sx={{
        width: 413,
      }}
    >
      <Card variant={"outlined"}>
        <form onSubmit={formik.handleSubmit} className={s.cardWrap}>
          <h1>Sing in</h1>
          <TextField
            error={formik.touched.email && !!formik.errors.email}
            name="email"
            label={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email"
            }
            type="email"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <CustomInputPass
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            touched={formik.touched}
            errorText={formik.errors.password}
          />
          <div>
            <Checkbox
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />
            Remember me
          </div>
          <Button href={PATH.RECOVERY_PASS} size={"small"}>
            Forgot Password?
          </Button>
          <Button
            variant="outlined"
            type={"submit"}
            size={"medium"}
            color="inherit"
          >
            Sign in
          </Button>
          <p style={{ color: "gray" }}>Already have an account?</p>
          <Button href={PATH.REGISTRATION} size={"small"}>
            Sing up
          </Button>
        </form>
      </Card>
    </Box>
  );
});
