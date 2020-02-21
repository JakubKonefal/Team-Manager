import React from "react";
import classes from "./TeamManager.module.css";
import MainContentWraper from "../../../components/MainContentWraper/MainContentWraper";
import { Route, Link } from "react-router-dom";
import Players from "../../../components/Inside/Players/Players";

const teamBuilder = props => (
  <div>
    <MainContentWraper>
      <h1 style={{ margin: "0", textAlign: "center", paddingTop: "20px" }}>
        {" "}
        {props.match.params.teamName} + LOGO
      </h1>
      <ul className={classes.NavLeft}>
        {console.log(props.location.teamId)}
        <Link
          to={{
            pathname: `/my-teams/${props.match.params.teamName}/players`,
            teamId: props.location.teamId
          }}
        >
          PLAYERS
        </Link>
        <li className={classes.Inactive}>Training</li>
        <li className={classes.Inactive}>Table</li>
        <li className={classes.Inactive}>Settings</li>
      </ul>
      <div>
        <Route path="/my-teams/:teamName/players" component={Players} />
      </div>
    </MainContentWraper>
  </div>
);

export default teamBuilder;
