import React from "react";
import Team from "./Team/Team";

const Teams = props => {
  let userTeams = null;
  if (props.teams) {
    userTeams = props.teams.map(team => {
      return (
        <Team
          key={team.id}
          teamId={team.id}
          teamName={team.teamName}
          teamLogo={team.teamLogo}
        />
      );
    });
  }

  return <>{userTeams} </>;
};

export default Teams;
