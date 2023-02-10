import React from "react";
import { IconButton, SvgIcon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CloseModalBtnPropsType = {
  value: boolean;
  callBack: (value: boolean) => void;
};

export const CloseModalBtn: React.FC<CloseModalBtnPropsType> = ({
  value,
  callBack,
}) => {
  const onclickHandler = () => {
    callBack(!value);
  };

  return (
    <IconButton
      color={"inherit"}
      onClick={onclickHandler}
      style={{ marginRight: "1em" }}
    >
      <SvgIcon
        style={{ cursor: "pointer" }}
        component={CloseIcon}
        inheritViewBox
        sx={{ fontSize: 18 }}
      />
    </IconButton>
  );
};
