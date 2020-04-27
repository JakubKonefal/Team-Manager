import React from "react";
import classes from "./TeamManager.module.css";
import MainContentWraper from "../../../components/MainContentWraper/MainContentWraper";
import { Route, Link, Switch } from "react-router-dom";
import PlayersManager from "../../../components/Inside/PlayersManager/PlayersManager";
import TrainingsManager from "../../../components/Inside/TrainingsManager/TrainingsManager";
import TrainingOverview from "../../../components/Inside/TrainingsManager/Trainings/TrainingOverview/TrainingOverview";

const TeamManager = ({ location }) => (
  <div>
    <MainContentWraper>
      <ul className={classes.NavLeft}>
        <Link
          to={{
            pathname: `/my-teams/${location.teamId}/players`,
            teamId: location.teamId,
            teamName: location.teamName,
          }}
        >
          Players
        </Link>
        <Link
          to={{
            pathname: `/my-teams/${location.teamId}/trainings`,
            teamId: location.teamId,
          }}
        >
          Trainings
        </Link>
        <li className={classes.Inactive}>Table</li>
        <li className={classes.Inactive}>Settings</li>
      </ul>
      <div>
        <Route path="/my-teams/:teamId/players" component={PlayersManager} />
        <Switch>
          <Route
            path="/my-teams/:teamId/trainings/:trainingId"
            component={TrainingOverview}
          />
          <Route
            path="/my-teams/:teamId/trainings"
            component={TrainingsManager}
          />
        </Switch>
      </div>
    </MainContentWraper>
  </div>
);

export default TeamManager;
