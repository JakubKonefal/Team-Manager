import React from "react";
import classes from "./TrainingsManager.module.css";
import Trainings from "./Trainings";
import { AssignmentOutlined } from "@material-ui/icons";

const TrainingsManager = ({ match, userId }) => (
  <div className={classes.TrainingsManager}>
    <h2 className={classes.TrainingsManager__Title}>
      {`${match.params.teamName}'s trainings`}
    </h2>
    <Trainings
      teamId={match.params.teamId}
      teamName={match.params.teamName}
      userId={userId}
    />
    <div className={classes.TrainingsManager__Footer}>
      <AssignmentOutlined className={classes.TrainingsManager__FooterIcon} />
    </div>
  </div>
);

export default TrainingsManager;
