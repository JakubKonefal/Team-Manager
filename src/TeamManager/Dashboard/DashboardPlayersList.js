import React from "react";
import classes from "./DashboardPlayersList.module.css";
import Avatar from "@material-ui/core/Avatar";

const DashboardPlayersList = ({ players }) => {
  if (!players) {
    return <span className={classes.NoPlayersMsg}>No players!</span>;
  }

  const playersSortedByNumber = Object.values(players).sort((a, b) => {
    return a.playerInfo.number - b.playerInfo.number;
  });

  const playersList = playersSortedByNumber.map((player) => {
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

  const maxPlayersToDisplay = 11;
  if (playersList.length > maxPlayersToDisplay) {
    playersList.splice(maxPlayersToDisplay);
  }

  return playersList;
};

export default DashboardPlayersList;
