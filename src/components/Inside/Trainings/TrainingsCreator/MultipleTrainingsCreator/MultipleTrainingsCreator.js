import React from "react";
import classes from "./MultipleTrainingsCreator.module.css";

const MultipleTrainingsCreator = () => {
  return (
    <div className={classes.SingleTrainingCreator}>
      <h2>Create series of training days</h2>
      <form className={classes.Form__Grid}>
        <div className={classes.Grid__Item}>
          <label htmlFor="date" className={classes.InputLabel}>
            <i className={`fas fa-calendar-alt ${classes.Icon}`}></i>
            Date:
          </label>
          <input className={classes.Input} type="date" name="date" id="date" />
        </div>
        <div className={classes.Grid__Item}>
          {" "}
          <label htmlFor="weekday" className={classes.InputLabel}>
            <i className={`fas fa-calendar-week ${classes.Icon}`}></i>
            Weekday:
          </label>
          <select className={classes.Input} name="weekday" id="weekday">
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
            <option value="7">Sunday</option>
          </select>
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
          <input
            className={classes.Input}
            type="text"
            name="training-type"
            id="training-type"
          />
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
      </form>
    </div>
  );
};

export default MultipleTrainingsCreator;
