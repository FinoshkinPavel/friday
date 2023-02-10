import {
  NewCardsModelType,
  RequestCardsUriParamType,
  UpdateCardModelType,
  UpdateGradeCardResponseType,
  UpdateGradeCardType,
} from "../../types/api-types/api-types";
import { instance } from "./axiosInstance/axiosInstance";

export const cardsPackAPI = {
  getAllCardsPack(data: RequestCardsUriParamType) {
    return instance.get("cards/card", { params: data });
  },
  addNewCard(data: NewCardsModelType) {
    return instance.post("cards/card", { card: data });
  },
  updateCard(data: UpdateCardModelType) {
    return instance.put("cards/card", { card: data });
  },
  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`);
  },
  updateGradeCard(data: UpdateGradeCardType) {
    return instance.put<{ updatedGrade: UpdateGradeCardResponseType }>(
      "cards/grade",
      data
    );
  },
};
