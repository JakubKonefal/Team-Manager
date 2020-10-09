import React from 'react';
import classes from './DashboardTrainingsList.module.css';
import moment from 'moment';
import DashboardTraining from './DashboardTraining';

const DashboardTrainingsList = ({ trainings }) => {
  if (!trainings) {
    return <span className={classes.NoTrainingsMsg}>No trainings!</span>;
  }

  const trainingYearsArray = Object.values(trainings);
  const allTrainingsArray = [];

  trainingYearsArray.forEach((year) => {
    const months = Object.keys(year);
    months.forEach((month) => {
      const trainingsInMonth = Object.values(year[month]);
      trainingsInMonth.forEach((training) => {
        allTrainingsArray.push(training);
      });
    });
  });

  const currentDate = moment();
  const futureTrainings = allTrainingsArray.filter((training) => {
    return moment(new Date(training.trainingInfo.date)) > currentDate;
  });

  if (futureTrainings.length < 1) {
    return (
      <span className={classes.NoTrainingsMsg}>No upcoming trainings!</span>
    );
  }

  futureTrainings.sort((a, b) => {
    const aDate = moment(new Date(a.trainingInfo.date));
    const bDate = moment(new Date(b.trainingInfo.date));
    return aDate > bDate ? 1 : -1;
  });

  const trainingsList = futureTrainings.map((training) => (
    <DashboardTraining key={training.trainingId} {...training.trainingInfo} />
  ));

  const maxTrainingsToDisplay = 12;
  if (trainingsList.length > maxTrainingsToDisplay) {
    trainingsList.splice(maxTrainingsToDisplay);
  }

  return (
    <div className={classes.Dashboard__TrainingsList}>{trainingsList}</div>
  );
};

export default DashboardTrainingsList;
