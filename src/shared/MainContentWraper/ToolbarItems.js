import React, { useState } from 'react';
import classes from './ToolbarItems.module.css';
import Logo from '../../assets/img/logo.png';
import { auth, database, emailAuthProvider } from '../../firebase/firebase';
import { withRouter } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlined from '@material-ui/icons/LockOutlined';
import CheckCircle from '@material-ui/icons/CheckCircle';

const ToolbarItems = ({ history, email, userId }) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const deleteAccount = (event) => {
    event.preventDefault();
    const credentials = emailAuthProvider.credential(email, password);
    auth.currentUser
      .reauthenticateWithCredential(credentials)
      .then(() => {
        setAccountDeleted(true);
      })
      .then(() => {
        setTimeout(() => {
          auth.currentUser.delete();
          database.ref(`users/${userId}`).remove();
        }, 1000);
      })
      .catch(() => {
        setPasswordError(true);
      });
  };

  const toggleDeleteMessage = () => {
    setShowDeleteMessage((previousVal) => !previousVal);
  };

  const handlePasswordInputChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const deleteCardClass = showDeleteMessage
    ? classes.ToolbarItems__DeleteCard
    : classes.ToolbarItems__DeleteCard_Inactive;

  const passwordErrorMessage = passwordError && 'Incorrect password!';

  return (
    <>
      <div className={classes.ToolbarItems__Logo}>
        <img src={Logo} className={classes.ToolbarItems__Logo_Img} alt="Logo" />
        <h4 className={classes.ToolbarItems__Logo_Label}>localCoach</h4>
      </div>
      <div className={classes.ToolbarItems__Controls}>
        <div className={classes.ToolbarItems__Email}>
          <span onClick={toggleDeleteMessage}>{email}</span>

          <div className={deleteCardClass}>
            <div className={classes.ToolbarItems__DeleteCardArrow}></div>
            <span className={classes.TooblarItems__DeleteLabel}>
              Do you want to delete this account?
            </span>
            <div className={classes.ToolbarItems__Buttons}>
              <button
                className={`${classes.ToolbarItems__Button} ${classes.ToolbarItems__Button_Yes} `}
                onClick={() => setModalOpen(true)}
              >
                Yes
              </button>
              <button
                className={` ${classes.ToolbarItems__Button} ${classes.ToolbarItems__Button_No}`}
                onClick={toggleDeleteMessage}
              >
                No
              </button>
              <Modal
                open={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                  setShowDeleteMessage(false);
                }}
              >
                {accountDeleted ? (
                  <DialogContent className={classes.ToolbarItems__Modal}>
                    <div
                      className={classes.ToolbarItems__AccountDeletedMessage}
                    >
                      <CheckCircle
                        className={classes.ToolbarItems__CheckIcon}
                      />
                      <span>Your account will be deleted!</span>
                    </div>
                  </DialogContent>
                ) : (
                  <DialogContent className={classes.ToolbarItems__Modal}>
                    <form
                      className={classes.ToolbarItems__ModalForm}
                      onSubmit={(event) => deleteAccount(event)}
                    >
                      <span
                        className={classes.ToolbarItems__ConfrimPasswordLabel}
                      >
                        Confrim with password:
                      </span>
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        variant="outlined"
                        size="small"
                        placeholder="Password"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(event) => handlePasswordInputChange(event)}
                      />
                      <button
                        className={`${classes.ToolbarItems__Button} ${classes.ToolbarItems__Button_Delete} `}
                        type="submit"
                        onClick={deleteAccount}
                      >
                        Delete
                      </button>
                    </form>
                  </DialogContent>
                )}
              </Modal>
            </div>
          </div>
        </div>
        <button
          className={classes.ToolbarItems__Logout}
          onClick={() => {
            auth.signOut().then(() => {
              history.replace('/');
            });
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default withRouter(ToolbarItems);
