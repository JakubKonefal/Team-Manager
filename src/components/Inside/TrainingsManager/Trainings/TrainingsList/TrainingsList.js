import React from "react";
import Training from "../Training/Training";
import TrainingInfoBox from "../TrainingInfoBox/TrainingInfoBox";
import Checkbox from "@material-ui/core/Checkbox";
import classes from "./TrainingsList.module.css";

const TrainingsList = ({
  trainings,
  teamId,
  onCheck,
  onCheckAll,
  checkboxes,
}) => {
  const Checkboxes = checkboxes.map((item, index) => (
    <Checkbox
      id={item.id}
      checked={item.checked}
      onClick={(event) => onCheck(event, index, item.id)}
    />
  ));

  const trainingsList = trainings ? (
    trainings.map((training, index) => {
      return (
        <Training
          {...training.trainingInfo}
          key={training.trainingId}
          teamId={teamId}
          trainingId={training.trainingId}
          checkbox={Checkboxes[index]}
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
      <Checkbox onClick={(event) => onCheckAll(event)} />
    </div>
  );
};

export default TrainingsList;
