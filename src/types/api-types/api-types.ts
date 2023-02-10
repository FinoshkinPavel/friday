// -----------------REGISTRATION
export type RegisteredParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};

// ----------------USER TYPE
export type UserInfoResponse = {
  _id: string;
  email: string;
  rememberMe: boolean;
  avatar: string;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
};

export type UpdateUserInfoResponse = {
  updatedUser: UserInfoResponse;
};

export type UpdateUserName = {
  name?: string;
  avatar?: string;
};

//---------------------PACK LIST TYPE

export type PacksListType = {
  cardPacks: Array<PackListType>;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
};

export type PackListType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: 0;
};

export type RequestPackListUriParamType = {
  packName?: string | null;
  min?: number | undefined;
  max?: number | undefined;
  sortPacks?: number | null;
  page?: number | undefined;
  pageCount?: number | undefined;
  user_id?: string | null;
};

//----------------CRUD PACK LIST

export type NewPackListDataType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};

export type UpdatePackListDataType = {
  _id: string;
  name: string;
  private: boolean;
};

//-------------------CARDS PACK
export type CardsPackResponse = {
  cards: Array<CardType>;
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packDeckCover: string;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
};

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  questionImg?: string;
  _id: string;
};

export type RequestCardsUriParamType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: number;
  page?: number;
  pageCount?: number;
};
//----------------CRUD CARDS PACK

export type NewCardsModelType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type UpdateCardModelType = {
  _id: string;
  question?: string;
  answer?: string;
};

export type UpdateGradeCardType = {
  grade: number;
  card_id: string;
};

export type UpdateGradeCardResponseType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
};
