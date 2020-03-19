import React from "react";
import classes from "./Team.module.css";
import { Link } from "react-router-dom";

const Team = ({ teamId, teamName, teamLogo, onDelete }) => (
  <div className={classes.Team}>
    <img src={teamLogo} className={classes.TeamLogo} alt="team-logo" />
    <Link
      className={classes.TeamName}
      to={{
        pathname: `/my-teams/${teamId}`,
        teamId: teamId,
        teamName: teamName
      }}
    >
      {teamName}
    </Link>
    <div className={classes.Buttons}>
      <i
        className={`fas fa-minus-circle ${classes.CloseIcon}`}
        onClick={() => {
          onDelete(teamId, teamName);
        }}
      ></i>
      <i className={`fas fa-edit ${classes.Block}`}></i>
    </div>
  </div>
);

export default Team;
