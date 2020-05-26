import React, { Component } from "react";
import axios from "axios";
import { database } from "../../../../../../../firebase/firebase";
import TrainingTask from "./TrainingTask/TrainingTask";
import TaskCreator from "./TaskCreator/TaskCreator";

class TrainingTasks extends Component {
  state = {
    tasks: "",
  };

  componentDidMount() {
    const { userId, teamId, year, month, trainingId } = this.props;

    axios
      .get(
        `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks.json`
      )
      .then((res) => {
        const tasks = res.data;
        if (tasks) {
          const tasksArr = Object.values(tasks);
          this.setState({ tasks: tasksArr });
        }
      });
  }

  handleFormSubmitNewTask = (newTaskInfo, e) => {
    e.preventDefault();
    const { userId, teamId, year, month, trainingId } = this.props;
    const databaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks`
    );
    const taskId = databaseRef.push().key;
    const newTask = {
      taskId,
      taskInfo: { ...newTaskInfo },
    };
    databaseRef.child(taskId).set(newTask);
    this.updateTasks();
  };

  handleTaskDelete = (taskId) => {
    const { userId, teamId, year, month, trainingId } = this.props;
    const taskDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks/${taskId}`
    );
    taskDatabaseRef.remove();
    this.updateTasks();
  };

  handleFormSubmitTaskEdit = (taskId, taskInfo) => {
    const { userId, teamId, year, month, trainingId } = this.props;
    const taskDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks/${taskId}/taskInfo`
    );
    taskDatabaseRef.set(taskInfo);
    this.updateTasks();
  };

  updateTasks = () => {
    const { userId, teamId, year, month, trainingId } = this.props;
    const tasksDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks`
    );
    tasksDatabaseRef.once("value", (snapshot) => {
      const snapshotValue = snapshot.val() ? Object.values(snapshot.val()) : "";
      const tasks = snapshotValue;
      this.setState({ tasks });
    });
  };

  render() {
    const trainingTasks = this.state.tasks ? (
      this.state.tasks.map((task, index) => {
        return (
          <TrainingTask
            {...task.taskInfo}
            key={task.taskId}
            taskId={task.taskId}
            index={index}
            onDelete={this.handleTaskDelete}
            onEdit={this.handleFormSubmitTaskEdit}
          />
        );
      })
    ) : (
      <h2>You have not created any tasks yet!</h2>
    );

    return (
      <>
        {trainingTasks}
        <TaskCreator onFormSubmit={this.handleFormSubmitNewTask} />
      </>
    );
  }
}

export default TrainingTasks;
