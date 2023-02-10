import React, { useEffect } from "react";
import { AppBarMenu } from "../features/AppBarMenu/AppBarMenu";
import {
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
} from "@mui/material";
import { RegistrationPage } from "../features/RegistrationPage/RegistartionPage";
import { UserInfoPage } from "../features/UserInfoPaje/UserInfoPage";
import { LoginPage } from "../features/LogInPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import { ErrorSnackbar } from "../common/ErrorSnackBar/ErrorSnackBar";
import { useAppDispatch, useAppSelector } from "../app-hooks/hooks";
import { isInitializingMe } from "../store/reducers/app-reducer";
import { PasswordRecoveryPage } from "../features/PasswordRecovery/PassRecoveryPage/PasswordRecoveryPaje";
import { CheckEmailPage } from "../features/PasswordRecovery/CheckEmailPage/CheckEmeilPage";
import { NewPassPage } from "../features/PasswordRecovery/NewPassPage/NewPassPaje";
import { PrivateRoute } from "../utils/PrivateRoute";
import { PATH } from "../enums/enum-route";
import s from "./app.module.scss";
import { PackListPage } from "../features/PackListPage/PackListPage";
import { CardsPackPage } from "../features/CardsPackPage/CardsPackPage";
import { LearnPage } from "../features/LearnPage/LearnPage";

const App = React.memo(() => {
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const requestStatus = useAppSelector((state) => state.app.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isInitializingMe());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "40%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress color="inherit" />
      </div>
    );
  }
  return (
    <div className={s.app}>
      <ErrorSnackbar />
      <AppBarMenu />
      {requestStatus === "loading" && <LinearProgress color="inherit" />}

      <Container fixed>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path={PATH.PROFILE} element={<UserInfoPage />} />
              <Route path={PATH.PACK_LIST} element={<PackListPage />} />
              <Route
                path={`${PATH.LEARN_CARDS_PACK}/:cardsPack_id`}
                element={<LearnPage />}
              />
              <Route
                path={`${PATH.CARDS_PACK}/${PATH.LEARN_CARDS_PACK}/:cardsPack_id`}
                element={<LearnPage />}
              />
              <Route
                path={`${PATH.CARDS_PACK}/:cardsPack_id`}
                element={<CardsPackPage />}
              />
            </Route>
            <Route path={PATH.REGISTRATION} element={<RegistrationPage />} />
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route
              path={PATH.RECOVERY_PASS}
              element={<PasswordRecoveryPage />}
            />
            <Route path={PATH.CHECK_EMAIL} element={<CheckEmailPage />} />
            <Route path={PATH.NEW_PASS} element={<NewPassPage />} />
          </Routes>
        </Grid>
      </Container>
    </div>
  );
});

export default App;
