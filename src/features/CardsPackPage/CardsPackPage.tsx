import React, { useEffect, useState } from "react";
import { PATH } from "../../enums/enum-route";
import s from "./cards-pack-page.module.scss";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { CustomSearchInput } from "../../common/CustomSearchInput/CustomSearchInput";
import { CardsTable } from "./Table/CardsTable";
import { useAppDispatch, useAppSelector } from "../../app-hooks/hooks";
import { getAllCardsPack } from "../../store/reducers/cards-reducer";
import { useDebounce } from "../../app-hooks/useDebounce";
import { BackPageBtn } from "../../common/BackPageBtn/BackPageBtn";
import { PackNameWithMenu } from "./HeaderCardsPack/PackNameWidthMenu";
import { PaginationWidthSelector } from "../../common/PaginationWidthSelector/PaginationWidthSelector";
import { AddNewCardModal } from "./AddNewCardModal/AddNewCardModal";

export const CardsPackPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);
  const [cardQuestion, setCardQuestion] = useState("");

  const { cardsTotalCount, packName, packUserId } = useAppSelector(
    (state) => state.cardsPack
  );
  const userID = useAppSelector((state) => state.userInfo._id);
  const searchCardDebounce = useDebounce(cardQuestion, 700);
  const { cardsPack_id } = useParams();
  useEffect(() => {
    cardsPack_id &&
      dispatch(
        getAllCardsPack({ cardsPack_id, page, pageCount, cardQuestion })
      );
  }, [page, pageCount, searchCardDebounce]);

  const totalPages = Math.ceil(cardsTotalCount / pageCount);

  return (
    <>
      <BackPageBtn to={PATH.PACK_LIST} />

      <div className={s.cardsPackCont}>
        <div className={s.header}>
          {/*-------------PACK NAME TITLE & PACK MENU-------------*/}
          <PackNameWithMenu
            packName={packName}
            userID={userID}
            packUserID={packUserId}
            cardsTotalCount={cardsTotalCount}
          />
          {/*-------------LEARN BTN || ADD NEW CARD BTN-------------*/}
          {userID === packUserId ? (
            <AddNewCardModal cardsPack_id={cardsPack_id} />
          ) : (
            <Button
              href={`${PATH.LEARN_CARDS_PACK}/${cardsPack_id}`}
              variant="outlined"
              color={"inherit"}
              size={"small"}
              sx={{ width: 150 }}
            >
              Learn
            </Button>
          )}
        </div>
        {/*-------------SEARCH INPUT-------------*/}
        <div className={s.searchInputWrap}>
          Search
          <CustomSearchInput
            value={cardQuestion}
            callBack={setCardQuestion}
            width={"100%"}
          />
        </div>
        {/*-------------CARDS TABLE-------------*/}
        <div className={s.cardsTableWrap}>
          <CardsTable />
        </div>
        {/*-------------PAGINATION-------------*/}
        <PaginationWidthSelector
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
      </div>
    </>
  );
};
