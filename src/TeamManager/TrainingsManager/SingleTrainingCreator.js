import React, { Component } from "react";
import classes from "./SingleTrainingCreator.module.css";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import StylesProvider from "@material-ui/styles/StylesProvider";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

class SingleTrainingCreator extends Component {
  state = {
    trainingCreatorActive: false,
    newTrainingInfo: {
      date: "",
      start: "",
      end: "",
      place: "",
      trainingType: "",
      intensity: 0,
    },
  };

  handleTrainingCreatorToggle = () => {
    this.setState({ trainingCreatorActive: !this.state.trainingCreatorActive });
  };

  handleFormCancel = () => {
    this.setState({
      trainingCreatorActive: false,
      newTrainingInfo: {
        date: "",
        start: "",
        end: "",
        place: "",
        trainingType: "",
        intensity: 0,
      },
    });
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      newTrainingInfo: {
        ...this.state.newTrainingInfo,
        [name]: value,
      },
    });
  };

  handleSliderChange = (e, newValue) => {
    this.setState({
      newTrainingInfo: { ...this.state.newTrainingInfo, intensity: newValue },
    });
  };

  render() {
    const arrowIcon = this.state.trainingCreatorActive ? (
      <ArrowDropUp
        className={classes.SingleTrainingCreator__HeaderIcon}
      ></ArrowDropUp>
    ) : (
      <ArrowDropDown
        className={classes.SingleTrainingCreator__HeaderIcon}
      ></ArrowDropDown>
    );

    return (
      <StylesProvider injectFirst>
        <Card className={classes.SingleTrainingCreator} variant="outlined">
          <Typography
            variant="h6"
            className={classes.SingleTrainingCreator__Header}
            onClick={this.handleTrainingCreatorToggle}
          >
            1. Create single training day {arrowIcon}
          </Typography>
          <Collapse in={this.state.trainingCreatorActive}>
            <CardContent className={classes.SingleTrainingCreator__Content}>
              <form
                className={classes.SingleTrainingCreator__Form}
                onChange={this.handleInputChange}
                onSubmit={(event) =>
                  this.props.onFormSubmit(this.state.newTrainingInfo, event)
                }
              >
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="date-1"
                  name="date"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="start-1"
                  name="start"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="Start"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="end-1"
                  name="end"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="End"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="place-1"
                  name="place"
                  variant="outlined"
                  inputProps={{
                    maxLength: 12,
                  }}
                  size="small"
                  label="Place"
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="trainingType-1"
                  name="trainingType"
                  variant="outlined"
                  inputProps={{
                    maxLength: 18,
                  }}
                  size="small"
                  label="Training type"
                />
                <Typography
                  className={classes.SingleTrainingCreator__SliderLabel}
                  id="intensity"
                  gutterBottom
                >
                  Intensity %
                </Typography>
                <Slider
                  className={classes.SingleTrainingCreator__Input}
                  id="intensity-1"
                  name="intensity"
                  size="small"
                  value={this.state.newTrainingInfo.intensity}
                  valueLabelDisplay="auto"
                  onChange={this.handleSliderChange}
                />
                <div className={classes.SingleTrainingCreator__Buttons}>
                  <button
                    type="submit"
                    className={classes.SingleTrainingCreator__Button_Add}
                  >
                    add
                  </button>
                  <button
                    className={classes.SingleTrainingCreator__Button_Cancel}
                    type="reset"
                    onClick={this.handleFormCancel}
                  >
                    cancel
                  </button>
                </div>
              </form>
            </CardContent>
          </Collapse>
        </Card>
      </StylesProvider>
    );
  }
}

export default SingleTrainingCreator;
