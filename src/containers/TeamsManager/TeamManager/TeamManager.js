import React from "react";
import classes from "./TeamManager.module.css";
import MainContentWraper from "../../../components/MainContentWraper/MainContentWraper";
import { Route, Link, Switch } from "react-router-dom";
import Players from "../../../components/Inside/Players/Players";
import Trainings from "../../../components/Inside/Trainings/Trainings";
import TrainingPlan from "../../../components/Inside/Trainings/TrainingPlan/TrainingPlan";

const TeamManager = props => (
  <div>
    <MainContentWraper>
      <ul className={classes.NavLeft}>
        <Link
          to={{
            pathname: `/my-teams/${props.location.teamId}/players`,
            teamId: props.location.teamId,
            teamName: props.location.teamName
          }}
        >
          Players
        </Link>
        <Link
          to={{
            pathname: `/my-teams/${props.location.teamId}/trainings`,
            teamId: props.location.teamId
          }}
        >
          Trainings
        </Link>
        <li className={classes.Inactive}>Table</li>
        <li className={classes.Inactive}>Settings</li>
      </ul>
      <div>
        <Route path="/my-teams/:teamId/players" component={Players} />
        <Switch>
          <Route
            path="/my-teams/:teamId/trainings/:trainingId"
            component={TrainingPlan}
          />
          <Route path="/my-teams/:teamId/trainings" component={Trainings} />
        </Switch>
      </div>
    </MainContentWraper>
  </div>
);

export default TeamManager;