import React from "react";
import classes from "./Team.module.css";
import { Link } from "react-router-dom";

const Team = props => {
  return (
    <div className={classes.Team}>
      <img src={props.teamLogo} className={classes.TeamLogo} alt="team-logo" />
      <Link
        className={classes.TeamName}
        to={{
          pathname: `/my-teams/${props.teamId}`,
          teamId: props.teamId,
          teamName: props.teamName
        }}
      >
        {props.teamName}
      </Link>
      <div className={classes.Buttons}>
        <i className={`fas fa-minus-circle ${classes.CloseIcon}`}></i>
        <i className={`fas fa-edit ${classes.Block}`}></i>
      </div>
    </div>
  );
};

export default Team;
