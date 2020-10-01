import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { userRoutes, publicRoutes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import { selectAuthenticated, selectIsLoading } from "../redux/authSlice";
import Loading from "../components/Loading";

const RouterSwitch = () => {
  const isLoggedIn = useSelector(selectAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <Loading></Loading>;

  if (isLoggedIn) {
    //rotte utente normale
    return (
      //rotte pubbliche
      <Switch>
        {userRoutes.map((route) => (
          <PrivateRoute
            key={route?.path}
            path={route?.path}
            exact={route?.exact}
            component={route?.main}
          />
        ))}
        <Redirect from="/" to="/feed" />
      </Switch>
    );
  } else {
    return (
      //rotte pubbliche
      <Switch>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        <Redirect from="/" to="/signin" />
      </Switch>
    );
  }
};
export default RouterSwitch;
