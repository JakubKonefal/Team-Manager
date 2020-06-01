import React from "react";
import classes from "./DashboardPlayersList.module.css";
import Avatar from "@material-ui/core/Avatar";

const DashboardPlayersList = ({ players }) => {
  const sortedPlayersArray = players
    ? Object.values(players).sort((a, b) => {
        return a.playerInfo.number - b.playerInfo.number;
      })
    : [];
  const playersList =
    sortedPlayersArray &&
    sortedPlayersArray.map((player) => {
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

  if (playersList) {
    return playersList;
  }
  return <div></div>;
};

export default DashboardPlayersList;
