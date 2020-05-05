import React from "react";
import classes from "./Outside.module.css";

const Outside = () => (
  <div className={classes.Background}>
    <nav className={classes.Navigation}>
      <h2 className={classes.Navigation__Logo}>team manager logo</h2>
      <div className={classes.Navigation__Items}>
        <span
          className={`${classes.Navigation__Item} ${classes.Navigation__ItemText}`}
        >
          Home
        </span>
        <span
          className={`${classes.Navigation__Item} ${classes.Navigation__ItemText}`}
        >
          Contact
        </span>
        <div className={classes.Navigation__Buttons}>
          <button
            className={`${classes.Navigation__Button_SignIn} ${classes.Navigation__Button}`}
          >
            sign up
          </button>
          <button
            className={`${classes.Navigation__Button_Login} ${classes.Navigation__Button}`}
          >
            login
          </button>
        </div>
      </div>
    </nav>
    <main></main>
  </div>
);

export default Outside;
