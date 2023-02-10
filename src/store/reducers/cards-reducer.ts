import {
  CardsPackResponse,
  NewCardsModelType,
  RequestCardsUriParamType,
  UpdateCardModelType,
} from "../../types/api-types/api-types";
import { AppDispatch } from "../store";
import { setAppStatusRequest } from "./app-reducer";
import { cardsPackAPI } from "../../services/api/cardsPackAPI";
import { utilsError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CardsPackResponse = {
  cards: [],
  packUserId: "",
  packName: "",
  packUpdated: "",
  packCreated: "",
  cardsTotalCount: 0,
  packDeckCover: "",
  packPrivate: false,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
};

const slice = createSlice({
  name: "cardsPack",
  initialState: initialState,
  reducers: {
    setCardsPack(state, action: PayloadAction<CardsPackResponse>) {
      return { ...action.payload };
    },
    setNewGradeCardAC(
      state,
      action: PayloadAction<{ cardId: string; grade: number; shots: number }>
    ) {
      const indexCard = state.cards.findIndex(
        (el) => el._id === action.payload.cardId
      );
      state.cards[indexCard].grade = action.payload.grade;
      state.cards[indexCard].shots = action.payload.shots;
    },
  },
});

export const cardsReducer = slice.reducer;
export const { setCardsPack, setNewGradeCardAC } = slice.actions;

export const getAllCardsPack =
  (data: RequestCardsUriParamType) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    cardsPackAPI.getAllCardsPack(data).then((res) => {
      dispatch(setCardsPack(res.data));
      dispatch(setAppStatusRequest({ status: "succeeded" }));
    });
  };

export const addNewCards =
  (data: NewCardsModelType) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    cardsPackAPI
      .addNewCard(data)
      .then((res) => {
        dispatch(getAllCardsPack({ cardsPack_id: data.cardsPack_id }));
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => {
        utilsError(e, dispatch);
      });
  };

export const updateCard =
  (cardsPack_id: string, data: UpdateCardModelType) =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    cardsPackAPI
      .updateCard(data)
      .then((res) => {
        dispatch(getAllCardsPack({ cardsPack_id }));
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => {
        utilsError(e, dispatch);
      });
  };

export const deleteCard =
  (cardsPack_id: string, cardID: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    cardsPackAPI
      .deleteCard(cardID)
      .then((res) => {
        dispatch(getAllCardsPack({ cardsPack_id }));
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => {
        utilsError(e, dispatch);
      });
  };

export const setNewGradeCard =
  (card_id: string, grade: CardAnswerString) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    cardsPackAPI
      .updateGradeCard({ card_id, grade: CardAnswer[grade] })
      .then((res) => {
        dispatch(
          setNewGradeCardAC({
            cardId: res.data.updatedGrade.card_id,
            grade: res.data.updatedGrade.grade,
            shots: res.data.updatedGrade.shots,
          })
        );
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      });
  };

//-------------------Enum-grade------------------
export type CardAnswerString = keyof typeof CardAnswer;

enum CardAnswer {
  did_not_know = 1,
  forgot = 2,
  a_lot_of_thought = 3,
  confused = 4,
  knew_the_answer = 5,
}
