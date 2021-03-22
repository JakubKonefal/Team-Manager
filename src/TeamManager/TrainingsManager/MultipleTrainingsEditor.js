import React, { useState } from 'react';
import classes from './MultipleTrainingsEditor.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import StylesProvider from '@material-ui/styles/StylesProvider';
import moment from 'moment';

const editedTrainingsInfoInitialObj = {
  date: '',
  start: '',
  end: '',
  place: '',
  trainingType: '',
  intensity: 0,
};

const MultipleTrainingsEdit = ({
  active,
  year,
  month,
  onFormSubmit,
  onClose,
  checkedTrainingsCount,
}) => {
  const [editedTrainingsInfo, setEditedTrainingsInfo] = useState(
    editedTrainingsInfoInitialObj
  );

  const [incorrectDate, setIncorrectDate] = useState(false);

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    if (id !== 'date') {
      setEditedTrainingsInfo((prevInfo) => ({
        ...prevInfo,
        [id]: value,
      }));
    }
  };

  const handleSliderChange = (e, newValue) => {
    setEditedTrainingsInfo((prevInfo) => ({
      ...prevInfo,
      intensity: newValue,
    }));
  };

  const resetInputsValues = () => {
    setEditedTrainingsInfo(editedTrainingsInfoInitialObj);
  };

  const validateInputDate = ({ target: { value } }) => {
    const yearNumber = parseInt(year);
    const monthNumber = moment().month(month).format('MM');
    const pickedYear = moment(value).year();
    let pickedMonthOneIndexed = moment(value).month() + 1;
    if (pickedMonthOneIndexed < 10) {
      pickedMonthOneIndexed = `0${pickedMonthOneIndexed}`;
    }

    if (pickedYear !== yearNumber || monthNumber !== pickedMonthOneIndexed) {
      setEditedTrainingsInfo((prevInfo) => ({
        ...prevInfo,
        date: `${yearNumber}-${monthNumber}-00`,
      }));
      setIncorrectDate(true);
    } else {
      setEditedTrainingsInfo((prevInfo) => ({
        ...prevInfo,
        date: value,
      }));
      setIncorrectDate(false);
    }
  };

  const dateErrorMessage = incorrectDate ? 'Only day can be changed!' : '';

  const multipleTrainingsEditor = active ? (
    <StylesProvider injectFirst>
      <Card className={classes.MultipleTrainingsEditor} variant="outlined">
        <CardContent className={classes.Content}>
          <form
            className={classes.Form}
            onSubmit={() => onFormSubmit(editedTrainingsInfo)}
            onChange={handleInputChange}
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
                error={incorrectDate}
                helperText={dateErrorMessage}
                InputLabelProps={{ shrink: true }}
                disabled={checkedTrainingsCount !== 1}
                onChange={(event) => validateInputDate(event)}
                value={editedTrainingsInfo.date}
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
                disabled={checkedTrainingsCount < 1}
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
                disabled={checkedTrainingsCount < 1}
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
                disabled={checkedTrainingsCount < 1}
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
                disabled={checkedTrainingsCount < 1}
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
                  value={editedTrainingsInfo.intensity}
                  valueLabelDisplay="auto"
                  onChange={handleSliderChange}
                  disabled={checkedTrainingsCount < 1}
                />
              </div>
            </div>
            <div className={classes.Form__Buttons}>
              <button
                type="submit"
                className={classes.Form__Button_Add}
                disabled={checkedTrainingsCount < 1}
              >
                save
              </button>
              <button
                className={classes.Form__Button_Cancel}
                type="reset"
                onClick={() => {
                  onClose();
                  resetInputsValues();
                }}
              >
                cancel
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </StylesProvider>
  ) : null;

  return <> {multipleTrainingsEditor} </>;
};

export default MultipleTrainingsEdit;
