import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { database } from '../../firebase/firebase';
import classes from './TrainingOverview.module.css';
import TrainingInfo from './TrainingInfo';
import TrainingPlan from './TrainingPlan';
import moment from 'moment';

const TrainingOverview = ({ userId, match }) => {
  const [pending, setPending] = useState(true);
  const [trainingInformation, setTrainingInformation] = useState({});

  const getInitialTrainingInfo = () => {
    const { teamId, year, month, trainingId } = match.params;
    axios
      .get(
        `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}.json`
      )
      .then(({ data: training }) => {
        const { trainingInfo } = training;
        if (trainingInfo) {
          setTrainingInformation(trainingInfo);
        }
        setPending(false);
      });
  };

  const handleFormSubmitTrainingInfoUpdate = (updatedTrainingInfo) => {
    const { teamId, year, month, trainingId } = match.params;
    const { date } = updatedTrainingInfo;
    const updatedDateYear = moment(date).format('YYYY');
    const updatedDateMonth = moment(date).format('MMMM');
    const databaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${trainingId}/trainingInfo`
    );

    if (year === updatedDateYear && month === updatedDateMonth) {
      databaseRef.set(updatedTrainingInfo);
    } else {
      const updatedDatabaseRef = database.ref(
        `/users/${userId}/teams/${teamId}/trainings/${updatedDateYear}/${updatedDateMonth}/${trainingId}`
      );
      const updatedTraining = {
        trainingId,
        trainingInfo: { ...updatedTrainingInfo },
      };

      databaseRef.remove();
      updatedDatabaseRef.set(updatedTraining);
    }
    setTrainingInformation(updatedTrainingInfo);
  };

  useEffect(getInitialTrainingInfo, []);

  if (pending) {
    return (
      <div className={classes.TrainingOverview__LoaderWraper}>
        <div className={classes.TrainingOverview__Loader}></div>
      </div>
    );
  }

  const trainingInfo = trainingInformation ? (
    <TrainingInfo
      trainingInfo={trainingInformation}
      onSubmit={handleFormSubmitTrainingInfoUpdate}
    />
  ) : null;

  return (
    <div className={classes.TrainingOverview}>
      <div className={classes.TrainingOverview__TrainingInfo}>
        {trainingInfo}
      </div>
      <div className={classes.TrainingOverview__TrainingPlan}>
        <TrainingPlan userId={userId} />
      </div>
    </div>
  );
};

export default TrainingOverview;
