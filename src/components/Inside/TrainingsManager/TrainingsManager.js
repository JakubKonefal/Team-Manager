import React from "react";
import Trainings from "./Trainings/Trainings";

const TrainingsManager = (props) => {
  return (
    <div>
      <Trainings teamId={props.match.params.teamId} />
    </div>
  );
};

export default TrainingsManager;
