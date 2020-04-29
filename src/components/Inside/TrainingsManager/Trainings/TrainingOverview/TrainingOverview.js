import React, { Component } from "react";
import axios from "axios";
import { database } from "../../../../../firebase/firebase";
import classes from "./TrainingOverview.module.css";
import TrainingInfo from "../TrainingInfoBox/TrainingInfo/TrainingInfo";
import TrainingPlan from "./TrainingPlan/TrainingPlan";
import moment from "moment";

class TrainingOverview extends Component {
  state = {
    trainingInfo: null,
  };

  componentDidMount() {
    const { teamId, year, month, trainingId } = this.props.match.params;

    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${teamId}/trainings/${year}/${month}/${trainingId}.json`
      )
      .then((res) => {
        const { trainingInfo } = res.data;
        if (trainingInfo) {
          this.setState({ trainingInfo });
        }
      });
  }

  handleFormSubmitTrainingInfoUpdate = (updatedTrainingInfo) => {
    const { teamId, year, month, trainingId } = this.props.match.params;
    const { date } = updatedTrainingInfo;
    const updatedDateYear = moment(date).format("YYYY");
    const updatedDateMonth = moment(date).format("MMMM");
    const databaseRef = database.ref(
      `${teamId}/trainings/${year}/${month}/${trainingId}`
    );

    if (year === updatedDateYear && month === updatedDateMonth) {
      databaseRef.set(updatedTrainingInfo);
    } else {
      const updatedDatabaseRef = database.ref(
        `${teamId}/trainings/${updatedDateYear}/${updatedDateMonth}/${trainingId}`
      );
      const updatedTraining = {
        trainingId,
        trainingInfo: { ...updatedTrainingInfo },
      };

      databaseRef.remove();
      updatedDatabaseRef.set(updatedTraining);
      this.updateUrlAdressBar(updatedDateYear, updatedDateMonth);
    }

    this.updateTrainingInfoOnTrainingUpdate(updatedTrainingInfo);
  };

  updateTrainingInfoOnTrainingUpdate = (updatedTrainingInfo) => {
    this.setState({ trainingInfo: updatedTrainingInfo });
  };

  updateUrlAdressBar = (updatedYear, updatedMonth) => {
    const { year, month } = this.props.match.params;
    const url = window.location.href;
    const urlUpdatedYear = url.replace(year, updatedYear);
    const urlUpdated = urlUpdatedYear.replace(month, updatedMonth);
    const params = { month: updatedMonth, year: updatedYear };
    window.history.pushState(params, "TestTitle", urlUpdated);
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
