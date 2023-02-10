import React, { useEffect, useState } from "react";
import s from "./pack-list-page.module.scss";
import { Slider, SvgIcon } from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { CustomSearchInput } from "../../common/CustomSearchInput/CustomSearchInput";
import { useAppDispatch, useAppSelector } from "../../app-hooks/hooks";
import { PackListTable } from "./Table/PacksListTable/PackListTable";
import { useDebounce } from "../../app-hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { RequestPackListUriParamType } from "../../types/api-types/api-types";
import {
  getPacksList,
  setPacksListUserIdAC,
} from "../../store/reducers/pack-list-reducer";
import { HeaderPacksList } from "./Header/HeaderPacksList";
import { PaginationWidthSelector } from "../../common/PaginationWidthSelector/PaginationWidthSelector";

export const PackListPage = () => {
  const { cardPacksTotalCount, maxCardsCount, minCardsCount } = useAppSelector(
    (state) => state.packList.packsList
  );
  const userID = useAppSelector((state) => state.userInfo._id);
  const dispatch = useAppDispatch();

  const [pageCount, setPageCount] = useState(4);
  const [page, setPage] = useState(1);
  const [minMaxCount, setMinMaxCount] = React.useState<number[]>([0, 53]);
  const [packName, setPackName] = useState("");
  const [activeMyBtn, setActiveMyBtn] = useState(false);
  const [activeAllBtn, setActiveAllBtn] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceSearch = useDebounce<string>(packName, 700);

  const totalPages = pageCount && Math.ceil(cardPacksTotalCount / pageCount);

  const allMyPacksHandler = (value: string) => {
    setSearchParams({ access: value });
  };
  const cleaningFilters = () => {
    allMyPacksHandler("all");
    setMinMaxCount([0, 53]);
    dispatch(getPacksList({}));
  };
  const getPacks = () => {
    const payLoad: RequestPackListUriParamType = {
      pageCount,
      page,
      min: minMaxCount[0],
      max: minMaxCount[1],
      packName,
      user_id: "",
    };
    if (searchParams.has("access") && searchParams.get("access") === "my") {
      payLoad.user_id = userID;
      userID && dispatch(setPacksListUserIdAC({ packsListUser_id: userID }));
    } else if (searchParams.get("access") === "all") {
      dispatch(setPacksListUserIdAC({ packsListUser_id: "" }));
    }
    dispatch(getPacksList(payLoad));
  };

  useEffect(() => {
    getPacks();
  }, [pageCount, page, debounceSearch, searchParams.get("access")]);

  return (
    <div className={s.wrapPackList}>
      <HeaderPacksList />

      <div className={s.tools}>
        {/*__________SEARCH INPUT________________*/}
        <div className={s.search}>
          <span>Search</span>
          <CustomSearchInput
            value={packName}
            callBack={setPackName}
            width={"413px"}
          />
        </div>
        {/*______________________BTN ALL MY_______________________*/}
        <div className={s.showPacksCards}>
          <div>Show packs cards</div>
          <div className={s.wrapAllMyBtn}>
            <div
              className={`${s.allMyBtn} ${activeAllBtn && s.activeAllBtn}`}
              onClick={(e) => {
                allMyPacksHandler("all");
                setActiveAllBtn(!activeAllBtn);
                setActiveMyBtn(!activeMyBtn);
              }}
            >
              All
            </div>
            <div
              className={`${s.allMyBtn} ${activeMyBtn && s.activeMyBtn}`}
              onClick={(e) => {
                userID && allMyPacksHandler("my");
                setActiveMyBtn(!activeMyBtn);
                setActiveAllBtn(!activeAllBtn);
              }}
            >
              My
            </div>
          </div>
        </div>
        {/*______________________SLIDER___________________*/}
        <div className={s.doubleRange}>
          <div>Number of cards</div>

          <Slider
            color={"secondary"}
            value={minMaxCount}
            max={maxCardsCount}
            min={minCardsCount}
            onChangeCommitted={getPacks}
            onChange={(e, newValue) => {
              setMinMaxCount(newValue as number[]);
            }}
            valueLabelDisplay="auto"
          />
        </div>
        {/*_______________________FILTER______________________*/}
        <div className={s.filter}>
          <SvgIcon
            onClick={cleaningFilters}
            style={{ cursor: "pointer" }}
            component={FilterAltOffIcon}
            inheritViewBox
            sx={{ fontSize: 22 }}
          />
        </div>
      </div>

      <PackListTable />

      <PaginationWidthSelector
        pageCount={pageCount}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        setPageCount={setPageCount}
      />
    </div>
  );
};
