import React from "react";
import classes from "./DashboardTraining.module.css";

const DashboardTraining = ({ date, place, trainingType, intensity }) => {
  return (
    <div className={classes.DashboardTraining}>
      <span>{date}</span>
      <span>{place}</span>
      <span>{trainingType}</span>
      <span>{intensity}</span>
    </div>
  );
};

export default DashboardTraining;
