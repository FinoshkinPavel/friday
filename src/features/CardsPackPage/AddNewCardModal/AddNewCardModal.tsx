import React, { memo, useState } from "react";
import { Button, TextField } from "@mui/material";
import s from "./add-new-card-modal.module.scss";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../app-hooks/hooks";
import { validationSchemaCards } from "../../../utils/validate-utils";
import { BasicModal } from "../../../common/Modal/Modal";
import { addNewCards } from "../../../store/reducers/cards-reducer";
import { QuestionSelect } from "./QuestinonSelector/QuestionSelector";
import { UploadButton } from "../../../common/UploadBtn/UploadBtn";

type AddNewCardModalPropsType = {
  cardsPack_id: string | undefined;
};

export const AddNewCardModal: React.FC<AddNewCardModalPropsType> = memo(
  ({ cardsPack_id }) => {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState("text");
    const [img, setImg] = useState("");
    const dispatch = useAppDispatch();
    const formik = useFormik({
      initialValues: {
        question: "",
        answer: "",
      },
      validationSchema: validationSchemaCards,
      onSubmit: (values) => {
        //alert(JSON.stringify(values, null, 2));
        if (values.question.includes("data:image")) {
          setOpen(!open);
          setVariant("text");
          setImg("");
          cardsPack_id &&
            dispatch(
              addNewCards({
                cardsPack_id,
                questionImg: values.question,
                answer: values.answer,
              })
            );
          formik.resetForm();
        } else if (!values.question.startsWith("data:image")) {
          setOpen(!open);
          setVariant("text");
          cardsPack_id &&
            dispatch(
              addNewCards({
                cardsPack_id,
                question: values.question,
                answer: values.answer,
              })
            );
          formik.resetForm();
        }
      },
    });

    return (
      <BasicModal
        titleBtn="Add new card"
        titleHeader="Add new card"
        setOpen={setOpen}
        open={open}
      >
        <form onSubmit={formik.handleSubmit} className={s.childrenWrap}>
          <QuestionSelect variant={variant} setVariant={setVariant} />
          {variant === "text" ? (
            <TextField
              label="New question"
              variant="standard"
              sx={{ width: "80%" }}
              name="question"
              value={formik.values.question}
              onChange={formik.handleChange}
              error={formik.touched.question && !!formik.errors.question}
              helperText={formik.touched.question && formik.errors.question}
            />
          ) : (
            <div className={s.uploadImgBlockWrap}>
              <UploadButton
                setImg={setImg}
                name={"question"}
                formikOnChangeImg={formik.setFieldValue}
              />
              <div className={s.questionImgWrap}>
                {img ? <img src={img} /> : <span>you img question</span>}
              </div>
            </div>
          )}
          <TextField
            label="New answer"
            variant="standard"
            sx={{ width: "80%" }}
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={formik.touched.answer && !!formik.errors.answer}
            helperText={formik.touched.answer && formik.errors.answer}
          />
          <Button variant="outlined" color="inherit" size="small" type="submit">
            Save
          </Button>
        </form>
      </BasicModal>
    );
  }
);
