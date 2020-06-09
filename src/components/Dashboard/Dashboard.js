import React, { Component } from "react";
import classes from "./Dashboard.module.css";
import axios from "axios";
import DashboardPlayersList from "../Inside/PlayersManager/Players/DashboardPlayersList/DashboardPlayersList";
import DashboardTrainingsList from "../Inside/TrainingsManager/Trainings/DashboardTrainingsList/DashboardTrainingsList";
import DefaultTeamLogo from "../../assets/img/default_team_logo.png";

class Dashboard extends Component {
  state = { team: {}, pending: true };

  componentDidMount() {
    this.getInitialTeamInformation();
  }

  getInitialTeamInformation = () => {
    const { teamId } = this.props.match.params;
    const { userId } = this.props;
    axios
      .get(`/users/${userId}/teams/${teamId}.json`)
      .then(({ data: team }) => {
        if (team) {
          this.setState({ team });
        }
        this.setState({ pending: false });
      });
  };

  render() {
    const { team, pending } = this.state;

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
            <DashboardPlayersList players={this.state.team.players} />
          </div>
          <div className={classes.Dashboard__Events}>
            <div className={classes.Dashboard__EventsHeader}>
              <h3 className={classes.Dashboard__EventsTitle}>
                {" "}
                Upcoming trainings{" "}
              </h3>
              <div className={classes.Dashboard__EventsDivider}></div>
            </div>
            <DashboardTrainingsList trainings={this.state.team.trainings} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
