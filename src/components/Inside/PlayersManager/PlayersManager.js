import React from "react";
import classes from "./PlayersManager.module.css";
import Players from "./Players/Players";
import { PersonOutline } from "@material-ui/icons";

const PlayersManager = ({ match, userId }) => (
  <div className={classes.PlayersManager}>
    <h2 className={classes.PlayersManager__Title}>
      {match.params.teamName}'s players
    </h2>
    <Players teamId={match.params.teamId} userId={userId} />
    <div className={classes.PlayersManager__Footer}>
      {" "}
      <PersonOutline className={classes.PlayersManager__FooterIcon} />{" "}
    </div>
  </div>
);

export default PlayersManager;
