import React, { Component } from "react";
import classes from "./Register.module.css";
import StylesProvider from "@material-ui/styles/StylesProvider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  render() {
    return (
      <StylesProvider injectFirst>
        <form
          className={classes.Register}
          onChange={(event) => this.handleInputChange(event)}
        >
          <div className={classes.Register__Header}>
            <h3 className={classes.Register__Title}>sign up</h3>
          </div>
          <div className={classes.Register__Inputs}>
            <TextField
              className={classes.Register__Input}
              id="name"
              variant="outlined"
              size="small"
              label="Account name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.Register__Input}
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
            />
            <TextField
              className={classes.Register__Input}
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
            />
          </div>

          <Button
            className={classes.Register__Button}
            type="submit"
            variant="contained"
            color="secondary"
          >
            sign up
          </Button>
        </form>
      </StylesProvider>
    );
  }
}

export default Register;
