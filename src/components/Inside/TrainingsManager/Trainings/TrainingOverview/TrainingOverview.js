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
    const { teamId, year, month, trainingId } = this.props.match.params;
    const { userId } = this.props;

    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}.json`
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
    const { userId } = this.props;
    const { date } = updatedTrainingInfo;
    const updatedDateYear = moment(date).format("YYYY");
    const updatedDateMonth = moment(date).format("MMMM");
    const databaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/trainingInfo`
    );

    if (year === updatedDateYear && month === updatedDateMonth) {
      databaseRef.set(updatedTrainingInfo);
    } else {
      const updatedDatabaseRef = database.ref(
        `/users/${userId}/teams/${teamId}/trainings/${updatedDateYear}/${updatedDateMonth}/${trainingId}/trainingInfo`
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
        <div className={classes.TrainingOverview__TrainingInfo}>
          {trainingInfoComponent}
        </div>
        <div className={classes.TrainingOverview__TrainingPlan}>
          <TrainingPlan
            userId={this.props.userId}
            teamId={this.props.match.params.teamId}
            year={this.props.match.params.year}
            month={this.props.match.params.month}
            trainingId={this.props.match.params.trainingId}
          />
        </div>
      </div>
    );
  }
}

export default TrainingOverview;
