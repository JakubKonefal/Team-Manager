import React from "react";
import TeamsManager from "../../containers/TeamsManager/TeamsManager";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../../hoc/ProtectedRoute/ProtectedRoute";
import TeamManager from "../../containers/TeamsManager/TeamManager/TeamManager";

const Inside = () => (
  <div>
    <Switch>
      <ProtectedRoute path="/my-teams" exact component={TeamsManager} />
      <ProtectedRoute path="/my-teams/:teamId" component={TeamManager} />
    </Switch>
  </div>
);

export default Inside;
