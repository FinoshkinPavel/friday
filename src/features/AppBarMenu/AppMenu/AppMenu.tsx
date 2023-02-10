import React, { memo } from "react";
import s from "./app-menu.module.scss";
import { Link } from "react-router-dom";
import { PATH } from "../../../enums/enum-route";
import { SvgIcon } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "../../../store/reducers/auth-login-reduscer";
import { useAppDispatch } from "../../../app-hooks/hooks";

type AppMenuPropsType = {
  setToggleMenu: (value: boolean) => void;
  toggleMenu: boolean;
};

export const AppMenu: React.FC<AppMenuPropsType> = memo(
  ({ setToggleMenu, toggleMenu }) => {
    const dispatch = useAppDispatch();
    const clickLogOutHandler = () => {
      setToggleMenu(!toggleMenu);
      dispatch(logOut());
    };

    return (
      <div className={s.menu}>
        <div className={s.corner}></div>
        <div className={s.menuList}>
          <Link
            to={PATH.PROFILE}
            className={s.menuItem}
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <SvgIcon
              component={PersonOutlineIcon}
              inheritViewBox
              sx={{ fontSize: 18 }}
            />

            <span className={s.titleInMenu}>Profile</span>
          </Link>
          <div className={s.menuItem} onClick={clickLogOutHandler}>
            <SvgIcon
              component={LogoutIcon}
              inheritViewBox
              sx={{ fontSize: 18 }}
            />
            <span className={s.titleInMenu}>Log out</span>
          </div>
        </div>
      </div>
    );
  }
);
