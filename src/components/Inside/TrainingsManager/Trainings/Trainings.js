import React, { Component } from "react";
import axios from "axios";
import TrainingsList from "./TrainingsList/TrainingsList";
import TrainingYear from "./TrainingYear/TrainingYear";
import SingleTrainingCreator from "./TrainingsCreator/SingleTrainingCreator/SingleTrainingCreator";
import MultipleTrainingsCreator from "./TrainingsCreator/MultipleTrainingsCreator/MultipleTrainingsCreator";
import classes from "./Trainings.module.css";
import { database } from "../../../../firebase/firebase";
import Button from "@material-ui/core/Button";
import moment from "moment";

class Trainings extends Component {
  state = {
    trainings: [],
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
          // const trainingsCheckboxes = trainingsYears.map((training) => ({
          //   checked: false,
          //   id: training.trainingId,
          // }));
          this.setState({ trainings });
        }
      });
  }

  handleFormSubmitNewTraining = (newTrainingInfo) => {
    const { date } = newTrainingInfo;
    const dateObj = new Date(date);
    const dateYear = dateObj.getFullYear();
    const dateMonth = moment(dateObj).format("MMMM");

    const databaseRef = database.ref(
      `${this.props.teamId}/trainings/${dateYear}/${dateMonth}`
    );
    const trainingId = databaseRef.push().key;
    const newTraining = {
      trainingId,
      trainingInfo: { ...newTrainingInfo },
    };
    databaseRef.child(trainingId).set(newTraining);

    // this.updateTrainingsArrayOnTrainingAdd(newTraining);
  };

  // updateTrainingsArrayOnTrainingAdd = (newTraining) => {
  //   const updatedTrainingsArr = [...this.state.trainings];
  //   updatedTrainingsArr.push(newTraining);
  //   this.setState({ trainings: updatedTrainingsArr });
  // };

  handleCheckboxSelectAll = ({ target }) => {
    const updatedCheckboxes = [...this.state.trainingsCheckboxes];
    updatedCheckboxes.forEach((item) => {
      item.checked = target.checked;
    });

    this.setState({ trainingsCheckboxes: updatedCheckboxes });
  };

  handleCheckbox = ({ target }, index, id) => {
    const updatedCheckboxes = [...this.state.trainingsCheckboxes];
    const obj = { checked: target.checked, id };

    updatedCheckboxes.splice(index, 1, obj);

    this.setState({ trainingsCheckboxes: updatedCheckboxes });
  };

  handleCheckedTrainingsDelete = () => {
    const checkedTrainings = [...this.state.trainingsCheckboxes].filter(
      (checkbox) => checkbox.checked === true
    );
    checkedTrainings.forEach((training) =>
      database.ref(`${this.props.teamId}/trainings/${training.id}`).remove()
    );
    const checkedTrainingsIds = checkedTrainings.map((training) => training.id);
    this.updateTrainingsArrayOnTrainingDelete(checkedTrainingsIds);
  };

  updateTrainingsArrayOnTrainingDelete = (deletedTrainingsIds) => {
    const currentTrainingsArr = [...this.state.trainings];
    const updatedTrainingsArr = currentTrainingsArr.filter((training) => {
      return !deletedTrainingsIds.includes(training.trainingId);
    });
    this.setState({ trainings: updatedTrainingsArr });
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

    // const newTrainingsArray = [];
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
      // newTrainingsArray.push(newTraining);
    });
    // this.updateTrainingsArrayOnTrainingsAdd(newTrainingsArray);
  };

  // updateTrainingsArrayOnTrainingsAdd = (newTrainings) => {
  //   const updatedTrainingsArr = [...this.state.trainings];
  //   updatedTrainingsArr.push(...newTrainings);
  //   const updatedCheckboxesArr = [...this.state.trainingsCheckboxes];
  //   const newCheckboxes = newTrainings.map((training) => {
  //     return { checked: false, id: training.trainingId };
  //   });
  //   updatedCheckboxesArr.push(...newCheckboxes);
  //   this.setState({
  //     trainings: updatedTrainingsArr,
  //     trainingsCheckboxes: updatedCheckboxesArr,
  //   });
  // };

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
          />
        ))
      : null;

    return (
      <div className={classes.Trainings}>
        {trainingYears}
        <div className={classes.Buttons}>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleCheckedTrainingsDelete}
          >
            Delete
          </Button>
        </div>
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
