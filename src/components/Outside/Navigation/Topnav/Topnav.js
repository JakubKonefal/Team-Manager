import React from "react";
import classes from "./Topnav.module.css";
import { Link } from "react-router-dom";

const Topnav = () => {
  return (
    <div className={classes.Topnav}>
      <span>Football Manager</span>
      <div className={classes.BtnsWraper}>
        <Link to="/my-teams">
          <button className={classes.Login}>Sign up</button>
        </Link>
        <button className={classes.Signup}>Log in</button>
      </div>
    </div>
  );
};

export default Topnav;
