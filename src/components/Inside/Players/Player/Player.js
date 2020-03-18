import React from "react";
import { Link } from "react-router-dom";
import "./Player.module.css";
import classes from "./Player.module.css";
import defaultImg from "../../../../assets/img/user.jpg";

const player = props => {
  return (
    <Link
      className={classes.Player}
      to={`/my-teams/${props.teamId}/players/${props.playerId}`}
    >
      <img src={props.photo} className={classes.PlayerImg} alt="player" />
      <div>
        <span className={classes.Label}>
          <strong>Nr:</strong> {props.number}
        </span>
        <span className={classes.Label}>
          <strong>First name:</strong> {props.firstName}
        </span>
        <span className={classes.Label}>
          <strong>Last name:</strong> {props.lastName}
        </span>
        <span className={classes.Label}>
          <strong>Position:</strong> {props.position}
        </span>
        <span className={classes.Label}>
          <strong>Date of birth:</strong> {props.birth}
        </span>
      </div>
    </Link>
  );
};

export default player;
