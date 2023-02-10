import React from "react";
import { IconButton, SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type UniversalIconBtnPropsType = {
  callback: () => void;
  icon: OverridableComponent<SvgIconTypeMap>;
};

export const UniversalIconBtn: React.FC<UniversalIconBtnPropsType> = ({
  callback,
  icon,
}) => {
  const onClickHandler = () => {
    callback();
  };

  return (
    <IconButton color={"inherit"} onClick={onClickHandler}>
      <SvgIcon
        style={{ cursor: "pointer" }}
        component={icon}
        inheritViewBox
        sx={{ fontSize: 18 }}
      />
    </IconButton>
  );
};
