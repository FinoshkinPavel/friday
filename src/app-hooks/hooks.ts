import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, StoreType} from "../store/store";

export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector
export const useAppDispatch: ()=> AppDispatch = useDispatch

//export const useAppDispatch = () => useDispatch<AppDispatch>()