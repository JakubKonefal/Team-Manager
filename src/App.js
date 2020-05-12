import React, { Component } from "react";
import Outside from "./components/Outside/Outside";
import Inside from "./components/Inside/Inside";
import { Route, Switch } from "react-router";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/my-teams" component={Inside} />
          <Route path="/" component={Outside} />
        </Switch>
      </>
    );
  }
}

export default App;
