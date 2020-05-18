import React from "react";
import Trainings from "./Trainings/Trainings";

const TrainingsManager = (props) => {
  console.log(props);

  return (
    <div>
      <Trainings teamId={props.match.params.teamId} userId={props.userId} />
    </div>
  );
};

export default TrainingsManager;
