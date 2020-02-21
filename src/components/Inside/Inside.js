import React from "react";
import TeamsManager from "../../containers/TeamsManager/TeamsManager";
import SideMenu from "./Navigation/SideMenu/SideMenu";
import { Route, Switch } from "react-router-dom";
import TeamManager from "../../containers/TeamsManager/TeamManager/TeamManager";

const inside = props => {
  return (
    <div>
      <SideMenu />
      <Switch>
        <Route path="/my-teams" exact component={TeamsManager} />
        <Route path="/my-teams/:teamName" component={TeamManager} />
      </Switch>
    </div>
  );
};

export default inside;
