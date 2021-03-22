import React, { useState } from 'react';
import classes from './MultipleTrainingsCreator.module.css';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import StylesProvider from '@material-ui/styles/StylesProvider';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

const newTrainingsInfoInitialObj = {
  from: '',
  to: '',
  daysOfWeek: [],
  start: '',
  end: '',
  place: '',
  trainingType: '',
  intensity: 0,
};

const MultipleTrainingsCreator = ({ onFormSubmit }) => {
  const [trainingsCreatorActive, setTrainingsCreatorActive] = useState(false);
  const [incorrectDateError, setIncorrectDateError] = useState(false);
  const [selectInputError, setSelectInputError] = useState(false);
  const [newTrainingsInfo, setNewTrainingsInfo] = useState(
    newTrainingsInfoInitialObj
  );

  const handleTrainingCreatorToggle = () => {
    setTrainingsCreatorActive((prevVal) => !prevVal);
  };

  const handleFormCancel = () => {
    setTrainingsCreatorActive(false);
    setSelectInputError(false);
    setIncorrectDateError(false);
    setNewTrainingsInfo(newTrainingsInfoInitialObj);
  };

  const handleInputChange = ({ target: { id, value } }) => {
    setNewTrainingsInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const isDateInputCorrect = (event) => {
    const { value } = event.target;
    const { from } = newTrainingsInfo;
    const fromDateObj = moment(from);
    const toDateObj = moment(value);

    if (!from || fromDateObj >= toDateObj) {
      setNewTrainingsInfo((prevInfo) => ({
        ...prevInfo,
        to: '',
      }));
      setIncorrectDateError(true);
      return false;
    }
    return true;
  };

  const handleDateInputChange = (event) => {
    event.stopPropagation();
    const { value } = event.target;

    if (isDateInputCorrect(event)) {
      setNewTrainingsInfo((prevInfo) => ({
        ...prevInfo,
        to: value,
      }));
      setIncorrectDateError(false);
    }
  };

  const handleSelectInputChange = ({ target }) => {
    setNewTrainingsInfo((prevInfo) => ({
      ...prevInfo,
      daysOfWeek: target.value,
    }));
  };

  const handleSliderChange = (e, newValue) => {
    setNewTrainingsInfo((prevInfo) => ({
      ...prevInfo,
      intensity: newValue,
    }));
  };

  const isSelectInputEmpty = (e) => {
    e.preventDefault();
    const selectedValuesCounter = newTrainingsInfo.daysOfWeek.length;

    selectedValuesCounter < 1
      ? setSelectInputError(true)
      : setSelectInputError(false);
    return selectedValuesCounter < 1;
  };

  const arrowIcon = trainingsCreatorActive ? (
    <ArrowDropUp
      className={classes.MultipleTrainingsCreator__ArrowIcon}
    ></ArrowDropUp>
  ) : (
    <ArrowDropDown
      className={classes.MultipleTrainingsCreator__ArrowIcon}
    ></ArrowDropDown>
  );

  const daysInWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const dateErrorMessage = incorrectDateError && 'Incorrect date!';

  return (
    <StylesProvider injectFirst>
      <Card className={classes.MultipleTrainingsCreator} variant="outlined">
        <Typography
          variant="h6"
          className={classes.MultipleTrainingsCreator__Title}
          onClick={handleTrainingCreatorToggle}
        >
          2. Create multiple training days {arrowIcon}
        </Typography>
        <Collapse in={trainingsCreatorActive}>
          <CardContent className={classes.MultipleTrainingsCreator__Content}>
            <form
              className={classes.MultipleTrainingsCreator__Form}
              onChange={handleInputChange}
              onSubmit={(event) => {
                if (!isSelectInputEmpty(event)) {
                  onFormSubmit(newTrainingsInfo);
                  handleFormCancel();
                }
              }}
            >
              <TextField
                className={classes.MultipleTrainingsCreator__Input}
                id="from"
                name="from"
                type="date"
                variant="outlined"
                size="small"
                label="From"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                className={classes.MultipleTrainingsCreator__Input}
                id="to"
                name="to"
                type="date"
                variant="outlined"
                size="small"
                label="To"
                InputLabelProps={{ shrink: true }}
                error={incorrectDateError}
                helperText={dateErrorMessage}
                required
                onChange={(event) => handleDateInputChange(event)}
                value={newTrainingsInfo.to}
              />
              <FormControl
                variant="outlined"
                className={classes.MultipleTrainingsCreator__Input}
                required
              >
                <InputLabel variant="outlined" id="daysOfWeek">
                  Weekdays
                </InputLabel>
                <Select
                  labelId="daysOfWeek"
                  id="daysOfWeek"
                  name="daysOfWeek"
                  multiple
                  variant="outlined"
                  input={<Input required />}
                  value={newTrainingsInfo.daysOfWeek}
                  onChange={handleSelectInputChange}
                  renderValue={(selected) => selected.join(', ')}
                  required
                >
                  {daysInWeek.map((day) => (
                    <MenuItem
                      key={day}
                      value={day}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Checkbox
                        checked={newTrainingsInfo.daysOfWeek.indexOf(day) > -1}
                      />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
                {selectInputError && (
                  <FormHelperText
                    className={
                      classes.MultipleTrainingsCreator__Select_ErrorMsg
                    }
                  >
                    This field is required!
                  </FormHelperText>
                )}
              </FormControl>
              <TextField
                className={classes.MultipleTrainingsCreator__Input}
                id="start"
                name="start"
                type="time"
                variant="outlined"
                size="small"
                label="Start"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                className={classes.MultipleTrainingsCreator__Input}
                id="end"
                name="end"
                type="time"
                variant="outlined"
                size="small"
                label="End"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                className={classes.MultipleTrainingsCreator__Input}
                id="place"
                name="place"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 12,
                }}
                label="Place"
              />
              <TextField
                className={classes.MultipleTrainingsCreator__Input}
                id="trainingType"
                name="trainingType"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 18,
                }}
                label="Training type"
              />
              <Typography
                className={classes.MultipleTrainingsCreator__SliderLabel}
                id="intensity"
                gutterBottom
              >
                Intensity %
              </Typography>
              <Slider
                className={classes.MultipleTrainingsCreator__Input}
                id="intensity"
                name="intensity"
                size="small"
                value={newTrainingsInfo.intensity}
                valueLabelDisplay="auto"
                onChange={handleSliderChange}
              />
              <div className={classes.MultipleTrainingsCreator__Buttons}>
                <button
                  type="submit"
                  className={classes.MultipleTrainingsCreator__Button_Add}
                >
                  add
                </button>
                <button
                  className={classes.MultipleTrainingsCreator__Button_Cancel}
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

export default MultipleTrainingsCreator;
