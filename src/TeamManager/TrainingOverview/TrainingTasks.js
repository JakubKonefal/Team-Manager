import React, { Component } from "react";
import axios from "axios";
import { database } from "../../firebase/firebase";
import TrainingTask from "./TrainingTask";
import TaskCreator from "./TaskCreator";
import { withRouter } from "react-router-dom";

class TrainingTasks extends Component {
  state = {
    tasks: "",
  };

  componentDidMount() {
    this.getInitialTasksList();
  }

  getInitialTasksList = () => {
    const { userId } = this.props;
    const { teamId, trainingId, year, month } = this.props.match.params;

    axios
      .get(
        `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks.json`
      )
      .then(({ data: tasks }) => {
        if (tasks) {
          const tasksArr = Object.values(tasks);
          this.setState({ tasks: tasksArr });
        }
      });
  };

  handleFormSubmitNewTask = (newTaskInfo, e) => {
    e.preventDefault();
    const { userId } = this.props;
    const { teamId, trainingId, year, month } = this.props.match.params;
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
    const { userId } = this.props;
    const { teamId, trainingId, year, month } = this.props.match.params;
    const taskDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks/${taskId}`
    );
    taskDatabaseRef.remove();
    this.updateTasks();
  };

  handleFormSubmitTaskEdit = (taskId, taskInfo) => {
    const { userId } = this.props;
    const { teamId, trainingId, year, month } = this.props.match.params;
    const taskDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/tasks/${taskId}/taskInfo`
    );
    taskDatabaseRef.set(taskInfo);
    this.updateTasks();
  };

  updateTasks = () => {
    const { userId } = this.props;
    const { teamId, trainingId, year, month } = this.props.match.params;
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

export default withRouter(TrainingTasks);
