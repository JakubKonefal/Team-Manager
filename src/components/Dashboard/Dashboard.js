import React, { Component } from "react";
import classes from "./Dashboard.module.css";
import axios from "axios";
import DashboardPlayersList from "../Inside/PlayersManager/Players/DashboardPlayersList/DashboardPlayersList";
import DashboardTrainingsList from "../Inside/TrainingsManager/Trainings/DashboardTrainingsList/DashboardTrainingsList";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";

class Dashboard extends Component {
  state = { team: {} };

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
      });
  };

  render() {
    const { team } = this.state;

    return (
      <div className={classes.Dashboard}>
        <div className={classes.Dashboard__Header}>
          <img className={classes.Dashboard__TeamLogo} src={team.teamLogo} />
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
                Next trainings{" "}
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
