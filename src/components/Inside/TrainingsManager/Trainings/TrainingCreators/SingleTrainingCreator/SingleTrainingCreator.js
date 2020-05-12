import React, { Component } from "react";
import classes from "./SingleTrainingCreator.module.css";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    const { id, value } = target;

    this.setState({
      newTrainingInfo: {
        ...this.state.newTrainingInfo,
        [id]: value,
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
              >
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="date"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="start"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="Start"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="end"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="End"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="place"
                  variant="outlined"
                  size="small"
                  label="Place"
                />
                <TextField
                  className={classes.SingleTrainingCreator__Input}
                  id="trainingType"
                  variant="outlined"
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
                  id="intensity"
                  size="small"
                  value={this.state.newTrainingInfo.intensity}
                  valueLabelDisplay="auto"
                  onChange={this.handleSliderChange}
                />
                <div className={classes.SingleTrainingCreator__Buttons}>
                  <Button
                    className={classes.SingleTrainingCreator__Button_Add}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={(event) =>
                      this.props.onFormSubmit(this.state.newTrainingInfo, event)
                    }
                  >
                    add
                  </Button>
                  <Button
                    className={classes.SingleTrainingCreator__Button_Cancel}
                    type="reset"
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={this.handleFormCancel}
                  >
                    cancel
                  </Button>
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
