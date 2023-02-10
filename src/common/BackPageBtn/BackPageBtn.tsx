import React from "react";
import s from "../../features/CardsPackPage/cards-pack-page.module.scss";
import { SvgIcon } from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import { NavLink } from "react-router-dom";

type BackPageBtnPropsType = {
  to: string;
};

export const BackPageBtn: React.FC<BackPageBtnPropsType> = ({ to }) => {
  return (
    <NavLink to={to} className={s.linkToPackList}>
      <SvgIcon
        component={ArrowLeftRoundedIcon}
        inheritViewBox
        sx={{ fontSize: 26 }}
      />
      Back to Packs List
    </NavLink>
  );
};
