import React from "react";
import Training from "../Training/Training";
import TrainingInfoBox from "../TrainingInfoBox/TrainingInfoBox";
import classes from "./TrainingsList.module.css";

const TrainingsList = ({ trainings, teamId }) => {
  let trainingsList = <h3>You have not created any trainings yet!</h3>;
  if (trainings) {
    trainingsList = trainings.map(training => {
      return (
        <Training
          {...training.info}
          key={training.id}
          teamId={teamId}
          trainingId={training.id}
        />
      );
    });
  }

  return (
    <div className={classes.TrainingsList__Grid}>
      <TrainingInfoBox />
      {trainingsList}
    </div>
  );
};

export default TrainingsList;
