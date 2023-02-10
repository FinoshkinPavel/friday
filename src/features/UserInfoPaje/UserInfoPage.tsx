import React, { useState } from "react";
import { Avatar, Box, Button, Card, SvgIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../../app-hooks/hooks";
import { logOut } from "../../store/reducers/auth-login-reduscer";
import { updateUserInfo } from "../../store/reducers/user-information-reducer";
import { EditableSpan } from "../../common/EditableSpan/EditableSpan";
import s from "./my-info-page.module.scss";
import { PATH } from "../../enums/enum-route";
import { BackPageBtn } from "../../common/BackPageBtn/BackPageBtn";
import { UploadIconBtn } from "./UploadNewAvatarBtn/UploadIconBtn";

export const UserInfoPage = () => {
  const { email, name, avatar } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);

  const clickLogOutHandler = () => {
    dispatch(logOut());
  };
  const sendChangeNameHandler = (newName: string) => {
    dispatch(updateUserInfo({ name: newName }));
    setEditMode(false);
  };
  const clickEditModeHandler = () => {
    setEditMode(!editMode);
  };

  return (
    <div className={s.wrapMyInfoPage}>
      <BackPageBtn to={PATH.PACK_LIST} />
      <div className={s.cardContain}>
        <Box
          sx={{
            width: 413,
          }}
        >
          <Card variant={"outlined"}>
            <div className={s.cardWrap}>
              <h3>Personal Information</h3>
              <div className={s.blockAvaWithBtn}>
                <Avatar
                  src={avatar ? avatar : "/broken-image.jpg"}
                  sx={{ width: 96, height: 96, marginLeft: "45px" }}
                />
                <UploadIconBtn />
              </div>
              <div>
                {editMode ? (
                  <EditableSpan callback={sendChangeNameHandler} />
                ) : (
                  <span style={{ paddingRight: "5px", marginLeft: "23px" }}>
                    {name}
                  </span>
                )}

                <SvgIcon
                  onClick={clickEditModeHandler}
                  style={{ cursor: "pointer" }}
                  component={EditIcon}
                  inheritViewBox
                  sx={{ fontSize: 16 }}
                />
              </div>
              <p style={{ fontSize: "14px", color: "gray" }}>{email}</p>

              <Button
                variant="outlined"
                color="inherit"
                size={"small"}
                onClick={clickLogOutHandler}
              >
                <SvgIcon
                  component={LogoutIcon}
                  inheritViewBox
                  sx={{ fontSize: 16 }}
                />
                Log out
              </Button>
            </div>
          </Card>
        </Box>
      </div>
    </div>
  );
};
