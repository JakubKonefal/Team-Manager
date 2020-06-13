import React, { Component } from "react";
import axios from "axios";
import TrainingYear from "./TrainingYear";
import SingleTrainingCreator from "./SingleTrainingCreator";
import MultipleTrainingsCreator from "./MultipleTrainingsCreator";
import classes from "./Trainings.module.css";
import { database } from "../../firebase/firebase";
import moment from "moment";

class Trainings extends Component {
  state = {
    trainings: {},
    newTrainingInfo: {
      date: null,
      end: null,
      place: null,
      type: null,
      intensity: null,
    },
    trainingsCheckboxes: [],
    pending: true,
  };

  componentDidMount() {
    this.getInitialTrainingsList();
  }

  getInitialTrainingsList = () => {
    const { teamId, userId } = this.props;

    axios
      .get(`/users/${userId}/teams/${teamId}/trainings.json`)
      .then(({ data: trainings }) => {
        if (trainings) {
          this.setState({ trainings });
        }
        this.setState({ pending: false });
      });
  };

  handleFormSubmitNewTraining = (newTrainingInfo, event) => {
    event.preventDefault();
    const { teamId, userId } = this.props;
    const { date } = newTrainingInfo;
    const newTrainingYear = moment(date).format("YYYY");
    const newTrainingMonth = moment(date).format("MMMM");

    const newTrainingDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${newTrainingYear}/${newTrainingMonth}`
    );
    const trainingsDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings`
    );
    const trainingId = newTrainingDatabaseRef.push().key;
    const newTraining = {
      trainingId,
      trainingInfo: { ...newTrainingInfo },
    };
    newTrainingDatabaseRef.child(trainingId).set(newTraining);
    trainingsDatabaseRef.once("value", (snapshot) => {
      const trainings = snapshot.val();
      this.setState({ trainings });
    });
  };

  getDaysOfWeekAsNumbers = (days) => {
    const daysInWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days.map((day) => daysInWeek.indexOf(day));
  };

  handleFormSubmitNewTrainings = (newTrainingsInfo) => {
    const { teamId, userId } = this.props;
    const { from, to, daysOfWeek, ...trainingInfo } = newTrainingsInfo;
    const daysOfWeekAsNumbers = this.getDaysOfWeekAsNumbers(daysOfWeek);
    const selectedDaysArray = this.getSelectedDaysArray(
      from,
      to,
      daysOfWeekAsNumbers
    );

    selectedDaysArray.forEach((day) => {
      const dateYear = moment(day).format("YYYY");
      const dateMonth = moment(day).format("MMMM");

      const databaseRef = database.ref(
        `/users/${userId}/teams/${teamId}/trainings/${dateYear}/${dateMonth}`
      );

      const trainingId = databaseRef.push().key;
      const newTraining = {
        trainingId,
        trainingInfo: { date: day, ...trainingInfo },
      };
      databaseRef.child(trainingId).set(newTraining);
    });
    this.updateTraininings();
  };

  getSelectedDaysArray = (from, to, daysOfWeek) => {
    let startingDate = new Date(from);
    const endingDate = new Date(to);
    const selectedDaysArray = [];

    while (startingDate <= endingDate) {
      if (daysOfWeek.includes(startingDate.getDay())) {
        selectedDaysArray.push(moment(startingDate).format("YYYY-MM-DD"));
      }
      let newDate = startingDate.setDate(startingDate.getDate() + 1);
      startingDate = new Date(newDate);
    }
    return selectedDaysArray;
  };

  updateTraininings = () => {
    const { teamId, userId } = this.props;
    const trainingsDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings`
    );
    trainingsDatabaseRef.once("value", (snapshot) => {
      const snapshotValue = snapshot.val();
      const trainings = snapshotValue ? snapshotValue : {};
      this.setState({ trainings });
    });
  };

  render() {
    if (this.state.pending) {
      return <div className={classes.Trainings__Loader}></div>;
    }

    const { userId, teamId, teamName } = this.props;

    const trainingsYearsArray = Object.values(this.state.trainings);
    const trainingsYears = Object.keys(this.state.trainings);
    const isTrainingsObjEmpty = Object.entries(this.state.trainings).length < 1;

    const trainingYears = isTrainingsObjEmpty ? (
      <span className={classes.Trainings__NoTrainingsMsg}>
        You have not created any trainings yet!
      </span>
    ) : (
        trainingsYearsArray.map((year, index) => (
          <TrainingYear
            userId={userId}
            teamId={teamId}
            teamName={teamName}
            trainings={year}
            key={trainingsYears[index]}
            year={trainingsYears[index]}
            updateTrainings={this.updateTraininings}
          />
        ))
      );

    return (
      <div className={classes.Trainings}>
        {trainingYears}
        <div className={classes.Trainings__TrainingCreators}>
          <div className={classes.Trainings__TrainingCreator_Wraper}>
            <SingleTrainingCreator
              onFormSubmit={this.handleFormSubmitNewTraining}
            />
          </div>
          <div className={classes.Trainings__TrainingCreator_Wraper}>
            <MultipleTrainingsCreator
              onFormSubmit={this.handleFormSubmitNewTrainings}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Trainings;