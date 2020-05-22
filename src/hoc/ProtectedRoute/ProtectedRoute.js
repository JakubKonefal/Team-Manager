import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser, currentUid, currentUserEmail } = useContext(AuthContext);
  const { loggedIn, loggedInUid, loggedInUserEmail } = {
    ...rest.location.state,
  };

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser || loggedIn ? (
          <RouteComponent
            {...routeProps}
            userId={currentUid || loggedInUid}
            email={currentUserEmail || loggedInUserEmail}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default withRouter(ProtectedRoute);
