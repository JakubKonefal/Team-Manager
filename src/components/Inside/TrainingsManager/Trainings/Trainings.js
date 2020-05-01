import React, { Component } from "react";
import axios from "axios";
import TrainingYear from "./TrainingYear/TrainingYear";
import SingleTrainingCreator from "./TrainingsCreator/SingleTrainingCreator/SingleTrainingCreator";
import MultipleTrainingsCreator from "./TrainingsCreator/MultipleTrainingsCreator/MultipleTrainingsCreator";
import classes from "./Trainings.module.css";
import { database } from "../../../../firebase/firebase";
import Button from "@material-ui/core/Button";
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
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.teamId}/trainings.json`
      )
      .then((res) => {
        const trainings = res.data;
        if (trainings) {
          this.setState({ trainings });
        }
      });
  }

  handleFormSubmitNewTraining = (newTrainingInfo) => {
    const { date } = newTrainingInfo;
    const newTrainingYear = moment(date).format("YYYY");
    const newTrainingMonth = moment(date).format("MMMM");

    const databaseRef = database.ref(
      `${this.props.teamId}/trainings/${newTrainingYear}/${newTrainingMonth}`
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
    const { from, to, daysOfWeek, ...trainingInfo } = newTrainingsInfo;
    const daysOfWeekAsNumbers = this.getDaysOfWeekAsNumbers(daysOfWeek);

    const selectedDaysArray = this.getSelectedDaysArray(
      from,
      to,
      daysOfWeekAsNumbers
    );

    selectedDaysArray.forEach((day) => {
      const date = moment(day);
      const dateYear = date.format("YYYY");
      const dateMonth = date.format("MMMM");

      const databaseRef = database.ref(
        `${this.props.teamId}/trainings/${dateYear}/${dateMonth}`
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
    }, 1000);
  };

  getSelectedDaysArray = (from, to, daysOfWeek) => {
    let startingDate = new Date(from);
    let endingDate = new Date(to);
    const selectedDaysArray = [];

    while (startingDate <= endingDate) {
      if (daysOfWeek.includes(startingDate.getDay())) {
        selectedDaysArray.push(moment(startingDate).format("YYYY/MM/DD"));
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
        <div className={classes.Buttons}></div>
        <div className={classes.TrainingCreators}>
          <div className={classes.CreatorWraper}>
            {" "}
            <SingleTrainingCreator
              onFormSubmit={this.handleFormSubmitNewTraining}
            />
          </div>
          <div className={classes.CreatorWraper}>
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
