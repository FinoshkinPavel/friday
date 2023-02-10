import React, { memo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import s from "./block-answer.module.scss";

type BlockAnswerPropsType = {
  answer: string;
  open: boolean;
  grade: string | null;
  setGrade: (value: string) => void;
};

export const BlockAnswer: React.FC<BlockAnswerPropsType> = memo(
  ({ answer, open, setGrade, grade }) => {
    const rate = [
      "Did not know",
      "Forgot",
      "A lot of thought",
      "Confused",
      "Knew the answer",
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setGrade((event.target as HTMLInputElement).value);
    };
    return (
      <div
        className={`${s.wrapBlockAnswer} ${open && `${s.blockAnswerActivate}`}`}
      >
        <div className={s.answerWrap}>
          <span className={s.answer}>Answer</span>: {answer}
        </div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Rate yourself:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={grade}
            onChange={handleChange}
          >
            {rate.map((el, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={el}
                  control={<Radio />}
                  label={el}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
);
