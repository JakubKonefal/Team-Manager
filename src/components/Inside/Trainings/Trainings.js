import React, { Component } from "react";
import axios from "axios";
import TrainingsList from "./TrainingsList/TrainingsList";
import SingleTrainingCreator from "./TrainingsCreator/SingleTrainingCreator/SingleTrainingCreator";
// import MultipleTrainingsCreator from "./TrainingsCreator/MultipleTrainingsCreator/MultipleTrainingsCreator";
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

  inputChangeHandler = ({ target }) => {
    const { id, value } = target;
    this.setState({
      newTrainingInfo: {
        ...this.state.newTrainingInfo,
        [id]: value
      }
    });
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

  createTrainingHandler = e => {
    e.preventDefault();
    const newTraining = { info: this.state.newTrainingInfo };
    this.sendData(newTraining);
  };

  sendData = async newTraining => {
    await axios.post(
      `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/trainings.json`,
      newTraining
    );
    this.componentDidMount();
  };

  render() {
    return (
      <div className={classes.Trainings}>
        <TrainingsList
          trainings={this.state.trainings}
          teamId={this.props.match.params.teamId}
        />
        <SingleTrainingCreator
          change={this.inputChangeHandler}
          clicked={this.createTrainingHandler}
        />
        {/* <MultipleTrainingsCreator /> */}
      </div>
    );
  }
}

export default Trainings;
