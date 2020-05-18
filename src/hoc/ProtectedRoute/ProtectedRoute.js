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
      } else {
        const { component: Component, ...rest } = this.props;
        const route = (
          <Route
            {...rest}
            render={(props) => {
              return <Component {...props} userId={user.uid} />;
            }}
          />
        );

        this.setState({
          route,
        });
      }
    });
  };

  componentDidMount() {
    this.isLoggedIn();
    console.log("ComponentDidMount");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.component !== this.props.component) {
      this.isLoggedIn();
      console.log("ComponentDidUpdate");
    }
  }

  render() {
    return this.state.route;
  }
}

export default ProtectedRoute;
