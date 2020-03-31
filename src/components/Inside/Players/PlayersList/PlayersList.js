import React from "react";
import classes from "./PlayersList.module.css";
import Player from "../Player/Player";

const PlayersList = ({ players, teamId, onDelete }) => {
  const playersList = players && (
    <div className={classes.PlayersList}>
      {players.map(player => {
        return (
          <Player
            key={player.playerId}
            number={player.number}
            firstName={player.firstName}
            lastName={player.lastName}
            position={player.position}
            birth={player.birth}
            photo={player.photo}
            playerId={player.playerId}
            teamId={teamId}
            teamName={player.teamName}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );

  return <>{playersList}</>;
};

export default PlayersList;
