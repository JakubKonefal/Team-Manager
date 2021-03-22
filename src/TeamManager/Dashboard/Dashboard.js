import React, { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import axios from 'axios';
import DashboardPlayersList from './DashboardPlayersList';
import DashboardTrainingsList from './DashboardTrainingsList';
import DefaultTeamLogo from '../../assets/img/default_team_logo.png';

const Dashboard = ({ match, userId }) => {
  const [team, setTeam] = useState({});
  const [pending, setPending] = useState(true);

  const getInitialTeamInformation = () => {
    const { teamId } = match.params;
    axios
      .get(`/users/${userId}/teams/${teamId}.json`)
      .then(({ data: team }) => {
        if (team) {
          setTeam(team);
        }
        setPending(false);
      });
  };

  useEffect(getInitialTeamInformation, []);

  if (pending) {
    return (
      <div className={classes.Dashboard__LoaderBackground}>
        <div className={classes.Dashboard__Loader}></div>
      </div>
    );
  }

  return (
    <div className={classes.Dashboard}>
      <div className={classes.Dashboard__Header}>
        <img
          className={classes.Dashboard__TeamLogo}
          src={team.teamLogo || DefaultTeamLogo}
          alt="Logo"
        />
        <h1 className={classes.Dashboard__TeamName}>{team.teamName}</h1>
      </div>
      <div className={classes.Dashboard__Divider}></div>
      <div className={classes.Dashboard__Content}>
        <div className={classes.Dashboard__Players}>
          <div className={classes.Dashboard__PlayersHeader}>
            <h3 className={classes.Dashboard__PlayersTitle}> Players</h3>
            <div className={classes.Dashboard__PlayersDivider}></div>
          </div>
          <DashboardPlayersList players={team.players} />
        </div>
        <div className={classes.Dashboard__Events}>
          <div className={classes.Dashboard__EventsHeader}>
            <h3 className={classes.Dashboard__EventsTitle}>
              Upcoming trainings
            </h3>
            <div className={classes.Dashboard__EventsDivider}></div>
          </div>
          <DashboardTrainingsList trainings={team.trainings} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
