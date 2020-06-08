import React, { Component } from "react";
import classes from "./ToolbarItems.module.css";
import Logo from "../../../../assets/img/logo.png";
import { auth, database } from "../../../../firebase/firebase";
import { withRouter } from "react-router-dom";

class ToolbarItems extends Component {
  state = {
    showDeleteMessage: false,
  };

  deleteAccount = () => {
    auth.currentUser.delete().catch((err) => {
      console.log(err);
    });
    database.ref(`users/${this.props.userId}`).remove();
  };

  toggleDeleteMessage = () => {
    this.setState({ showDeleteMessage: !this.state.showDeleteMessage });
  };

  render() {
    const deleteCardClass = this.state.showDeleteMessage
      ? classes.ToolbarItems__DeleteCard
      : classes.ToolbarItems__DeleteCard_Inactive;

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
                  onClick={this.deleteAccount}
                >
                  Yes
                </button>
                <button
                  className={` ${classes.ToolbarItems__Button} ${classes.ToolbarItems__Button_No}`}
                  onClick={this.toggleDeleteMessage}
                >
                  No
                </button>
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
