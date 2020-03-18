import React, { Component } from "react";
import axios from "axios";
import classes from "./TrainingPlan.module.css";
import TrainingTasks from "./TrainingTasks/TrainingTasks";
import TrainingInfo from "../TrainingInfoBox/TrainingInfo/TrainingInfo";
import TaskCreator from "./TrainingTasks/TaskCreator/TaskCreator";

class TrainingPlan extends Component {
  state = {
    trainingInfo: null,
    trainingTasks: null,
    newTask: {
      task: "",
      taskDescription: "",
      duration: "",
      equipment: ""
    },
    newTaskClicked: false
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
        }
      });
  }

  sendData = async newTask => {
    await axios.post(
      `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings/${this.props.match.params.trainingId}/tasks.json`,
      newTask
    );
    this.componentDidMount();
  };

  createTaskHandler = event => {
    event.preventDefault();
    const newTask = this.state.newTask;
    this.sendData(newTask);
  };

  changeHandler = ({ target }) => {
    const { id, value } = target;
    this.setState({ newTask: { ...this.state.newTask, [id]: value } });
  };

  newTaskClickedHandler = () => {
    if (!this.state.newTaskClicked) {
      this.setState({ newTaskClicked: true });
    }
  };

  newTaskCancelledHandler = () => {
    this.setState({ newTaskClicked: false });
  };

  render() {
    let trainingInfo = null;

    if (this.state.trainingInfo) {
      trainingInfo = <TrainingInfo {...this.state.trainingInfo} />;
    }

    return (
      <>
        <div>
          <h3 className={classes.TrainingInfo__Label}>Training Information</h3>
          {trainingInfo}
        </div>
        <div className={classes.Border}></div>
        <h2 className={classes.TrainingPlan__Label}>Training Plan</h2>
        <TrainingTasks tasks={this.state.trainingTasks} />
        <TaskCreator
          changed={this.changeHandler}
          createTask={this.createTaskHandler}
          clicked={this.newTaskClickedHandler}
          active={this.state.newTaskClicked}
          cancelled={this.newTaskCancelledHandler}
        />
      </>
    );
  }
}

export default TrainingPlan;
