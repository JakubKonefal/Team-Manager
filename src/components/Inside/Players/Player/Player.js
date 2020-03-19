import React from "react";
import { Link } from "react-router-dom";
import "./Player.module.css";
import classes from "./Player.module.css";

const player = ({
  number,
  firstName,
  lastName,
  position,
  birth,
  photo,
  playerId,
  teamId,
  teamName,
  onDelete
}) => {
  const playerFirebaseName = `${firstName}-${lastName}-${number}`;

  return (
    <Link
      className={classes.Player}
      to={`/my-teams/${teamId}/players/${playerId}`}
    >
      <img src={photo} className={classes.PlayerImg} alt="player" />
      <div>
        <span className={classes.Label}>
          <strong>Nr:</strong> {number}
        </span>
        <span className={classes.Label}>
          <strong>First name:</strong> {firstName}
        </span>
        <span className={classes.Label}>
          <strong>Last name:</strong> {lastName}
        </span>
        <span className={classes.Label}>
          <strong>Position:</strong> {position}
        </span>
        <span className={classes.Label}>
          <strong>Date of birth:</strong> {birth}
        </span>
        <i
          className={`fas fa-minus-circle ${classes.CloseIcon}`}
          onClick={() => {
            onDelete(playerId, teamName, playerFirebaseName);
          }}
        ></i>
      </div>
    </Link>
  );
};

export default player;
