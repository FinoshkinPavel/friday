import React, { memo, useState } from "react";
import { BasicModal } from "../../../../../common/Modal/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Checkbox, TextField } from "@mui/material";
import { useAppDispatch } from "../../../../../app-hooks/hooks";
import s from "./Update-pack-list-modal.module.scss";
import { useFormik } from "formik";
import { validationSchemaPackListName } from "../../../../../utils/validate-utils";
import { updatePackList } from "../../../../../store/reducers/pack-list-reducer";

type UpdatePackListModalPropsType = {
  packId: string | undefined;
  packName: string;
  privatePack: boolean;
};
export const UpdatePackListModal: React.FC<UpdatePackListModalPropsType> = memo(
  ({ packId, packName, privatePack }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const formik = useFormik({
      initialValues: {
        name: packName,
        private: privatePack,
      },
      validationSchema: validationSchemaPackListName,
      onSubmit: (values) => {
        //alert(JSON.stringify(values, null, 2));
        setOpen(!open);
        packId &&
          dispatch(
            updatePackList({
              _id: packId,
              name: values.name,
              private: values.private,
            })
          );
      },
    });

    return (
      <BasicModal
        icon={EditIcon}
        titleHeader="Edit pack"
        setOpen={setOpen}
        open={open}
      >
        <form onSubmit={formik.handleSubmit} className={s.childrenWrap}>
          <TextField
            label="New Pack"
            variant="standard"
            sx={{ width: "80%" }}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.errors.name}
          />
          <div>
            <Checkbox
              name="private"
              checked={formik.values.private}
              onChange={formik.handleChange}
            />{" "}
            Private pack
          </div>
          <Button variant="outlined" color="inherit" size="small" type="submit">
            Save
          </Button>
        </form>
      </BasicModal>
    );
  }
);
