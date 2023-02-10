import React, { memo } from "react";
import { IconButton, SvgIcon } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { PATH } from "../../../../../enums/enum-route";

type LearnBtnPacksListTablePropsType = {
  cards_packId: string | undefined;
  cardsCount: number;
};

export const LearnBtnPacksListTable: React.FC<LearnBtnPacksListTablePropsType> =
  memo(({ cardsCount, cards_packId }) => {
    return (
      <IconButton
        href={`${PATH.LEARN_CARDS_PACK}/${cards_packId}`}
        disabled={!cardsCount}
        color={"inherit"}
        style={{}}
      >
        <SvgIcon
          style={{ cursor: "pointer" }}
          component={SchoolIcon}
          inheritViewBox
          sx={{ fontSize: 18 }}
        />
      </IconButton>
    );
  });
