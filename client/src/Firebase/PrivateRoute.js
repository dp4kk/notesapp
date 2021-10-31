import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { FirebaseData } from "./FirebaseContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(FirebaseData);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
