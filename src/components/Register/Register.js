import React, { Component } from "react";
import classes from "./Register.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";

class Register extends Component {
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
    alert("Register");
  };

  render() {
    return (
      <form
        className={classes.Register}
        onChange={(event) => this.handleInputChange(event)}
        onSubmit={this.handleFormSubmit}
      >
        <div className={classes.Register__Header}>
          <h3 className={classes.Register__Title}>sign up</h3>
        </div>
        <div className={classes.Register__Inputs}>
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
            required
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
            required
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
    );
  }
}

export default Register;
