import React from "react";
import classes from "./TrainingTasks.module.css";
import TrainingTask from "./TrainingTask/TrainingTask";

const TrainingTasks = ({ tasks, onDelete }) => {
  let tasksList = <h2>You have not created any tasks yet!</h2>;
  if (tasks) {
    tasksList = tasks.map(task => {
      return <TrainingTask {...task} key={task.taskId} onDelete={onDelete} />;
    });
  }

  return <ul className={classes.TrainingTasks}>{tasksList}</ul>;
};

export default TrainingTasks;
