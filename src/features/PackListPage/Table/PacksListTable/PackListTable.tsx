import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "../../../../app-hooks/hooks";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { PATH } from "../../../../enums/enum-route";
import { LearnBtnPacksListTable } from "./LearnBtnPacksListTable/LearnBtnPacksListTablePropsType";
import { NotFound } from "../../../../common/NotFoundItem/NotFound";
import { DeletePackListModal } from "./DeletePackListModal/DeletePackListModal";
import { UpdatePackListModal } from "./UpdatePackListModal/UpdatePackListModal";
import deckCoverPlaceHolder from "../../../../img/content-panda-logo-large.png";

export const PackListTable = () => {
  const packList = useAppSelector(
    (state) => state.packList.packsList.cardPacks
  );
  const userId = useAppSelector((state) => state.userInfo._id);
  const requestStatus = useAppSelector((state) => state.app.status);

  if (requestStatus === "loading") {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return packList.length > 0 ? (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Deck cover</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Cards</TableCell>
              <TableCell align="center">Last Updated</TableCell>
              <TableCell align="center">Created by</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packList.map((el) => (
              <TableRow
                key={el._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <div style={{ width: "100px", height: "50px" }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={el.deckCover ? el.deckCover : deckCoverPlaceHolder}
                    />
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link
                    to={`${PATH.CARDS_PACK}/${el._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {el.name}
                  </Link>
                </TableCell>
                <TableCell align="center">{el.cardsCount}</TableCell>
                <TableCell align="center">{el.updated}</TableCell>
                <TableCell align="center">{el.created}</TableCell>
                <TableCell align="center">
                  {/*----------LEARN BTN-----------*/}
                  <LearnBtnPacksListTable
                    cardsCount={el.cardsCount}
                    cards_packId={el._id}
                  />
                  {el.user_id === userId && (
                    <span>
                      {/*-----------UPDATE PACK BTN-------------*/}
                      <UpdatePackListModal
                        packId={el._id}
                        packName={el.name}
                        privatePack={el.private}
                      />
                      {/*----------DELETE PACK BTN----------*/}
                      <DeletePackListModal packId={el._id} packName={el.name} />
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  ) : (
    <NotFound />
  );
};
