import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app-hooks/hooks";
import { Avatar, SvgIcon } from "@mui/material";
import s from "./appBar.module.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AppMenu } from "./AppMenu/AppMenu";

export const AppBarMenu = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const loggedIn = useAppSelector((state) => state.authLogin.loggedIn);
  const { name, avatar } = useAppSelector((state) => state.userInfo);

  return (
    <AppBar position="static" color={"transparent"}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Friday
        </Typography>
        {loggedIn && (
          <div className={s.avatarWrap}>
            <span className={s.name}>{name}</span>
            <Avatar src={avatar ? avatar : "/broken-image.jpg"} />
            <div
              className={s.iconBtMenu}
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              <SvgIcon component={MoreHorizIcon} inheritViewBox />
            </div>
            {toggleMenu && (
              <AppMenu setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
