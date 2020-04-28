import React, { Component } from "react";
import classes from "./MultipleTrainingsCreator.module.css";
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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

class MultipleTrainingsCreator extends Component {
  state = {
    trainingsCreatorActive: false,
    newTrainingsInfo: {
      from: "",
      to: "",
      daysOfWeek: [],
      start: "",
      end: "",
      place: "",
      trainingType: "",
      intensity: 0,
    },
  };

  handleTrainingCreatorToggle = () => {
    this.setState({
      trainingsCreatorActive: !this.state.trainingsCreatorActive,
    });
  };

  handleFormCancel = () => {
    this.setState({
      trainingsCreatorActive: false,
      newTrainingsInfo: {
        from: "",
        to: "",
        daysOfWeek: [],
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
    if (id !== "daysOfWeek") {
      this.setState({
        newTrainingsInfo: {
          ...this.state.newTrainingsInfo,
          [id]: value,
        },
      });
    }
  };

  handleSelectChange = ({ target }) => {
    this.setState({
      newTrainingsInfo: {
        ...this.state.newTrainingsInfo,
        daysOfWeek: target.value,
      },
    });
  };

  handleSliderChange = (e, newValue) => {
    this.setState({
      newTrainingsInfo: { ...this.state.newTrainingsInfo, intensity: newValue },
    });
  };

  render() {
    const arrowIcon = this.state.trainingsCreatorActive ? (
      <ArrowDropUp className={classes.Header__ArrowIcon}></ArrowDropUp>
    ) : (
      <ArrowDropDown className={classes.Header__ArrowIcon}></ArrowDropDown>
    );

    const daysInWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return (
      <StylesProvider injectFirst>
        <Card className={classes.MultipleTrainingsCreator} variant="outlined">
          <Typography
            variant="h6"
            className={classes.MultipleTrainingsCreator__Header}
            onClick={this.handleTrainingCreatorToggle}
          >
            2. Create multiple training days {arrowIcon}
          </Typography>
          <Collapse in={this.state.trainingsCreatorActive}>
            <CardContent className={classes.MultipleTrainingsCreator__Content}>
              <form
                className={classes.MultipleTrainingsCreator__Form}
                onChange={this.handleInputChange}
              >
                <TextField
                  className={`${classes.Input}`}
                  id="from"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="From"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="to"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="To"
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl
                  variant="outlined"
                  className={`${classes.Input} ${classes.formControl}`}
                >
                  <InputLabel variant="outlined" id="daysOfWeek">
                    Weekdays
                  </InputLabel>
                  <Select
                    labelId="daysOfWeek"
                    id="daysOfWeek"
                    multiple
                    variant="outlined"
                    input={<Input />}
                    value={this.state.newTrainingsInfo.daysOfWeek}
                    onChange={this.handleSelectChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {daysInWeek.map((day) => (
                      <MenuItem
                        key={day}
                        value={day}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Checkbox
                          checked={
                            this.state.newTrainingsInfo.daysOfWeek.indexOf(
                              day
                            ) > -1
                          }
                        />
                        <ListItemText primary={day} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  className={`${classes.Input}`}
                  id="start"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="Start"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="end"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="End"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="place"
                  variant="outlined"
                  size="small"
                  label="Place"
                />
                <TextField
                  className={`${classes.Input}`}
                  id="trainingType"
                  variant="outlined"
                  size="small"
                  label="Training type"
                />
                <Typography
                  className={classes.IntensityLabel}
                  id="intensity"
                  gutterBottom
                >
                  Intensity %
                </Typography>
                <Slider
                  className={`${classes.Input}`}
                  id="intensity"
                  size="small"
                  value={this.state.newTrainingsInfo.intensity}
                  valueLabelDisplay="auto"
                  onChange={this.handleSliderChange}
                />
                <div className={classes.Buttons}>
                  <Button
                    className={classes.Buttons__Add}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() =>
                      this.props.onFormSubmit(this.state.newTrainingsInfo)
                    }
                  >
                    add
                  </Button>
                  <Button
                    className={classes.Buttons__Cancel}
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

export default MultipleTrainingsCreator;
