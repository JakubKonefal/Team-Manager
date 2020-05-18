import React from "react";
import classes from "./TeamsManager.module.css";
import { auth } from "../../firebase/firebase";
import "../../assets/webfonts/all.css";
import MainContentWraper from "../../components/MainContentWraper/MainContentWraper";
import Teams from "../../components/Inside/TeamsManager/Teams/Teams";

const TeamsManager = ({ userId }) => {
  return (
    <MainContentWraper>
      <div className={classes.TeamsManager}>
        <h1 className={classes.TeamsManager__Header}>
          Choose team to manage or create a new one:
        </h1>
        <ul className={classes.TeamsManager__TeamsList}>
          <Teams userId={userId} />
        </ul>
        <button
          onClick={() => {
            auth.signOut();
          }}
        >
          Log Out
        </button>
      </div>
    </MainContentWraper>
  );
};

export default TeamsManager;
