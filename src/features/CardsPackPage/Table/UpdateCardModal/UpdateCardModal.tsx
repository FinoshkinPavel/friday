import React, { memo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";
import s from "./Update-card-modal.module.scss";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../../app-hooks/hooks";
import { validationSchemaCards } from "../../../../utils/validate-utils";
import { BasicModal } from "../../../../common/Modal/Modal";
import { updateCard } from "../../../../store/reducers/cards-reducer";
import { UpdateCardModelType } from "../../../../types/api-types/api-types";

type UpdateCardModalPropsType = {
  cardId: string;
  cardsPack_id: string | undefined;
  question: string;
  answer: string;
};

export const UpdateCardModal: React.FC<UpdateCardModalPropsType> = memo(
  ({ cardId, cardsPack_id, question, answer }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const formik = useFormik({
      initialValues: {
        question: question,
        answer: answer,
      },
      validationSchema: validationSchemaCards,
      onSubmit: (values) => {
        //alert(JSON.stringify(values, null, 2));
        const testModelUpdateCard: UpdateCardModelType = {
          _id: cardId,
          question: values.question,
          answer: values.answer,
        };
        cardsPack_id && dispatch(updateCard(cardsPack_id, testModelUpdateCard));
        setOpen(!open);
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
            label="New question"
            variant="standard"
            sx={{ width: "80%" }}
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
            error={formik.touched.question && !!formik.errors.question}
            helperText={formik.errors.question}
          />
          <TextField
            label="New answer"
            variant="standard"
            sx={{ width: "80%" }}
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={formik.touched.answer && !!formik.errors.answer}
            helperText={formik.errors.answer}
          />
          <Button variant="outlined" color="inherit" size="small" type="submit">
            Save
          </Button>
        </form>
      </BasicModal>
    );
  }
);
