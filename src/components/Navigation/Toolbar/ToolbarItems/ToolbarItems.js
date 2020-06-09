import React, { Component } from "react";
import classes from "./ToolbarItems.module.css";
import Logo from "../../../../assets/img/logo.png";
import {
  auth,
  database,
  emailAuthProvider,
} from "../../../../firebase/firebase";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutlined from "@material-ui/icons/LockOutlined";
import CheckCircle from "@material-ui/icons/CheckCircle";

class ToolbarItems extends Component {
  state = {
    showDeleteMessage: false,
    modalOpen: false,
    password: "",
    passwordError: false,
    accountDeleted: false,
  };

  deleteAccount = (event) => {
    event.preventDefault();
    const { email } = this.props;
    const { password } = this.state;
    const credentials = emailAuthProvider.credential(email, password);
    auth.currentUser
      .reauthenticateWithCredential(credentials)
      .then(() => {
        this.setState({ accountDeleted: true });
      })
      .then(() => {
        setTimeout(() => {
          auth.currentUser.delete();
          database.ref(`users/${this.props.userId}`).remove();
        }, 1000);
      })
      .catch(() => {
        this.setState({ passwordError: true });
      });
  };

  toggleDeleteMessage = () => {
    this.setState({ showDeleteMessage: !this.state.showDeleteMessage });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false, showDeleteMessage: false });
  };

  handlePasswordInputChange = ({ target: { value } }) => {
    this.setState({ password: value });
  };

  render() {
    const deleteCardClass = this.state.showDeleteMessage
      ? classes.ToolbarItems__DeleteCard
      : classes.ToolbarItems__DeleteCard_Inactive;

    const passwordErrorMessage =
      this.state.passwordError && "Incorrect password!";

    return (
      <>
        <img src={Logo} className={classes.ToolbarItems__Logo_Img} alt="Logo" />
        <h4 className={classes.ToolbarItems__Logo_Label}>localCoach</h4>
        <div className={classes.ToolbarItems__Email}>
          <span onClick={this.toggleDeleteMessage}>{this.props.email}</span>
          <div>
            <div className={deleteCardClass}>
              <div className={classes.ToolbarItems__DeleteCardArrow}></div>
              <span className={classes.TooblarItems__DeleteLabel}>
                Do you want to delete this account?
              </span>
              <div className={classes.ToolbarItems__Buttons}>
                <button
                  className={`${classes.ToolbarItems__Button} ${classes.ToolbarItems__Button_Yes} `}
                  onClick={this.handleModalOpen}
                >
                  Yes
                </button>
                <button
                  className={` ${classes.ToolbarItems__Button} ${classes.ToolbarItems__Button_No}`}
                  onClick={this.toggleDeleteMessage}
                >
                  No
                </button>
                <Modal
                  open={this.state.modalOpen}
                  onClose={this.handleModalClose}
                >
                  {this.state.accountDeleted ? (
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
                        onSubmit={(event) => this.deleteAccount(event)}
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
                          error={this.state.passwordError}
                          helperText={passwordErrorMessage}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlined />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(event) =>
                            this.handlePasswordInputChange(event)
                          }
                        />
                        <button
                          className={`${classes.ToolbarItems__Button} ${classes.ToolbarItems__Button_Delete} `}
                          type="submit"
                          onClick={this.deleteAccount}
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
        </div>

        <button
          className={classes.ToolbarItems__Logout}
          onClick={() => {
            auth.signOut().then(() => {
              this.props.history.replace("/");
            });
          }}
        >
          Logout
        </button>
      </>
    );
  }
}

export default withRouter(ToolbarItems);
