import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route path={path} element={<Component />} key={path} exact />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} exact />
      ))}

      <Route
        path="*"
        element={<ErrorPage error="404" message="Page was not found" />}
      />
    </Routes>
  );
};

export default AppRouter;
