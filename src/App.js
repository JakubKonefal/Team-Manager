import React from "react";
import Outside from "./components/Outside/Outside";
import { Switch } from "react-router";
import ProtectedRoute from "./hoc/ProtectedRoute/ProtectedRoute";
import HomeRoute from "./hoc/HomeRoute/HomeRoute";
import { AuthProvider } from "./hoc/AuthProvider/AuthProvider";
import TeamsManager from "./containers/TeamsManager/TeamsManager";
import TeamManager from "./containers/TeamsManager/TeamManager/TeamManager";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <ProtectedRoute path="/my-teams" exact component={TeamsManager} />
        <ProtectedRoute
          path="/my-teams/:teamId/:teamName"
          component={TeamManager}
        />

        <HomeRoute path="/" component={Outside} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
