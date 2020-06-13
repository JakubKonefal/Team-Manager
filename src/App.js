import React from "react";
import Home from "./Home/Home";
import { Switch } from "react-router";
import ProtectedRoute from "./shared/ProtectedRoute/ProtectedRoute";
import HomeRoute from "./Home/HomeRoute";
import { AuthProvider } from "./shared/AuthProvider/AuthProvider";
import TeamsManager from "./TeamsManager/TeamsManager";
import TeamManager from "./TeamManager/TeamManager";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <ProtectedRoute path="/my-teams" exact component={TeamsManager} />
        <ProtectedRoute
          path="/my-teams/:teamId/:teamName"
          component={TeamManager}
        />
        <HomeRoute path="/" component={Home} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
