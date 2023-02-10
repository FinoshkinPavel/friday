import { appReducer } from "./reducers/app-reducer";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { authLoginReducer } from "./reducers/auth-login-reduscer";
import { userInfoReducer } from "./reducers/user-information-reducer";
import { passwordRecoveryReducer } from "./reducers/password-recovery-reducer";
import { packListReducer } from "./reducers/pack-list-reducer";
import { cardsReducer } from "./reducers/cards-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  app: appReducer,
  authLogin: authLoginReducer,
  userInfo: userInfoReducer,
  passRecover: passwordRecoveryReducer,
  packList: packListReducer,
  cardsPack: cardsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type StoreType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

//@ts-ignore
window.store = store;
