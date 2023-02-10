import React, { memo, useState } from "react";
import s from "./pack-name-with-menu.module.scss";
import { SvgIcon } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardsPackUserMenu } from "../CardsPackUserMenu/CardsPackUserMenu";

type HeaderCardsPackPropsType = {
  packName: string;
  userID: string | null;
  packUserID: string;
  cardsTotalCount: number;
};

export const PackNameWithMenu: React.FC<HeaderCardsPackPropsType> = memo(
  ({ packUserID, userID, packName, cardsTotalCount }) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
      <div className={s.packNameWrap}>
        <h2>{packName}</h2>
        {userID === packUserID && (
          <SvgIcon
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
            style={{ cursor: "pointer" }}
            component={MoreVertIcon}
            inheritViewBox
            sx={{ fontSize: 22 }}
          />
        )}
        {toggleMenu && (
          <CardsPackUserMenu packName={packName} cardsCount={cardsTotalCount} />
        )}
      </div>
    );
  }
);
