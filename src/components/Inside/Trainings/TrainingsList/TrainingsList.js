import React from "react";
import Training from "../Training/Training";
import TrainingInfoBox from "../TrainingInfoBox/TrainingInfoBox";
import classes from "./TrainingsList.module.css";

const TrainingsList = props => {
  let trainings = <h3>You have not created any trainings yet!</h3>;
  console.log(props.trainings);

  if (props.trainings) {
    let trainingsList = null;
    trainingsList = props.trainings.map(training => {
      console.log(training);
      console.log(props);

      return (
        <Training
          {...training.info}
          key={training.id}
          teamId={props.teamId}
          trainingId={training.id}
        />
      );
    });
    trainings = trainingsList;
  }

  return (
    <div className={classes.TrainingsList__Grid}>
      <TrainingInfoBox />
      {trainings}
    </div>
  );
};

export default TrainingsList;
