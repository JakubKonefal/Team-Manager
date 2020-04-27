import React, { Component } from "react";
import axios from "axios";
import classes from "./TrainingOverview.module.css";
import TrainingInfo from "../TrainingInfoBox/TrainingInfo/TrainingInfo";
import TrainingPlan from "./TrainingPlan/TrainingPlan";

class TrainingOverview extends Component {
  state = {
    trainingInfo: null,
    showInfoCard: true,
  };

  componentDidMount() {
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings/${this.props.match.params.trainingId}.json`
      )
      .then((res) => {
        const { trainingInfo } = res.data;
        if (trainingInfo) {
          this.setState({ trainingInfo });
        }
      });
  }

  handleToggleInfoCard = () => {
    this.setState({ showInfoCard: !this.state.showInfoCard });
  };

  render() {
    return (
      <div className={classes.TrainingOverview}>
        <div className={classes.TrainingOverview__AdditionalInfo}>
          <TrainingInfo
            {...this.state.trainingInfo}
            active={this.state.showInfoCard}
            onClick={this.handleToggleInfoCard}
          />
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
