import React from "react";

const CurrentTeam = props => {
  let teamName = props.teamName ? props.teamName : null;
  return <h1>{teamName} + LOGO</h1>;
};

export default CurrentTeam;
