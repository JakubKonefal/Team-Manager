import React from "react";
import classes from "./Outside.module.css";
import Logo from "../../assets/img/logo.png";

const Outside = () => (
  <div className={classes.Background}>
    <div className={classes.Wraper}>
      <nav className={classes.Navigation}>
        <img src={Logo} className={classes.Navigation__Logo} alt="Logo" />
        <h4 className={classes.Navigation__LogoLabel}>localCoach</h4>
        <div className={classes.Navigation__Items}>
          <span className={classes.Navigation__ItemText}>Home</span>
          <span className={classes.Navigation__ItemText}>Contact</span>
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
      <div className={classes.Description}>
        <h2 className={classes.Description__Football_Label}>football</h2>
        <h3 className={classes.Description__TeamManager_Label}>
          team - manager
        </h3>
        <p className={classes.Description__AppDescription}>
          Manage your football teams online. Gather all information about teams,
          players and trainings in one place!
        </p>
      </div>
    </div>
  </div>
);

export default Outside;
