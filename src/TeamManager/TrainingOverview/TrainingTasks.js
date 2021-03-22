import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { database } from '../../firebase/firebase';
import TrainingTask from './TrainingTask';
import TaskCreator from './TaskCreator';
import { withRouter } from 'react-router-dom';

const TrainingTasks = ({ userId, match }) => {
  const [tasksList, setTasksList] = useState([]);

  const getInitialTasksList = () => {
    const { teamId, trainingId, year, month } = match.params;
    axios
      .get(
        `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks.json`
      )
      .then(({ data: tasks }) => {
        if (tasks) {
          const tasksArr = Object.values(tasks);
          setTasksList(tasksArr);
        }
      });
  };

  const updateTasks = () => {
    const { teamId, trainingId, year, month } = match.params;
    const tasksDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks`
    );
    tasksDatabaseRef.once('value', (snapshot) => {
      const snapshotValue = snapshot.val() ? Object.values(snapshot.val()) : '';
      const tasks = snapshotValue;
      setTasksList(tasks);
    });
  };

  const handleFormSubmitNewTask = (newTaskInfo, e) => {
    e.preventDefault();

    const { teamId, trainingId, year, month } = match.params;
    const databaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks`
    );
    const taskId = databaseRef.push().key;
    const newTask = {
      taskId,
      taskInfo: { ...newTaskInfo },
    };
    databaseRef.child(taskId).set(newTask);
    updateTasks();
  };

  const handleTaskDelete = (taskId) => {
    const { teamId, trainingId, year, month } = match.params;
    const taskDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks/${taskId}`
    );
    taskDatabaseRef.remove();
    updateTasks();
  };

  const handleFormSubmitTaskEdit = (taskId, taskInfo) => {
    const { teamId, trainingId, year, month } = match.params;
    const taskDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks/${taskId}/taskInfo`
    );
    taskDatabaseRef.set(taskInfo);
    updateTasks();
  };

  useEffect(getInitialTasksList, []);

  const trainingTasks = tasksList ? (
    tasksList.map((task, index) => {
      return (
        <TrainingTask
          {...task.taskInfo}
          key={task.taskId}
          taskId={task.taskId}
          index={index}
          onDelete={handleTaskDelete}
          onEdit={handleFormSubmitTaskEdit}
        />
      );
    })
  ) : (
    <h2>You have not created any tasks yet!</h2>
  );

  return (
    <>
      {trainingTasks}
      <TaskCreator onSubmit={handleFormSubmitNewTask} />
    </>
  );
};

export default withRouter(TrainingTasks);
