import React from "react";
import classes from "./SingleTrainingCreator.module.css";

const SingleTrainingCreator = ({ onInputChange, onFormSubmit }) => {
  return (
    <div className={classes.SingleTrainingCreator}>
      <h2>Create single training day</h2>
      <form className={classes.Form__Grid} onChange={onInputChange}>
        <div className={classes.Grid__Item}>
          <label htmlFor="date" className={classes.InputLabel}>
            <i className={`fas fa-calendar-alt ${classes.Icon}`}></i>
            Date:
          </label>
          <input className={classes.Input} type="date" name="date" id="date" />
        </div>
        <div className={classes.Grid__Item}>
          {" "}
          <label htmlFor="start" className={classes.InputLabel}>
            <i className={`fas fa-hourglass-start ${classes.Icon}`}></i>
            Start:
          </label>
          <input
            className={classes.Input}
            type="time"
            name="start"
            id="start"
          />
        </div>
        <div className={classes.Grid__Item}>
          {" "}
          <label htmlFor="end" className={classes.InputLabel}>
            <i className={`fas fa-hourglass-end ${classes.Icon}`}></i>
            End:
          </label>
          <input className={classes.Input} type="time" name="end" id="end" />
        </div>
        <div className={classes.Grid__Item}>
          {" "}
          <label htmlFor="place" className={classes.InputLabel}>
            <i className={`fas fa-map-marker-alt ${classes.Icon}`}></i>
            Place:
          </label>
          <input
            className={classes.Input}
            type="text"
            name="place"
            id="place"
          />
        </div>
        <div className={classes.Grid__Item}>
          {" "}
          <label htmlFor="training-type" className={classes.InputLabel}>
            <i className={`far fa-futbol ${classes.Icon}`}></i>
            Training Type:
          </label>
          <input className={classes.Input} type="text" name="type" id="type" />
        </div>
        <div className={classes.Grid__Item}>
          <label htmlFor="intensity" className={classes.InputLabel}>
            <i className={`fas fa-signal ${classes.Icon}`}></i>
            Intensity:
          </label>
          <input
            className={classes.Input}
            type="range"
            name="intensity"
            id="intensity"
          />
        </div>
        <button onClick={onFormSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default SingleTrainingCreator;
