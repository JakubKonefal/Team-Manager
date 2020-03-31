import React from "react";
import Team from "./Team/Team";

const Teams = ({ teams, onDelete, onSubmit }) => {
  const userTeams = teams && (
    <>
      {teams.map(team => {
        return (
          <Team
            key={team.teamId}
            teamId={team.teamId}
            teamName={team.teamName}
            teamLogo={team.teamLogo}
            onDelete={onDelete}
            onSubmit={onSubmit}
          />
        );
      })}
    </>
  );
  return <>{userTeams} </>;
};

export default Teams;
