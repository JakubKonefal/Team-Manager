import React, { Component } from "react";
import classes from "./Login.module.css";
import { auth } from "../../firebase/firebase";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
    passwordError: false,
  };

  componentDidUpdate() {
    const { history, currentUser } = this.props;
    if (currentUser.uid) {
      history.push({
        pathname: "/my-teams",
      });
    }
  }

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.props.setAllValues({
          currentUser: user,
          currentUid: user.uid,
          currentUserEmail: user.email,
        });
      })
      .catch(() => {
        this.setState({ passwordError: true });
      });
  };

  render() {
    const passwordErrorMessage =
      this.state.passwordError && "Incorrect password!";

    return (
      <form
        className={classes.Login}
        onChange={(event) => this.handleInputChange(event)}
        onSubmit={(event) => this.handleFormSubmit(event)}
      >
        <div className={classes.Login__Header}>
          <h3 className={classes.Login__Title}>login</h3>
        </div>
        <div className={classes.Login__Inputs}>
          <TextField
            className={classes.Login__Input}
            type="email"
            id="email"
            name="email"
            variant="outlined"
            size="small"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              ),
            }}
            required
          />
          <TextField
            className={classes.Login__Input}
            type="password"
            id="password"
            name="password"
            variant="outlined"
            size="small"
            label="Password"
            error={this.state.passwordError}
            helperText={passwordErrorMessage}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
            }}
            required
          />
        </div>

        <Button
          className={classes.Login__Button}
          type="submit"
          variant="contained"
        >
          log in
        </Button>
      </form>
    );
  }
}

export default withRouter(Login);
