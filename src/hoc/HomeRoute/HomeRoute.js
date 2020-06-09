import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const HomeRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser.uid ? (
          <Redirect to="/my-teams" />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
};

export default HomeRoute;
