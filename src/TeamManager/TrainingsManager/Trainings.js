import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainingYear from './TrainingYear';
import SingleTrainingCreator from './SingleTrainingCreator';
import MultipleTrainingsCreator from './MultipleTrainingsCreator';
import classes from './Trainings.module.css';
import { database } from '../../firebase/firebase';
import moment from 'moment';

const Trainings = ({ userId, teamId, teamName }) => {
  const [trainingsArray, setTrainingsArray] = useState({});
  const [pending, setPending] = useState(true);

  const getInitialTrainingsList = () => {
    axios
      .get(`/users/${userId}/teams/${teamId}/trainings.json`)
      .then(({ data: trainings }) => {
        if (trainings) {
          setTrainingsArray(trainings);
        }
        setPending(false);
      });
  };

  const handleFormSubmitNewTraining = (newTrainingInfo, event) => {
    event.preventDefault();
    const { date } = newTrainingInfo;
    const newTrainingYear = moment(date).format('YYYY');
    const newTrainingMonth = moment(date).format('MMMM');

    const newTrainingDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${newTrainingYear}/${newTrainingMonth}`
    );
    const trainingsDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings`
    );
    const trainingId = newTrainingDatabaseRef.push().key;
    const newTraining = {
      trainingId,
      trainingInfo: { ...newTrainingInfo },
    };
    newTrainingDatabaseRef.child(trainingId).set(newTraining);
    trainingsDatabaseRef.once('value', (snapshot) => {
      const trainings = snapshot.val();
      setTrainingsArray(trainings);
    });
  };

  const getSelectedDaysArray = (from, to, daysOfWeek) => {
    let startingDate = new Date(from);
    const endingDate = new Date(to);
    const selectedDaysArray = [];

    while (startingDate <= endingDate) {
      if (daysOfWeek.includes(startingDate.getDay())) {
        selectedDaysArray.push(moment(startingDate).format('YYYY-MM-DD'));
      }
      let newDate = startingDate.setDate(startingDate.getDate() + 1);
      startingDate = new Date(newDate);
    }
    return selectedDaysArray;
  };

  const getDaysOfWeekAsNumbers = (days) => {
    const daysInWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days.map((day) => daysInWeek.indexOf(day));
  };

  const updateTraininings = () => {
    const trainingsDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings`
    );
    trainingsDatabaseRef.once('value', (snapshot) => {
      const snapshotValue = snapshot.val();
      const trainings = snapshotValue ? snapshotValue : {};
      setTrainingsArray(trainings);
    });
  };

  const handleFormSubmitNewTrainings = (newTrainingsInfo) => {
    const { from, to, daysOfWeek, ...trainingInfo } = newTrainingsInfo;
    const daysOfWeekAsNumbers = getDaysOfWeekAsNumbers(daysOfWeek);
    const selectedDaysArray = getSelectedDaysArray(
      from,
      to,
      daysOfWeekAsNumbers
    );

    selectedDaysArray.forEach((day) => {
      const dateYear = moment(day).format('YYYY');
      const dateMonth = moment(day).format('MMMM');

      const databaseRef = database.ref(
        `/users/${userId}/teams/${teamId}/trainings/${dateYear}/${dateMonth}`
      );

      const trainingId = databaseRef.push().key;
      const newTraining = {
        trainingId,
        trainingInfo: { date: day, ...trainingInfo },
      };
      databaseRef.child(trainingId).set(newTraining);
    });
    updateTraininings();
  };

  useEffect(getInitialTrainingsList, []);

  if (pending) {
    return <div className={classes.Trainings__Loader}></div>;
  }

  const trainingsYearsArray = Object.values(trainingsArray);
  const trainingsYears = Object.keys(trainingsArray);
  const isTrainingsObjEmpty = Object.entries(trainingsArray).length < 1;

  const trainingYears = isTrainingsObjEmpty ? (
    <span className={classes.Trainings__NoTrainingsMsg}>
      You have not created any trainings yet!
    </span>
  ) : (
    trainingsYearsArray.map((year, index) => (
      <TrainingYear
        userId={userId}
        teamId={teamId}
        teamName={teamName}
        trainings={year}
        key={trainingsYears[index]}
        year={trainingsYears[index]}
        updateTrainings={updateTraininings}
      />
    ))
  );

  return (
    <div className={classes.Trainings}>
      {trainingYears}
      <div className={classes.Trainings__TrainingCreators}>
        <div className={classes.Trainings__TrainingCreator_Wraper}>
          <SingleTrainingCreator onFormSubmit={handleFormSubmitNewTraining} />
        </div>
        <div className={classes.Trainings__TrainingCreator_Wraper}>
          <MultipleTrainingsCreator
            onFormSubmit={handleFormSubmitNewTrainings}
          />
        </div>
      </div>
    </div>
  );
};

export default Trainings;
