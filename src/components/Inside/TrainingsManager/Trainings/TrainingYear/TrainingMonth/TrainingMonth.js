import React, { Component } from "react";
import classes from "./TrainingMonth.module.css";
import { database } from "../../../../../../firebase/firebase";
import Checkbox from "@material-ui/core/Checkbox";
import Training from "../../Training/Training";
import TrainingInfoBox from "../../TrainingInfoBox/TrainingInfoBox";
import Collapse from "@material-ui/core/Collapse";

class TrainingMonth extends Component {
  state = {
    trainings: [],
    trainingsCheckboxes: [],
    expanded: true,
  };

  componentDidMount() {
    const trainings = Object.values(this.props.trainings);
    const trainingsCheckboxes = trainings.map((training) => ({
      checked: false,
      id: training.trainingId,
    }));
    this.setState({
      trainings,
      trainingsCheckboxes,
    });
  }

  handleToggleMonthExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleCheckboxSelectAll = ({ target }) => {
    const updatedCheckboxes = [...this.state.trainingsCheckboxes];
    updatedCheckboxes.forEach((item) => {
      item.checked = target.checked;
    });
    this.setState({ trainingsCheckboxes: updatedCheckboxes });
  };

  handleCheckboxClick = ({ target }, index, id) => {
    const updatedCheckboxes = [...this.state.trainingsCheckboxes];
    const clickedCheckbox = { checked: target.checked, id };

    updatedCheckboxes.splice(index, 1, clickedCheckbox);

    this.setState({ trainingsCheckboxes: updatedCheckboxes });
  };

  handleCheckedTrainingsDelete = () => {
    const { year, month } = this.props;
    const checkedTrainings = [...this.state.trainingsCheckboxes].filter(
      (checkbox) => checkbox.checked === true
    );
    checkedTrainings.forEach((training) =>
      database
        .ref(`${this.props.teamId}/trainings/${year}/${month}/${training.id}`)
        .remove()
    );
    const checkedTrainingsIds = checkedTrainings.map((training) => training.id);
    this.updateTrainingsArrayOnTrainingDelete(checkedTrainingsIds);
  };

  updateTrainingsArrayOnTrainingDelete = (deletedTrainingsIds) => {
    const currentTrainings = [...this.state.trainings];
    const updatedTrainings = currentTrainings.filter((training) => {
      return !deletedTrainingsIds.includes(training.trainingId);
    });
    this.setState({ trainings: updatedTrainings });
  };

  render() {
    const trainings = this.state.trainings
      ? this.state.trainings.map((training, index) => (
          <Training
            {...training.trainingInfo}
            key={training.trainingId}
            teamId={this.props.teamId}
            trainingId={training.trainingId}
            checkbox={
              <Checkbox
                checked={this.state.trainingsCheckboxes[index].checked}
                onClick={(event) =>
                  this.handleCheckboxClick(event, index, training.trainingId)
                }
                index={index}
              />
            }
            year={this.props.year}
            month={this.props.month}
          />
        ))
      : null;

    return this.state.trainings.length > 0 ? (
      <>
        <div className={classes.TrainingMonth__Header}>
          <div className={classes.TrainingMonth__Header_Checkbox}>
            <Checkbox color="default" onClick={this.handleCheckboxSelectAll} />{" "}
          </div>
          <h5
            className={classes.TrainingMonth__Header_Label}
            onClick={this.handleToggleMonthExpand}
          >
            {`${this.props.year} ${this.props.month}`}
          </h5>
        </div>
        <Collapse in={this.state.expanded}>
          <div className={classes.TrainingMonth__TrainingsList}>
            <TrainingInfoBox />
            {trainings}
          </div>
          <div className={classes.TrainingMonth__Buttons}>
            <button className={`${classes.Button__Edit} ${classes.Button}`}>
              edit
            </button>
            <button
              className={`${classes.Button__Delete} ${classes.Button}`}
              onClick={this.handleCheckedTrainingsDelete}
            >
              delete
            </button>
          </div>
        </Collapse>
      </>
    ) : null;
  }
}

export default TrainingMonth;
