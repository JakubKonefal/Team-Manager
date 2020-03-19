import React, { Component } from "react";
import axios from "axios";
import TrainingsList from "./TrainingsList/TrainingsList";
import SingleTrainingCreator from "./TrainingsCreator/SingleTrainingCreator/SingleTrainingCreator";
import classes from "./Trainings.module.css";

class Trainings extends Component {
  state = {
    trainings: null,
    newTrainingInfo: {
      date: null,
      end: null,
      place: null,
      type: null,
      intensity: null
    }
  };

  componentDidMount() {
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings.json`
      )
      .then(res => {
        const fetchedTrainings = res.data;
        if (fetchedTrainings) {
          const trainings = Object.values(fetchedTrainings);
          const trainingIds = Object.keys(fetchedTrainings);

          for (let i = 0; i < trainingIds.length; i++) {
            trainings[i].id = trainingIds[i];
          }
          const updatedTrainings = [];
          updatedTrainings.push(...trainings);
          this.setState({ trainings: updatedTrainings });
        }
      });
  }

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      newTrainingInfo: {
        ...this.state.newTrainingInfo,
        [id]: value
      }
    });
  };

  handlePassDataToServer = async newTraining => {
    await axios.post(
      `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings.json`,
      newTraining
    );
    this.componentDidMount();
  };

  onFormSubmit = e => {
    e.preventDefault();
    const newTraining = { info: this.state.newTrainingInfo };
    this.handlePassDataToServer(newTraining);
  };

  render() {
    return (
      <div className={classes.Trainings}>
        <TrainingsList
          trainings={this.state.trainings}
          teamId={this.props.match.params.teamId}
        />
        <SingleTrainingCreator
          onInputChange={this.handleInputChange}
          onClick={this.onFormSubmit}
        />
      </div>
    );
  }
}

export default Trainings;
