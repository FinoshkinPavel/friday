import * as React from "react";
import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import Input, { InputProps } from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormikTouched } from "formik/dist/types";

type defaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface CustomInputPassPropsType extends InputProps {
  touched: FormikTouched<{ password: string }>;
  errorText: string | undefined;
  label?: string;
}

type CustomInputPassPropsType2 = InputProps & {
  touched: FormikTouched<{ password: string }>;
  errorText: string | undefined;
  label?: string;
};

export const CustomInputPass: React.FC<CustomInputPassPropsType> = memo(
  ({ touched, errorText, label, ...rest }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    return (
      <FormControl sx={{ m: 1, width: "23ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">
          {touched.password && errorText ? (
            <span style={{ color: "#B22222" }}>{errorText}</span>
          ) : (
            label || "Password"
          )}
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          error={touched.password && !!errorText}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...rest}
        />
      </FormControl>
    );
  }
);
