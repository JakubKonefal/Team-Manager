import React, { useState } from 'react';
import classes from './Register.module.css';
import axios from 'axios';
import { auth, database } from '../firebase/firebase';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    passwordError: false,
    passwordErrorMsg: '',
    emailError: false,
    emailErrorMsg: '',
  });

  const getUserDefaultData = async () => {
    const data = await axios.get('/userDefaultData.json');
    return data;
  };

  const createUserObjInDatabase = (uid, email, userDefaultData) => {
    database.ref(`users/${uid}`).set({
      userId: uid,
      userEmail: email,
      teams: userDefaultData,
    });
  };

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    id === 'email' ? setEmail(value) : setPassword(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        alert('Your account has been succesfully created! You may now log in.');
        auth.signOut();
        getUserDefaultData().then(({ data: { teams: userDefaultData } }) => {
          const uid = res.user.uid;
          createUserObjInDatabase(uid, email, userDefaultData);
        });
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          const errorMessage = error.message;
          setErrors({
            passwordError: true,
            passwordErrorMsg: errorMessage,
            emailError: false,
            emailErrorMsg: '',
          });
        }
        if (error.code === 'auth/email-already-in-use') {
          const errorMessage = 'Email already in use!';
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
      className={classes.Register}
      onChange={(event) => handleInputChange(event)}
      onSubmit={(event) => handleFormSubmit(event)}
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
          error={errors.emailError}
          helperText={errors.emailErrorMsg}
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
          error={errors.passwordError}
          helperText={errors.passwordErrorMsg}
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
};

export default Register;
