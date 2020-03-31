import React from "react";
import classes from "./TrainingTasks.module.css";
import TrainingTask from "./TrainingTask/TrainingTask";

const TrainingTasks = ({ tasks, onDelete }) => {
  const tasksList = tasks ? (
    tasks.map(task => {
      return <TrainingTask {...task} key={task.taskId} onDelete={onDelete} />;
    })
  ) : (
    <h2>You have not created any tasks yet!</h2>
  );

  return <ul className={classes.TrainingTasks}>{tasksList}</ul>;
};

export default TrainingTasks;
