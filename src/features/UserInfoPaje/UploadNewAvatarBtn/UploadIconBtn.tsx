import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../app-hooks/hooks";
import { updateUserInfo } from "../../../store/reducers/user-information-reducer";
import { convertFileBase64 } from "../../../utils/converBase64-utils";

export const UploadIconBtn = () => {
  const dispatch = useAppDispatch();

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 1000000) {
        convertFileBase64(file, (file64: string) => {
          dispatch(updateUserInfo({ avatar: file64 }));
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };

  return (
    <div>
      <IconButton color="inherit" component="label">
        <input hidden accept="image/*" type="file" onChange={uploadHandler} />
        <PhotoCamera />
      </IconButton>
    </div>
  );
};
