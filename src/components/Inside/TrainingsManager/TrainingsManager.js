import React from "react";
import classes from "./TrainingsManager.module.css";
import Trainings from "./Trainings/Trainings";

const TrainingsManager = ({ match, userId }) => (
  <div className={classes.TrainingsManager}>
    <h2 className={classes.TrainingsManager__Title}>
      {" "}
      {match.params.teamName}'s trainings{" "}
    </h2>

    <Trainings teamId={match.params.teamId} userId={userId} />
    <div className={classes.TrainingsManager__Footer}></div>
  </div>
);

export default TrainingsManager;
