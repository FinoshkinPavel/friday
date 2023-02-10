import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../../../app-hooks/hooks";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { NotFound } from "../../../common/NotFoundItem/NotFound";
import { DeleteCardModal } from "./DeleteCardModal/DeleteCardModal";
import { UpdateCardModal } from "./UpdateCardModal/UpdateCardModal";
import { CardRating } from "./CardRating/CardRating";

export const CardsTable = () => {
  const cardsPack = useAppSelector((state) => state.cardsPack.cards);
  const userID = useAppSelector((state) => state.userInfo._id);
  const packUserID = useAppSelector((state) => state.cardsPack.packUserId);
  const requestStatus = useAppSelector((state) => state.app.status);
  const { cardsPack_id } = useParams();

  if (requestStatus === "loading") {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {cardsPack.length > 0 ? (
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Question</TableCell>
                <TableCell align="center">Answer</TableCell>
                <TableCell align="center">Last Updated</TableCell>
                <TableCell align="center">Grade</TableCell>
                {userID === packUserID && (
                  <TableCell align="center">Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {cardsPack.map((el) => (
                <TableRow
                  key={el._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {el.questionImg ? (
                      <div style={{ width: "100px", height: "50px" }}>
                        <img
                          src={el.questionImg}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    ) : (
                      el.question
                    )}
                  </TableCell>
                  <TableCell align="center">{el.answer}</TableCell>
                  <TableCell align="center">{el.updated}</TableCell>
                  <TableCell align="center">
                    <CardRating rating={el.grade} />
                  </TableCell>

                  {packUserID === userID && (
                    <TableCell align="center">
                      <span>
                        {/*-----------------UPDATE BTN------------*/}
                        <UpdateCardModal
                          cardId={el._id}
                          cardsPack_id={cardsPack_id}
                          question={el.question}
                          answer={el.answer}
                        />
                        {/*----------DELETE PACK BTN----------*/}
                        <DeleteCardModal
                          cardsPack_id={el.cardsPack_id}
                          cardId={el._id}
                          cardName={el.question}
                        />
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NotFound />
      )}
    </Paper>
  );
};
