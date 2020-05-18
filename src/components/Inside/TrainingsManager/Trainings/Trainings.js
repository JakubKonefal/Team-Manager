import React, { Component } from "react";
import axios from "axios";
import TrainingYear from "./TrainingYear/TrainingYear";
import SingleTrainingCreator from "./TrainingCreators/SingleTrainingCreator/SingleTrainingCreator";
import MultipleTrainingsCreator from "./TrainingCreators/MultipleTrainingsCreator/MultipleTrainingsCreator";
import classes from "./Trainings.module.css";
import { database } from "../../../../firebase/firebase";
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
  };

  componentDidMount() {
    const { teamId, userId } = this.props;

    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/users/${userId}/teams/${teamId}/trainings.json`
      )
      .then((res) => {
        const trainings = res.data;
        if (trainings) {
          this.setState({ trainings });
        }
      });
  }

  handleFormSubmitNewTraining = (newTrainingInfo) => {
    const { teamId, userId } = this.props;
    const { date } = newTrainingInfo;
    const newTrainingYear = moment(date).format("YYYY");
    const newTrainingMonth = moment(date).format("MMMM");

    const databaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${newTrainingYear}/${newTrainingMonth}`
    );
    const trainingId = databaseRef.push().key;
    const newTraining = {
      trainingId,
      trainingInfo: { ...newTrainingInfo },
    };
    databaseRef.child(trainingId).set(newTraining);

    this.updateTrainingsOnTrainingAdd(
      newTraining,
      newTrainingYear,
      newTrainingMonth
    );
  };

  updateTrainingsOnTrainingAdd = (newTraining, year, month) => {
    const trainingMonths = this.state.trainings[year]
      ? this.state.trainings[year]
      : null;

    const trainingsInMonth = trainingMonths
      ? { ...this.state.trainings[year][month] }
      : null;

    const updatedTrainings = {
      ...this.state.trainings,
      [year]: {
        ...trainingMonths,
        [month]: {
          ...trainingsInMonth,
          [newTraining.trainingId]: {
            ...newTraining,
          },
        },
      },
    };

    this.setState({ trainings: updatedTrainings });
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
    setTimeout(() => {
      window.location.reload();
    }, 800);
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

  updateTraininingsOnDelete = (deletedIds, year, month) => {
    const trainingsInMonth = Object.values({
      ...this.state.trainings[year][month],
    });
    const updatedTrainings = trainingsInMonth.filter(
      (training) => !deletedIds.includes(training.trainingId)
    );
    this.setState({
      trainings: {
        ...this.state.trainings,
        [year]: {
          ...this.state.trainings[year],
          [month]: updatedTrainings,
        },
      },
    });
  };

  render() {
    const trainingsYearsArray = Object.values(this.state.trainings);
    const trainingsYears = Object.keys(this.state.trainings);
    const trainingYears = this.state.trainings
      ? trainingsYearsArray.map((year, index) => (
          <TrainingYear
            userId={this.props.userId}
            teamId={this.props.teamId}
            trainings={year}
            key={trainingsYears[index]}
            year={trainingsYears[index]}
            onDeleteUpdate={this.updateTraininingsOnDelete}
          />
        ))
      : null;

    return (
      <div className={classes.Trainings}>
        {trainingYears}
        <div className={classes.TrainingCreators}>
          <div className={classes.TrainingCreators__Creator_Wraper}>
            {" "}
            <SingleTrainingCreator
              onFormSubmit={this.handleFormSubmitNewTraining}
            />
          </div>
          <div className={classes.TrainingCreators__Creator_Wraper}>
            {" "}
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
