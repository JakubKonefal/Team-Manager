import React from "react";
import TeamsManager from "../../containers/TeamsManager/TeamsManager";
import { Route, Switch } from "react-router-dom";
import TeamManager from "../../containers/TeamsManager/TeamManager/TeamManager";

const Inside = () => (
  <div>
    <Switch>
      <Route path="/my-teams" exact component={TeamsManager} />
      <Route path="/my-teams/:teamId" component={TeamManager} />
    </Switch>
  </div>
);

export default Inside;
