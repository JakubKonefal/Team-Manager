import React, { Component } from "react";
import classes from "./MultipleTrainingsEditor.module.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import StylesProvider from "@material-ui/styles/StylesProvider";
import moment from "moment";

class MultipleTrainingsEdit extends Component {
  state = {
    editedTrainingsInfo: {
      date: "",
      start: "",
      end: "",
      place: "",
      trainingType: "",
      intensity: 0,
    },
    incorrectDate: false,
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    if (id !== "date") {
      this.setState({
        editedTrainingsInfo: {
          ...this.state.editedTrainingsInfo,
          [id]: value,
        },
      });
    }
  };

  handleSliderChange = (e, newValue) => {
    this.setState({
      editedTrainingsInfo: {
        ...this.state.editedTrainingsInfo,
        intensity: newValue,
      },
    });
  };

  resetInputsValues = () => {
    this.setState({
      editedTrainingsInfo: {
        date: "",
        start: "",
        end: "",
        place: "",
        trainingType: "",
        intensity: 0,
      },
    });
  };

  validateInputDate = ({ target: { value } }) => {
    const { year, month } = this.props;
    const yearNumber = parseInt(year);
    const monthNumber = moment().month(month).format("MM");
    const pickedYear = moment(value).year();
    let pickedMonthOneIndexed = moment(value).month() + 1;
    if (pickedMonthOneIndexed < 10) {
      pickedMonthOneIndexed = `0${pickedMonthOneIndexed}`;
    }

    if (pickedYear !== yearNumber || monthNumber !== pickedMonthOneIndexed) {
      this.setState({
        editedTrainingsInfo: {
          ...this.state.editedTrainingsInfo,
          date: `${yearNumber}-${monthNumber}-00`,
        },
        incorrectDate: true,
      });
    } else {
      this.setState({
        editedTrainingsInfo: {
          ...this.state.editedTrainingsInfo,
          date: value,
        },
        incorrectDate: false,
      });
    }
  };

  render() {
    const dateErrorMessage = this.state.incorrectDate
      ? "Only day can be changed!"
      : "";

    const multipleTrainingsEditor = this.props.active ? (
      <StylesProvider injectFirst>
        <Card className={classes.MultipleTrainingsEditor} variant="outlined">
          <CardContent className={classes.Content}>
            <form
              className={classes.Form}
              onSubmit={() =>
                this.props.onFormSubmit(this.state.editedTrainingsInfo)
              }
              onChange={this.handleInputChange}
            >
              <div className={classes.Form__Row}>
                <TextField
                  className={classes.Form__Input}
                  id="date"
                  name="date"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="Date"
                  error={this.state.incorrectDate}
                  helperText={dateErrorMessage}
                  InputLabelProps={{ shrink: true }}
                  disabled={this.props.checkedTrainingsCount !== 1}
                  onChange={(event) => this.validateInputDate(event)}
                  value={this.state.editedTrainingsInfo.date}
                  required
                />
                <TextField
                  className={classes.Form__Input}
                  id="start"
                  name="start"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="Start"
                  InputLabelProps={{ shrink: true }}
                  disabled={this.props.checkedTrainingsCount < 1}
                />
                <TextField
                  className={classes.Form__Input}
                  id="end"
                  name="end"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="End"
                  InputLabelProps={{ shrink: true }}
                  disabled={this.props.checkedTrainingsCount < 1}
                />
              </div>
              <div className={classes.Form__Row}>
                <TextField
                  className={classes.Form__Input}
                  id="place"
                  name="place"
                  variant="outlined"
                  size="small"
                  label="Place"
                  inputProps={{
                    maxLength: 12,
                  }}
                  disabled={this.props.checkedTrainingsCount < 1}
                />
                <TextField
                  className={classes.Form__Input}
                  id="trainingType"
                  name="trainingType"
                  variant="outlined"
                  size="small"
                  label="Training type"
                  inputProps={{
                    maxLength: 18,
                  }}
                  disabled={this.props.checkedTrainingsCount < 1}
                />
                <div className={classes.Form__SliderWraper}>
                  <Typography
                    className={classes.Form__SliderLabel}
                    id="intensity"
                    gutterBottom
                  >
                    Intensity %
                  </Typography>
                  <Slider
                    className={classes.Form__Slider}
                    id="intensity"
                    name="intensity"
                    size="small"
                    value={this.state.editedTrainingsInfo.intensity}
                    valueLabelDisplay="auto"
                    onChange={this.handleSliderChange}
                    disabled={this.props.checkedTrainingsCount < 1}
                  />
                </div>
              </div>
              <div className={classes.Form__Buttons}>
                <Button
                  type="submit"
                  className={classes.Form__Button_Add}
                  color="primary"
                  variant="contained"
                  size="small"
                  disabled={this.props.checkedTrainingsCount < 1}
                >
                  save
                </Button>
                <Button
                  className={classes.Form__Button_Cancel}
                  type="reset"
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    this.props.close();
                  }}
                >
                  cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </StylesProvider>
    ) : null;

    return <> {multipleTrainingsEditor} </>;
  }
}

export default MultipleTrainingsEdit;
