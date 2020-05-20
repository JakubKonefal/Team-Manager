import React from "react";
import classes from "./TeamManager.module.css";
import MainContentWraper from "../../../components/MainContentWraper/MainContentWraper";
import { Link, Switch } from "react-router-dom";
import PlayersManager from "../../../components/Inside/PlayersManager/PlayersManager";
import TrainingsManager from "../../../components/Inside/TrainingsManager/TrainingsManager";
import TrainingOverview from "../../../components/Inside/TrainingsManager/Trainings/TrainingOverview/TrainingOverview";
import { AuthProvider } from "../../../hoc/AuthProvider/AuthProvider";
import ProtectedRoute from "../../../hoc/ProtectedRoute/ProtectedRoute";

const TeamManager = ({ location }) => (
  <div>
    <MainContentWraper>
      <ul className={classes.Navbar}>
        <Link
          className={classes.Navbar__Item}
          to={{
            pathname: `/my-teams/${location.teamId}/players`,
            teamId: location.teamId,
            teamName: location.teamName,
          }}
        >
          Players
        </Link>
        <Link
          className={classes.Navbar__Item}
          to={{
            pathname: `/my-teams/${location.teamId}/trainings`,
            teamId: location.teamId,
          }}
        >
          Trainings
        </Link>
        <li className={classes.Navbar__Item}>Table</li>
        <li className={classes.Navbar__Item}>Settings</li>
      </ul>
      <div>
        <AuthProvider>
          <ProtectedRoute
            path="/my-teams/:teamId/players"
            component={PlayersManager}
          />
          <Switch>
            <ProtectedRoute
              path="/my-teams/:teamId/trainings/:year/:month/:trainingId"
              component={TrainingOverview}
            />
            <ProtectedRoute
              path="/my-teams/:teamId/trainings"
              component={TrainingsManager}
            />
          </Switch>
        </AuthProvider>
      </div>
    </MainContentWraper>
  </div>
);

export default TeamManager;
