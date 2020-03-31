import React, { Component } from "react";
import axios from "axios";
import classes from "./TrainingPlan.module.css";
import { database } from "../../../../firebase/firebase";
import TrainingTasks from "./TrainingTasks/TrainingTasks";
import TrainingInfo from "../TrainingInfoBox/TrainingInfo/TrainingInfo";
import TaskCreator from "./TrainingTasks/TaskCreator/TaskCreator";

class TrainingPlan extends Component {
  state = {
    trainingInfo: null,
    trainingTasks: "",
    taskCreatorActive: false,
    newTask: {
      task: "",
      taskDescription: "",
      duration: "",
      equipment: ""
    }
  };

  componentDidMount() {
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings/${this.props.match.params.trainingId}.json`
      )
      .then(res => {
        const trainingInfo = res.data.info;
        const trainingTasks = res.data.tasks;
        if (trainingInfo) {
          this.setState({
            trainingInfo: { ...trainingInfo }
          });
        }
        if (trainingTasks) {
          const tasksIds = Object.keys(trainingTasks);
          const tasksArray = Object.values(trainingTasks);
          for (let i = 0; i < tasksIds.length; i++) {
            tasksArray[i].taskId = tasksIds[i];
          }
          const updatedTasks = [];
          updatedTasks.push(...tasksArray);
          this.setState({ trainingTasks: updatedTasks });
        } else {
          this.setState({ trainingTasks: [] });
        }
      });
  }

  handleTaskCreatorOpen = () => {
    if (!this.state.taskCreatorActive) {
      this.setState({ taskCreatorActive: true });
    }
  };

  handleTaskCreatorClose = () => {
    this.setState({ taskCreatorActive: false });
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ newTask: { ...this.state.newTask, [id]: value } });
  };

  handleTaskDelete = taskId => {
    database
      .ref(
        `${this.props.match.params.teamId}/trainings/${this.props.match.params.trainingId}/tasks/${taskId}`
      )
      .remove()
      .then(() => {
        this.componentDidMount();
      });
  };

  handlePassDataToServer = async newTask => {
    await axios.post(
      `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings/${this.props.match.params.trainingId}/tasks.json`,
      newTask
    );
    this.componentDidMount();
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const newTask = this.state.newTask;
    this.handlePassDataToServer(newTask);
  };

  handleDataUpdate = () => {
    const newValue = {
      date: "2020-12-12",
      end: "14:14",
      intensity: "14",
      place: "14",
      start: "14:14",
      type: "14"
    };
    database
      .ref("-M2skgfVgq1cg-g8_XmP/trainings/-M2skkeYLx9Sn2mz-w_5/info")
      .update(newValue);
  };

  render() {
    const trainingInfo = this.state.trainingInfo && (
      <TrainingInfo {...this.state.trainingInfo} />
    );

    return (
      <>
        <div>
          <h3 className={classes.TrainingInfo__Label}>Training Information</h3>
          {trainingInfo}
        </div>
        <div className={classes.Border}></div>
        <h2 className={classes.TrainingPlan__Label}>Training Plan</h2>
        <TrainingTasks
          tasks={this.state.trainingTasks}
          onDelete={this.handleTaskDelete}
        />
        <TaskCreator
          active={this.state.taskCreatorActive}
          onFormSubmit={this.handleFormSubmit}
          onInputChange={this.handleInputChange}
          onClose={this.handleTaskCreatorClose}
          onClick={this.handleTaskCreatorOpen}
        />
        <button onClick={this.handleDataUpdate}>UPDATE</button>
      </>
    );
  }
}

export default TrainingPlan;
