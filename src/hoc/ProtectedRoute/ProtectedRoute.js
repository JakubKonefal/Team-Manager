import React, { Component } from "react";
import { auth } from "../../firebase/firebase";

import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
  state = {
    route: null,
  };

  isLoggedIn = () => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ route: <Redirect to="/" /> });
      }
    });
  };

  componentDidMount() {
    this.setState({
      route: (
        <Route
          component={this.props.component}
          path={this.props.path}
          exact={this.props.exact}
        />
      ),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.component !== this.props.component) {
      this.setState({
        route: (
          <Route
            component={this.props.component}
            path={this.props.path}
            exact={this.props.exact}
          />
        ),
      });
    }
  }

  render() {
    this.isLoggedIn();

    return this.state.route;
  }
}

export default ProtectedRoute;
