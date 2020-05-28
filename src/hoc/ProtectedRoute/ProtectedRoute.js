import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser, currentUid, currentUserEmail } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser.uid ? (
          <RouteComponent
            {...routeProps}
            userId={currentUid}
            email={currentUserEmail}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default withRouter(ProtectedRoute);
