import React, { Component } from "react";
import classes from "./TrainingPlan.module.css";
import TrainingTasks from "./TrainingTasks/TrainingTasks";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";

class TrainingPlan extends Component {
  state = {
    trainingPlanActive: true,
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
            <TrainingTasks userId={this.props.userId} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default TrainingPlan;
