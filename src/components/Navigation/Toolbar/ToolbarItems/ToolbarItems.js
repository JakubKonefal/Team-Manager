import React from "react";
import classes from "./ToolbarItems.module.css";
import Logo from "../../../../assets/img/logo-blue.png";
import { auth } from "../../../../firebase/firebase";
import { withRouter } from "react-router-dom";

const ToolbarItems = ({ email, history }) => {
  return (
    <>
      <img src={Logo} className={classes.ToolbarItems__Logo_Img} alt="Logo" />
      <h4 className={classes.ToolbarItems__Logo_Label}>localCoach</h4>
      <span className={classes.ToolbarItems__Email}>{email}</span>
      <button
        className={classes.ToolbarItems__Logout}
        onClick={() => {
          auth.signOut().then(() => {
            history.replace("/");
          });
        }}
      >
        Logout
      </button>
    </>
  );
};

export default withRouter(ToolbarItems);
