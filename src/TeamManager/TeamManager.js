import React from "react";
import MainContentWraper from "../shared//MainContentWraper/MainContentWraper";
import { Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import PlayersManager from "./PlayersManager/PlayersManager";
import TrainingsManager from "./TrainingsManager/TrainingsManager";
import TrainingOverview from "./TrainingOverview/TrainingOverview";
import { AuthProvider } from "../shared/AuthProvider/AuthProvider";
import ProtectedRoute from "../shared/ProtectedRoute/ProtectedRoute";
import Layout from "../shared/Layout/Layout";
import Footer from "../shared/Footer/Footer";

const TeamManager = ({ match }) => (
  <Layout>
    <MainContentWraper match={match}>
      <AuthProvider>
        <ProtectedRoute
          path="/my-teams/:teamId/:teamName"
          exact
          component={Dashboard}
        />
        <ProtectedRoute
          path="/my-teams/:teamId/:teamName/players"
          component={PlayersManager}
        />
        <Switch>
          <ProtectedRoute
            path="/my-teams/:teamId/:teamName/trainings/:year/:month/:trainingId"
            component={TrainingOverview}
          />
          <ProtectedRoute
            path="/my-teams/:teamId/:teamName/trainings"
            component={TrainingsManager}
          />
        </Switch>
      </AuthProvider>
    </MainContentWraper>
    <Footer />
  </Layout>
);

export default TeamManager;
