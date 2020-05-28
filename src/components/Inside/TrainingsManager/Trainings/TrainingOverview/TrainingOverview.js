import React, { Component } from "react";
import axios from "axios";
import { database } from "../../../../../firebase/firebase";
import classes from "./TrainingOverview.module.css";
import TrainingInfo from "../TrainingInfo/TrainingInfo";
import TrainingPlan from "./TrainingPlan/TrainingPlan";
import moment from "moment";

class TrainingOverview extends Component {
  state = {
    trainingInfo: null,
  };

  componentDidMount() {
    this.getInitialTrainingInfo();
  }

  getInitialTrainingInfo = () => {
    const { teamId, year, month, trainingId } = this.props.match.params;
    const { userId } = this.props;

    axios
      .get(
        `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}.json`
      )
      .then(({ data: training }) => {
        console.log(training);

        const { trainingInfo } = training;
        if (trainingInfo) {
          console.log(trainingInfo);

          this.setState({ trainingInfo });
        }
      });
  };

  handleFormSubmitTrainingInfoUpdate = (updatedTrainingInfo) => {
    const { teamId, year, month, trainingId } = this.props.match.params;
    const { userId } = this.props;
    const { date } = updatedTrainingInfo;
    const updatedDateYear = moment(date).format("YYYY");
    const updatedDateMonth = moment(date).format("MMMM");
    const databaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}`
    );

    if (year === updatedDateYear && month === updatedDateMonth) {
      databaseRef.set(updatedTrainingInfo);
    } else {
      const updatedDatabaseRef = database.ref(
        `/users/${userId}/teams/${teamId}/trainings/${updatedDateYear}/${updatedDateMonth}/${trainingId}`
      );
      const updatedTraining = {
        trainingId,
        trainingInfo: { ...updatedTrainingInfo },
      };

      databaseRef.remove();
      updatedDatabaseRef.set(updatedTraining);
    }

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
        <div className={classes.TrainingOverview__TrainingInfo}>
          {trainingInfoComponent}
        </div>
        <div className={classes.TrainingOverview__TrainingPlan}>
          <TrainingPlan userId={this.props.userId} />
        </div>
      </div>
    );
  }
}

export default TrainingOverview;
