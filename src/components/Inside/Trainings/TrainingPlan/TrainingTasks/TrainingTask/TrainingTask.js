import React, { useState } from "react";
import classes from "./TrainingTask.module.css";

const TrainingTask = ({
  task,
  taskDescription,
  duration,
  equipment,
  onDelete,
  taskId
}) => {
  const [taskActive, toggleActiveClass] = useState(false);

  const activeClass = taskActive ? null : classes.Hide;
  const arrowClass = taskActive ? classes.ArrowUp : null;

  return (
    <li className={classes.Task}>
      <div className={classes.Task__Title}>
        <span
          className={classes.Task__Info}
          onClick={() => toggleActiveClass(!taskActive)}
        >
          {task}{" "}
          <i
            className={`fas fa-chevron-down ${arrowClass}`}
            style={{ fontSize: "12px" }}
          ></i>
        </span>
        <span className={classes.Task__Duration}>
          <i className={`far fa-clock ${classes.Icon}`}></i>Time: {duration}
        </span>
        <i
          className={`fas fa-minus-circle ${classes.CloseIcon}`}
          onClick={() => {
            onDelete(taskId);
          }}
        ></i>
      </div>
      <div className={activeClass}>
        <p className={classes.Task__MoreInfo}>{taskDescription}</p>
        <p className={classes.Task__Equipment}>
          <i className={`far fa-futbol ${classes.Icon}`}></i> Equipment:{" "}
          <span className={classes.Task__Equipment_Info}>{equipment}</span>
        </p>
      </div>
    </li>
  );
};

export default TrainingTask;
