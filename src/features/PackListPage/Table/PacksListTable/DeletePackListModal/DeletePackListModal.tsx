import React, { memo, useState } from "react";
import { BasicModal } from "../../../../../common/Modal/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../../app-hooks/hooks";
import { deletePackList } from "../../../../../store/reducers/pack-list-reducer";
import s from "./delete-pack-list-modal.module.scss";

type DeletePackListModalPropsType = {
  packId: string | undefined;
  packName: string;
  callBack?: (value: boolean) => void;
};
export const DeletePackListModal: React.FC<DeletePackListModalPropsType> = memo(
  ({ packId, packName, callBack }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const deletePackListHandler = async () => {
      setOpen(!open);
      packId && (await dispatch(deletePackList(packId)));
      callBack && callBack(true);
      //const values = { packName, packId };
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
            <span className={s.packName}>{packName}</span>? All cards will be
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
