import React, { memo } from "react";
import s from "./block-question.module.scss";

type BlockQuestionPropsType = {
  question: string;
  shots: number;
  imgQuestion: string | undefined;
};

export const BlockQuestion: React.FC<BlockQuestionPropsType> = memo(
  ({ question, shots, imgQuestion }) => {
    return (
      <>
        <div>
          <span className={s.question}>Question:</span>{" "}
          {imgQuestion ? (
            <div style={{ width: "100px", height: "50px" }}>
              <img
                src={imgQuestion}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <span>{question}</span>
          )}
        </div>
        <div className={s.shots}>
          Количество попыток ответов на вопрос: {shots}
        </div>
      </>
    );
  }
);
