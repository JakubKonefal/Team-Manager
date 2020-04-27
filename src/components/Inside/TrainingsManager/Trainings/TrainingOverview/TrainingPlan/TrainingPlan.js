import React, { Component } from "react";
import axios from "axios";
import { database } from "../../../../../../firebase/firebase";
import classes from "./TrainingPlan.module.css";
import TrainingTasks from "./TrainingTasks/TrainingTasks";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";

class TrainingPlan extends Component {
  state = {
    tasks: "",
    trainingPlanActive: true,
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
      `${this.props.match.params.teamId}/trainings/${this.props.match.params.trainingId}/tasks`
    );
    const taskId = databaseRef.push().key;
    const newTask = {
      taskId,
      task: { ...newTaskInfo },
    };
    databaseRef.child(taskId).set(newTask);
  };

  handleTrainingPlanToggle = () => {
    this.setState({ trainingPlanActive: !this.state.trainingPlanActive });
  };

  render() {
    return (
      <Card variant="outlined" className={classes.TrainingPlan}>
        <h2
          className={classes.TrainingPlan__Header}
          onClick={this.handleTrainingPlanToggle}
        >
          Training Plan
        </h2>
        <Collapse in={this.state.trainingPlanActive}>
          <CardContent className={classes.TrainingPlan__Content}>
            <TrainingTasks
              teamId={this.props.teamId}
              trainingId={this.props.trainingId}
            />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default TrainingPlan;
