import React, { Component, useContext } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { selectAuthenticated } from "../redux/authSlice";

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(selectAuthenticated);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
