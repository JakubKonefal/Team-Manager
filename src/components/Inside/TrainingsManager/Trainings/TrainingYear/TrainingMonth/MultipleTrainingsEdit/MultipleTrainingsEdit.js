import React, { Component } from "react";
import classes from "./MultipleTrainingsEdit.module.css";
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

  // validateInputDate = ({ target: { value } }) => {
  //   const { year, month } = this.props;
  //   const yearNumber = parseInt(year);
  //   const monthNumber = moment().month(month).format("MM");
  //   const pickedYear = moment(value).year();
  //   const pickedMonthOneIndexed = moment(value).month().format("MM");
  //   console.log(yearNumber);
  //   console.log(monthNumber);
  //   console.log(pickedYear);
  //   console.log(pickedMonthOneIndexed);

  //   // if (pickedYear !== yearNumber || pickedMonth !== zeroIndexedMonth) {
  //   //   // value = `${year}-${zeroIndexedMonth}-01`;
  //   //   console.log("SSSSSSSSSSSSSSSSSSSSS");

  //   //   // this.setState({
  //   //   //   editedTrainingsInfo: {
  //   //   //     ...this.state.editedTrainingsInfo,
  //   //   //     date: `2020-04-01`,
  //   //   //   },
  //   //   // });
  //   // }
  // };

  render() {
    const multipleTrainingsEditor = this.props.active ? (
      <StylesProvider injectFirst>
        <Card className={classes.MultipleTrainingsEditor} variant="outlined">
          <CardContent className={classes.MultipleTrainingsEditor__Content}>
            <form
              className={classes.MultipleTrainingsEditor__Form}
              onChange={this.handleInputChange}
            >
              <div className={classes.MultipleTrainingsEditor__Form_Row}>
                {" "}
                <TextField
                  className={`${classes.Input}`}
                  id="date"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  disabled={this.props.checkedTrainingsCount !== 1}
                  onChange={(event) => this.validateInputDate(event)}
                  value={this.state.editedTrainingsInfo.date}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="start"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="Start"
                  InputLabelProps={{ shrink: true }}
                  disabled={this.props.checkedTrainingsCount < 1}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="end"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="End"
                  InputLabelProps={{ shrink: true }}
                  disabled={this.props.checkedTrainingsCount < 1}
                />
              </div>
              <div className={classes.MultipleTrainingsEditor__Form_Row}>
                {" "}
                <TextField
                  className={`${classes.Input}`}
                  id="place"
                  variant="outlined"
                  size="small"
                  label="Place"
                  disabled={this.props.checkedTrainingsCount < 1}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="trainingType"
                  variant="outlined"
                  size="small"
                  label="Training type"
                  disabled={this.props.checkedTrainingsCount < 1}
                />
                <div className={classes.Slider__Wraper}>
                  <Typography
                    className={classes.IntensityLabel}
                    id="intensity"
                    gutterBottom
                  >
                    Intensity %
                  </Typography>
                  <Slider
                    className={`${classes.Slider}`}
                    id="intensity"
                    size="small"
                    value={this.state.editedTrainingsInfo.intensity}
                    valueLabelDisplay="auto"
                    onChange={this.handleSliderChange}
                    disabled={this.props.checkedTrainingsCount < 1}
                  />
                </div>
              </div>

              <div className={classes.Buttons}>
                <Button
                  className={classes.Buttons__Add}
                  color="primary"
                  variant="contained"
                  size="small"
                  disabled={this.props.checkedTrainingsCount < 1}
                  onClick={() =>
                    this.props.onFormSubmit(this.state.editedTrainingsInfo)
                  }
                >
                  save
                </Button>
                <Button
                  className={classes.Buttons__Cancel}
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
