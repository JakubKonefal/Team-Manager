import React from 'react';
import classes from './DashboardTraining.module.css';
import { Event, SportsSoccer } from '@material-ui/icons';
import Dotdotdot from 'react-dotdotdot';

const DashboardTraining = ({ date, trainingType, intensity }) => {
  let intensityBarColor = classes.Blue;
  if (intensity > 30) {
    intensityBarColor = classes.Yellow;
  }
  if (intensity > 70) {
    intensityBarColor = classes.Red;
  }

  return (
    <div className={classes.DashboardTraining}>
      <span className={classes.DashboardTraining__Date}>
        <Event className={classes.DashboardTraining__Icon} /> {date}
      </span>
      <span className={classes.DashboardTraining__TrainingType}>
        <Dotdotdot
          className={classes.DashboardTraining__TrainingType_Clamp}
          clamp={2}
        >
          <SportsSoccer className={classes.DashboardTraining__Icon} />
          {trainingType}
        </Dotdotdot>
      </span>

      <span className={classes.DashboardTraining__Intensity}>
        {intensity}%
        <div
          className={`${classes.DashboardTraining__IntensityBar} ${intensityBarColor} `}
        ></div>
      </span>
    </div>
  );
};

export default DashboardTraining;
