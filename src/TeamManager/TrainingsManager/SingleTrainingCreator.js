import React, { useState } from 'react';
import classes from './SingleTrainingCreator.module.css';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import StylesProvider from '@material-ui/styles/StylesProvider';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const newTrainingInfoInitialObj = {
  date: '',
  start: '',
  end: '',
  place: '',
  trainingType: '',
  intensity: 0,
};

const SingleTrainingCreator = ({ onFormSubmit }) => {
  const [trainingCreatorActive, setTrainingCreatorActive] = useState(false);
  const [newTrainingInfo, setNewTrainingInfo] = useState(
    newTrainingInfoInitialObj
  );

  const handleTrainingCreatorToggle = () => {
    setTrainingCreatorActive((prevVal) => !prevVal);
  };

  const handleFormCancel = () => {
    setTrainingCreatorActive(false);
    setNewTrainingInfo(newTrainingInfoInitialObj);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setNewTrainingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSliderChange = (e, newValue) => {
    setNewTrainingInfo((prevInfo) => ({
      ...prevInfo,
      intensity: newValue,
    }));
  };

  const arrowIcon = trainingCreatorActive ? (
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
          onClick={handleTrainingCreatorToggle}
        >
          1. Create single training day {arrowIcon}
        </Typography>
        <Collapse in={trainingCreatorActive}>
          <CardContent className={classes.SingleTrainingCreator__Content}>
            <form
              className={classes.SingleTrainingCreator__Form}
              onChange={handleInputChange}
              onSubmit={(event) => onFormSubmit(newTrainingInfo, event)}
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
                value={newTrainingInfo.intensity}
                valueLabelDisplay="auto"
                onChange={handleSliderChange}
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
                  onClick={handleFormCancel}
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
};

export default SingleTrainingCreator;
