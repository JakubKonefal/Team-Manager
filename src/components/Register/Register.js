import React, { Component } from "react";
import classes from "./Register.module.css";
import axios from "axios";
import { auth, database } from "../../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutlined from "@material-ui/icons/LockOutlined";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    email: "",
    password: "",
    registered: false,
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
    auth.createUserWithEmailAndPassword(email, password).then((res) => {
      this.getUserDefaultData().then(({ data: { teams: userDefaultData } }) => {
        database.ref(`users/${res.user.uid}`).set({
          userId: res.user.uid,
          userEmail: email,
          teams: userDefaultData,
        });
        this.setState({ registered: true });
        auth.signOut();
      });
    });
  };

  getUserDefaultData = async () => {
    const data = await axios.get("/userDefaultData.json");
    return data;
  };

  render() {
    const register = this.state.registered ? (
      <div className={classes.Register_After}>
        <CheckCircle className={classes.Register_After__DoneIcon} />
        <p className={classes.Register_After__Text}>
          Your account has been created!
        </p>
        <p className={classes.Register_After__Text}>You may now log in.</p>
      </div>
    ) : (
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

    return <>{register}</>;
  }
}

export default Register;
