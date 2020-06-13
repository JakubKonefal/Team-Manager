import React, { Component } from "react";
import classes from "./Register.module.css";
import axios from "axios";
import { auth, database } from "../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    email: "",
    password: "",
    passwordError: false,
    passwordErrorMsg: "",
    emailError: false,
    emailErrorMsg: "",
  };

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
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        alert("Your account has been succesfully created! You may now log in.");
        auth.signOut();
        this.getUserDefaultData().then(
          ({ data: { teams: userDefaultData } }) => {
            const uid = res.user.uid;
            this.createUserObjInDatabase(uid, email, userDefaultData);
          }
        );
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          this.setState({
            passwordError: true,
            passwordErrorMsg: error.message,
            emailError: false,
            emailErrorMsg: "",
          });
        }
        if (error.code === "auth/email-already-in-use") {
          const errorMessage = "Email already in use";
          this.setState({
            emailError: true,
            emailErrorMsg: errorMessage,
            passwordError: false,
            passwordErrorMsg: "",
          });
        }
      });
  };

  getUserDefaultData = async () => {
    const data = await axios.get("/userDefaultData.json");
    return data;
  };

  createUserObjInDatabase = (uid, email, userDefaultData) => {
    database.ref(`users/${uid}`).set({
      userId: uid,
      userEmail: email,
      teams: userDefaultData,
    });
  };

  render() {
    return (
      <form
        className={classes.Register}
        onChange={(event) => this.handleInputChange(event)}
        onSubmit={(event) => this.handleFormSubmit(event)}
      >
        <div className={classes.Register__Header}>
          <h3 className={classes.Register__Title}>sign up</h3>
        </div>
        <div className={classes.Register__Inputs}>
          <TextField
            className={classes.Register__Input}
            type="email"
            id="email"
            name="email"
            variant="outlined"
            size="small"
            error={this.state.emailError}
            helperText={this.state.emailErrorMsg}
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
            name="password"
            variant="outlined"
            size="small"
            error={this.state.passwordError}
            helperText={this.state.passwordErrorMsg}
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
