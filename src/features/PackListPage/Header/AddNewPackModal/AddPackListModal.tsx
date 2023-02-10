import React, { useState } from "react";
import { BasicModal } from "../../../../common/Modal/Modal";
import { Button, Checkbox, TextField } from "@mui/material";
import s from "./add-pack-list-modal.module.scss";
import { useAppDispatch } from "../../../../app-hooks/hooks";
import { useFormik } from "formik";
import { addNewPack } from "../../../../store/reducers/pack-list-reducer";
import { validationSchemaPackListName } from "../../../../utils/validate-utils";
import { UploadButton } from "../../../../common/UploadBtn/UploadBtn";

export const AddPackListModal = () => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState("");
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      private: false,
      cover: "",
    },
    validationSchema: validationSchemaPackListName,
    onSubmit: (values) => {
      //console.log(values);
      //alert(JSON.stringify(values, null, 2));
      setOpen(!open);
      dispatch(
        addNewPack({
          name: values.name,
          private: values.private,
          deckCover: values.cover,
        })
      );
      formik.resetForm();
    },
  });

  return (
    <BasicModal
      titleBtn="Add new pack"
      titleHeader="Add new pack"
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
          error={formik.touched && !!formik.errors.name}
          helperText={formik.errors.name}
        />
        <div className={s.blockNewCoverWrap}>
          <UploadButton
            setImg={setCover}
            name={"cover"}
            formikOnChangeImg={formik.setFieldValue}
          />
          <div className={s.blockCover}>
            {cover ? <img src={cover} /> : <span>cover not loading</span>}
          </div>
        </div>

        <div>
          <Checkbox
            name="private"
            value={formik.values.private}
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
};
