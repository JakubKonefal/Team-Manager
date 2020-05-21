import React from "react";
import classes from "./ToolbarItems.module.css";
import Logo from "../../../../assets/img/logo-green.png";
import { auth } from "../../../../firebase/firebase";

const ToolbarItems = ({ email }) => {
  return (
    <>
      <img src={Logo} className={classes.ToolbarItems__Logo_Img} />
      <h4 className={classes.ToolbarItems__Logo_Label}>localCoach</h4>
      <span className={classes.ToolbarItems__Email}>{email}</span>
      <button
        className={classes.ToolbarItems__Logout}
        onClick={() => auth.signOut()}
      >
        Logout
      </button>
    </>
  );
};

export default ToolbarItems;
