import React, { useState, useEffect } from 'react';
import classes from './Login.module.css';
import { auth } from '../firebase/firebase';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';

const Login = ({ history, currentUser, setAllValues }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    passwordError: false,
    passwordErrorMsg: '',
    emailError: false,
    emailErrorMsg: '',
  });

  useEffect(() => {
    if (currentUser.uid) {
      history.push({
        pathname: '/my-teams',
      });
    }
  }, []);

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    id === 'email' ? setEmail(value) : setPassword(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setAllValues({
          currentUser: user,
          currentUid: user.uid,
          currentUserEmail: user.email,
        });
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          const errorMessage = 'Incorrect password!';
          setErrors({
            passwordError: true,
            passwordErrorMsg: errorMessage,
            emailError: false,
            emailErrorMsg: '',
          });
        }
        if (error.code === 'auth/user-not-found') {
          const errorMessage = 'User not found!';
          setErrors({
            passwordError: false,
            passwordErrorMsg: '',
            emailError: true,
            emailErrorMsg: errorMessage,
          });
        }
      });
  };

  return (
    <form
      className={classes.Login}
      onChange={(event) => handleInputChange(event)}
      onSubmit={(event) => handleFormSubmit(event)}
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
          error={errors.emailError}
          helperText={errors.emailErrorMsg}
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
          error={errors.passwordError}
          helperText={errors.passwordErrorMsg}
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
};

export default withRouter(Login);
