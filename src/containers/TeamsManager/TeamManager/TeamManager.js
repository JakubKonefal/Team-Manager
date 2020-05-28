import React from "react";
import MainContentWraper from "../../../components/MainContentWraper/MainContentWraper";
import { Switch } from "react-router-dom";
import Dashboard from "../../../components/Dashboard/Dashboard";
import PlayersManager from "../../../components/Inside/PlayersManager/PlayersManager";
import TrainingsManager from "../../../components/Inside/TrainingsManager/TrainingsManager";
import TrainingOverview from "../../../components/Inside/TrainingsManager/Trainings/TrainingOverview/TrainingOverview";
import { AuthProvider } from "../../../hoc/AuthProvider/AuthProvider";
import ProtectedRoute from "../../../hoc/ProtectedRoute/ProtectedRoute";
import Layout from "../../../hoc/Layout/Layout";
import Footer from "../../../components/Navigation/Footer/Footer";

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
