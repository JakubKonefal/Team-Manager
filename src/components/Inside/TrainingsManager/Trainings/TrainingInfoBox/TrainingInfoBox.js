import React from "react";
import classes from "./TrainingInfoBox.module.css";

const TrainingInfoBox = () => (
  <>
    <span className={classes.InfoBox__Item}></span>
    <span className={classes.InfoBox__Item}>Date</span>
    <span className={classes.InfoBox__Item}>Weekday</span>
    <span className={classes.InfoBox__Item}>Start</span>
    <span className={classes.InfoBox__Item}>End</span>
    <span className={classes.InfoBox__Item}>Place</span>
    <span className={classes.InfoBox__Item}>Training Type</span>
    <span className={classes.InfoBox__Item}>Intensity</span>
  </>
);

export default TrainingInfoBox;
