import React from "react";
import Training from "../Training/Training";
import TrainingInfoBox from "../TrainingInfoBox/TrainingInfoBox";
import classes from "./TrainingsList.module.css";

const TrainingsList = ({ trainings, teamId }) => {
  const trainingsList = trainings ? (
    trainings.map(training => {
      return (
        <Training
          {...training.info}
          key={training.id}
          teamId={teamId}
          trainingId={training.id}
        />
      );
    })
  ) : (
    <h3>You have not created any trainings yet!</h3>
  );

  return (
    <div className={classes.TrainingsList__Grid}>
      <TrainingInfoBox />
      {trainingsList}
    </div>
  );
};

export default TrainingsList;
