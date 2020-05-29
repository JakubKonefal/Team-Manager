import React from "react";
import classes from "./DashboardPlayersList.module.css";
import Avatar from "@material-ui/core/Avatar";

const DashboardPlayersList = ({ players }) => {
  const playersArray = players ? Object.values(players) : null;
  const playersList =
    playersArray &&
    Object.values(players).map((player) => {
      const { playerPhoto, playerId } = player;
      const { number, lastName } = player.playerInfo;
      return (
        <div className={classes.Player} key={playerId}>
          <Avatar className={classes.PlayerAvatar} src={playerPhoto} />
          <span>{number}</span>
          <span>{lastName}</span>
        </div>
      );
    });

  if (playersList) {
    return playersList;
  }
  return <div className={classes.Loader}></div>;
};

export default DashboardPlayersList;
