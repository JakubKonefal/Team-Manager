import React from "react";
import classes from "./TeamsManager.module.css";
import "../../assets/webfonts/all.css";
import MainContentWraper from "../../components/MainContentWraper/MainContentWraper";
import Teams from "../../components/Inside/TeamsManager/Teams/Teams";

const TeamsManager = () => (
  <MainContentWraper>
    <ul>
      <li>
        <h1 className={classes.Choose_label}>
          Choose team to manage or create a new one:
        </h1>
      </li>
      <li>
        <Teams />
      </li>
    </ul>
  </MainContentWraper>
);

export default TeamsManager;
