import React from "react";
import TeamsManager from "../../containers/TeamsManager/TeamsManager";
import { Switch } from "react-router-dom";
import TeamManager from "../../containers/TeamsManager/TeamManager/TeamManager";
import { AuthProvider } from "../../hoc/AuthProvider/AuthProvider";
import ProtectedRoute from "../../hoc/ProtectedRoute/ProtectedRoute";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Inside = () => (
  <div>
    <AuthProvider>
      <Toolbar />
      <Switch>
        <ProtectedRoute path="/my-teams" exact component={TeamsManager} />
        <ProtectedRoute path="/my-teams/:teamId" component={TeamManager} />
      </Switch>
    </AuthProvider>
  </div>
);

export default Inside;
