import React from "react";
import { SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import s from "./custom-search-input.module.scss";

type CustomSearchInputPropsType = {
  value: string;
  callBack: (value: string) => void;
  width: string;
};

export const CustomSearchInput: React.FC<CustomSearchInputPropsType> = ({
  value,
  callBack,
  width,
}) => {
  return (
    <div className={s.wrapCustomInput} style={{ width: `${width}` }}>
      <SvgIcon
        className={s.searchIcon}
        component={SearchIcon}
        inheritViewBox
        sx={{ fontSize: 22 }}
        color={"inherit"}
      />
      <input
        className={s.input}
        placeholder="Provide your text"
        type="search"
        value={value}
        onChange={(e) => {
          callBack(e.currentTarget.value);
        }}
      />
    </div>
  );
};
