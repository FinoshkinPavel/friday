import React, { memo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import s from "./delet-card-modal.module.scss";
import { useAppDispatch } from "../../../../app-hooks/hooks";
import { BasicModal } from "../../../../common/Modal/Modal";
import { deleteCard } from "../../../../store/reducers/cards-reducer";

type DeleteCardModalModalPropsType = {
  cardId: string;
  cardsPack_id: string;
  cardName: string;
};
export const DeleteCardModal: React.FC<DeleteCardModalModalPropsType> = memo(
  ({ cardId, cardsPack_id, cardName }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const deletePackListHandler = () => {
      setOpen(!open);
      cardsPack_id && dispatch(deleteCard(cardsPack_id, cardId));
      //const values = { cardId, cardName, cardsPack_id };
      //alert(JSON.stringify(values, null, 2));
    };
    return (
      <BasicModal
        titleHeader={"Delete pack"}
        icon={DeleteIcon}
        open={open}
        setOpen={setOpen}
      >
        <div className={s.childrenWrap}>
          <div className={s.text}>
            Do you really want to remove{" "}
            <span className={s.packName}>{cardName}</span>? Card will be
            deleted.
          </div>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={deletePackListHandler}
          >
            Delete
          </Button>
        </div>
      </BasicModal>
    );
  }
);
