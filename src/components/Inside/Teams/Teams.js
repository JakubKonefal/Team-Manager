import React from "react";
import Team from "./Team/Team";

const Teams = ({ teams, onDelete }) => {
  let userTeams = null;
  if (teams) {
    userTeams = teams.map(team => {
      return (
        <Team
          key={team.id}
          teamId={team.id}
          teamName={team.teamName}
          teamLogo={team.teamLogo}
          onDelete={onDelete}
        />
      );
    });
  }
  return <>{userTeams} </>;
};

export default Teams;
