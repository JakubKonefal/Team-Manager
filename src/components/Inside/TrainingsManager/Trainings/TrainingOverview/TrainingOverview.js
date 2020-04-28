import React, { Component } from "react";
import axios from "axios";
import { database } from "../../../../../firebase/firebase";
import classes from "./TrainingOverview.module.css";
import TrainingInfo from "../TrainingInfoBox/TrainingInfo/TrainingInfo";
import TrainingPlan from "./TrainingPlan/TrainingPlan";

class TrainingOverview extends Component {
  state = {
    trainingInfo: null,
  };

  componentDidMount() {
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings/${this.props.match.params.year}/${this.props.match.params.month}/${this.props.match.params.trainingId}.json`
      )
      .then((res) => {
        console.log(res);

        const { trainingInfo } = res.data;
        if (trainingInfo) {
          this.setState({ trainingInfo });
        }
      });
  }

  handleFormSubmitTrainingInfoUpdate = (updatedTrainingInfo) => {
    console.log(updatedTrainingInfo);
    database
      .ref(
        `${this.props.match.params.teamId}/trainings/${this.props.match.params.trainingId}/trainingInfo`
      )
      .set(updatedTrainingInfo);
    this.updateTrainingInfoOnTrainingEdit(updatedTrainingInfo);
  };

  updateTrainingInfoOnTrainingEdit = (updatedTrainingInfo) => {
    this.setState({ trainingInfo: updatedTrainingInfo });
  };

  render() {
    const trainingInfoComponent = this.state.trainingInfo ? (
      <TrainingInfo
        trainingInfo={this.state.trainingInfo}
        onFormSubmit={this.handleFormSubmitTrainingInfoUpdate}
      />
    ) : null;

    return (
      <div className={classes.TrainingOverview}>
        <div className={classes.TrainingOverview__AdditionalInfo}>
          {trainingInfoComponent}
        </div>
        <div className={classes.TrainingOverview__TrainingPlan}>
          <TrainingPlan
            teamId={this.props.match.params.teamId}
            trainingId={this.props.match.params.trainingId}
          />
        </div>
      </div>
    );
  }
}

export default TrainingOverview;
