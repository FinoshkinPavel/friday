import { instance } from "./axiosInstance/axiosInstance";
import {
  NewPackListDataType,
  PacksListType,
  RequestPackListUriParamType,
  UpdatePackListDataType,
} from "../../types/api-types/api-types";

export const packListAPI = {
  getAllPacksList(data: RequestPackListUriParamType) {
    return instance.get<PacksListType>("cards/pack", { params: data });
  },
  addNewPack(data: NewPackListDataType) {
    return instance.post("cards/pack", { cardsPack: data });
  },
  updatePackList(data: UpdatePackListDataType) {
    return instance.put("cards/pack", { cardsPack: data });
  },
  deletePackList(packId: string) {
    return instance.delete(`cards/pack?id=${packId}`);
  },
};
