import React, { Component } from "react";
import classes from "./Login.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  handleFormSubmit = () => {
    alert("Login");
  };

  render() {
    return (
      <form
        className={classes.Login}
        onChange={(event) => this.handleInputChange(event)}
        onSubmit={this.handleFormSubmit}
      >
        <div className={classes.Login__Header}>
          <h3 className={classes.Login__Title}>login</h3>
        </div>
        <div className={classes.Login__Inputs}>
          <TextField
            className={classes.Login__Input}
            type="email"
            id="email"
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
            variant="outlined"
            size="small"
            label="Password"
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
          sign up
        </Button>
      </form>
    );
  }
}

export default Login;
