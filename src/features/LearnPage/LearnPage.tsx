import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CardAnswerString,
  getAllCardsPack,
  setNewGradeCard,
} from "../../store/reducers/cards-reducer";
import { useAppDispatch, useAppSelector } from "../../app-hooks/hooks";
import { CardType } from "../../types/api-types/api-types";
import { Button, Card } from "@mui/material";
import s from "./learn-page.module.scss";
import { BlockQuestion } from "./ContQuestion/BlockQuestion";
import { BlockAnswer } from "./ContAnswer/BlockAnswer";
import { BackPageBtn } from "../../common/BackPageBtn/BackPageBtn";
import { PATH } from "../../enums/enum-route";

export const LearnPage = () => {
  const dispatch = useAppDispatch();
  const { cards, packName } = useAppSelector((state) => state.cardsPack);
  const { cardsPack_id } = useParams();
  const [first, setFirst] = useState(true);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<string | null>(null);
  const [card, setCard] = useState<CardType>({
    cardsPack_id: "",
    grade: 0,
    _id: "",
    answer: "",
    created: "",
    shots: 0,
    question: "",
    updated: "",
    user_id: "",
  });

  const getCard = () => {
    const sum = cards.reduce((acc: number, el: CardType) => {
      return acc + (6 - el.grade) * (6 - el.grade);
    }, 0);
    const rand = Math.floor(Math.random() * sum) + 1;
    let s = 0;
    let i = 0;
    while (s < rand) {
      s += (6 - cards[i].grade) * (6 - cards[i].grade);
      i++;
    }
    return cards[i - 1];
  };

  const setNewGradeHandler = () => {
    if (grade) {
      const newGrade = grade
        .toLowerCase()
        .replaceAll(" ", "_") as CardAnswerString;
      dispatch(setNewGradeCard(card._id, newGrade));
      setOpen(false);
      setGrade(null);
    }
  };

  useEffect(() => {
    if (first) {
      cardsPack_id &&
        dispatch(getAllCardsPack({ cardsPack_id, pageCount: 100 }));
      setFirst(false);
    }
    if (cards.length > 0) setCard(getCard());
  }, [cards]);

  return (
    <>
      <BackPageBtn to={PATH.PACK_LIST} />
      <div>
        <h1>Learn "{packName}"</h1>
        <Card
          variant="outlined"
          className={`${s.wrapCard} ${!open && `${s.wrapCardActivate}`}`}
        >
          <BlockQuestion
            question={card.question}
            imgQuestion={card.questionImg}
            shots={card.shots}
          />
          <BlockAnswer
            answer={card.answer}
            open={open}
            grade={grade}
            setGrade={setGrade}
          />
          {open ? (
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={setNewGradeHandler}
            >
              Next question
            </Button>
          ) : (
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={() => {
                setOpen(true);
              }}
            >
              Show answer
            </Button>
          )}
        </Card>
      </div>
    </>
  );
};
