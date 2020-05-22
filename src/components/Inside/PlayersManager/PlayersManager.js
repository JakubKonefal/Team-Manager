import React from "react";
import classes from "./PlayersManager.module.css";
import Players from "./Players/Players";

const PlayersManager = (props) => {
  return (
    <div className={classes.PlayersManager}>
      <h2 className={classes.PlayersManager__Title}> players</h2>

      <Players teamId={props.match.params.teamId} userId={props.userId} />
    </div>
  );
};

export default PlayersManager;
