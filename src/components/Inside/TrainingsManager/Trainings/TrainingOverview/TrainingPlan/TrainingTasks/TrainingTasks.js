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
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.teamId}/trainings/${this.props.trainingId}/tasks.json`
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
    const databaseRef = database.ref(
      `${this.props.teamId}/trainings/${this.props.trainingId}/tasks`
    );
    const taskId = databaseRef.push().key;
    const newTask = {
      taskId,
      taskInfo: { ...newTaskInfo },
    };
    databaseRef.child(taskId).set(newTask);
    this.updateTaskArrayOnTaskAdd(newTask);
  };

  updateTaskArrayOnTaskAdd = (newTask) => {
    const updatedTasksArr = [...this.state.tasks];
    updatedTasksArr.push(newTask);
    this.setState({ tasks: updatedTasksArr });
  };

  handleTaskDelete = (taskId) => {
    database
      .ref(
        `${this.props.teamId}/trainings/${this.props.trainingId}/tasks/${taskId}`
      )
      .remove();
    this.updateTaskArrayOnTaskDelete(taskId);
  };

  updateTaskArrayOnTaskDelete = (taskId) => {
    const currentTasksArr = [...this.state.tasks];
    const updatedTasksArr = currentTasksArr.filter(
      (task) => task.taskId !== taskId
    );
    this.setState({ tasks: updatedTasksArr });
  };

  handleFormSubmitTaskEdit = (taskId, taskInfo) => {
    database
      .ref(
        `${this.props.teamId}/trainings/${this.props.trainingId}/tasks/${taskId}/taskInfo`
      )
      .set(taskInfo);
    this.updatePlayersArrayOnPlayerUpdate(taskId, taskInfo);
  };

  updatePlayersArrayOnPlayerUpdate = (taskId, taskInfo) => {
    const updatedTaskArray = [...this.state.tasks];
    const updatedTaskIndex = this.state.tasks.findIndex((task) => {
      return task.taskId === taskId;
    });

    const updatedTask = {
      taskId,
      taskInfo,
    };
    updatedTaskArray.splice(updatedTaskIndex, 1, updatedTask);
    this.setState({ tasks: updatedTaskArray });
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
