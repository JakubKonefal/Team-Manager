import React from "react";
import classes from "./Outside.module.css";
import Logo from "../../assets/img/logo.png";

const Outside = () => (
  <div className={classes.Background}>
    <div className={classes.PageWraper}>
      <div className={classes.TopBar}>
        <img src={Logo} className={classes.TopBar__Logo_Img} alt="Logo" />
        <h4 className={classes.TopBar__Logo_Label}>localCoach</h4>
        <nav className={classes.Navigation}>
          <span className={classes.Navigation__Item_Text}>Home</span>
          <span className={classes.Navigation__Item_Text}>Contact</span>
          <div className={classes.Buttons}>
            <button
              className={`${classes.Buttons__Button} ${classes.Buttons__Button_SignUp} `}
            >
              sign up
            </button>
            <button
              className={`${classes.Buttons__Button} ${classes.Buttons__Button_Login} `}
            >
              login
            </button>
          </div>
        </nav>
      </div>
      <div className={classes.Description}>
        <h2 className={classes.Description__Title}>football</h2>
        <h3 className={classes.Description__Subtitle}>team - manager</h3>
        <p className={classes.Description__Text}>
          Manage your football teams online. Gather all information about teams,
          players and trainings in one place!
        </p>
      </div>
    </div>
  </div>
);

export default Outside;
