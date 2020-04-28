import React, { Component } from "react";
import classes from "./TrainingMonth.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import Training from "../../Training/Training";
import TrainingInfoBox from "../../TrainingInfoBox/TrainingInfoBox";
import Collapse from "@material-ui/core/Collapse";

class TrainingMonth extends Component {
  state = {
    expanded: true,
  };

  handleToggleMonthExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const trainingsArray = Object.values(this.props.trainings);
    const trainings = this.props.trainings
      ? trainingsArray.map((training) => (
          <Training
            {...training.trainingInfo}
            key={training.trainingId}
            teamId={this.props.teamId}
            trainingId={training.trainingId}
            checkbox={<Checkbox />}
            year={this.props.year}
            month={this.props.month}
          />
        ))
      : null;

    return (
      <>
        <div className={classes.TrainingMonth__Header}>
          <div className={classes.TrainingMonth__Header_Checkbox}>
            <Checkbox color="default" />{" "}
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
        </Collapse>
      </>
    );
  }
}

export default TrainingMonth;
