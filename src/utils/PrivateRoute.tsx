import React from 'react';
import {useAppSelector} from "../app-hooks/hooks";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoute = () => {
  const loggedIn = useAppSelector((state) => state.authLogin.loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

