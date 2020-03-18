import React from "react";
import TeamsManager from "../../containers/TeamsManager/TeamsManager";
import SideMenu from "./Navigation/SideMenu/SideMenu";
import { Route, Switch } from "react-router-dom";
import TeamManager from "../../containers/TeamsManager/TeamManager/TeamManager";

const Inside = props => {
  return (
    <div>
      <SideMenu />
      <Switch>
        <Route path="/my-teams" exact component={TeamsManager} />
        <Route path="/my-teams/:teamId" component={TeamManager} />
      </Switch>
    </div>
  );
};

export default Inside;
