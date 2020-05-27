import React, { Component } from "react";
import classes from "./TrainingInfo.module.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {
  Event,
  HourglassEmpty,
  HourglassFull,
  LocationOn,
  SportsSoccer,
  SignalCellularAlt,
  Edit,
} from "@material-ui/icons";
import StylesProvider from "@material-ui/styles/StylesProvider";

class TrainingInfo extends Component {
  state = {
    expanded: true,
    editFormActive: false,
    updatedTrainingInfo: {
      ...this.props.trainingInfo,
    },
  };

  handleTrainingCreatorToggle = () => {
    this.setState({ editFormActive: !this.state.editFormActive });
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;

    this.setState({
      updatedTrainingInfo: {
        ...this.state.updatedTrainingInfo,
        [id]: value,
      },
    });
  };

  handleSliderChange = (e, newValue) => {
    this.setState({
      updatedTrainingInfo: {
        ...this.state.updatedTrainingInfo,
        intensity: newValue,
      },
    });
  };

  handleEditFormOpen = () => {
    this.setState({
      editFormActive: true,
    });
  };

  handleEditFormClose = () => {
    this.setState({ editFormActive: false });
  };

  handleToggleInfoCard = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  updateTrainingInfo = (updatedTrainingInfo) => {
    this.setState({ updatedTrainingInfo });
  };

  render() {
    const {
      date,
      start,
      end,
      place,
      trainingType,
      intensity,
    } = this.props.trainingInfo;

    const defaultValueDate = date.replace(/[/]/g, "-");

    const trainingInfo = this.state.editFormActive ? (
      <StylesProvider injectFirst>
        <Card className={classes.TrainingInfo} variant="outlined">
          <h3
            className={classes.TrainingInfo__Title}
            onClick={this.handleToggleInfoCard}
          >
            Training Information
          </h3>
          <Collapse in={this.state.expanded}>
            <CardContent className={classes.TrainingInfo__Content}>
              <form
                className={classes.TrainingInfo__Form}
                onChange={this.handleInputChange}
              >
                <TextField
                  className={classes.TrainingInfo__Input}
                  id="date"
                  name="date"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={defaultValueDate}
                />
                <TextField
                  className={classes.TrainingInfo__Input}
                  id="start"
                  name="start"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="Start"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={start}
                />
                <TextField
                  className={classes.TrainingInfo__Input}
                  id="end"
                  name="end"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="End"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={end}
                />
                <TextField
                  className={classes.TrainingInfo__Input}
                  id="place"
                  name="place"
                  variant="outlined"
                  size="small"
                  inputProps={{
                    maxLength: 12,
                  }}
                  label="Place"
                  defaultValue={place}
                />
                <TextField
                  className={classes.TrainingInfo__Input}
                  id="trainingType"
                  name="trainingType"
                  variant="outlined"
                  size="small"
                  inputProps={{
                    maxLength: 18,
                  }}
                  label="Training type"
                  defaultValue={trainingType}
                />
                <Typography
                  className={classes.TrainingInfo__SliderLabel}
                  id="intensity"
                  gutterBottom
                >
                  Intensity %
                </Typography>
                <Slider
                  className={classes.TrainingInfo__Input}
                  id="intensity"
                  name="intensity"
                  size="small"
                  value={this.state.updatedTrainingInfo.intensity}
                  valueLabelDisplay="auto"
                  onChange={this.handleSliderChange}
                />
                <div className={classes.TrainingInfo__Buttons}>
                  <Button
                    className={classes.TrainingInfo__Button_Add}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      this.props.onFormSubmit(this.state.updatedTrainingInfo);
                      this.handleEditFormClose();
                    }}
                  >
                    add
                  </Button>
                  <Button
                    className={classes.TrainingInfo__Button_Cancel}
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={this.handleEditFormClose}
                  >
                    cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Collapse>
        </Card>
      </StylesProvider>
    ) : (
      <StylesProvider injectFirst>
        <Card className={classes.TrainingInfo} variant="outlined">
          <h3
            className={classes.TrainingInfo__Title}
            onClick={this.handleToggleInfoCard}
          >
            Training Information
          </h3>
          <Collapse in={this.state.expanded}>
            <CardContent className={classes.TrainingInfo__Content}>
              <Edit
                className={classes.TrainingInfo__Icon_Edit}
                onClick={this.handleEditFormOpen}
              />
              <div className={classes.TrainingInfo__InfoRow}>
                <span className={classes.TrainingInfo__InfoLine}>
                  <Event
                    className={`fas fa-calendar-alt ${classes.TrainingInfo__Icon}`}
                  />
                  Date:
                  <span className={classes.TrainingInfo__Info_Text}>
                    {" "}
                    {date}
                  </span>
                </span>
              </div>
              <div className={classes.TrainingInfo__InfoRow}>
                <span className={classes.TrainingInfo__InfoLine}>
                  {" "}
                  <HourglassEmpty
                    className={`fas fa-hourglass-start ${classes.TrainingInfo__Icon}`}
                  />{" "}
                  Start:
                  <span className={classes.TrainingInfo__Info_Text}>
                    {" "}
                    {start}
                  </span>
                </span>
              </div>
              <div className={classes.TrainingInfo__InfoRow}>
                <span className={classes.TrainingInfo__InfoLine}>
                  {" "}
                  <HourglassFull
                    className={`fas fa-hourglass-end ${classes.TrainingInfo__Icon}`}
                  />
                  End:
                  <span className={classes.TrainingInfo__Info_Text}>{end}</span>
                </span>
              </div>

              <div className={classes.TrainingInfo__InfoRow}>
                <span className={classes.TrainingInfo__InfoLine}>
                  <LocationOn
                    className={`fas fa-map-marker-alt ${classes.TrainingInfo__Icon}`}
                  />
                  Place:
                  <span className={classes.TrainingInfo__Info_Text}>
                    {place}
                  </span>
                </span>
              </div>
              <div className={classes.TrainingInfo__InfoRow}>
                <span className={classes.TrainingInfo__InfoLine}>
                  <SportsSoccer
                    className={`far fa-futbol ${classes.TrainingInfo__Icon}`}
                  />
                  Type:
                  <span className={classes.TrainingInfo__Info_Text}>
                    {trainingType}
                  </span>
                </span>
              </div>
              <div className={classes.TrainingInfo__InfoRow}>
                <span className={classes.TrainingInfo__InfoLine}>
                  <SignalCellularAlt
                    className={`fas fa-signal ${classes.TrainingInfo__Icon}`}
                  />
                  Intensity:
                  <span className={classes.TrainingInfo__Info_Text}>
                    {intensity}
                  </span>
                </span>
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </StylesProvider>
    );

    return <>{trainingInfo} </>;
  }
}

export default TrainingInfo;
