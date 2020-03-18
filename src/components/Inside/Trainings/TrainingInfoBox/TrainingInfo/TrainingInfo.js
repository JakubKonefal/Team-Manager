import React from "react";
import classes from "./TrainingInfo.module.css";

const TrainingInfo = ({ date, start, end, place, type, intensity }) => {
  return (
    <div className={classes.TrainingInfo}>
      <div className={classes.TrainingInfo__Line}>
        <p>
          <i className={`fas fa-calendar-alt ${classes.Icon}`}></i>
          <span className={classes.Info__Label}>Date:</span> {date}{" "}
        </p>
        <p>
          <i className={`fas fa-hourglass-start ${classes.Icon}`}></i>
          <span className={classes.Info__Label}>Start:</span> {start}{" "}
        </p>
        <p>
          <i className={`fas fa-hourglass-end ${classes.Icon}`}></i>
          <span className={classes.Info__Label}>End:</span> {end}
        </p>
        <p>
          <i className={`fas fa-map-marker-alt ${classes.Icon}`}></i>
          <span className={classes.Info__Label}>Place:</span> {place}
        </p>
      </div>
      <div className={classes.TrainingInfo__Line}>
        <p>
          <i className={`far fa-futbol ${classes.Icon}`}></i>
          <span className={classes.Info__Label}>Type:</span> {type}
        </p>
        <p>
          <i className={`fas fa-signal ${classes.Icon}`}></i>
          <span className={classes.Info__Label}>Intensity:</span> {intensity}
        </p>
      </div>
    </div>
  );
};

export default TrainingInfo;
