import * as React from "react";
import Button from "@mui/material/Button";
import { ChangeEvent, memo } from "react";
import { convertFileBase64 } from "../../utils/converBase64-utils";

type UploadBtnPropsType = {
  setImg: (value: string) => void;
  name: string;
  formikOnChangeImg?: (e: string, value: string) => void;
};

export const UploadButton: React.FC<UploadBtnPropsType> = memo(
  ({ formikOnChangeImg, setImg, name }) => {
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];
        if (file.size < 1000000) {
          convertFileBase64(file, (file64: string) => {
            setImg(file64);
            formikOnChangeImg && formikOnChangeImg(name, file64);
          });
        } else {
          console.error("Error: ", "Файл слишком большого размера");
        }
      }
    };

    return (
      <Button variant="outlined" color={"inherit"} component="label">
        Upload Img
        <input
          name={name}
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={uploadHandler}
        />
      </Button>
    );
  }
);
