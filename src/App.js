import React, { Component } from "react";
import Outside from "./components/Outside/Outside";
import { Route, Switch } from "react-router";
import ProtectedRoute from "./hoc/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./hoc/AuthProvider/AuthProvider";
import TeamsManager from "./containers/TeamsManager/TeamsManager";
import TeamManager from "./containers/TeamsManager/TeamManager/TeamManager";

class App extends Component {
  render() {
    return (
      <div>
        <AuthProvider>
          <Switch>
            <ProtectedRoute path="/my-teams" exact component={TeamsManager} />
            <ProtectedRoute
              path="/my-teams/:teamId/:teamName"
              component={TeamManager}
            />

            <Route path="/" component={Outside} />
          </Switch>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
