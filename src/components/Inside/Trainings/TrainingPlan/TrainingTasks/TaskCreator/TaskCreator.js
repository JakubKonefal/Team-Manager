import React from "react";
import classes from "./TaskCreator.module.css";

const TaskCreator = ({
  active,
  onFormSubmit,
  onClick,
  onInputChange,
  onClose
}) => {
  const iconClass = active ? classes.Hide : classes.TaskCreator_Inactive;
  const formClass = active ? classes.Form : classes.Hide;
  const taskCreatorClass = active ? classes.TaskCreator : classes.NewTask;

  return (
    <div className={taskCreatorClass} onClick={onClick}>
      <div className={iconClass}>
        <i className={`fas fa-plus ${classes.Icon}`}></i>
        Add new task
      </div>
      <form className={formClass} onChange={onInputChange}>
        <label className={classes.Label} htmlFor="task">
          Task:
        </label>
        <input
          className={classes.Task}
          type="text"
          id="task"
          placeholder="E.g. posession Game / stretching / rondo"
        />
        <label className={classes.Label} htmlFor="taskDescription">
          Task description:
        </label>
        <textarea
          className={classes.Description}
          id="taskDescription"
          placeholder="E.g. game rules, exercise description, number of players"
        />
        <label className={classes.Label} htmlFor="equipment">
          <i className={`far fa-futbol ${classes.Icon}`}></i>Equipment:
          <input
            className={classes.Equipment}
            type="text"
            id="equipment"
            placeholder="E.g. 12x cones, 8x balls, 2x small goals"
          />
        </label>
        <label className={classes.Label} htmlFor="duration">
          <i className={`fas fa-clock ${classes.Icon}`}></i>Duration:
          <input
            className={classes.Duration}
            type="text"
            id="duration"
            placeholder="2x 10min"
          />
        </label>
        <button className={classes.SubmitBtn} onClick={onFormSubmit}>
          Add task
        </button>
        <i
          className={`far fa-times-circle ${classes.Icon__Close}`}
          onClick={onClose}
        ></i>
      </form>
    </div>
  );
};

export default TaskCreator;
